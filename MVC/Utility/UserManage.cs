using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using Newtonsoft.Json;

using COM;
using DAL;
using MODEL;

namespace MVC
{
    /// <summary>
    /// 用户登录/退出
    /// </summary>
    public static class UserManage
    {
        private static Logger logger = Logger.CreateLogger(typeof(UserManage));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString() == "" ? COM.ConstHelper.dbConn : ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();
        private static double hour = 4;//有效时间（小时）


        /// <summary>
        /// 用户验证结果
        /// </summary>
        public enum LoginResult
        {
            [RemarkAttribute("登录成功")]
            Success = 0,

            [RemarkAttribute("用户为空")]
            NullUser = 1,

            [RemarkAttribute("用户不存在")]
            NoUser = 2,

            [RemarkAttribute("用户不唯一")]
            NotOneUser = 3,

            [RemarkAttribute("密码为空")]
            NullPassword = 4,

            [RemarkAttribute("密码错误")]
            ErrorPassword = 5,

            [RemarkAttribute("验证失败")]
            Failure = 6
        }
        /// <summary>
        /// 角色验证结果
        /// </summary>
        public enum RoleResult
        {
            [RemarkAttribute("成功")]
            Success = 0,

            [RemarkAttribute("无角色")]
            NullRole = 1,

            [RemarkAttribute("无权限")]
            NoRole = 2,

            [RemarkAttribute("角色不唯一")]
            NotOneRole = 3,

            [RemarkAttribute("角色验证失败")]
            Failure = 6
        }


        /// <summary>
        /// 用户验证
        /// </summary>
        /// <param name="context"></param>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <param name="user"></param>
        /// <returns></returns>

        public static LoginResult UserLogin(this HttpContextBase context, string username, string password, ref User user)
        {
            #region 参数检查
            if (string.IsNullOrEmpty(username))
            {
                return LoginResult.NullUser;//用户为空
            }
            else if (string.IsNullOrEmpty(password))
            {
                return LoginResult.NullPassword;//密码为空
            }
            #endregion

            try
            {
                #region 验证失败
                int usercount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE username={0}", SQLHelper.UpdateString(username)));
                if (usercount < 1)
                {
                    return LoginResult.NoUser;//用户不存在
                }

                usercount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE username={0} AND password={1} AND ztm={2}", SQLHelper.UpdateString(username), SQLHelper.UpdateString(MD5Encrypt.Encrypt2(password)), (int)MODEL.Enum.State.InUse));
                if (usercount < 1)
                {
                    return LoginResult.ErrorPassword;//密码错误
                }
                if (usercount != 1)
                {
                    return LoginResult.NotOneUser;//用户不唯一
                }
                #endregion

                #region 验证成功
                user = ParseManageHelper.ParseUser(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE username={0} AND password={1} AND ztm={2}", SQLHelper.UpdateString(username), SQLHelper.UpdateString(MD5Encrypt.Encrypt2(password)), (int)MODEL.Enum.State.InUse)));
                if (user == null)
                {
                    return LoginResult.NoUser;//获取用户失败
                }
                else
                {
                    //用户写入cookie
                    COM.CookieHelper.WriteCookie(context, user.UserName, COM.CookieHelper.CreateCookie(user.UserName, user.AliasName, user.PassWord, hour), "User", hour);
                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE manage_user SET dlsj={0} WHERE id={1}", SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), user.Id));//更新用户登录时间

                    return LoginResult.Success;
                }
                #endregion
            }
            catch
            {
                return LoginResult.Failure;
            }
        }
        /// <summary>
        /// 角色验证
        /// </summary>
        /// <param name="context"></param>
        /// <param name="user"></param>
        /// <param name="syscode"></param>
        /// <param name="sysrole"></param>
        /// <returns></returns>
        public static RoleResult UserRole(this HttpContextBase context, User user, int syscode, ref Role role)
        {
            string mapuserroledatas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_map_user_sysrole WHERE userid={0} AND ztm={1}", user.Id, (int)MODEL.Enum.State.InUse));

            if (string.IsNullOrEmpty(mapuserroledatas))
            {
                return RoleResult.NullRole;//未创建角色
            }

            List<MapUserRole> mapUserRoles = new List<MapUserRole>();//用户角色集合
            string[] mapuserroles = mapuserroledatas.Split(new char[] { COM.ConstHelper.rowSplit });
            for (int i = 0; i < mapuserroles.Length; i++)
            {
                MapUserRole mapUserRole = ParseManageHelper.ParseMapUserRole(mapuserroles[i]);
                if (mapUserRole != null)
                {
                    mapUserRoles.Add(mapUserRole);
                }
            }

            if (mapUserRoles.Count == 0)
            {
                return RoleResult.NullRole;//未创建角色
            }

            for (int i = 0; i < mapUserRoles.Count; i++)
            {
                Role systemRole = ParseManageHelper.ParseRole(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_role WHERE id={0}", mapUserRoles[i].RoleId)));
                if (systemRole != null)
                {
                    if (systemRole.SysCode == syscode)
                    {
                        #region cookie {角色}
                        COM.CookieHelper.WriteCookie(context, user.UserName, systemRole.RoleAlias, "Role", hour);
                        #endregion

                        PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO manage_user_login (userid,type,time,syscode) VALUES({0},{1},{2},{3})", user.Id, (int)MODEL.Enum.LoginWay.Web, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), syscode));//记录用户登录时间

                        role = systemRole;
                        return RoleResult.Success;
                    }
                }
            }

            return RoleResult.NoRole;
        }

        /// <summary>
        /// 解密cookie
        /// </summary>
        /// <param name="encryptTicket"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        public static bool ValidateCookie(string encryptUser, string encryptRole, string role)
        {
            if (string.IsNullOrEmpty(encryptUser) || string.IsNullOrEmpty(encryptRole) || string.IsNullOrEmpty(role))
            {
                return false;
            }
            else
            {
                try
                {
                    List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(encryptUser);
                    string roleinfo = COM.CookieHelper.GetRoleInfoFromCookie(encryptRole);

                    if (userinfo.Count != 4)
                    {
                        return false;//用户信息不正确
                    }

                    #region 验证时效性
                    if (DateTime.Now.CompareTo(Convert.ToDateTime(userinfo[3])) > 0)
                    {
                        return false;//时效过期
                    }
                    #endregion

                    #region 验证用户
                    User user = ParseManageHelper.ParseUser(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE username={0} AND password={1} AND ztm={2}", SQLHelper.UpdateString(userinfo[0]), SQLHelper.UpdateString(userinfo[2]), (int)MODEL.Enum.State.InUse)));
                    if (user == null)
                    {
                        return false;//验证失败
                    }
                    else
                    {
                        #region 验证角色
                        if (role.ToUpper() == roleinfo.ToUpper())
                        {
                            return true;//验证成功
                        }
                        else
                        {
                            return false;//角色不符
                        }
                        #endregion
                    }
                    #endregion
                }
                catch
                {
                    return false;
                }
            }
        }

        /// <summary>
        /// 退出系统
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static void UserLogout(this HttpContextBase context)
        {
            #region Cookie
            HttpCookie cookie = context.Request.Cookies["User"];
            if (cookie != null)
            {
                cookie.Expires = DateTime.Now.AddMinutes(-1);//设置过期
                context.Response.Cookies.Add(cookie);
            }
            #endregion Cookie

            #region Session
            context.Session.Clear();
            context.Session.RemoveAll();
            context.Session.Abandon();
            #endregion Session
        }
    }
}
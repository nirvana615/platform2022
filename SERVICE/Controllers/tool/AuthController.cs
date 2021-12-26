using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using Newtonsoft.Json;
using COM;
using DAL;
using MODEL;

namespace SERVICE.Controllers
{
    public class AuthController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(AuthController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 请求cookie
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string Cookie()
        {
            string username = HttpContext.Current.Request.Form["username"];//用户名
            string password = HttpContext.Current.Request.Form["password"];//用户密码

            #region 参数检查
            if (string.IsNullOrEmpty(username))
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户为空", string.Empty));
            }
            else if (string.IsNullOrEmpty(password))
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "密码为空", string.Empty));
            }
            #endregion

            try
            {
                #region 验证失败
                int usercount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE username={0} AND ztm={1}", SQLHelper.UpdateString(username), (int)MODEL.Enum.State.InUse));
                if (usercount < 1)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户不存在", string.Empty));
                }

                usercount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE username={0} AND password={1} AND ztm={2}", SQLHelper.UpdateString(username), SQLHelper.UpdateString(MD5Encrypt.Encrypt(password)), (int)MODEL.Enum.State.InUse));
                if (usercount < 1)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "密码错误", string.Empty));
                }
                if (usercount != 1)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户不唯一", string.Empty));
                }
                #endregion

                #region 验证成功
                User user = ParseManageHelper.ParseUser(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE username={0} AND password={1} AND ztm={2}", SQLHelper.UpdateString(username), SQLHelper.UpdateString(MD5Encrypt.Encrypt(password)), (int)MODEL.Enum.State.InUse)));
                if (user == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户为空", string.Empty));
                }
                else
                {
                    MapUserRole mapUserRole = ParseManageHelper.ParseMapUserRole(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_map_user_sysrole WHERE userid={0} AND ztm={1}", user.Id, (int)MODEL.Enum.State.InUse)));
                    if (mapUserRole == null)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无用户角色！", string.Empty));//无角色
                    }
                    else
                    {
                        Role role = ParseManageHelper.ParseRole(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_roles WHERE id={0}", mapUserRole.RoleId)));
                        if (role == null)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无此角色！", string.Empty));//无角色
                        }
                        else
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE manage_user SET dlsj={0} WHERE id={1}", SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), user.Id));//更新用户登录时间
                            PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO manage_user_login (userid,type,time) VALUES({0},{1},{2})", user.Id, (int)MODEL.Enum.LoginWay.WeChat, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"))));//记录用户登录时间

                            #region usercookie
                            FormsAuthenticationTicket userticket = new FormsAuthenticationTicket(
                                        0,
                                        user.UserName,
                                        DateTime.Now,
                                        DateTime.Now.AddHours(12),
                                        true,
                                        COM.CookieHelper.CreateCookie(user.UserName, user.AliasName, user.PassWord, 12),
                                        FormsAuthentication.FormsCookiePath);

                            HttpCookie usercookie = new HttpCookie("User");
                            usercookie.Value = JsonConvert.SerializeObject(FormsAuthentication.Encrypt(userticket));
                            #endregion

                            #region rolecookie
                            FormsAuthenticationTicket roleticket = new FormsAuthenticationTicket(
                                        0,
                                        user.UserName,
                                        DateTime.Now,
                                        DateTime.Now.AddHours(12),
                                        true,
                                        "Role",
                                        FormsAuthentication.FormsCookiePath);

                            HttpCookie rolecookie = new HttpCookie("Role");
                            rolecookie.Value = JsonConvert.SerializeObject(FormsAuthentication.Encrypt(roleticket));
                            #endregion

                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", "User=" + usercookie.Value + ";Role=" + rolecookie.Value));

                        }
                    }
                }
                #endregion
            }
            catch (Exception ex)
            {
                logger.Error("创建用户Cookie出现异常，异常信息：", ex);
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, ex.Message, string.Empty));
            }
        }

    }
}

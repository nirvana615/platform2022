using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

using COM;
using DAL;
using MODEL;

namespace SERVICE.Controllers
{
    /// <summary>
    /// 用户管理
    /// </summary>
    public class UserController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(UserController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <returns>用户列表</returns>
        [HttpGet]
        public string GetUserInfo()
        {
            string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE ztm={0} ORDER BY id ASC", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(datas))
            {
                List<User> users = new List<User>();
                string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    User user = ParseManageHelper.ParseUser(rows[i]);
                    if (user != null)
                    {
                        users.Add(user);
                    }
                }

                if (users.Count > 0)
                {
                    return JsonHelper.ToJson(users);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 根据cookie获取指定用户
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUser(string cookie)
        {
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref user);

            if (cookieResult == CookieHelper.CookieResult.SuccessCookkie)
            {
                if (user == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户为空！", string.Empty));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(user)));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 获取全部监测用户信息
        /// </summary>
        /// <returns>监测用户列表</returns>
        [HttpGet]
        public string GetMonitorUserInfo()
        {
            string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE ztm={0}", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(datas))
            {
                List<User> monitorusers = new List<User>();
                string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    User user = ParseManageHelper.ParseUser(rows[i]);
                    if (user != null)
                    {
                        string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_map_user_sysrole WHERE userid={0} AND ztm={1}", user.Id, (int)MODEL.Enum.State.InUse));
                        if (!string.IsNullOrEmpty(maps))
                        {
                            string[] maprows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                            for (int j = 0; j < maprows.Length; j++)
                            {
                                MapUserRole mapUserRole = ParseManageHelper.ParseMapUserRole(maprows[j]);
                                if (mapUserRole != null)
                                {
                                    Role role = ParseManageHelper.ParseRole(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_roles WHERE id={0}", mapUserRole.RoleId)));
                                    if (role.SysCode == (int)MODEL.Enum.System.Monitor)
                                    {
                                        monitorusers.Add(user);
                                    }
                                }
                            }
                        }
                    }
                }

                if (monitorusers.Count > 0)
                {
                    return JsonHelper.ToJson(monitorusers);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 创建用户
        /// </summary>
        [HttpPost]
        public string AddUser()
        {
            string username = HttpContext.Current.Request.Form["username"];
            string aliasname = HttpContext.Current.Request.Form["aliasname"];
            string password = HttpContext.Current.Request.Form["password"];
            string ssdw = HttpContext.Current.Request.Form["ssdw"];
            string ssqy = HttpContext.Current.Request.Form["ssqy"];
            string bz = HttpContext.Current.Request.Form["bz"];

            if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
            {
                string value = "("
                    + SQLHelper.UpdateString(username) + ","
                    + SQLHelper.UpdateString(aliasname) + ","
                    + SQLHelper.UpdateString(MD5Encrypt.Encrypt(password)) + ","
                    + SQLHelper.UpdateString(Guid.NewGuid().ToString("D")) + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + SQLHelper.UpdateString("") + ","
                    + SQLHelper.UpdateString(ssdw) + ","
                    + SQLHelper.UpdateString(ssqy) + ","
                    + (int)MODEL.Enum.State.InUse + ","
                    + SQLHelper.UpdateString(bz) + ")";

                int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO manage_user (username,aliasname,password,bsm,cjsj,dlsj,ssdw,ssqy,ztm,bz) VALUES" + value);
                if (id != -1)
                {
                    return "创建成功！";
                }
                else
                {
                    return "创建失败！";
                }
            }
            else
            {
                return "必填参数不全！";
            }
        }

        /// <summary>
        /// 更新用户
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateUser()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string username = HttpContext.Current.Request.Form["username"];
            string aliasname = HttpContext.Current.Request.Form["aliasname"];
            string password = HttpContext.Current.Request.Form["password"];
            string ssdw = HttpContext.Current.Request.Form["ssdw"];
            string ssqy = HttpContext.Current.Request.Form["ssqy"];
            string bz = HttpContext.Current.Request.Form["bz"];

            int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
            if (count > 0)
            {
                count = 0;
                if (string.IsNullOrEmpty(password))
                {
                    count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE manage_user SET username={0},aliasname={1},ssdw={2},ssqy={3},bz={4} WHERE id={5} AND ztm={6}", SQLHelper.UpdateString(username), SQLHelper.UpdateString(aliasname), SQLHelper.UpdateString(ssdw), SQLHelper.UpdateString(ssqy), SQLHelper.UpdateString(bz), id, (int)MODEL.Enum.State.InUse));
                }
                else
                {
                    count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE manage_user SET username={0},aliasname={1},password={2},ssdw={3},ssqy={4},bz={5} WHERE id={6} AND ztm={7}", SQLHelper.UpdateString(username), SQLHelper.UpdateString(aliasname), SQLHelper.UpdateString(MD5Encrypt.Encrypt(password)), SQLHelper.UpdateString(ssdw), SQLHelper.UpdateString(ssqy), SQLHelper.UpdateString(bz), id, (int)MODEL.Enum.State.InUse));
                }

                if (count == 1)
                {
                    return "更新成功！";
                }
                else
                {
                    return "更新失败！";
                }
            }
            else
            {
                return "无此用户！";
            }
        }

        /// <summary>
        /// 修改用户信息
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string ModiftyUser()
        {
            string username = HttpContext.Current.Request.Form["username"];
            string oldpassword = HttpContext.Current.Request.Form["oldpassword"];
            string newpassword1 = HttpContext.Current.Request.Form["newpassword1"];
            string newpassword2 = HttpContext.Current.Request.Form["newpassword2"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == CookieHelper.CookieResult.SuccessCookkie)
            {
                if (newpassword1 == newpassword2)
                {
                    if (user == null)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户为空！", string.Empty));
                    }
                    else
                    {
                        int count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE manage_user SET username={0},password={1} WHERE id={2}", SQLHelper.UpdateString(username), SQLHelper.UpdateString(MD5Encrypt.Encrypt(newpassword1)), user.Id));
                        if (count == 1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", string.Empty));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "更新用户信息失败！", string.Empty));
                        }
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "两次新密码不一致！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 删除用户
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteUser()
        {
            string id = HttpContext.Current.Request.Form["id"];
            int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
            if (count > 0)
            {
                count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE manage_user SET ztm={0} WHERE id={1}", (int)MODEL.Enum.State.NoUse, id));
                int mapcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_map_user_role WHERE userid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (mapcount > 0)
                {
                    mapcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE manage_map_user_role SET ztm={0} WHERE userid={1}", (int)MODEL.Enum.State.NoUse, id));

                    if (count > 0 && mapcount > 0)
                    {
                        return "删除成功！";
                    }
                    else
                    {
                        return "删除失败！";
                    }
                }
                else
                {
                    if (count > 0)
                    {
                        return "删除成功！";
                    }
                    else
                    {
                        return "删除失败！";
                    }
                }
            }
            else
            {
                return "无此用户！";
            }
        }

        /// <summary>
        /// 获取全部陡崖用户信息
        /// </summary>
        /// <returns>陡崖用户列表</returns>
        [HttpGet]
        public string GetRockUserInfo()
        {
            //string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE ztm={0}", (int)MODEL.Enum.State.InUse));
            //if (!string.IsNullOrEmpty(datas))
            //{
            //    List<User> monitorusers = new List<User>();
            //    string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
            //    for (int i = 0; i < rows.Length; i++)
            //    {
            //        User user = ParseManageHelper.ParseUser(rows[i]);
            //        if (user != null)
            //        {
            //            string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_map_user_role WHERE userid={0} AND ztm={1}", user.Id, (int)MODEL.Enum.State.InUse));
            //            if (!string.IsNullOrEmpty(maps))
            //            {
            //                string[] maprows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
            //                if (maprows.Length == 1)
            //                {
            //                    MapUserRole mapUserRole = ParseManageHelper.ParseMapUserRole(maprows[0]);
            //                    if (mapUserRole != null)
            //                    {
            //                        Role role = ParseManageHelper.ParseRole(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_role WHERE id={0} AND ztm={1}", mapUserRole.RoleId, (int)MODEL.Enum.State.InUse)));
            //                        if ((role != null) && (role.RoleName.ToUpper() == "ROCK"))
            //                        {
            //                            monitorusers.Add(user);
            //                        }
            //                    }
            //                }
            //            }
            //        }
            //    }

            //    if (monitorusers.Count > 0)
            //    {
            //        return JsonHelper.ToJson(monitorusers);
            //    }
            //}

            return string.Empty;
        }
    }
}
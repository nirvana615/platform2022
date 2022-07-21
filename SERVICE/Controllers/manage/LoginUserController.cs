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
    public class LoginUserController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(LoginUserController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString() == "" ? COM.ConstHelper.dbConn : ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取用户登录信息(日分组)
        /// </summary>
        /// <returns>用户登录记录列表</returns>
        [HttpGet]
        public string GetLoginUserDayInfo()
        {
            string nowtime = SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd"));
            string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT userid, LEFT(time,10) times,syscode,COUNT(LEFT(time,10)) counts FROM manage_user_login WHERE LEFT(time,10)={0} GROUP BY userid,syscode,LEFT(time,10) ORDER BY times DESC", nowtime));
            if (!string.IsNullOrEmpty(datas))
            {
                List<LoginUser> logiusers = new List<LoginUser>();

                string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    LoginUser loginUser = ParseManageHelper.ParseLoginUser(rows[i]);
                    if (loginUser != null)
                    {
                        User users = ParseManageHelper.ParseUser(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE id={0} AND ztm={1}", loginUser.UserId, (int)MODEL.Enum.State.InUse)));
                        if (users != null)
                        {
                            loginUser.UserName = users.UserName;
                            loginUser.AliasName = users.AliasName;
                            logiusers.Add(loginUser);
                        }
                    }
                }

                if (logiusers.Count > 0)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(logiusers)));
                }
            }

            return string.Empty;
        }
        /// <summary>
        /// 获取用户登录信息(月分组)
        /// </summary>
        /// <returns>用户登录记录列表</returns>
        [HttpGet]
        public string GetLoginUserMonthInfo()
        {
            string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT userid, LEFT(time,7) times,syscode,COUNT(LEFT(time,7)) counts FROM manage_user_login GROUP BY userid,syscode,LEFT(time,7) ORDER BY times ASC"));
            if (!string.IsNullOrEmpty(datas))
            {
                List<LoginUser> logiusers = new List<LoginUser>();

                string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    LoginUser loginUser = ParseManageHelper.ParseLoginUser(rows[i]);
                    if (loginUser != null)
                    {
                        User users = ParseManageHelper.ParseUser(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE id={0} AND ztm={1}", loginUser.UserId, (int)MODEL.Enum.State.InUse)));
                        if (users != null)
                        {
                            loginUser.UserName = users.UserName;
                            loginUser.AliasName = users.AliasName;
                            logiusers.Add(loginUser);
                        }
                    }
                }

                if (logiusers.Count > 0)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(logiusers)));
                }
            }

            return string.Empty;
        }
        /// <summary>
        /// 获取用户登录信息(年分组)
        /// </summary>
        /// <returns>用户登录记录列表</returns>
        [HttpGet]
        public string GetLoginUserYearInfo()
        {
            string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT userid, LEFT(time,4) times,syscode,COUNT(LEFT(time,4)) counts FROM manage_user_login GROUP BY userid,syscode,LEFT(time,4) ORDER BY times DESC,userid  DESC"));
            if (!string.IsNullOrEmpty(datas))
            {
                List<LoginUser> logiusers = new List<LoginUser>();

                string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    LoginUser loginUser = ParseManageHelper.ParseLoginUser(rows[i]);
                    if (loginUser != null)
                    {
                        User users = ParseManageHelper.ParseUser(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE id={0} AND ztm={1}", loginUser.UserId, (int)MODEL.Enum.State.InUse)));
                        if (users != null)
                        {
                            loginUser.UserName = users.UserName;
                            loginUser.AliasName = users.AliasName;
                            logiusers.Add(loginUser);
                        }
                    }
                }

                if (logiusers.Count > 0)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(logiusers)));
                }
            }

            return string.Empty;
        }
        /// <summary>
        /// 获取单一用户登录信息
        /// </summary>
        /// <returns>用户登录记录列表</returns>
        [HttpGet]
        public string GetUserLoginInfo(int id)
        {
           
            string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT userid, LEFT(time,10) times,syscode,COUNT(LEFT(time,10)) counts FROM manage_user_login WHERE userid={0} GROUP BY userid,syscode,LEFT(time,10) ORDER BY times ASC",id));
            if (!string.IsNullOrEmpty(datas))
            {
                List<LoginUser> logiusers = new List<LoginUser>();

                string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    LoginUser loginUser = ParseManageHelper.ParseLoginUser(rows[i]);
                    if (loginUser != null)
                    {
                        User users = ParseManageHelper.ParseUser(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE id={0} AND ztm={1}", loginUser.UserId, (int)MODEL.Enum.State.InUse)));
                        if (users != null)
                        {
                            loginUser.UserName = users.UserName;
                            loginUser.AliasName = users.AliasName;
                            logiusers.Add(loginUser);
                        }
                    }
                }

                if (logiusers.Count > 0)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(logiusers)));
                }
            }

            return string.Empty;
        }

    }
}
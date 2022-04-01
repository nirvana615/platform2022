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
    /// 消落带项目
    /// </summary>
    public class RockController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(RockController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();
        
        /// <summary>
        /// 获取当前用户所有项目
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserRockProjectList(string cookie,string user)
        {
            string userbsms = string.Empty;
            logger.Info("【" + pgsqlConnection + "】pgsqlConnection");
            logger.Info("【" + cookie + "】cookie");
            logger.Info("【" + user + "】cookie");

            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            logger.Info("【" + cookieResult + "】cookieResult");
            
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                //有效cookie  ViewBag.User
                List<RockProject> projectList = new List<RockProject>();
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM rock_project WHERE fzr={0}  ORDER BY id ASC", SQLHelper.UpdateString(user)));
                string dataXietong = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("select rock_project.* from rock_project  inner join rock_map_user_project on rock_project.id=rock_map_user_project.projectid where rock_map_user_project.userid ={0}  ORDER BY id ASC", SQLHelper.UpdateString(user)));
                logger.Info("【" + dataXietong + "】dataXietong");
                if (string.IsNullOrEmpty(data)&& string.IsNullOrEmpty(dataXietong))
                {
                    //无项目信息
                    return string.Empty;
                }
                if (!string.IsNullOrEmpty(data))
                {
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    //if (rows.Length < 1)
                    //{
                    //    //无项目信息
                    //    return string.Empty;
                    //}

                    for (int i = 0; i < rows.Length; i++)
                    {
                        RockProject project = ParseRockHelper.ParseProject(rows[i]);
                        if (project != null)
                        {
                            projectList.Add(project);
                        }
                    }
                }
                if (!string.IsNullOrEmpty(dataXietong))
                {
                    string[] rows = dataXietong.Split(new char[] { COM.ConstHelper.rowSplit });
                    //if (rows.Length < 1)
                    //{
                    //    //无项目信息
                    //    return string.Empty;
                    //}

                    for (int i = 0; i < rows.Length; i++)
                    {
                        RockProject project = ParseRockHelper.ParseProject(rows[i]);
                        if (project != null)
                        {
                            projectList.Add(project);
                        }
                    }
                }

                if (projectList.Count > 0)
                {
                    return JsonHelper.ToJson(projectList);
                }
                else
                {
                    return string.Empty;
                }
            }
            else
            {
                //无效cookie
                return string.Empty;
            }
        }

        /// <summary>
        /// 新建项目
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddProject()
        {
            #region 参数
            string xmmc = HttpContext.Current.Request.Form["xmmc"];
            string xzqbm = HttpContext.Current.Request.Form["district"];
            string xmwz = HttpContext.Current.Request.Form["xmwz"];
            string xmkssj = HttpContext.Current.Request.Form["xmkssj"];
            string bz = HttpContext.Current.Request.Form["bz"];
            string zxjd = HttpContext.Current.Request.Form["zxjd"];
            string zxwd = HttpContext.Current.Request.Form["zxwd"];


            string mianJi = HttpContext.Current.Request.Form["mianJi"];
            string zhongChang = HttpContext.Current.Request.Form["zhongChang"];
            string tiJi = HttpContext.Current.Request.Form["tiJi"];
            string puoXiang = HttpContext.Current.Request.Form["puoXiang"];
            string hygc = HttpContext.Current.Request.Form["hygc"];
            string gshd = HttpContext.Current.Request.Form["gshd"];

            string dcyx = HttpContext.Current.Request.Form["dcyx"];
            string ytjg = HttpContext.Current.Request.Form["ytjg"];
            string yccz = HttpContext.Current.Request.Form["yccz"];
            string apjg = HttpContext.Current.Request.Form["apjg"];
            string qglx = HttpContext.Current.Request.Form["qglx"];
            string dmbj = HttpContext.Current.Request.Form["dmbj"];
            string bxjx = HttpContext.Current.Request.Form["bxjx"];
            string ytlh = HttpContext.Current.Request.Form["ytlh"];
            string zbfg = HttpContext.Current.Request.Form["zbfg"];
            string dcyxScore = HttpContext.Current.Request.Form["dcyxScore"];
            string ytjgScore = HttpContext.Current.Request.Form["ytjgScore"];
            string ycczScore = HttpContext.Current.Request.Form["ycczScore"];
            string apjgScore = HttpContext.Current.Request.Form["apjgScore"];
            string qglxScore = HttpContext.Current.Request.Form["qglxScore"];
            string dmbjScore = HttpContext.Current.Request.Form["dmbjScore"];
            string bxjxScore = HttpContext.Current.Request.Form["bxjxScore"];
            string ytlhScore = HttpContext.Current.Request.Form["ytlhScore"];
            string zbfgScore = HttpContext.Current.Request.Form["zbfgScore"];
            string dcyxWeight = HttpContext.Current.Request.Form["dcyxWeight"];
            string ytjgWeight = HttpContext.Current.Request.Form["ytjgWeight"];
            string ycczWeight = HttpContext.Current.Request.Form["ycczWeight"];
            string apjgWeight = HttpContext.Current.Request.Form["apjgWeight"];
            string qglxWeight = HttpContext.Current.Request.Form["qglxWeight"];
            string dmbjWeight = HttpContext.Current.Request.Form["dmbjWeight"];
            string bxjxWeight = HttpContext.Current.Request.Form["bxjxWeight"];
            string ytlhWeight = HttpContext.Current.Request.Form["ytlhWeight"];
            string zbfgWeight = HttpContext.Current.Request.Form["zbfgWeight"];


            string projectScore = HttpContext.Current.Request.Form["projectScore"];//项目得分
           

            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }

                if (!string.IsNullOrEmpty(xmmc)
                    && !string.IsNullOrEmpty(zxjd)
                    && !string.IsNullOrEmpty(zxwd)
                    && !string.IsNullOrEmpty(xzqbm))
                {
                    string xmbm = "9999";//生产项目编码
                    if (!string.IsNullOrEmpty(xmbm))
                    {
                        string value = "("
                        + SQLHelper.UpdateString(xmmc) + ","
                        + SQLHelper.UpdateString(xmbm) + ","
                        + zxjd + ","
                        + zxwd + ","
                        + SQLHelper.UpdateString(xzqbm) + ","
                        + SQLHelper.UpdateString(xmwz) + ","
                        + SQLHelper.UpdateString(xmkssj) + ","
                        + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                        + SQLHelper.UpdateString(Guid.NewGuid().ToString("D")) + ","
                        + (int)MODEL.Enum.State.InUse + ","
                        + SQLHelper.UpdateString(bz) + ","
                        + SQLHelper.UpdateString(user.UserName); 

                        string sql = " INSERT INTO rock_project(xmmc, xmbm, zxjd, zxwd, xzqbm, xmwz, xmkssj, cjsj, bsm, ztm, bz, fzr";
                        
                        int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, sql+") VALUES" + value+ ")");
                        if (id != -1)
                        {
                             return id+"";
                        }
                        else
                        {
                            return "创建监测项目失败！";
                        }
                    }
                    else
                    {
                        return "生成项目唯一编码失败！";
                    }
                }
                else
                {
                    return "参数不全！";
                }
            }
            else
            {
                return "验证用户失败！";
            }
        }



        /// <summary>
        /// 删除项目
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteProject()
        {
            string id = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {

                
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE FROM  rock_project  WHERE id={0}", id));

                if (updatecount == 1)
                {
                    return "删除成功";
                }
                else
                {
                    return "删除失败";
                }
            }
            else
            {
                return "验证失败！";
            }
        }

        /// <summary>
        /// 获取项目基本信息
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetProjectInfo(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                RockProject project = ParseRockHelper.ParseProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM rock_project WHERE id={0}", id)));
                if (project != null)
                {
                    return JsonHelper.ToJson(project);
                }
            }

            return string.Empty;
        }
        /// <summary>
        /// 更新项目
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateProject()
        {
            #region 参数
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string xmmc = HttpContext.Current.Request.Form["xmmc"];
            string xzqbm = HttpContext.Current.Request.Form["district"];
            string xmwz = HttpContext.Current.Request.Form["xmwz"];
            string xmkssj = HttpContext.Current.Request.Form["xmkssj"];
            string bz = HttpContext.Current.Request.Form["bz"];
            string zxjd = HttpContext.Current.Request.Form["zxjd"];
            string zxwd = HttpContext.Current.Request.Form["zxwd"];

            string mianJi = HttpContext.Current.Request.Form["mianJi"];
            string zhongChang = HttpContext.Current.Request.Form["zhongChang"];
            string tiJi = HttpContext.Current.Request.Form["tiJi"];
            string puoXiang = HttpContext.Current.Request.Form["puoXiang"];
            
            #endregion

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM rock_project WHERE id={0} ", id));
                if (count == 1)
                {
                    if (!string.IsNullOrEmpty(xmmc))
                    {
                        string sql = "UPDATE rock_project SET xmmc={0}";
                        if (!string.IsNullOrEmpty(zxjd))
                        {
                            sql = sql + ", zxjd = '" + zxjd + "'";
                        }
                        if (!string.IsNullOrEmpty(zxwd))
                        {
                            sql = sql + ", zxwd = '" + zxwd + "'";
                        }
                        if (!string.IsNullOrEmpty(xzqbm))
                        {
                            sql = sql + ", xzqbm = '" + xzqbm + "'";
                        }
                        if (!string.IsNullOrEmpty(xmwz))
                        {
                            sql = sql + ", xmwz = '" + xmwz + "'";
                        }
                        if (!string.IsNullOrEmpty(bz))
                        {
                            sql = sql + ", bz = '" + bz + "'";
                        }
                       

                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(
                             sql + "WHERE id={1} ",
                             SQLHelper.UpdateString(xmmc),id));

                        if (updatecount == 1)
                        {
                            return "更新成功！";
                        }
                        else
                        {
                            return "更新项目失败！";
                        }
                    }
                    else//UPDATE flz_project SET xmmc={0}   直接更新数据库
                    {
                        return "没有项目名称！";
                    }
                }
                else
                {
                    return "无此项目！";
                }
            }
            else
            {
                return "用户无权限！";
            }
        }
        /// <summary>
        /// 获取当前用户所有项目
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserProjectList(string cookie, string id)
        {
            string userbsms = string.Empty;
            logger.Info("【" + pgsqlConnection + "】pgsqlConnection");
            logger.Info("【" + cookie + "】cookie");
            logger.Info("【" + id + "】cookie");

            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            logger.Info("【" + cookieResult + "】cookieResult");

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                //有效cookie  ViewBag.User
                List<RockMapUserMonitorProject> userList = new List<RockMapUserMonitorProject>();
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM rock_map_user_project WHERE projectid={0}  ORDER BY id ASC", SQLHelper.UpdateString(id)));
                if (string.IsNullOrEmpty(data))
                {
                    //无选中的操作用信息
                    return string.Empty;
                }

                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length < 1)
                {
                    //无项目信息
                    return string.Empty;
                }

                for (int i = 0; i < rows.Length; i++)
                {
                    RockMapUserMonitorProject project = ParseRockHelper.ParseRockUserProject(rows[i]);
                    if (project != null)
                    {
                        userList.Add(project);
                    }
                }

                if (userList.Count > 0)
                {
                    return JsonHelper.ToJson(userList);
                }
                else
                {
                    return string.Empty;
                }
            }
            else
            {
                //无效cookie
                return string.Empty;
            }
        }
        /// <summary>
        /// 更新
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string UpdateUserMapProject()
        {
            #region 参数
            string userIdList = HttpContext.Current.Request.Form["userIdList"];
            string projectId = HttpContext.Current.Request.Form["projectId"];
            

            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }

                if (!string.IsNullOrEmpty(userIdList)
                    && !string.IsNullOrEmpty(projectId)
                   )
                {
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE FROM  rock_map_user_project  WHERE projectid={0}", SQLHelper.UpdateString(projectId)));
                    logger.Info("【" + updatecount + "】updatecount");

                    string[] rows = userIdList.Split(new char[] { COM.ConstHelper.rowSplit });
                    int id = -1;
                    for (int j = 0; j < rows.Length; j++)
                    {
                        string sql = " INSERT INTO rock_map_user_project(userid, projectid) VALUES(" + SQLHelper.UpdateString(rows[j]) +","+ projectId+")";

                         id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, sql);

                    }


                    if (id != -1)
                    {
                        return "选择成功";
                    }
                    else
                    {
                        return "选择操作人员失败！";
                    }


                }
                else
                {
                    return "参数不全！";
                }
            }
            else
            {
                return "验证用户失败！";
            }
        }


    }
}

using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
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
    /// 监测项目
    /// </summary>
    public class MonitorProjectController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(MonitorProjectController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 后台获取全部监测项目
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetProjectList()
        {
            List<MonitorProject> projectList = new List<MonitorProject>();
            string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_project WHERE ztm={0} ORDER BY id ASC", (int)MODEL.Enum.State.InUse));
            if (string.IsNullOrEmpty(datas))
            {
                return string.Empty;
            }

            string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
            if (rows.Length < 1)
            {
                return string.Empty;
            }

            for (int i = 0; i < rows.Length; i++)
            {
                MonitorProject project = ParseMonitorHelper.ParseMonitorProject(rows[i]);
                if (project != null)
                {
                    projectList.Add(project);
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

        /// <summary>
        /// 获取用户-监测项目映射
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetMapUserMonitorProject(int id)
        {
            string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_user_project WHERE userid={0} AND ztm={1} ORDER BY id ASC", id, (int)MODEL.Enum.State.InUse));
            if (string.IsNullOrEmpty(maps))
            {
                return string.Empty;
            }
            else
            {
                List<MapUserMonitorProject> mapUserMonitorProjects = new List<MapUserMonitorProject>();

                string[] rows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    MapUserMonitorProject mapUserMonitorProject = ParseMonitorHelper.ParseMapUserMonitorProject(rows[i]);
                    if (mapUserMonitorProject != null)
                    {
                        mapUserMonitorProjects.Add(mapUserMonitorProject);
                    }
                }

                if (mapUserMonitorProjects.Count > 0)
                {
                    return JsonHelper.ToJson(mapUserMonitorProjects);
                }
                else
                {
                    return string.Empty;
                }
            }
        }

        /// <summary>
        /// 更新用户-监测项目映射
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateMapUserMonitorProject()
        {
            string userid = HttpContext.Current.Request.Form["userid"];
            string monitorprojectids = HttpContext.Current.Request.Form["monitorprojectids"];

            if (string.IsNullOrEmpty(monitorprojectids))
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_user_project WHERE userid={0} AND ztm={1}", userid, (int)MODEL.Enum.State.InUse));
                if (count > 0)
                {
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_user_project SET ztm={0} WHERE userid={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, userid, (int)MODEL.Enum.State.InUse));
                    if (updatecount > 0)
                    {
                        return "更新用户授权成功！";
                    }
                    else
                    {
                        return "更新用户授权失败！";
                    }
                }
            }
            else
            {
                List<string> newmonitorprojectidlist = monitorprojectids.Split(new char[] { ',' }).ToList();

                List<string> delmonitorprojectidlist = new List<string>();//需要删除的
                List<string> monitorprojectidlist = new List<string>();//保留的，不做更改

                string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_user_project WHERE userid={0} AND ztm={1}", userid, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(maps))
                {
                    string[] rows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        MapUserMonitorProject mapUserMonitorProject = ParseMonitorHelper.ParseMapUserMonitorProject(rows[i]);
                        if (mapUserMonitorProject != null)
                        {
                            if (newmonitorprojectidlist.Contains(mapUserMonitorProject.MonitorProjectId.ToString()))
                            {
                                monitorprojectidlist.Add(mapUserMonitorProject.MonitorProjectId.ToString());
                            }
                            else
                            {
                                delmonitorprojectidlist.Add(mapUserMonitorProject.MonitorProjectId.ToString());
                            }
                        }
                    }
                }

                if (delmonitorprojectidlist.Count > 0)
                {
                    for (int i = 0; i < delmonitorprojectidlist.Count; i++)
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_user_project SET ztm={0} WHERE userid={1} AND projectid={2} AND ztm={3}", (int)MODEL.Enum.State.NoUse, userid, delmonitorprojectidlist[i], (int)MODEL.Enum.State.InUse));
                        if (updatecount != 1)
                        {
                            return "更新用户授权（删除原有授权）失败！";
                        }
                    }
                }

                for (int i = 0; i < newmonitorprojectidlist.Count; i++)
                {
                    if (monitorprojectidlist.Count > 0)
                    {
                        if (monitorprojectidlist.Contains(newmonitorprojectidlist[i]))
                        {
                            continue;
                        }
                    }

                    PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", userid, newmonitorprojectidlist[i], SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                }

                return "更新用户授权成功！";
            }

            return string.Empty;
        }

        /// <summary>
        /// 获取当前用户所有项目
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserProjectList(string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                //有效cookie
                List<MonitorProject> projectList = new List<MonitorProject>();
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_project WHERE bsm{0} AND ztm={1} ORDER BY id ASC", userbsms, (int)MODEL.Enum.State.InUse));
                if (string.IsNullOrEmpty(data))
                {
                    //无项目信息
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
                    MonitorProject project = ParseMonitorHelper.ParseMonitorProject(rows[i]);
                    if (project != null)
                    {
                        projectList.Add(project);
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

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                MonitorProjectString projectString = ParseMonitorHelper.ParseMonitorProjectString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_project WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms)));
                if (projectString != null)
                {
                    if (!string.IsNullOrEmpty(projectString.SRID))
                    {
                        Coordinate coordinate = ParseManageHelper.ParseCoordinate(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_coordinate WHERE srid={0}", projectString.SRID)));
                        if (coordinate != null)
                        {
                            projectString.SRID = coordinate.NAME;
                        }
                    }

                    return JsonHelper.ToJson(projectString);
                }
            }

            return string.Empty;
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
            string xmlx = HttpContext.Current.Request.Form["xmlx"];
            string xmlb = HttpContext.Current.Request.Form["xmlb"];
            string zxjd = HttpContext.Current.Request.Form["zxjd"];
            string zxwd = HttpContext.Current.Request.Form["zxwd"];
            string srid = HttpContext.Current.Request.Form["kjck"];
            string xzqbm = HttpContext.Current.Request.Form["district"];
            string xmwz = HttpContext.Current.Request.Form["xmwz"];
            string xmkssj = HttpContext.Current.Request.Form["xmkssj"];
            string xmjssj = HttpContext.Current.Request.Form["xmjssj"];
            string zhdmc = HttpContext.Current.Request.Form["zhdmc"];
            string zhdtybh = HttpContext.Current.Request.Form["zhdtybh"];
            string zhlx = HttpContext.Current.Request.Form["zhlx"];
            string zhdj = HttpContext.Current.Request.Form["zhdj"];
            string zhxq = HttpContext.Current.Request.Form["zhxq"];
            string yjjb = HttpContext.Current.Request.Form["yjjb"];
            string jcjb = HttpContext.Current.Request.Form["jcjb"];
            string jcsd = HttpContext.Current.Request.Form["jcjb"];
            string sfkq = HttpContext.Current.Request.Form["sfkq"];
            string sfss = HttpContext.Current.Request.Form["sfss"];
            string sfjs = HttpContext.Current.Request.Form["sfjs"];
            string mj = HttpContext.Current.Request.Form["mj"];
            string mjdw = HttpContext.Current.Request.Form["mjdw"];
            string tj = HttpContext.Current.Request.Form["tj"];
            string tjdw = HttpContext.Current.Request.Form["tjdw"];
            string wxhs = HttpContext.Current.Request.Form["wxhs"];
            string wxrs = HttpContext.Current.Request.Form["wxrs"];
            string wxfwmj = HttpContext.Current.Request.Form["wxfwmj"];
            string qtwx = HttpContext.Current.Request.Form["qtwx"];
            string bz = HttpContext.Current.Request.Form["bz"];
            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }

                if (!string.IsNullOrEmpty(xmmc)
                    && !string.IsNullOrEmpty(zxjd)
                    && !string.IsNullOrEmpty(zxwd)
                    && !string.IsNullOrEmpty(xzqbm)
                    && !string.IsNullOrEmpty(zhlx)
                    && !string.IsNullOrEmpty(zhdmc)
                    && !string.IsNullOrEmpty(zhdtybh))
                {
                    string xmbm = CreateProjectCode(xzqbm, zhlx);//生产项目编码
                    if (!string.IsNullOrEmpty(xmbm))
                    {
                        string value = "("
                        + SQLHelper.UpdateString(xmmc) + ","
                        + SQLHelper.UpdateString(xmbm) + ","
                        + zxjd + ","
                        + zxwd + ","
                        + srid + ","
                        + SQLHelper.UpdateString(xzqbm) + ","
                        + SQLHelper.UpdateString(xmwz) + ","
                        + SQLHelper.UpdateString(xmkssj) + ","
                        + SQLHelper.UpdateString(xmjssj) + ","
                        + SQLHelper.UpdateString(zhdmc) + ","
                        + SQLHelper.UpdateString(zhdtybh) + ","
                        + zhlx + ","
                        + SQLHelper.UpdateString(qtwx) + ","
                        + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                        + SQLHelper.UpdateString(Guid.NewGuid().ToString("D")) + ","
                        + (int)MODEL.Enum.State.InUse + ","
                        + SQLHelper.UpdateString(bz) + ")";

                        int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO monitor_project (xmmc,xmbm,zxjd,zxwd,srid,xzqbm,xmwz,xmkssj,xmjssj,zhdmc,zhdtybh,zhlx,qtwx,cjsj,bsm,ztm,bz) VALUES" + value);
                        if (id != -1)
                        {
                            if (!string.IsNullOrEmpty(xmlx))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET xmlx={0} WHERE id={1}", xmlx, id));
                            }

                            if (!string.IsNullOrEmpty(xmlb))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET xmlb={0} WHERE id={1}", xmlb, id));
                            }

                            if (!string.IsNullOrEmpty(zhdj))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET zhdj={0} WHERE id={1}", zhdj, id));
                            }

                            if (!string.IsNullOrEmpty(zhxq))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET zhxq={0} WHERE id={1}", zhxq, id));
                            }

                            if (!string.IsNullOrEmpty(jcjb))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET jcjb={0} WHERE id={1}", jcjb, id));
                            }

                            if (!string.IsNullOrEmpty(jcsd))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET jcsd={0} WHERE id={1}", jcsd, id));
                            }

                            if (!string.IsNullOrEmpty(yjjb))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET yjjb={0} WHERE id={1}", yjjb, id));
                            }

                            if (!string.IsNullOrEmpty(sfkq))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET sfkq={0} WHERE id={1}", sfkq, id));
                            }

                            if (!string.IsNullOrEmpty(sfss))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET sfss={0} WHERE id={1}", sfss, id));
                            }

                            if (!string.IsNullOrEmpty(sfjs))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET sfjs={0} WHERE id={1}", sfjs, id));
                            }

                            if (!string.IsNullOrEmpty(mj))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET mj={0} WHERE id={1}", mj, id));
                            }

                            if (!string.IsNullOrEmpty(mjdw))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET mjdw={0} WHERE id={1}", mjdw, id));
                            }

                            if (!string.IsNullOrEmpty(tj))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET tj={0} WHERE id={1}", tj, id));
                            }

                            if (!string.IsNullOrEmpty(tjdw))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET tjdw={0} WHERE id={1}", tjdw, id));
                            }

                            if (!string.IsNullOrEmpty(wxhs))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET wxhs={0} WHERE id={1}", wxhs, id));
                            }

                            if (!string.IsNullOrEmpty(wxrs))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET wxrs={0} WHERE id={1}", wxrs, id));
                            }

                            if (!string.IsNullOrEmpty(wxfwmj))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET wxfwmj={0} WHERE id={1}", wxfwmj, id));
                            }

                            int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", user.Id, id, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));

                            if (mapid == -1)
                            {
                                return "创建用户-监测项目映射失败！";
                            }
                            else
                            {
                                return "创建成功！";
                            }
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
            string xmbm = HttpContext.Current.Request.Form["xmbm"];
            string xmlx = HttpContext.Current.Request.Form["xmlx"];
            string xmlb = HttpContext.Current.Request.Form["xmlb"];
            string zxjd = HttpContext.Current.Request.Form["zxjd"];
            string zxwd = HttpContext.Current.Request.Form["zxwd"];
            string srid = HttpContext.Current.Request.Form["kjck"];
            string xzqbm = HttpContext.Current.Request.Form["district"];
            string xmwz = HttpContext.Current.Request.Form["xmwz"];
            string xmkssj = HttpContext.Current.Request.Form["xmkssj"];
            string xmjssj = HttpContext.Current.Request.Form["xmjssj"];
            string zhdmc = HttpContext.Current.Request.Form["zhdmc"];
            string zhdtybh = HttpContext.Current.Request.Form["zhdtybh"];
            string zhlx = HttpContext.Current.Request.Form["zhlx"];
            string zhdj = HttpContext.Current.Request.Form["zhdj"];
            string zhxq = HttpContext.Current.Request.Form["zhxq"];
            string yjjb = HttpContext.Current.Request.Form["yjjb"];
            string jcjb = HttpContext.Current.Request.Form["jcjb"];
            string jcsd = HttpContext.Current.Request.Form["jcjb"];
            string sfkq = HttpContext.Current.Request.Form["sfkq"];
            string sfss = HttpContext.Current.Request.Form["sfss"];
            string sfjs = HttpContext.Current.Request.Form["sfjs"];
            string mj = HttpContext.Current.Request.Form["mj"];
            string mjdw = HttpContext.Current.Request.Form["mjdw"];
            string tj = HttpContext.Current.Request.Form["tj"];
            string tjdw = HttpContext.Current.Request.Form["tjdw"];
            string wxhs = HttpContext.Current.Request.Form["wxhs"];
            string wxrs = HttpContext.Current.Request.Form["wxrs"];
            string wxfwmj = HttpContext.Current.Request.Form["wxfwmj"];
            string qtwx = HttpContext.Current.Request.Form["qtwx"];
            string bz = HttpContext.Current.Request.Form["bz"];
            #endregion

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_project WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse));
                if (count == 1)
                {
                    if (!string.IsNullOrEmpty(xmmc)
                    && !string.IsNullOrEmpty(zxjd)
                    && !string.IsNullOrEmpty(zxwd)
                    && !string.IsNullOrEmpty(xzqbm)
                    && !string.IsNullOrEmpty(zhlx)
                    && !string.IsNullOrEmpty(zhdmc))
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(
                             "UPDATE monitor_project SET xmmc={0},zxjd={1},zxwd={2},srid={3},xzqbm={4},xmwz={5},xmkssj={6},xmjssj={7},zhdmc={8},zhdtybh={9},zhlx={10},qtwx={11},bz={12} WHERE id={13} AND bsm{14} AND ztm={15}",
                             SQLHelper.UpdateString(xmmc),
                             zxjd,
                             zxwd,
                             srid,
                             SQLHelper.UpdateString(xzqbm),
                             SQLHelper.UpdateString(xmwz),
                             SQLHelper.UpdateString(xmkssj),
                             SQLHelper.UpdateString(xmjssj),
                             SQLHelper.UpdateString(zhdmc),
                             SQLHelper.UpdateString(zhdtybh),
                             zhlx,
                             SQLHelper.UpdateString(qtwx),
                             SQLHelper.UpdateString(bz),
                             id,
                             userbsms,
                             (int)MODEL.Enum.State.InUse));

                        if (updatecount == 1)
                        {
                            if (!string.IsNullOrEmpty(xmlx))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET xmlx={0} WHERE id={1} AND bsm{2} AND ztm={3}", xmlx, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(xmlb))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET xmlb={0} WHERE id={1} AND bsm{2} AND ztm={3}", xmlb, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(zhdj))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET zhdj={0} WHERE id={1} AND bsm{2} AND ztm={3}", zhdj, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(zhxq))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET zhxq={0} WHERE id={1} AND bsm{2} AND ztm={3}", zhxq, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(jcjb))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET jcjb={0} WHERE id={1} AND bsm{2} AND ztm={3}", jcjb, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(jcsd))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET jcsd={0} WHERE id={1} AND bsm{2} AND ztm={3}", jcsd, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(yjjb))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET yjjb={0} WHERE id={1} AND bsm{2} AND ztm={3}", yjjb, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(sfkq))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET sfkq={0} WHERE id={1} AND bsm{2} AND ztm={3}", sfkq, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(sfss))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET sfss={0} WHERE id={1} AND bsm{2} AND ztm={3}", sfss, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(sfjs))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET sfjs={0} WHERE id={1} AND bsm{2} AND ztm={3}", sfjs, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(mj))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET mj={0} WHERE id={1} AND bsm{2} AND ztm={3}", mj, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(mjdw))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET mjdw={0} WHERE id={1} AND bsm{2} AND ztm={3}", mjdw, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(tj))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET tj={0} WHERE id={1} AND bsm{2} AND ztm={3}", tj, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(tjdw))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET tjdw={0} WHERE id={1} AND bsm{2} AND ztm={3}", tjdw, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(wxhs))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET wxhs={0} WHERE id={1} AND bsm{2} AND ztm={3}", wxhs, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(wxrs))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET wxrs={0} WHERE id={1} AND bsm{2} AND ztm={3}", wxrs, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(wxfwmj))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET wxfwmj={0} WHERE id={1} AND bsm{2} AND ztm={3}", wxfwmj, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            return "更新成功！";
                        }
                        else
                        {
                            return "更新项目失败！";
                        }
                    }
                    else
                    {
                        return "缺少必需参数！";
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
        /// 删除项目
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteProject()
        {
            string id = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_project SET ztm={0} WHERE id={1}", (int)MODEL.Enum.State.NoUse, id));
                if (updatecount == 1)
                {
                    int updatemapcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_user_project SET ztm={0} WHERE userid={1} AND projectid={2}", (int)MODEL.Enum.State.NoUse, user.Id, id));
                    if (updatemapcount == 1)
                    {
                        return "删除成功！";
                    }
                    else
                    {
                        return "删除用户-项目映射出错！";
                    }
                }
                else
                {
                    return "删除项目出错！";
                }
            }
            else
            {
                return "验证失败！";
            }
        }

        #region 方法
        /// <summary>
        /// 创建项目编码
        /// </summary>
        /// <param name="xjxzq"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        private string CreateProjectCode(string xjxzq, string type)
        {
            if (!string.IsNullOrEmpty(xjxzq) && !string.IsNullOrEmpty(xjxzq))
            {
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_project WHERE xzqbm='{0}' AND zhlx={1}", xjxzq, type));
                if (data == string.Empty)
                {
                    return xjxzq + type + "00001";
                }
                else
                {
                    List<long> codes = new List<long>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        try
                        {
                            MonitorProject project = ParseMonitorHelper.ParseMonitorProject(rows[i]);
                            long code = Convert.ToInt64(project.XMBM);
                            codes.Add(code);
                        }
                        catch
                        {
                            return string.Empty;
                        }
                    }

                    long maxcode = codes.Max();
                    return (maxcode + 1).ToString();
                }
            }
            else
            {
                return string.Empty;
            }
        }
        #endregion

    }
}

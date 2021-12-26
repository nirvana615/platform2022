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
    /// 监测点
    /// </summary>
    public class MonitorController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(MonitorController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取监测点
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetMonitor(int id, string cookie)
        {
            /*
             * 获取与项目相关监测点设备数据（如雨量计）
             * 获取灾害体
             * 获取不构成剖面监测点设备数据
             * 获取剖面
             * 获取构成剖面监测点设备数据
             */

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                List<MonitorInfo> monitorInfos = new List<MonitorInfo>();

                #region 只与项目相关的监测点（如降雨量）
                int projectmonitorcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_project_monitor WHERE projectid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (projectmonitorcount > 0)
                {
                    string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_project_monitor WHERE projectid={0} AND ztm={1} ORDER BY id ASC", id, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(data))
                    {
                        string[] rows = StringHelper.String2Array(data);
                        for (int i = 0; i < rows.Length; i++)
                        {
                            MapProjectMonitor mapProjectMonitor = ParseMonitorHelper.ParseMapProjectMonitor(rows[i]);
                            if (mapProjectMonitor != null)
                            {
                                MonitorString monitorString = ParseMonitorHelper.ParseMonitorString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_monitor WHERE id={0} AND ztm={1} AND bsm{2}", mapProjectMonitor.MonitorId, (int)MODEL.Enum.State.InUse, userbsms)));
                                if (monitorString != null)
                                {
                                    MonitorInfo monitorInfo = new MonitorInfo
                                    {
                                        DisasterString = null,
                                        SectionString = null,
                                        MonitorString = monitorString
                                    };

                                    monitorInfos.Add(monitorInfo);
                                }
                            }
                        }
                    }
                }
                #endregion

                int disastercount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_project_disaster WHERE projectid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (disastercount > 0)
                {
                    string projectdisasterdata = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_project_disaster WHERE projectid={0} AND ztm={1} ORDER BY id ASC", id, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(projectdisasterdata))
                    {
                        string[] projectdisasterrow = StringHelper.String2Array(projectdisasterdata);
                        for (int i = 0; i < projectdisasterrow.Length; i++)
                        {
                            MapProjectDisaster mapProjectDisaster = ParseMonitorHelper.ParseMapProjectDisaster(projectdisasterrow[i]);
                            if (mapProjectDisaster != null)
                            {
                                DisasterString disasterString = ParseMonitorHelper.ParseDisasterString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", mapProjectDisaster.DisasterId, userbsms, (int)MODEL.Enum.State.InUse)));
                                if (disasterString != null)
                                {
                                    #region  不构成剖面的监测点
                                    int disastermonitor = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_monitor WHERE disasterid={0} AND ztm={1}", disasterString.Id, (int)MODEL.Enum.State.InUse));
                                    string disastermonitordata = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_monitor WHERE disasterid={0} AND ztm={1} ORDER BY id ASC", disasterString.Id, (int)MODEL.Enum.State.InUse));
                                    if (!string.IsNullOrEmpty(disastermonitordata))
                                    {
                                        string[] disastermonitorrow = StringHelper.String2Array(disastermonitordata);
                                        for (int j = 0; j < disastermonitorrow.Length; j++)
                                        {
                                            MapDisasterMonitor mapDisasterMonitor = ParseMonitorHelper.ParseMapDisasterMonitor(disastermonitorrow[j]);
                                            if (mapDisasterMonitor != null)
                                            {
                                                MonitorString monitorString = ParseMonitorHelper.ParseMonitorString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_monitor WHERE id={0} AND ztm={1} AND bsm{2}", mapDisasterMonitor.MonitorId, (int)MODEL.Enum.State.InUse, userbsms)));
                                                if (monitorString != null)
                                                {
                                                    MonitorInfo monitorInfo = new MonitorInfo
                                                    {
                                                        DisasterString = disasterString,
                                                        SectionString = null,
                                                        MonitorString = monitorString
                                                    };

                                                    monitorInfos.Add(monitorInfo);
                                                }
                                            }
                                        }
                                    }
                                    #endregion

                                    #region 构成剖面的监测点
                                    int disastersectioncount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_section WHERE disasterid={0} AND ztm={1}", disasterString.Id, (int)MODEL.Enum.State.InUse));
                                    if (disastersectioncount > 0)
                                    {
                                        #region 构成剖面的监测点
                                        string disastersectiondata = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_section WHERE disasterid={0} AND ztm={1} ORDER BY id ASC", disasterString.Id, (int)MODEL.Enum.State.InUse));
                                        if (!string.IsNullOrEmpty(disastersectiondata))
                                        {
                                            string[] disastersectionrow = StringHelper.String2Array(disastersectiondata);
                                            for (int j = 0; j < disastersectionrow.Length; j++)
                                            {
                                                MapDisasterSection mapDisasterSection = ParseMonitorHelper.ParseMapDisasterSection(disastersectionrow[j]);
                                                if (mapDisasterSection != null)
                                                {
                                                    SectionString sectionString = ParseMonitorHelper.ParseSectionString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_section WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterSection.SectionId, userbsms, (int)MODEL.Enum.State.InUse)));
                                                    if (sectionString != null)
                                                    {
                                                        int sectionmonitorcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_section_monitor WHERE sectionid={0} AND ztm={1}", sectionString.Id, (int)MODEL.Enum.State.InUse));
                                                        if (sectionmonitorcount > 0)
                                                        {
                                                            string sectionmonitordata = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_section_monitor WHERE sectionid={0} AND ztm={1} ORDER BY id ASC", sectionString.Id, (int)MODEL.Enum.State.InUse));
                                                            if (!string.IsNullOrEmpty(sectionmonitordata))
                                                            {
                                                                string[] sectionmonitorrow = StringHelper.String2Array(sectionmonitordata);
                                                                for (int k = 0; k < sectionmonitorrow.Length; k++)
                                                                {
                                                                    MapSectiontMonitor mapSectiontMonitor = ParseMonitorHelper.ParseMapSectiontMonitor(sectionmonitorrow[k]);
                                                                    if (mapSectiontMonitor != null)
                                                                    {
                                                                        MonitorString monitorString = ParseMonitorHelper.ParseMonitorString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_monitor WHERE id={0} AND ztm={1} AND bsm{2}", mapSectiontMonitor.MonitorId, (int)MODEL.Enum.State.InUse, userbsms)));
                                                                        if (monitorString != null)
                                                                        {
                                                                            MonitorInfo monitorInfo = new MonitorInfo
                                                                            {
                                                                                DisasterString = disasterString,
                                                                                SectionString = sectionString,
                                                                                MonitorString = monitorString
                                                                            };

                                                                            monitorInfos.Add(monitorInfo);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        #endregion
                                    }
                                    #endregion
                                }
                            }
                        }
                    }
                }

                if (monitorInfos.Count > 0)
                {
                    return JsonHelper.ToJson(monitorInfos);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 添加监测点
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddMonitor()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string jcdmc = HttpContext.Current.Request.Form["jcdmc"];//监测点名称
            string jcdbh = HttpContext.Current.Request.Form["jcdbh"];//监测点编号
            string jcff = HttpContext.Current.Request.Form["jcff"];//监测方法
            string jczlx = HttpContext.Current.Request.Form["jczlx"];//监测站类型
            string pmwzx = HttpContext.Current.Request.Form["pmwzx"];//平面x坐标
            string pmwzy = HttpContext.Current.Request.Form["pmwzy"];//平面y坐标
            string srid = HttpContext.Current.Request.Form["monitorsrid"];//空间参考 如4545
            string gc = HttpContext.Current.Request.Form["gc"];//高程
            string sd = HttpContext.Current.Request.Form["sd"];//深度
            string ks = HttpContext.Current.Request.Form["ks"];//ks
            string zht = HttpContext.Current.Request.Form["zht"];//灾害体
            string jcpm = HttpContext.Current.Request.Form["jcpm"];//监测剖面
            string jcsb = HttpContext.Current.Request.Form["jcsb"];//监测设备
            string bz = HttpContext.Current.Request.Form["bz"];//备注

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                MonitorProject project = ParseMonitorHelper.ParseMonitorProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_project WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                if (project != null)
                {

                    if (!string.IsNullOrEmpty(jcdmc)
                        && !string.IsNullOrEmpty(jcdbh)
                        && !string.IsNullOrEmpty(jcff)
                        && !string.IsNullOrEmpty(pmwzx)
                        && !string.IsNullOrEmpty(pmwzy)
                        && !string.IsNullOrEmpty(gc)
                        && !string.IsNullOrEmpty(srid)
                        && !string.IsNullOrEmpty(jcsb))
                    {
                        string value = "("
                            + SQLHelper.UpdateString(jcdmc) + ","
                            + SQLHelper.UpdateString(jcdbh) + ","
                            + jcff + ","
                            + pmwzx + ","
                            + pmwzy + ","
                            + gc + ","
                            + srid + ","
                            + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                            + SQLHelper.UpdateString(project.BSM) + ","
                            + (int)MODEL.Enum.State.InUse + ","
                            + SQLHelper.UpdateString(bz) + ")";

                        int monitorid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO monitor_monitor (jcdmc,jcdbh,jcff,pmwzx,pmwzy,gc,kjck,cjsj,bsm,ztm,bz) VALUES" + value);
                        if (monitorid != -1)
                        {
                            if (!string.IsNullOrEmpty(jczlx))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_monitor SET jczlx={0} WHERE id={1} AND bsm{2} AND ztm={3}", jczlx, monitorid, userbsms, (int)MODEL.Enum.State.InUse));
                            }
                            if (!string.IsNullOrEmpty(sd))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_monitor SET sd={0} WHERE id={1} AND bsm{2} AND ztm={3}", sd, monitorid, userbsms, (int)MODEL.Enum.State.InUse));
                            }
                            if (!string.IsNullOrEmpty(ks))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_monitor SET ks={0} WHERE id={1} AND bsm{2} AND ztm={3}", ks, monitorid, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (string.IsNullOrEmpty(zht) && string.IsNullOrEmpty(jcpm))
                            {
                                int projectcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_project WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse));
                                if (projectcount == 1)
                                {
                                    PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_project_monitor (projectid,monitorid,cjsj,ztm) VALUES({0},{1},{2},{3})", id, monitorid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                }
                            }
                            else if (!string.IsNullOrEmpty(zht) && !string.IsNullOrEmpty(jcpm))
                            {
                                int sectioncount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_section WHERE id={0} AND bsm{1} AND ztm={2}", jcpm, userbsms, (int)MODEL.Enum.State.InUse));
                                if (sectioncount == 1)
                                {
                                    PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_section_monitor (sectionid,monitorid,cjsj,ztm) VALUES({0},{1},{2},{3})", jcpm, monitorid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                }
                            }
                            else
                            {
                                if (!string.IsNullOrEmpty(zht))
                                {
                                    int disastercount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", zht, userbsms, (int)MODEL.Enum.State.InUse));
                                    if (disastercount == 1)
                                    {
                                        PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_disaster_monitor (disasterid,monitorid,cjsj,ztm) VALUES({0},{1},{2},{3})", zht, monitorid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                    }
                                }
                                if (!string.IsNullOrEmpty(jcpm))
                                {
                                    int sectioncount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_section WHERE id={0} AND bsm{1} AND ztm={2}", jcpm, userbsms, (int)MODEL.Enum.State.InUse));
                                    if (sectioncount == 1)
                                    {
                                        PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_section_monitor (sectionid,monitorid,cjsj,ztm) VALUES({0},{1},{2},{3})", jcpm, monitorid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                    }
                                }
                            }

                            int devicecount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE id={0} AND ztm={1}", jcsb, (int)MODEL.Enum.State.InUse));
                            if (devicecount == 1)
                            {
                                int mapmonitordeviceid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_monitor_device (monitorid,deviceid,cjsj,ztm) VALUES({0},{1},{2},{3})", monitorid, jcsb, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_device SET bsm={0} WHERE id={1} AND ztm={2}", SQLHelper.UpdateString(project.BSM), jcsb, (int)MODEL.Enum.State.InUse));

                                if ((mapmonitordeviceid != -1) && (updatecount == 1))
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
                                return "无此设备！";
                            }
                        }
                        else
                        {
                            return "创建失败！";
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
                return "无权限！";
            }
        }

        /// <summary>
        /// 更新监测点
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateMonitor()
        {
            return string.Empty;
        }

        /// <summary>
        /// 删除监测点
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteMonitor()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_monitor WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse));
                if (count > 0)
                {
                    count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_monitor SET ztm={0} WHERE id={1} AND bsm{2} AND ztm={3}", (int)MODEL.Enum.State.NoUse, id, userbsms, (int)MODEL.Enum.State.InUse));

                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_project_monitor SET ztm={0} WHERE monitorid={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, id, (int)MODEL.Enum.State.InUse));
                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_disaster_monitor SET ztm={0} WHERE monitorid={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, id, (int)MODEL.Enum.State.InUse));
                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_section_monitor SET ztm={0} WHERE monitorid={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, id, (int)MODEL.Enum.State.InUse));
                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_monitor_device SET ztm={0} WHERE monitorid={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, id, (int)MODEL.Enum.State.InUse));

                    if (count > 0)
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
                    return "无此监测点！";
                }
            }
            else
            {
                return "无此权限！";
            }
        }



    }
}

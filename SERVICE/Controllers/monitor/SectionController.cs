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
    /// 监测剖面
    /// </summary>
    public class SectionController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(SectionController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 获取监测剖面信息
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetSection(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                List<SectionString> sectionStrings = new List<SectionString>();

                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_project_disaster WHERE projectid={0} AND ztm={1} ORDER BY id ASC", id, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(data))
                {
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        MapProjectDisaster mapProjectDisaster = ParseMonitorHelper.ParseMapProjectDisaster(rows[i]);
                        if (mapProjectDisaster != null)
                        {
                            Disaster disaster = ParseMonitorHelper.ParseDisaster(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", mapProjectDisaster.DisasterId, userbsms, (int)MODEL.Enum.State.InUse)));
                            if (disaster != null)
                            {
                                string data1 = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_section WHERE disasterid={0} AND ztm={1} ORDER BY id ASC", disaster.Id, (int)MODEL.Enum.State.InUse));
                                if (!string.IsNullOrEmpty(data1))
                                {
                                    string[] rows1 = data1.Split(new char[] { COM.ConstHelper.rowSplit });
                                    for (int j = 0; j < rows1.Length; j++)
                                    {
                                        MapDisasterSection mapDisasterSection = ParseMonitorHelper.ParseMapDisasterSection(rows1[j]);
                                        if (mapDisasterSection != null)
                                        {
                                            SectionString sectionString = ParseMonitorHelper.ParseSectionString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_section WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterSection.SectionId, userbsms, (int)MODEL.Enum.State.InUse)));
                                            if (sectionString != null)
                                            {
                                                sectionStrings.Add(sectionString);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (sectionStrings.Count > 0)
                {
                    return JsonHelper.ToJson(sectionStrings);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 新建监测剖面
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddSection()
        {
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string pmmc = HttpContext.Current.Request.Form["pmmc"];
            string pmbh = HttpContext.Current.Request.Form["pmbh"];
            string pmlx = HttpContext.Current.Request.Form["pmlx"];
            string pmdj = HttpContext.Current.Request.Form["pmdj"];
            string pmzhtid = HttpContext.Current.Request.Form["pmzht"];
            string bz = HttpContext.Current.Request.Form["bz"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", pmzhtid, userbsms, (int)MODEL.Enum.State.InUse));
                if (count == 1)
                {
                    Disaster disaster = ParseMonitorHelper.ParseDisaster(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", pmzhtid, userbsms, (int)MODEL.Enum.State.InUse)));

                    if (!string.IsNullOrEmpty(pmmc) && !string.IsNullOrEmpty(pmbh))
                    {
                        string value = "("
                        + SQLHelper.UpdateString(pmmc) + ","
                        + SQLHelper.UpdateString(pmbh) + ","
                        + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                        + SQLHelper.UpdateString(disaster.BSM) + ","
                        + (int)MODEL.Enum.State.InUse + ","
                        + SQLHelper.UpdateString(bz) + ")";

                        int sectionid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO monitor_section (pmmc,pmbh,cjsj,bsm,ztm,bz) VALUES" + value);
                        if (sectionid != -1)
                        {
                            if (!string.IsNullOrEmpty(pmlx))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_section SET pmlx={0} WHERE id={1} AND bsm{2} AND ztm={3}", pmlx, sectionid, userbsms, (int)MODEL.Enum.State.InUse));
                            }
                            if (!string.IsNullOrEmpty(pmdj))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_section SET pmdj={0} WHERE id={1} AND bsm{2} AND ztm={3}", pmdj, sectionid, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            int mapdisastersectionid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_disaster_section (disasterid,sectionid,cjsj,ztm) VALUES({0},{1},{2},{3})", pmzhtid, sectionid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                            if (mapdisastersectionid != -1)
                            {
                                return "创建成功！";
                            }
                            else
                            {
                                return "创建映射失败！";
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
                    return "无此灾害体！";
                }
            }
            else
            {
                return "无权限！";
            }
        }

        /// <summary>
        /// 更新监测剖面(TODO)
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateSction()
        {
            //TODO
            return string.Empty;
        }

        /// <summary>
        /// 删除监测剖面
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteSction()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_section WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse));
                if (count > 0)
                {
                    count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_section SET ztm={0} WHERE id={1} AND bsm{2} AND ztm={3}", (int)MODEL.Enum.State.NoUse, id, userbsms, (int)MODEL.Enum.State.InUse));

                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_disaster_section SET ztm={0} WHERE sectionid={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, id, (int)MODEL.Enum.State.InUse));
                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_section_monitor SET ztm={0} WHERE sectionid={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, id, (int)MODEL.Enum.State.InUse));

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
                    return "无此监测剖面！";
                }
            }
            else
            {
                return "无此权限！";
            }
        }

    }
}

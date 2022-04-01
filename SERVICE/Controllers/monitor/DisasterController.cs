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
    /// 灾害体
    /// </summary>
    public class DisasterController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(DisasterController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取灾害体
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetDisaster(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int disastercount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_project_disaster WHERE projectid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (disastercount != 0)
                {
                    List<DisasterString> disasterStrings = new List<DisasterString>();
                    string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_project_disaster WHERE projectid={0} AND ztm={1} ORDER BY id ASC", id, (int)MODEL.Enum.State.InUse));
                    string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                    for (int i = 0; i < rows.Length; i++)
                    {
                        MapProjectDisaster mapProjectDisaster = ParseMonitorHelper.ParseMapProjectDisaster(rows[i]);
                        DisasterString disasterString = ParseMonitorHelper.ParseDisasterString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND ztm={1} AND bsm{2}", mapProjectDisaster.DisasterId, (int)MODEL.Enum.State.InUse, userbsms)));
                        if (disasterString != null)
                        {
                            disasterStrings.Add(disasterString);
                        }
                    }

                    if (disasterStrings.Count != 0)
                    {
                        return JsonHelper.ToJson(disasterStrings);
                    }
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 获取灾害体属性
        /// </summary>
        /// <param name="id">灾害体ID</param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetDisasterProperty(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                DisasterProperty disasterProperty = new DisasterProperty();

                int disastercount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse));
                if (disastercount == 1)
                {
                    Disaster disaster = ParseMonitorHelper.ParseDisaster(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse)));
                    if (disaster != null)
                    {
                        if (disaster.ZHTLX == (int)MODEL.EnumMonitor.GeodisasterType.Rockfall)
                        {
                            #region 崩塌（危岩）

                            #region 灾害体属性
                            int mappropertycount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_property WHERE disasterid={0} AND type={1} AND ztm={2}", id, disaster.ZHTLX, (int)MODEL.Enum.State.InUse));
                            if (mappropertycount == 1)
                            {
                                MapDisasterProperty mapDisasterProperty = ParseMonitorHelper.ParseMapDisasterProperty(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_property WHERE disasterid={0} AND type={1} AND ztm={2}", id, disaster.ZHTLX, (int)MODEL.Enum.State.InUse)));
                                if (mapDisasterProperty != null)
                                {
                                    RockfallPropertyString rockfallPropertyString = ParseMonitorHelper.ParseRockfallPropertyString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_property_rockfall WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse)));
                                    if (rockfallPropertyString != null)
                                    {
                                        disasterProperty.RockfallProperty = rockfallPropertyString;
                                    }
                                }
                            }
                            #endregion

                            #region 灾害体预警模型参数
                            int mapwarningcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_warning WHERE disasterid={0} AND type={1} AND ztm={2}", id, disaster.ZHTLX, (int)MODEL.Enum.State.InUse));
                            if (mapwarningcount == 1)
                            {
                                MapDisasterWarning mapDisasterWarning = ParseMonitorHelper.ParseMapDisasterWarning(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_warning WHERE disasterid={0} AND type={1} AND ztm={2}", id, disaster.ZHTLX, (int)MODEL.Enum.State.InUse)));
                                if (mapDisasterWarning != null)
                                {
                                    RockfallWarningString rockfallWarningString = ParseMonitorHelper.ParseRockfallWarningString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_warning_rockfall WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterWarning.WarningId, userbsms, (int)MODEL.Enum.State.InUse)));
                                    if (rockfallWarningString != null)
                                    {
                                        disasterProperty.RockfallWarning = rockfallWarningString;
                                    }
                                }
                            }
                            #endregion

                            if ((disasterProperty.RockfallProperty != null) || (disasterProperty.RockfallWarning != null))
                            {
                                return JsonHelper.ToJson(disasterProperty);
                            }
                            #endregion
                        }
                        else if (disaster.ZHTLX == (int)MODEL.EnumMonitor.GeodisasterType.Landslide)
                        {
                            #region 滑坡
                            #endregion
                        }
                        else if (disaster.ZHTLX == (int)MODEL.EnumMonitor.GeodisasterType.Debrisflow)
                        {
                            #region 泥石流
                            #endregion
                        }
                        else if (disaster.ZHTLX == (int)MODEL.EnumMonitor.GeodisasterType.GroundCollapse)
                        {
                            #region 地面塌陷
                            #endregion
                        }
                        else if (disaster.ZHTLX == (int)MODEL.EnumMonitor.GeodisasterType.Groundfissure)
                        {
                            #region 地裂缝
                            #endregion
                        }
                        else if (disaster.ZHTLX == (int)MODEL.EnumMonitor.GeodisasterType.Groundsubsidence)
                        {
                            #region 地面沉降
                            #endregion
                        }

                    }
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 新建灾害体
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddDisaster()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string zhtmc = HttpContext.Current.Request.Form["zhtmc"];
            string zhtbh = HttpContext.Current.Request.Form["zhtbh"];
            string zhtlx = HttpContext.Current.Request.Form["zhtlx"];
            string zxjd = HttpContext.Current.Request.Form["zxjd"];
            string zxwd = HttpContext.Current.Request.Form["zxwd"];
            string bz = HttpContext.Current.Request.Form["bz"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                MonitorProject project = ParseMonitorHelper.ParseMonitorProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_project WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse)));
                if (project != null)
                {
                    if (!string.IsNullOrEmpty(id) && !string.IsNullOrEmpty(zhtmc) && !string.IsNullOrEmpty(zhtbh) && !string.IsNullOrEmpty(zhtlx) && !string.IsNullOrEmpty(zxjd) && !string.IsNullOrEmpty(zxwd))
                    {
                        string value = "("
                            + SQLHelper.UpdateString(zhtmc) + ","
                            + SQLHelper.UpdateString(zhtbh) + ","
                            + zhtlx + ","
                            + zxjd + ","
                            + zxwd + ","
                            + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                            + SQLHelper.UpdateString(project.BSM) + ","
                            + (int)MODEL.Enum.State.InUse + ","
                            + SQLHelper.UpdateString(bz) + ")";

                        int disasterid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO monitor_disaster (zhtmc,zhtbh,zhtlx,zxjd,zxwd,cjsj,bsm,ztm,bz) VALUES" + value);
                        if (disasterid != -1)
                        {
                            int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_project_disaster (projectid,disasterid,CJSJ,ZTM) VALUES({0},{1},{2},{3})", id, disasterid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                            if (mapid != -1)
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
                            return "创建失败！";
                        }
                    }
                    else
                    {
                        return "必填参数不全！";
                    }
                }
                else
                {
                    return "项目不存在！";
                }
            }
            else
            {
                return "无权限！";
            }
        }

        /// <summary>
        /// 更新灾害体信息
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateDisaster()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string zhtmc = HttpContext.Current.Request.Form["zhtmc"];
            string zhtbh = HttpContext.Current.Request.Form["zhtbh"];
            string zxjd = HttpContext.Current.Request.Form["zxjd"];
            string zxwd = HttpContext.Current.Request.Form["zxwd"];
            string bz = HttpContext.Current.Request.Form["bz"];


            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (!string.IsNullOrEmpty(zhtbh))
                {
                    int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse));
                    if (count == 1)
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_disaster SET zhtmc={0},zhtbh={1},bz={2} WHERE id={3} AND bsm{4} AND ztm={5}", SQLHelper.UpdateString(zhtmc), SQLHelper.UpdateString(zhtbh), SQLHelper.UpdateString(bz), id, userbsms, (int)MODEL.Enum.State.InUse));
                        if (!string.IsNullOrEmpty(zxjd))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_disaster SET zxjd={0} WHERE id={1} AND bsm{2} AND ztm={3}", zxjd, id, userbsms, (int)MODEL.Enum.State.InUse));
                        }

                        if (!string.IsNullOrEmpty(zxwd))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_disaster SET zxwd={0} WHERE id={1} AND bsm{2} AND ztm={3}", zxwd, id, userbsms, (int)MODEL.Enum.State.InUse));
                        }

                        if (updatecount == 1)
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
                        return "无此灾害体！";
                    }
                }
                else
                {
                    return "必填参数不全！";
                }
            }
            else
            {
                return "无权限！";
            }
        }

        /// <summary>
        /// 更新灾害体属性
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateDisasterProperty()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];
            string type = HttpContext.Current.Request.Form["type"];
            string item = HttpContext.Current.Request.Form["item"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int disastercount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse));
                if (disastercount == 1)
                {
                    Disaster disaster = ParseMonitorHelper.ParseDisaster(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse)));
                    if (disaster != null)
                    {
                        if (type == MODEL.EnumMonitor.GeodisasterType.Rockfall.GetRemark())
                        {
                            int mapcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_property WHERE disasterid={0} AND type={1} AND ztm={2}", id, (int)MODEL.EnumMonitor.GeodisasterType.Rockfall, (int)MODEL.Enum.State.InUse));
                            if (mapcount == 1)
                            {
                                MapDisasterProperty mapDisasterProperty = ParseMonitorHelper.ParseMapDisasterProperty(PostgresqlHelper.QueryData(pgsqlConnection, string.Format(string.Format("SELECT *FROM monitor_map_disaster_property WHERE disasterid={0} AND type={1} AND ztm={2}", id, (int)MODEL.EnumMonitor.GeodisasterType.Rockfall, (int)MODEL.Enum.State.InUse))));
                                if (mapDisasterProperty != null)
                                {
                                    int propertycount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_property_rockfall WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                    if (propertycount == 1)
                                    {
                                        if (item == "0")
                                        {
                                            #region 属性
                                            string ydxs = HttpContext.Current.Request.Form["ydxs"];
                                            string btlx = HttpContext.Current.Request.Form["btlx"];
                                            string kzjgmlx = HttpContext.Current.Request.Form["kzjgmlx"];
                                            string qtkzjgmlx = HttpContext.Current.Request.Form["qtkzjgmlx"];
                                            string hgwdxpj = HttpContext.Current.Request.Form["hgwdxpj"];
                                            string hdzt = HttpContext.Current.Request.Form["hdzt"];
                                            string btykzfs = HttpContext.Current.Request.Form["btykzfs"];
                                            string btsj = HttpContext.Current.Request.Form["btsj"];
                                            string zbfx = HttpContext.Current.Request.Form["zbfx"];
                                            string btygc = HttpContext.Current.Request.Form["btygc"];
                                            string zdlc = HttpContext.Current.Request.Form["zdlc"];
                                            string zdspwy = HttpContext.Current.Request.Form["zdspwy"];
                                            string btykd = HttpContext.Current.Request.Form["btykd"];
                                            string btyhd = HttpContext.Current.Request.Form["btyhd"];
                                            string btymj = HttpContext.Current.Request.Form["btymj"];
                                            string btytj = HttpContext.Current.Request.Form["btytj"];
                                            string yfys = HttpContext.Current.Request.Form["yfys"];
                                            string qtyfys = HttpContext.Current.Request.Form["qtyfys"];
                                            string djtpjhd = HttpContext.Current.Request.Form["djtpjhd"];
                                            string djtmj = HttpContext.Current.Request.Form["djtmj"];
                                            string djttj = HttpContext.Current.Request.Form["djttj"];
                                            string gmdj = HttpContext.Current.Request.Form["gmdj"];
                                            string stgh = HttpContext.Current.Request.Form["stgh"];
                                            string qdxcd = HttpContext.Current.Request.Form["qdxcd"];
                                            string zqdj = HttpContext.Current.Request.Form["zqdj"];
                                            string xqdj = HttpContext.Current.Request.Form["xqdj"];
                                            string swrs = HttpContext.Current.Request.Form["swrs"];
                                            string wxrs = HttpContext.Current.Request.Form["wxrs"];
                                            string zjss = HttpContext.Current.Request.Form["zjss"];
                                            string wxcc = HttpContext.Current.Request.Form["wxcc"];
                                            string wxdx = HttpContext.Current.Request.Form["wxdx"];
                                            string qtwxdx = HttpContext.Current.Request.Form["qtwxdx"];


                                            int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET qtkzjgmlx={0},btsj={1},yfys={2},qtyfys={3},wxdx={4},qtwxdx={5} WHERE id={6} AND bsm{7} AND ztm={8}",
                                               SQLHelper.UpdateString(qtkzjgmlx),
                                               SQLHelper.UpdateString(btsj),
                                               SQLHelper.UpdateString(yfys),
                                               SQLHelper.UpdateString(qtyfys),
                                               SQLHelper.UpdateString(wxdx),
                                               SQLHelper.UpdateString(qtwxdx),
                                                mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));

                                            if (updatecount == 1)
                                            {
                                                if (!string.IsNullOrEmpty(ydxs))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET ydxs={0} WHERE id={1} AND bsm{2} AND ztm={3}", ydxs, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET ydxs=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(btlx))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btlx={0} WHERE id={1} AND bsm{2} AND ztm={3}", btlx, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btlx=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(kzjgmlx))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET kzjgmlx={0} WHERE id={1} AND bsm{2} AND ztm={3}", kzjgmlx, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET kzjgmlx=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(hgwdxpj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET hgwdxpj={0} WHERE id={1} AND bsm{2} AND ztm={3}", hgwdxpj, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET hgwdxpj=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(hdzt))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET hdzt={0} WHERE id={1} AND bsm{2} AND ztm={3}", hdzt, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET hdzt=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(btykzfs))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btykzfs={0} WHERE id={1} AND bsm{2} AND ztm={3}", btykzfs, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btykzfs=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(zbfx))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zbfx={0} WHERE id={1} AND bsm{2} AND ztm={3}", zbfx, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zbfx=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(btygc))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btygc={0} WHERE id={1} AND bsm{2} AND ztm={3}", btygc, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btygc=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(zdlc))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zdlc={0} WHERE id={1} AND bsm{2} AND ztm={3}", zdlc, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zdlc=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(zdspwy))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zdspwy={0} WHERE id={1} AND bsm{2} AND ztm={3}", zdspwy, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zdspwy=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(btykd))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btykd={0} WHERE id={1} AND bsm{2} AND ztm={3}", btykd, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btykd=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(btyhd))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btyhd={0} WHERE id={1} AND bsm{2} AND ztm={3}", btyhd, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btyhd=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(btymj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btymj={0} WHERE id={1} AND bsm{2} AND ztm={3}", btymj, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btymj=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(btytj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btytj={0} WHERE id={1} AND bsm{2} AND ztm={3}", btytj, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btytj=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(djtpjhd))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET djtpjhd={0} WHERE id={1} AND bsm{2} AND ztm={3}", djtpjhd, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET djtpjhd=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(djtmj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET djtmj={0} WHERE id={1} AND bsm{2} AND ztm={3}", djtmj, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET djtmj=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(djttj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET djttj={0} WHERE id={1} AND bsm{2} AND ztm={3}", djttj, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET djttj=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(gmdj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET gmdj={0} WHERE id={1} AND bsm{2} AND ztm={3}", gmdj, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET gmdj=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(stgh))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET stgh={0} WHERE id={1} AND bsm{2} AND ztm={3}", stgh, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET stgh=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(qdxcd))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET qdxcd={0} WHERE id={1} AND bsm{2} AND ztm={3}", qdxcd, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET qdxcd=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(zqdj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zqdj={0} WHERE id={1} AND bsm{2} AND ztm={3}", zqdj, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zqdj=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(xqdj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET xqdj={0} WHERE id={1} AND bsm{2} AND ztm={3}", xqdj, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET xqdj=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(swrs))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET swrs={0} WHERE id={1} AND bsm{2} AND ztm={3}", swrs, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET swrs=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(wxrs))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET wxrs={0} WHERE id={1} AND bsm{2} AND ztm={3}", wxrs, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET wxrs=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(zjss))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zjss={0} WHERE id={1} AND bsm{2} AND ztm={3}", zjss, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zjss=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(wxcc))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET wxcc={0} WHERE id={1} AND bsm{2} AND ztm={3}", wxcc, mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET wxcc=null WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                                }

                                                return "更新灾害体（环境）成功！";
                                            }
                                            else
                                            {
                                                return "更新灾害体（环境）失败！";
                                            }
                                            #endregion
                                        }
                                        else if (item == "1")
                                        {
                                            #region 环境
                                            string dxdm = HttpContext.Current.Request.Form["dxdm"];
                                            string dcyxyxzh = HttpContext.Current.Request.Form["dcyxyxzh"];
                                            string xpjgdzgz = HttpContext.Current.Request.Form["xpjgdzgz"];
                                            string swdztj = HttpContext.Current.Request.Form["swdztj"];
                                            string zbtdly = HttpContext.Current.Request.Form["zbtdly"];
                                            string rlgchd = HttpContext.Current.Request.Form["rlgchd"];
                                            int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET dxdm={0},dcyxyxzh={1},xpjgdzgz={2},swdztj={3},zbtdly={4},rlgchd={5} WHERE id={6} AND bsm{7} AND ztm={8}", SQLHelper.UpdateString(dxdm), SQLHelper.UpdateString(dcyxyxzh), SQLHelper.UpdateString(xpjgdzgz), SQLHelper.UpdateString(swdztj), SQLHelper.UpdateString(zbtdly), SQLHelper.UpdateString(rlgchd), mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                            if (updatecount == 1)
                                            {
                                                return "更新灾害体（环境）成功！";
                                            }
                                            else
                                            {
                                                return "更新灾害体（环境）失败！";
                                            }
                                            #endregion
                                        }
                                        else if (item == "2")
                                        {
                                            #region 基本特征
                                            string btyq = HttpContext.Current.Request.Form["btyq"];
                                            string btdjt = HttpContext.Current.Request.Form["btdjt"];
                                            string btljq = HttpContext.Current.Request.Form["btljq"];
                                            int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btyq={0},btdjt={1},btljq={2} WHERE id={3} AND bsm{4} AND ztm={5}", SQLHelper.UpdateString(btyq), SQLHelper.UpdateString(btdjt), SQLHelper.UpdateString(btljq), mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                            if (updatecount == 1)
                                            {
                                                return "更新灾害体（基本特征）成功！";
                                            }
                                            else
                                            {
                                                return "更新灾害体（基本特征）失败！";
                                            }
                                            #endregion
                                        }
                                        else if (item == "3")
                                        {
                                            #region 危险性分析
                                            string wxxfx = HttpContext.Current.Request.Form["wxxfx"];
                                            int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET wxxfx={0} WHERE id={1} AND bsm{2} AND ztm={3}", SQLHelper.UpdateString(wxxfx), mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                            if (updatecount == 1)
                                            {
                                                return "更新灾害体（危险性分析）成功！";
                                            }
                                            else
                                            {
                                                return "更新灾害体（危险性分析）失败！";
                                            }
                                            #endregion
                                        }
                                        else if (item == "4")
                                        {
                                            #region 危害分析
                                            string whfx = HttpContext.Current.Request.Form["whfx"];
                                            int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET whfx={0} WHERE id={1} AND bsm{2} AND ztm={3}", SQLHelper.UpdateString(whfx), mapDisasterProperty.PropertyId, userbsms, (int)MODEL.Enum.State.InUse));
                                            if (updatecount == 1)
                                            {
                                                return "更新灾害体（危害分析）成功！";
                                            }
                                            else
                                            {
                                                return "更新灾害体（危害分析）失败！";
                                            }
                                            #endregion
                                        }
                                        else
                                        {
                                            return "未指定属性项类型！";
                                        }
                                    }
                                    else
                                    {
                                        return "无此灾害体属性信息！";
                                    }
                                }
                            }
                            else
                            {
                                string value = "("
                                + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                                + SQLHelper.UpdateString(disaster.BSM) + ","
                                + (int)MODEL.Enum.State.InUse + ")";
                                int propertyid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO monitor_property_rockfall (cjsj,bsm,ztm) VALUES" + value);
                                if (propertyid != -1)
                                {
                                    int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_disaster_property (disasterid,propertyid,type,cjsj,ztm) VALUES({0},{1},{2},{3},{4})", id, propertyid, (int)MODEL.EnumMonitor.GeodisasterType.Rockfall, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                    if (mapid != -1)
                                    {
                                        if (item == "0")
                                        {
                                            #region 属性
                                            string ydxs = HttpContext.Current.Request.Form["ydxs"];
                                            string btlx = HttpContext.Current.Request.Form["btlx"];
                                            string kzjgmlx = HttpContext.Current.Request.Form["kzjgmlx"];
                                            string qtkzjgmlx = HttpContext.Current.Request.Form["qtkzjgmlx"];
                                            string hgwdxpj = HttpContext.Current.Request.Form["hgwdxpj"];
                                            string hdzt = HttpContext.Current.Request.Form["hdzt"];
                                            string btykzfs = HttpContext.Current.Request.Form["btykzfs"];
                                            string btsj = HttpContext.Current.Request.Form["btsj"];
                                            string zbfx = HttpContext.Current.Request.Form["zbfx"];
                                            string btygc = HttpContext.Current.Request.Form["btygc"];
                                            string zdlc = HttpContext.Current.Request.Form["zdlc"];
                                            string zdspwy = HttpContext.Current.Request.Form["zdspwy"];
                                            string btykd = HttpContext.Current.Request.Form["btykd"];
                                            string btyhd = HttpContext.Current.Request.Form["btyhd"];
                                            string btymj = HttpContext.Current.Request.Form["btymj"];
                                            string btytj = HttpContext.Current.Request.Form["btytj"];
                                            string yfys = HttpContext.Current.Request.Form["yfys"];
                                            string qtyfys = HttpContext.Current.Request.Form["qtyfys"];
                                            string djtpjhd = HttpContext.Current.Request.Form["djtpjhd"];
                                            string djtmj = HttpContext.Current.Request.Form["djtmj"];
                                            string djttj = HttpContext.Current.Request.Form["djttj"];
                                            string gmdj = HttpContext.Current.Request.Form["gmdj"];
                                            string stgh = HttpContext.Current.Request.Form["stgh"];
                                            string qdxcd = HttpContext.Current.Request.Form["qdxcd"];
                                            string zqdj = HttpContext.Current.Request.Form["zqdj"];
                                            string xqdj = HttpContext.Current.Request.Form["xqdj"];
                                            string swrs = HttpContext.Current.Request.Form["swrs"];
                                            string wxrs = HttpContext.Current.Request.Form["wxrs"];
                                            string zjss = HttpContext.Current.Request.Form["zjss"];
                                            string wxcc = HttpContext.Current.Request.Form["wxcc"];
                                            string wxdx = HttpContext.Current.Request.Form["wxdx"];
                                            string qtwxdx = HttpContext.Current.Request.Form["qtwxdx"];


                                            int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET qtkzjgmlx={0},btsj={1},yfys={2},qtyfys={3},wxdx={4},qtwxdx={5} WHERE id={6} AND bsm{7} AND ztm={8}",
                                               SQLHelper.UpdateString(qtkzjgmlx),
                                               SQLHelper.UpdateString(btsj),
                                               SQLHelper.UpdateString(yfys),
                                               SQLHelper.UpdateString(qtyfys),
                                               SQLHelper.UpdateString(wxdx),
                                               SQLHelper.UpdateString(qtwxdx),
                                                propertyid, userbsms, (int)MODEL.Enum.State.InUse));

                                            if (updatecount == 1)
                                            {
                                                if (!string.IsNullOrEmpty(ydxs))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET ydxs={0} WHERE id={1} AND bsm{2} AND ztm={3}", ydxs, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET ydxs=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(btlx))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btlx={0} WHERE id={1} AND bsm{2} AND ztm={3}", btlx, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btlx=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(kzjgmlx))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET kzjgmlx={0} WHERE id={1} AND bsm{2} AND ztm={3}", kzjgmlx, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET kzjgmlx=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(hgwdxpj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET hgwdxpj={0} WHERE id={1} AND bsm{2} AND ztm={3}", hgwdxpj, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET hgwdxpj=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(hdzt))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET hdzt={0} WHERE id={1} AND bsm{2} AND ztm={3}", hdzt, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET hdzt=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(btykzfs))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btykzfs={0} WHERE id={1} AND bsm{2} AND ztm={3}", btykzfs, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btykzfs=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(zbfx))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zbfx={0} WHERE id={1} AND bsm{2} AND ztm={3}", zbfx, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zbfx=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(btygc))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btygc={0} WHERE id={1} AND bsm{2} AND ztm={3}", btygc, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btygc=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(zdlc))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zdlc={0} WHERE id={1} AND bsm{2} AND ztm={3}", zdlc, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zdlc=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(zdspwy))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zdspwy={0} WHERE id={1} AND bsm{2} AND ztm={3}", zdspwy, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zdspwy=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(btykd))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btykd={0} WHERE id={1} AND bsm{2} AND ztm={3}", btykd, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btykd=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(btyhd))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btyhd={0} WHERE id={1} AND bsm{2} AND ztm={3}", btyhd, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btyhd=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(btymj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btymj={0} WHERE id={1} AND bsm{2} AND ztm={3}", btymj, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btymj=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(btytj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btytj={0} WHERE id={1} AND bsm{2} AND ztm={3}", btytj, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btytj=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(djtpjhd))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET djtpjhd={0} WHERE id={1} AND bsm{2} AND ztm={3}", djtpjhd, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET djtpjhd=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(djtmj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET djtmj={0} WHERE id={1} AND bsm{2} AND ztm={3}", djtmj, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET djtmj=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(djttj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET djttj={0} WHERE id={1} AND bsm{2} AND ztm={3}", djttj, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET djttj=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(gmdj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET gmdj={0} WHERE id={1} AND bsm{2} AND ztm={3}", gmdj, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET gmdj=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(stgh))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET stgh={0} WHERE id={1} AND bsm{2} AND ztm={3}", stgh, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET stgh=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(qdxcd))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET qdxcd={0} WHERE id={1} AND bsm{2} AND ztm={3}", qdxcd, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET qdxcd=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(zqdj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zqdj={0} WHERE id={1} AND bsm{2} AND ztm={3}", zqdj, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zqdj=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(xqdj))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET xqdj={0} WHERE id={1} AND bsm{2} AND ztm={3}", xqdj, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET xqdj=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(swrs))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET swrs={0} WHERE id={1} AND bsm{2} AND ztm={3}", swrs, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET swrs=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(wxrs))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET wxrs={0} WHERE id={1} AND bsm{2} AND ztm={3}", wxrs, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET wxrs=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(zjss))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zjss={0} WHERE id={1} AND bsm{2} AND ztm={3}", zjss, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET zjss=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                if (!string.IsNullOrEmpty(wxcc))
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET wxcc={0} WHERE id={1} AND bsm{2} AND ztm={3}", wxcc, propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }
                                                else
                                                {
                                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET wxcc=null WHERE id={0} AND bsm{1} AND ztm={2}", propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                                }


                                                return "创建灾害体（环境）成功！";
                                            }
                                            else
                                            {
                                                return "创建灾害体（环境）失败！";
                                            }
                                            #endregion
                                        }
                                        else if (item == "1")
                                        {
                                            #region 环境
                                            string dxdm = HttpContext.Current.Request.Form["dxdm"];
                                            string dcyxyxzh = HttpContext.Current.Request.Form["dcyxyxzh"];
                                            string xpjgdzgz = HttpContext.Current.Request.Form["xpjgdzgz"];
                                            string swdztj = HttpContext.Current.Request.Form["swdztj"];
                                            string zbtdly = HttpContext.Current.Request.Form["zbtdly"];
                                            string rlgchd = HttpContext.Current.Request.Form["rlgchd"];
                                            int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET dxdm={0},dcyxyxzh={1},xpjgdzgz={2},swdztj={3},zbtdly={4},rlgchd={5} WHERE id={6} AND bsm{7} AND ztm={8}", SQLHelper.UpdateString(dxdm), SQLHelper.UpdateString(dcyxyxzh), SQLHelper.UpdateString(xpjgdzgz), SQLHelper.UpdateString(swdztj), SQLHelper.UpdateString(zbtdly), SQLHelper.UpdateString(rlgchd), propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                            if (updatecount == 1)
                                            {
                                                return "创建灾害体（环境）成功！";
                                            }
                                            else
                                            {
                                                return "创建灾害体（环境）失败！";
                                            }
                                            #endregion
                                        }
                                        else if (item == "2")
                                        {
                                            #region 基本特征
                                            string btyq = HttpContext.Current.Request.Form["btyq"];
                                            string btdjt = HttpContext.Current.Request.Form["btdjt"];
                                            string btljq = HttpContext.Current.Request.Form["btljq"];
                                            int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET btyq={0},btdjt={1},btljq={2} WHERE id={3} AND bsm{4} AND ztm={5}", SQLHelper.UpdateString(btyq), SQLHelper.UpdateString(btdjt), SQLHelper.UpdateString(btljq), propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                            if (updatecount == 1)
                                            {
                                                return "创建灾害体（基本特征）成功！";
                                            }
                                            else
                                            {
                                                return "创建灾害体（基本特征）失败！";
                                            }
                                            #endregion
                                        }
                                        else if (item == "3")
                                        {
                                            #region 危险性分析
                                            string wxxfx = HttpContext.Current.Request.Form["wxxfx"];
                                            int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET wxxfx={0} WHERE id={1} AND bsm{2} AND ztm={3}", SQLHelper.UpdateString(wxxfx), propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                            if (updatecount == 1)
                                            {
                                                return "创建灾害体（危险性分析）成功！";
                                            }
                                            else
                                            {
                                                return "创建灾害体（危险性分析）失败！";
                                            }
                                            #endregion
                                        }
                                        else if (item == "4")
                                        {
                                            #region 危害分析
                                            string whfx = HttpContext.Current.Request.Form["whfx"];
                                            int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_property_rockfall SET whfx={0} WHERE id={1} AND bsm{2} AND ztm={3}", SQLHelper.UpdateString(whfx), propertyid, userbsms, (int)MODEL.Enum.State.InUse));
                                            if (updatecount == 1)
                                            {
                                                return "创建灾害体（危害分析）成功！";
                                            }
                                            else
                                            {
                                                return "创建灾害体（危害分析）失败！";
                                            }
                                            #endregion
                                        }
                                        else
                                        {
                                            return "未指定属性项类型！";
                                        }
                                    }
                                    else
                                    {
                                        return "创建灾害体属性映射失败！";
                                    }
                                }
                                else
                                {
                                    return "创建灾害体属性失败！";
                                }
                            }
                        }
                        else if (type == MODEL.EnumMonitor.GeodisasterType.Landslide.GetRemark())
                        { }
                        else if (type == MODEL.EnumMonitor.GeodisasterType.Debrisflow.GetRemark())
                        { }
                        else if (type == MODEL.EnumMonitor.GeodisasterType.GroundCollapse.GetRemark())
                        { }
                        else if (type == MODEL.EnumMonitor.GeodisasterType.Groundfissure.GetRemark())
                        { }
                        else if (type == MODEL.EnumMonitor.GeodisasterType.Groundsubsidence.GetRemark())
                        { }
                        else
                        {
                            return "无此灾害体类型！";
                        }
                    }
                    else
                    {
                        return "无此灾害体类型！";
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

            return string.Empty;
        }

        /// <summary>
        /// 更新灾害体预警模型参数
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateDisasterWarning()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];
            string type = HttpContext.Current.Request.Form["type"];

            string CType1 = HttpContext.Current.Request.Form["CType1"];
            string CType2 = HttpContext.Current.Request.Form["CType2"];
            string Alt_up = HttpContext.Current.Request.Form["Alt_up"];
            string Alt_down = HttpContext.Current.Request.Form["Alt_down"];
            string Rock_vol = HttpContext.Current.Request.Form["Rock_vol"];
            string Frame_H = HttpContext.Current.Request.Form["Frame_H"];
            string Frame_W = HttpContext.Current.Request.Form["Frame_W"];
            string Frame_Th = HttpContext.Current.Request.Form["Frame_Th"];
            string Rock_char = HttpContext.Current.Request.Form["Rock_char"];
            string Coll_Dir = HttpContext.Current.Request.Form["Coll_Dir"];
            string OcofRS = HttpContext.Current.Request.Form["OcofRS"];
            string UW = HttpContext.Current.Request.Form["UW"];
            string SA = HttpContext.Current.Request.Form["SA"];
            string OW = HttpContext.Current.Request.Form["OW"];
            string IASS = HttpContext.Current.Request.Form["IASS"];
            string LSS = HttpContext.Current.Request.Form["LSS"];
            string FASS = HttpContext.Current.Request.Form["FASS"];
            string CSS = HttpContext.Current.Request.Form["CSS"];
            string PRR = HttpContext.Current.Request.Form["PRR"];
            string EMR = HttpContext.Current.Request.Form["EMR"];
            string IAPC = HttpContext.Current.Request.Form["IAPC"];
            string SCP_Mk = HttpContext.Current.Request.Form["SCP_Mk"];
            string VDPC = HttpContext.Current.Request.Form["VDPC"];
            string MRC = HttpContext.Current.Request.Form["MRC"];
            string SCP_C = HttpContext.Current.Request.Form["SCP_C"];
            string SCP_FA = HttpContext.Current.Request.Form["SCP_FA"];
            string FLk = HttpContext.Current.Request.Form["FLk"];
            string SCP_DS = HttpContext.Current.Request.Form["SCP_DS"];
            string HDPC = HttpContext.Current.Request.Form["HDPC"];
            string HDCD = HttpContext.Current.Request.Form["HDCD"];
            string VDCD = HttpContext.Current.Request.Form["VDCD"];
            string SCP_H = HttpContext.Current.Request.Form["SCP_H"];
            string SCP_HD = HttpContext.Current.Request.Form["SCP_HD"];
            string SCP_AO = HttpContext.Current.Request.Form["SCP_AO"];
            string SCP_BO = HttpContext.Current.Request.Form["SCP_BO"];
            string HDCR = HttpContext.Current.Request.Form["HDCR"];
            string VDCR = HttpContext.Current.Request.Form["VDCR"];
            string SCP_Ba = HttpContext.Current.Request.Form["SCP_Ba"];
            string IAI = HttpContext.Current.Request.Form["IAI"];
            string Rt = HttpContext.Current.Request.Form["Rt"];


            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int disastercount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse));
                if (disastercount == 1)
                {
                    Disaster disaster = ParseMonitorHelper.ParseDisaster(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse)));
                    if (disaster != null)
                    {
                        if (type == MODEL.EnumMonitor.GeodisasterType.Rockfall.GetRemark())
                        {
                            #region 危岩崩塌
                            int mapcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_warning WHERE disasterid={0} AND type={1} AND ztm={2}", id, (int)MODEL.EnumMonitor.GeodisasterType.Rockfall, (int)MODEL.Enum.State.InUse));
                            if (mapcount > 1)
                            {
                                return "存在多个灾害体与预警模型参数映射！";
                            }
                            else if (mapcount == 1)
                            {
                                MapDisasterWarning mapDisasterWarning = ParseMonitorHelper.ParseMapDisasterWarning(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_warning WHERE disasterid={0} AND type={1} AND ztm={2}", id, (int)MODEL.EnumMonitor.GeodisasterType.Rockfall, (int)MODEL.Enum.State.InUse)));
                                if (mapDisasterWarning != null)
                                {
                                    RockfallWarning rockfallWarning = ParseMonitorHelper.ParseRockfallRockfallWarning(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_warning_rockfall WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterWarning.WarningId, userbsms, (int)MODEL.Enum.State.InUse)));
                                    if (rockfallWarning != null)
                                    {
                                        if (!string.IsNullOrEmpty(CType1))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ctype1={0} WHERE id={1} AND bsm{2} AND ztm={3}", CType1, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ctype1=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(CType2))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ctype2={0} WHERE id={1} AND bsm{2} AND ztm={3}", CType2, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ctype2=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Alt_up))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET alt_up={0} WHERE id={1} AND bsm{2} AND ztm={3}", Alt_up, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET alt_up=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Alt_down))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET alt_down={0} WHERE id={1} AND bsm{2} AND ztm={3}", Alt_down, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET alt_down=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Rock_vol))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET rock_vol={0} WHERE id={1} AND bsm{2} AND ztm={3}", Rock_vol, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET rock_vol=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Frame_H))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET frame_h={0} WHERE id={1} AND bsm{2} AND ztm={3}", Frame_H, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET frame_h=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Frame_W))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET frame_w={0} WHERE id={1} AND bsm{2} AND ztm={3}", Frame_W, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET frame_w=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Frame_Th))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET frame_th={0} WHERE id={1} AND bsm{2} AND ztm={3}", Frame_Th, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET frame_th=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Rock_char))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET rock_char={0} WHERE id={1} AND bsm{2} AND ztm={3}", Rock_char, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET rock_char=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Coll_Dir))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET coll_dir={0} WHERE id={1} AND bsm{2} AND ztm={3}", Coll_Dir, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET coll_dir=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(OcofRS))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ocofrs={0} WHERE id={1} AND bsm{2} AND ztm={3}", OcofRS, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ocofrs=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(UW))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET uw={0} WHERE id={1} AND bsm{2} AND ztm={3}", UW, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET uw=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SA))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET sa={0} WHERE id={1} AND bsm{2} AND ztm={3}", SA, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET sa=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(OW))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ow={0} WHERE id={1} AND bsm{2} AND ztm={3}", OW, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ow=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(IASS))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET iass={0} WHERE id={1} AND bsm{2} AND ztm={3}", IASS, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET iass=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(LSS))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET lss={0} WHERE id={1} AND bsm{2} AND ztm={3}", LSS, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET lss=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(FASS))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET fass={0} WHERE id={1} AND bsm{2} AND ztm={3}", FASS, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET fass=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(CSS))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET css={0} WHERE id={1} AND bsm{2} AND ztm={3}", CSS, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET css=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(PRR))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET prr={0} WHERE id={1} AND bsm{2} AND ztm={3}", PRR, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET prr=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(EMR))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET emr={0} WHERE id={1} AND bsm{2} AND ztm={3}", EMR, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET emr=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(IAPC))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET iapc={0} WHERE id={1} AND bsm{2} AND ztm={3}", IAPC, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET iapc=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_Mk))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_mk={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_Mk, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_mk=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(VDPC))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET vdpc={0} WHERE id={1} AND bsm{2} AND ztm={3}", VDPC, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET vdpc=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(MRC))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET mrc={0} WHERE id={1} AND bsm{2} AND ztm={3}", MRC, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET mrc=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_C))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_c={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_C, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_c=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_FA))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_fa={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_FA, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_fa=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(FLk))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET flk={0} WHERE id={1} AND bsm{2} AND ztm={3}", FLk, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET flk=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_DS))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_ds={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_DS, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_ds=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(HDPC))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET hdpc={0} WHERE id={1} AND bsm{2} AND ztm={3}", HDPC, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET hdpc=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(HDCD))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET hdcd={0} WHERE id={1} AND bsm{2} AND ztm={3}", HDCD, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET hdcd=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(VDCD))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET vdcd={0} WHERE id={1} AND bsm{2} AND ztm={3}", VDCD, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET vdcd=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_H))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_h={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_H, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_h=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_HD))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_hd={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_HD, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_hd=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_AO))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_ao={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_AO, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_ao=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_BO))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_bo={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_BO, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_bo=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(HDCR))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET hdcr={0} WHERE id={1} AND bsm{2} AND ztm={3}", HDCR, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET hdcr=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(VDCR))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET vdcr={0} WHERE id={1} AND bsm{2} AND ztm={3}", VDCR, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET vdcr=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_Ba))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_ba={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_Ba, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_ba=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(IAI))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET iai={0} WHERE id={1} AND bsm{2} AND ztm={3}", IAI, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET iai=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Rt))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET rt={0} WHERE id={1} AND bsm{2} AND ztm={3}", Rt, rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET rt=null WHERE id={0} AND bsm{1} AND ztm={2}", rockfallWarning.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                        }

                                        return "更新危岩崩塌体预警模型参数成功！";
                                    }
                                }
                            }
                            else
                            {
                                string value = "("
                               + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                               + SQLHelper.UpdateString(disaster.BSM) + ","
                               + (int)MODEL.Enum.State.InUse + ")";
                                int warningid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO monitor_warning_rockfall (cjsj,bsm,ztm) VALUES" + value);
                                if (warningid != -1)
                                {
                                    int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_disaster_warning (disasterid,warningid,type,cjsj,ztm) VALUES({0},{1},{2},{3},{4})", id, warningid, (int)MODEL.EnumMonitor.GeodisasterType.Rockfall, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                    if (mapid != -1)
                                    {
                                        if (!string.IsNullOrEmpty(CType1))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ctype1={0} WHERE id={1} AND bsm{2} AND ztm={3}", CType1, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ctype1=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(CType2))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ctype2={0} WHERE id={1} AND bsm{2} AND ztm={3}", CType2, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ctype2=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Alt_up))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET alt_up={0} WHERE id={1} AND bsm{2} AND ztm={3}", Alt_up, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET alt_up=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Alt_down))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET alt_down={0} WHERE id={1} AND bsm{2} AND ztm={3}", Alt_down, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET alt_down=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Rock_vol))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET rock_vol={0} WHERE id={1} AND bsm{2} AND ztm={3}", Rock_vol, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET rock_vol=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Frame_H))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET frame_h={0} WHERE id={1} AND bsm{2} AND ztm={3}", Frame_H, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET frame_h=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Frame_W))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET frame_w={0} WHERE id={1} AND bsm{2} AND ztm={3}", Frame_W, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET frame_w=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Frame_Th))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET frame_th={0} WHERE id={1} AND bsm{2} AND ztm={3}", Frame_Th, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET frame_th=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Rock_char))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET rock_char={0} WHERE id={1} AND bsm{2} AND ztm={3}", Rock_char, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET rock_char=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Coll_Dir))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET coll_dir={0} WHERE id={1} AND bsm{2} AND ztm={3}", Coll_Dir, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET coll_dir=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(OcofRS))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ocofrs={0} WHERE id={1} AND bsm{2} AND ztm={3}", OcofRS, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ocofrs=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(UW))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET uw={0} WHERE id={1} AND bsm{2} AND ztm={3}", UW, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET uw=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SA))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET sa={0} WHERE id={1} AND bsm{2} AND ztm={3}", SA, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET sa=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(OW))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ow={0} WHERE id={1} AND bsm{2} AND ztm={3}", OW, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET ow=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(IASS))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET iass={0} WHERE id={1} AND bsm{2} AND ztm={3}", IASS, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET iass=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(LSS))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET lss={0} WHERE id={1} AND bsm{2} AND ztm={3}", LSS, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET lss=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(FASS))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET fass={0} WHERE id={1} AND bsm{2} AND ztm={3}", FASS, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET fass=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(CSS))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET css={0} WHERE id={1} AND bsm{2} AND ztm={3}", CSS, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET css=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(PRR))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET prr={0} WHERE id={1} AND bsm{2} AND ztm={3}", PRR, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET prr=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(EMR))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET emr={0} WHERE id={1} AND bsm{2} AND ztm={3}", EMR, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET emr=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(IAPC))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET iapc={0} WHERE id={1} AND bsm{2} AND ztm={3}", IAPC, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET iapc=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_Mk))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_mk={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_Mk, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_mk=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(VDPC))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET vdpc={0} WHERE id={1} AND bsm{2} AND ztm={3}", VDPC, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET vdpc=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(MRC))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET mrc={0} WHERE id={1} AND bsm{2} AND ztm={3}", MRC, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET mrc=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_C))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_c={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_C, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_c=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_FA))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_fa={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_FA, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_fa=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(FLk))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET flk={0} WHERE id={1} AND bsm{2} AND ztm={3}", FLk, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET flk=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_DS))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_ds={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_DS, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_ds=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(HDPC))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET hdpc={0} WHERE id={1} AND bsm{2} AND ztm={3}", HDPC, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET hdpc=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(HDCD))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET hdcd={0} WHERE id={1} AND bsm{2} AND ztm={3}", HDCD, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET hdcd=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(VDCD))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET vdcd={0} WHERE id={1} AND bsm{2} AND ztm={3}", VDCD, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET vdcd=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_H))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_h={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_H, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_h=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_HD))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_hd={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_HD, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_hd=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_AO))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_ao={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_AO, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_ao=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_BO))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_bo={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_BO, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_bo=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(HDCR))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET hdcr={0} WHERE id={1} AND bsm{2} AND ztm={3}", HDCR, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET hdcr=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(VDCR))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET vdcr={0} WHERE id={1} AND bsm{2} AND ztm={3}", VDCR, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET vdcr=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(SCP_Ba))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_ba={0} WHERE id={1} AND bsm{2} AND ztm={3}", SCP_Ba, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET scp_ba=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(IAI))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET iai={0} WHERE id={1} AND bsm{2} AND ztm={3}", IAI, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET iai=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        if (!string.IsNullOrEmpty(Rt))
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET rt={0} WHERE id={1} AND bsm{2} AND ztm={3}", Rt, warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }
                                        else
                                        {
                                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warning_rockfall SET rt=null WHERE id={0} AND bsm{1} AND ztm={2}", warningid, userbsms, (int)MODEL.Enum.State.InUse));
                                        }

                                        return "创建危岩崩塌体预警模型参数成功！";
                                    }
                                    else
                                    {
                                        return "创建危岩崩塌体与预警模型参数映射失败！";
                                    }
                                }
                                else
                                {
                                    return "创建危岩崩塌体预警模型参数失败！";
                                }
                            }
                            #endregion
                        }
                        else if (type == MODEL.EnumMonitor.GeodisasterType.Landslide.GetRemark())
                        { }
                        else if (type == MODEL.EnumMonitor.GeodisasterType.Debrisflow.GetRemark())
                        { }
                        else if (type == MODEL.EnumMonitor.GeodisasterType.GroundCollapse.GetRemark())
                        { }
                        else if (type == MODEL.EnumMonitor.GeodisasterType.Groundfissure.GetRemark())
                        { }
                        else if (type == MODEL.EnumMonitor.GeodisasterType.Groundsubsidence.GetRemark())
                        { }
                        else
                        {
                            return "无此灾害体类型！";
                        }
                    }
                    else
                    {
                        return "无此灾害体！";
                    }  
                }
                else
                {
                    return "无此灾害体或灾害体数量不唯一！";
                }
            }
            else
            {
                return "无此权限！";
            }

            return string.Empty;
        }












        /// <summary>
        /// 删除灾害体
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteDisaster()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse));
                if (count > 0)
                {
                    count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_disaster SET ztm={0} WHERE id={1} AND bsm{2} AND ztm={3}", (int)MODEL.Enum.State.NoUse, id, userbsms, (int)MODEL.Enum.State.InUse));

                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_project_disaster SET ztm={0} WHERE disasterid={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, id, (int)MODEL.Enum.State.InUse));
                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_disaster_section SET ztm={0} WHERE disasterid={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, id, (int)MODEL.Enum.State.InUse));
                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_disaster_monitor SET ztm={0} WHERE disasterid={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, id, (int)MODEL.Enum.State.InUse));

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
                    return "无此灾害体！";
                }
            }
            else
            {
                return "无此权限！";
            }
        }



    }
}

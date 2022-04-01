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
    /// 预警模型
    /// </summary>
    public class WarningController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(WarningController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 项目预警信息
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetWarningInfo(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_project_warninginfo WHERE projectid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(datas))
                {
                    List<WarningInfoString> warningInfoStrings = new List<WarningInfoString>();

                    string[] rows = datas.Split(new char[] {COM.ConstHelper.rowSplit});
                    for (int i = 0; i < rows.Length; i++)
                    {
                        MapProjectWarningInfo mapProjectWarningInfo = ParseMonitorHelper.ParseMapProjectWarningInfo(rows[i]);
                        if (mapProjectWarningInfo != null)
                        {
                            WarningInfoString warningInfoString = ParseMonitorHelper.ParseWarningInfoString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM business_warninginfo WHERE id={0} AND bsm{1} AND ztm={2}", mapProjectWarningInfo.WarningInfoId, userbsms, (int)MODEL.Enum.State.InUse)));
                            if (warningInfoString != null)
                            {
                                Disaster disaster = ParseMonitorHelper.ParseDisaster(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", warningInfoString.ZHT, userbsms, (int)MODEL.Enum.State.InUse)));
                                if (disaster != null)
                                {
                                    warningInfoString.ZHT = disaster.ZHTBH;
                                }

                                warningInfoStrings.Add(warningInfoString);
                            }
                        }
                    }

                    if (warningInfoStrings.Count > 0)
                    {
                        return JsonHelper.ToJson(warningInfoStrings);
                    }
                }
            }
            else
            {
                //验权失败
            }

            return string.Empty;
        }

        /// <summary>
        /// 更新预警信息
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateWarningInfo()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string yjzt = HttpContext.Current.Request.Form["yjzt"];
            string clnr = HttpContext.Current.Request.Form["clnr"];
            string clsj = HttpContext.Current.Request.Form["clsj"];
            string bz = HttpContext.Current.Request.Form["bz"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                WarningInfo warningInfo = ParseMonitorHelper.ParseWarningInfo(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM business_warninginfo WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse)));
                if (warningInfo != null)
                {
                    if (!string.IsNullOrEmpty(clnr))
                    {
                        string time = string.Empty;
                        if (!string.IsNullOrEmpty(clsj))
                        {
                            if (clsj.Trim() == string.Empty)
                            {
                                time = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                            }
                            else
                            {
                                time = clsj;
                            }
                        }
                        else
                        {
                            time = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                        }

                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE business_warninginfo SET yjzt={0},clnr={1},clsj={2},bz={3} WHERE id={4} AND bsm{5} AND ztm={6}", yjzt, SQLHelper.UpdateString(clnr), SQLHelper.UpdateString(time), SQLHelper.UpdateString(bz), id, userbsms, (int)MODEL.Enum.State.InUse));

                        if (updatecount == 1)
                        {
                            return "更新成功！";
                        }
                    }
                }
            }
            else
            {
                //无此权限
            }

            return string.Empty;
        }

        /// <summary>
        /// 灾害体临界条件
        /// </summary>
        /// <param name="id">灾害体id</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetDisasterThreshold(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_threshold WHERE disasterid={0} AND type={1} AND ztm={2}", id, (int)MODEL.EnumMonitor.GeodisasterType.Rockfall, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(datas))
                {
                    string[] rows = datas.Split(new char[] {COM.ConstHelper.rowSplit});
                    if (rows.Length == 1)
                    {
                        MapDisasterThreshold mapDisasterThreshold = ParseMonitorHelper.ParseMapDisasterThreshold(rows[0]);
                        if (mapDisasterThreshold != null)
                        {
                            RockfallThresholdString rockfallThresholdString = ParseMonitorHelper.ParseRockfallThresholdString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_threshold_rockfall WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterThreshold.ThresholdId, userbsms, (int)MODEL.Enum.State.InUse)));
                            if (rockfallThresholdString != null)
                            {
                                return JsonHelper.ToJson(rockfallThresholdString);
                            }

                        }
                    }
                }
            }
            else
            {
                //无此权限
            }

            return string.Empty;
        }

        /// <summary>
        /// 计算灾害体临界阈值
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string CalculateDisasterThreshold()
        {
            #region 参数
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string ljpjgs = HttpContext.Current.Request.Form["ljpjgs"];
            string tzxs = HttpContext.Current.Request.Form["tzxs"];

            string ytrz = HttpContext.Current.Request.Form["ytrz"];
            string ytbsb = HttpContext.Current.Request.Form["ytbsb"];
            string yttxml = HttpContext.Current.Request.Form["yttxml"];
            string wydtzz = HttpContext.Current.Request.Form["wydtzz"];
            string qzhmnjl = HttpContext.Current.Request.Form["qzhmnjl"];
            string qzhmnmcj = HttpContext.Current.Request.Form["qzhmnmcj"];
            string dbrrcnjl = HttpContext.Current.Request.Form["dbrrcnjl"];
            string dbrrcnmcj = HttpContext.Current.Request.Form["dbrrcnmcj"];
            string wydtkd = HttpContext.Current.Request.Form["wydtkd"];
            string wydthd = HttpContext.Current.Request.Form["wydthd"];
            string wydtgd = HttpContext.Current.Request.Form["wydtgd"];
            string yskjqd = HttpContext.Current.Request.Form["yskjqd"];
            string wydtytklqd = HttpContext.Current.Request.Form["wydtytklqd"];
            string ytdzkyqd = HttpContext.Current.Request.Form["ytdzkyqd"];
            string wydtzxdhylfdbdspjl = HttpContext.Current.Request.Form["wydtzxdhylfdbdspjl"];
            string wydtzxjldbxzddspjl = HttpContext.Current.Request.Form["wydtzxjldbxzddspjl"];
            string wydtzxjldbxzddczjl = HttpContext.Current.Request.Form["wydtzxjldbxzddczjl"];
            string dwdtxbrrcytqzjqdplmzyl = HttpContext.Current.Request.Form["dwdtxbrrcytqzjqdplmzyl"];
            #endregion

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (!string.IsNullOrEmpty(ljpjgs))
                {
                    string info = string.Empty;
                    if (Convert.ToInt16(ljpjgs) == (int)MODEL.EnumEW.WarningFunction.QJHTS)
                    {
                        #region 倾倒滑塌式崩塌裂缝临界宽度判据公式
                        double result = RockfallWarningModelFunctionOne(ytrz, qzhmnjl, qzhmnmcj, wydtzxdhylfdbdspjl, ytbsb, wydthd, yttxml, ref info);
                        if (result != -1)
                        {
                            return result.ToString();
                        }
                        #endregion
                    }
                    else if (Convert.ToInt16(ljpjgs) == (int)MODEL.EnumEW.WarningFunction.QDS)
                    {
                        #region 倾倒式崩塌裂缝临界宽度判据公式
                        double result = RockfallWarningModelFunctionTwo(wydtgd, wydtzxjldbxzddspjl, wydtzxjldbxzddczjl, ref info);
                        if (result != -1)
                        {
                            return result.ToString();
                        }
                        #endregion
                    }
                    else if (Convert.ToInt16(ljpjgs) == (int)MODEL.EnumEW.WarningFunction.QDYSS)
                    {
                        #region 倾倒压缩式（与母岩未脱离）裂缝临界宽度判据公式
                        double result = RockfallWarningModelFunctionThree(ytrz, wydtzxdhylfdbdspjl, ytbsb, wydtgd, wydtzz, wydtkd, dbrrcnjl, dwdtxbrrcytqzjqdplmzyl, dbrrcnmcj, wydtytklqd, yttxml, ref info);
                        if (result != -1)
                        {
                            return result.ToString();
                        }
                        #endregion
                    }
                    else if (Convert.ToInt16(ljpjgs) == (int)MODEL.EnumEW.WarningFunction.CDS)
                    {
                        #region 错断式崩塌连通率判据公式
                        double result = RockfallWarningModelFunctionFour(wydtzz, wydtkd, yskjqd, wydtgd, ytdzkyqd, ref info);
                        if (result != -1)
                        {
                            return result.ToString();
                        }
                        #endregion
                    }
                }
            }
            else
            {
                //无此权限
            }

            return string.Empty;
        }

        /// <summary>
        /// 保存灾害体临界阈值
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string SaveDisasterThreshold()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string ljpjgs = HttpContext.Current.Request.Form["ljpjgs"];
            string tzxs = HttpContext.Current.Request.Form["tzxs"];
            string ljtj = HttpContext.Current.Request.Form["ljtj"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                //检查灾害体
                int disastercount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse));
                if (disastercount != 1)
                {
                    return "无此灾害体！";
                }

                Disaster disaster = ParseMonitorHelper.ParseDisaster(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse)));
                if (disaster == null)
                {
                    return "无此灾害体！";
                }

                //检查参数
                if ((!string.IsNullOrEmpty(ljpjgs)) && (!string.IsNullOrEmpty(tzxs)) && (!string.IsNullOrEmpty(ljtj)))
                {
                    int gs = 0;
                    double xs = 0;
                    double yz = 0;

                    try
                    {
                        gs = Convert.ToInt16(ljpjgs);
                        xs = Convert.ToDouble(tzxs);
                        yz = Convert.ToDouble(ljtj);
                    }
                    catch (Exception ex)
                    {
                        return "输入参数不为数值，请检查！错误信息：" + ex.Message;
                    }

                    string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_threshold WHERE disasterid={0} AND type={1} AND ztm={2}", id, (int)MODEL.EnumMonitor.GeodisasterType.Rockfall, (int)MODEL.Enum.State.InUse));
                    if (string.IsNullOrEmpty(datas))
                    {
                        int thresholdid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_threshold_rockfall (gs,xs,yz,cjsj,bsm,ztm) VALUES({0},{1},{2},{3},{4},{5})", gs, xs, yz, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), SQLHelper.UpdateString(disaster.BSM), (int)MODEL.Enum.State.InUse));
                        if (thresholdid != -1)
                        {
                            int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_disaster_threshold (disasterid,thresholdid,type,cjsj,ztm) VALUES({0},{1},{2},{3},{4})", id, thresholdid, (int)MODEL.EnumMonitor.GeodisasterType.Rockfall, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                            if (mapid != -1)
                            {
                                return "保存成功！";
                            }
                            else
                            {
                                return "创建灾害体临界条件映射失败！";
                            }
                        }
                        else
                        {
                            return "创建灾害体临界条件失败！";
                        }
                    }
                    else
                    {
                        string[] rows = datas.Split(new char[] {COM.ConstHelper.rowSplit});
                        if (rows.Length == 1)
                        {
                            MapDisasterThreshold mapDisasterThreshold = ParseMonitorHelper.ParseMapDisasterThreshold(rows[0]);
                            if (mapDisasterThreshold != null)
                            {
                                RockfallThreshold rockfallThreshold = ParseMonitorHelper.ParseRockfallThreshold(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_threshold_rockfall WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterThreshold.ThresholdId, userbsms, (int)MODEL.Enum.State.InUse)));
                                if (rockfallThreshold != null)
                                {
                                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_threshold_rockfall SET gs={0},xs={1},yz={2} WHERE id={3} AND bsm{4} AND ztm={5}", gs, xs, yz, rockfallThreshold.Id, userbsms, (int)MODEL.Enum.State.InUse));
                                    if (updatecount == 1)
                                    {
                                        return "更新灾害体临界条件成功！";
                                    }
                                    else
                                    {
                                        return "更新灾害体临界条件失败！";
                                    }
                                }
                                else
                                {
                                    return "解析灾害体临界条件为空！";
                                }
                            }
                            else
                            {
                                return "解析灾害体-临界条件映射为空！";
                            }
                        }
                        else
                        {
                            return "灾害体-临界条件映射存在错误！";
                        }
                    }
                }
                else
                {
                    return "参数不全！";
                }
            }
            else
            {
                //无此权限
            }

            return string.Empty;
        }

        /// <summary>
        /// 监测点阈值
        /// </summary>
        /// <param name="id">监测点id</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetMonitorThreshold(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_monitor_threshold WHERE monitorid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(datas))
                {
                    string[] rows = datas.Split(new char[] {COM.ConstHelper.rowSplit});
                    if (rows.Length == 1)
                    {
                        MapMonitorThreshold mapMonitorThreshold = ParseMonitorHelper.ParseMapMonitorThreshold(rows[0]);
                        if (mapMonitorThreshold != null)
                        {
                            MonitorThresholdString monitorThresholdString = ParseMonitorHelper.ParseMonitorThresholdString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_monitorthreshold WHERE id={0} AND bsm{1} AND ztm={2}", mapMonitorThreshold.ThresholdId, userbsms, (int)MODEL.Enum.State.InUse)));
                            if (monitorThresholdString != null)
                            {
                                return JsonHelper.ToJson(monitorThresholdString);
                            }
                        }
                    }
                }
            }
            else
            {
                //无此权限
            }

            return string.Empty;
        }

        /// <summary>
        /// 计算监测阈值
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string CalculateMonitorThreshold()
        {
            #region 参数
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string jcd = HttpContext.Current.Request.Form["jcd"];
            string ljtj = HttpContext.Current.Request.Form["ljtj"];

            string pmxzb = HttpContext.Current.Request.Form["pmxzb"];
            string pmyzb = HttpContext.Current.Request.Form["pmyzb"];
            string gc = HttpContext.Current.Request.Form["gc"];
            string monitortzxs = HttpContext.Current.Request.Form["monitortzxs"];
            #endregion

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if ((!string.IsNullOrEmpty(ljtj)) && (!string.IsNullOrEmpty(pmxzb)) && (!string.IsNullOrEmpty(pmyzb)) && (!string.IsNullOrEmpty(gc)) && (!string.IsNullOrEmpty(monitortzxs)))
                {
                    //TODO

                    return "暂未实现！";

                }
                else
                {
                    return "参数不全！";
                }
            }
            else
            {
                //无此权限
            }

            return string.Empty;
        }

        /// <summary>
        /// 保存监测阈值
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string SaveMonitorThreshold()
        {
            #region 参数
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string jcd = HttpContext.Current.Request.Form["jcd"];
            string monitortzxs = HttpContext.Current.Request.Form["monitortzxs"];
            string jcyz = HttpContext.Current.Request.Form["jcyz"];
            #endregion

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                Monitor monitor = ParseMonitorHelper.ParseMonitor(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_monitor WHERE id={0} AND bsm{1} AND ztm={2}", jcd, userbsms, (int)MODEL.Enum.State.InUse)));
                if (monitor != null)
                {
                    MapMonitorThreshold mapMonitorThreshold = ParseMonitorHelper.ParseMapMonitorThreshold(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_monitor_threshold WHERE monitorid={0} AND ztm={1}", jcd, (int)MODEL.Enum.State.InUse)));
                    if (mapMonitorThreshold != null)
                    {
                        //更新监测阈值
                    }
                    else
                    {
                        Threshold threshold = new Threshold();

                        if (string.IsNullOrEmpty(jcyz))
                        {
                            return "无裂缝监测阈值，请确认！";
                        }
                        else
                        {
                            if (monitor.JCFF == (int)MODEL.EnumMonitor.AutoDeviceType.LF)
                            {
                                double value = 0;
                                try
                                {
                                    value = Convert.ToDouble(jcyz);
                                }
                                catch (Exception ex)
                                {
                                    return "裂缝监测阈值格式错误，请确认阈值为数字！异常信息：" + ex.Message;
                                }

                                ThresholdData thresholdData = new ThresholdData();
                                thresholdData.Name = "裂缝变形";
                                thresholdData.Value = value;
                                thresholdData.Unit = "mm";
                                threshold.Datas = new List<ThresholdData> { thresholdData };
                            }
                            else if (monitor.JCFF == (int)MODEL.EnumMonitor.AutoDeviceType.YL)
                            {
                                double value = 0;
                                try
                                {
                                    value = Convert.ToDouble(jcyz);
                                }
                                catch (Exception ex)
                                {
                                    return "应力监测阈值格式错误，请确认阈值为数字！异常信息：" + ex.Message;
                                }

                                ThresholdData thresholdData = new ThresholdData();
                                thresholdData.Name = "应力变形";
                                thresholdData.Value = value;
                                thresholdData.Unit = "kN";
                                threshold.Datas = new List<ThresholdData> { thresholdData };
                            }
                            else if (monitor.JCFF == (int)MODEL.EnumMonitor.AutoDeviceType.QJ)
                            {
                                string[] ths = jcyz.Split(new char[] { ' ' });
                                if (ths.Length != 2)
                                {
                                    return "倾角监测阈值格式错误，请确认！";
                                }
                                else
                                {
                                    double value1 = 0;
                                    double value2 = 0;
                                    try
                                    {
                                        value1 = Convert.ToDouble(ths[0]);
                                        value2 = Convert.ToDouble(ths[1]);
                                    }
                                    catch (Exception ex)
                                    {
                                        return "倾角监测阈值格式错误，请确认阈值为数字！异常信息：" + ex.Message;
                                    }

                                    ThresholdData thresholdData1 = new ThresholdData();
                                    thresholdData1.Name = "X方向角度变形";
                                    thresholdData1.Value = value1;
                                    thresholdData1.Unit = "°";
                                    ThresholdData thresholdData2 = new ThresholdData();
                                    thresholdData2.Name = "Y方向角度变形";
                                    thresholdData2.Value = value2;
                                    thresholdData2.Unit = "°";

                                    threshold.Datas = new List<ThresholdData>();
                                    threshold.Datas.Add(thresholdData1);
                                    threshold.Datas.Add(thresholdData2);
                                }
                            }
                        }

                        if (threshold.Datas != null)
                        {
                            int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_monitorthreshold (lx,xs,yz,cjsj,bsm,ztm) VALUES({0},{1},{2},{3},{4},{5})", monitor.JCFF, monitortzxs, SQLHelper.UpdateString(JsonHelper.ToJson<Threshold>(threshold)), SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), SQLHelper.UpdateString(monitor.BSM), (int)MODEL.Enum.State.InUse));
                            if (id == -1)
                            {
                                return "插入监测阈值失败！";
                            }
                            else
                            {
                                int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_monitor_threshold (monitorid,thresholdid,cjsj,ztm) VALUES({0},{1},{2},{3})", jcd, id, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                if (mapid != -1)
                                {
                                    return "保存成功！";
                                }
                                else
                                {
                                    return "创建监测点-阈值映射失败！";
                                }
                            }
                        }
                    }
                }
                else
                {
                    return "无此监测点！";
                }
            }
            else
            {
                //无此权限
            }

            return string.Empty;
        }

        /// <summary>
        /// 预警判据
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetWarningCriterion(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                List<WarningCriterion> warningCriterias = new List<WarningCriterion>();

                string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_project_disaster WHERE projectid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(datas))
                {
                    string[] rows = datas.Split(new char[] {COM.ConstHelper.rowSplit});
                    for (int i = 0; i < rows.Length; i++)
                    {
                        MapProjectDisaster mapProjectDisaster = ParseMonitorHelper.ParseMapProjectDisaster(rows[i]);
                        if (mapProjectDisaster != null)
                        {
                            Disaster disaster = ParseMonitorHelper.ParseDisaster(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", mapProjectDisaster.DisasterId, userbsms, (int)MODEL.Enum.State.InUse)));
                            if (disaster != null)
                            {
                                string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_criterion WHERE disasterid={0} AND ztm={1}", disaster.Id, (int)MODEL.Enum.State.InUse));
                                if (!string.IsNullOrEmpty(maps))
                                {
                                    string[] items = maps.Split(new char[] {COM.ConstHelper.rowSplit});
                                    for (int j = 0; j < items.Length; j++)
                                    {
                                        MapDisasterCriterion mapDisasterCriterion = ParseMonitorHelper.ParseMapDisasterCriterion(items[j]);
                                        if (mapDisasterCriterion != null)
                                        {
                                            WarningCriterion warningCriterion = ParseMonitorHelper.ParseWarningCriterion(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_warningcriterion WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterCriterion.CriterionId, userbsms, (int)MODEL.Enum.State.InUse)));
                                            if (warningCriterion != null)
                                            {
                                                warningCriterias.Add(warningCriterion);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else
                { }

                if (warningCriterias.Count > 0)
                {
                    return JsonHelper.ToJson(warningCriterias);
                }
            }
            else
            {

            }

            return string.Empty;
        }

        /// <summary>
        /// 新增预警判据
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddWarningCriterion()
        {
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string pjmc = HttpContext.Current.Request.Form["pjmc"];
            string yjjb = HttpContext.Current.Request.Form["yjjb"];
            string zhtc = HttpContext.Current.Request.Form["zhtc"];
            string jcdc = HttpContext.Current.Request.Form["jcdc"];
            string pjgs = HttpContext.Current.Request.Form["pjgs"];
            string ms = HttpContext.Current.Request.Form["ms"];
            string bz = HttpContext.Current.Request.Form["bz"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                Disaster disaster = ParseMonitorHelper.ParseDisaster(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", zhtc, userbsms, (int)MODEL.Enum.State.InUse)));
                if (disaster != null)
                {
                    if ((!string.IsNullOrEmpty(pjmc)) && (!string.IsNullOrEmpty(yjjb)) && (!string.IsNullOrEmpty(zhtc)) && (!string.IsNullOrEmpty(jcdc)) && (!string.IsNullOrEmpty(pjgs)))
                    {
                        int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_warningcriterion (pjmc,yjjb,zht,jcd,pjgs,ms,cjsj,bsm,ztm,bz) VALUES({0},{1},{2},{3},{4},{5},{6},{7},{8},{9})", SQLHelper.UpdateString(pjmc), yjjb, zhtc, jcdc, SQLHelper.UpdateString(pjgs), SQLHelper.UpdateString(ms), SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), SQLHelper.UpdateString(disaster.BSM), (int)MODEL.Enum.State.InUse, SQLHelper.UpdateString(bz)));
                        if (id != -1)
                        {
                            int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_disaster_criterion (disasterid,criterionid,cjsj,ztm) VALUES({0},{1},{2},{3})", zhtc, id, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                            if (mapid != -1)
                            {
                                return "新增成功！";
                            }
                            else
                            {
                                return "新增灾害体-预警判据映射失败！";
                            }

                        }
                        else
                        {
                            return "新增预警判据失败！";
                        }
                    }
                    else
                    {
                        return "参数不全！";
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

        /// <summary>
        /// 更新预警判据
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateWarningCriterion()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string pjmc = HttpContext.Current.Request.Form["pjmc"];
            //string yjjb = HttpContext.Current.Request.Form["yjjb"];
            //string zhtc = HttpContext.Current.Request.Form["zhtc"];
            //string jcdc = HttpContext.Current.Request.Form["jcdc"];
            string pjgs = HttpContext.Current.Request.Form["pjgs"];
            string ms = HttpContext.Current.Request.Form["ms"];
            string bz = HttpContext.Current.Request.Form["bz"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_warningcriterion WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse));
                if (count == 1)
                {
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warningcriterion SET pjmc={0},pjgs={1},ms={2},bz={3} WHERE id={4} AND ztm={5}", SQLHelper.UpdateString(pjmc), SQLHelper.UpdateString(pjgs), SQLHelper.UpdateString(ms), SQLHelper.UpdateString(bz), id, (int)MODEL.Enum.State.InUse));
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
                    return "无此判据！";
                }
            }
            else
            {
                return "无此权限！";
            }
        }

        /// <summary>
        /// 删除预警判据
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteWarningCriterion()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_warningcriterion WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse));
                if (count == 1)
                {
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_warningcriterion SET ztm={0} WHERE id={1} AND bsm{2} AND ztm={3}", (int)MODEL.Enum.State.NoUse, id, userbsms, (int)MODEL.Enum.State.InUse));
                    if (updatecount == 1)
                    {
                        int updatemapcount1 = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_disaster_criterion SET ztm={0} WHERE criterionid={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, id, (int)MODEL.Enum.State.InUse));
                        if (updatemapcount1 != 1)
                        {
                            return "删除灾害体-预警判据映射失败！";
                        }

                        int mapcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_model_criterion WHERE warningcriterionid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                        if (mapcount > 0)
                        {

                            int updatemapcount2 = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_model_criterion SET ztm={0} WHERE warningcriterionid={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, id, (int)MODEL.Enum.State.InUse));
                            if (updatemapcount2 < 1)
                            {
                                return "删除预警模型-预警判据映射失败！";
                            }
                            else
                            {
                                return "删除成功！";
                            }
                        }
                        else
                        {
                            return "删除成功！";
                        }
                    }
                    else
                    {
                        return "删除出错！";
                    }
                }
                else
                {
                    return "数量不正确！";
                }
            }
            else
            {
                return "无此权限！";
            }
        }

        /// <summary>
        /// 预警模型
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetWarningModel(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                List<WarningModelInfo> warningModelInfos = new List<WarningModelInfo>();

                string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_project_warningmodel WHERE projectid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(datas))
                {
                    string[] rows = datas.Split(new char[] {COM.ConstHelper.rowSplit});
                    for (int i = 0; i < rows.Length; i++)
                    {
                        MapProjectWarningModel mapProjectWarningModel = ParseMonitorHelper.ParseMapProjectWarningModel(rows[i]);
                        if (mapProjectWarningModel != null)
                        {
                            WarningModel warningModel = ParseMonitorHelper.ParseWarningModel(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_warningmodel WHERE id={0} AND bsm{1} AND ztm={2}", mapProjectWarningModel.WarningModelId, userbsms, (int)MODEL.Enum.State.InUse)));
                            if (warningModel != null)
                            {
                                string mapdatas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_model_criterion WHERE warningmodelid={0} AND ztm={1}", warningModel.Id, (int)MODEL.Enum.State.InUse));
                                if (!string.IsNullOrEmpty(mapdatas))
                                {
                                    List<WarningCriterion> warningCriterias = new List<WarningCriterion>();

                                    string[] maprows = mapdatas.Split(new char[] {COM.ConstHelper.rowSplit});
                                    for (int j = 0; j < maprows.Length; j++)
                                    {
                                        MapModelCriterion mapModelCriterion = ParseMonitorHelper.ParseMapModelCriterion(maprows[j]);
                                        if (mapModelCriterion != null)
                                        {
                                            WarningCriterion warningCriterion = ParseMonitorHelper.ParseWarningCriterion(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_warningcriterion WHERE id={0} AND bsm{1} AND ztm={2}", mapModelCriterion.CriterionId, userbsms, (int)MODEL.Enum.State.InUse)));
                                            if (warningCriterion != null)
                                            {
                                                warningCriterias.Add(warningCriterion);
                                            }
                                        }
                                    }

                                    if (warningCriterias.Count > 0)
                                    {
                                        WarningModelInfo warningModelInfo = new WarningModelInfo();
                                        warningModelInfo.Model = warningModel;
                                        warningModelInfo.Criterions = warningCriterias;
                                        warningModelInfos.Add(warningModelInfo);
                                    }
                                }
                            }
                        }
                    }
                }

                if (warningModelInfos.Count > 0)
                {
                    return JsonHelper.ToJson(warningModelInfos);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 新增预警模型
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddWarningModel()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string mxmc = HttpContext.Current.Request.Form["mxmc"];
            string zht = HttpContext.Current.Request.Form["zht"];
            string yjtj = HttpContext.Current.Request.Form["yjtj"];
            string pjs = HttpContext.Current.Request.Form["pjs"];
            string bz = HttpContext.Current.Request.Form["bz"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                MonitorProject project = ParseMonitorHelper.ParseMonitorProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_project WHERE id={0} AND bsm={1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse)));
                if (project != null)
                {
                    if ((!string.IsNullOrEmpty(mxmc)) && (!string.IsNullOrEmpty(zht)) && (!string.IsNullOrEmpty(yjtj)) && (!string.IsNullOrEmpty(pjs)))
                    {
                        int modelid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_warningmodel (mxmc,zht,yjtj,cjsj,bsm,ztm,bz) VALUES({0},{1},{2},{3},{4},{5},{6})", SQLHelper.UpdateString(mxmc), zht, yjtj, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), SQLHelper.UpdateString(project.BSM), (int)MODEL.Enum.State.InUse, SQLHelper.UpdateString(bz)));
                        if (modelid != -1)
                        {
                            int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_project_warningmodel (projectid,warningmodelid,cjsj,ztm) VALUES({0},{1},{2},{3})", id, modelid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                            if (mapid != -1)
                            {
                                bool isSuccess = true;
                                string[] pjids = pjs.Split(new char[] { ',' });
                                for (int i = 0; i < pjids.Length; i++)
                                {
                                    int map_id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_model_criterion (warningmodelid,warningcriterionid,cjsj,ztm) VALUES({0},{1},{2},{3})", modelid, pjids[i], SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                    if (map_id == -1)
                                    {
                                        isSuccess = false;
                                    }
                                }

                                if (isSuccess)
                                {
                                    return "创建成功！";
                                }
                                else
                                {
                                    return "创建预警模型-预警判据映射失败！";
                                }
                            }
                            else
                            {
                                return "创建项目-预警模型映射失败！";
                            }
                        }
                        else
                        {
                            return "创建预警模型失败！";
                        }
                    }
                    else
                    {
                        return "参数不全！";
                    }
                }
                else
                {
                    return "无此项目！";
                }
            }
            else
            {
                return "无此权限！";
            }
        }

        /// <summary>
        /// 更新预警模型（添加判据）
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateWarningModelPlus()
        {
            string modelid = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string pjidlist = HttpContext.Current.Request.Form["pjid"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if ((!string.IsNullOrEmpty(modelid)) && (!string.IsNullOrEmpty(pjidlist)))
                {
                    string[] pjids = pjidlist.Split(new char[] { ',' });
                    bool isScuess = true;
                    for (int i = 0; i < pjids.Length; i++)
                    {
                        int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO monitor_map_model_criterion (warningmodelid,warningcriterionid,cjsj,ztm) VALUES({0},{1},{2},{3})", modelid, pjids[i], SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        if (mapid == -1)
                        {
                            isScuess = false;
                        }
                    }

                    if (isScuess)
                    {
                        return "成功！";
                    }
                    else
                    {
                        return "失败！";
                    }
                }
                else
                {
                    return "参数不全！";
                }
            }
            else
            {
                return "无此权限！";
            }
        }

        /// <summary>
        /// 更新预警模型（删除判据）
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateWarningModelLess()
        {
            string pjid = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];
            string modelid = HttpContext.Current.Request.Form["modelid"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_model_criterion WHERE warningmodelid={0} AND warningcriterionid={1} AND ztm={2}", modelid, pjid, (int)MODEL.Enum.State.InUse));
                if (count == 1)
                {
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_model_criterion SET ztm={0} WHERE warningmodelid={1} AND warningcriterionid={2} AND ztm={3}", (int)MODEL.Enum.State.NoUse, modelid, pjid, (int)MODEL.Enum.State.InUse));
                    if (updatecount == 1)
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
                    return "数量错误！";
                }
            }
            else
            {
                return "无此权限！";
            }
        }










        #region 危岩崩塌预警模型公式
        /// <summary>
        /// 倾倒滑塌式崩塌裂缝宽度判据mm
        /// </summary>
        /// <param name="γ_s">岩体容重</param>
        /// <param name="c_s">潜在滑面内聚力</param>
        /// <param name="φ_s">潜在滑面内摩擦角（度）</param>
        /// <param name="e_s">危岩单体重心到后缘裂缝底部的水平距离</param>
        /// <param name="v_s">岩体泊松比</param>
        /// <param name="b_s">危岩单体厚度</param>
        /// <param name="E_s">岩体弹性模量</param>
        /// <param name="info">消息</param>
        /// <returns></returns>
        private double RockfallWarningModelFunctionOne(string γ_s, string c_s, string φ_s, string e_s, string v_s, string b_s, string E_s, ref string info)
        {
            info = string.Empty;

            #region 参数检查
            if (string.IsNullOrEmpty(γ_s) || string.IsNullOrEmpty(c_s) || string.IsNullOrEmpty(φ_s) || string.IsNullOrEmpty(e_s) || string.IsNullOrEmpty(v_s) || string.IsNullOrEmpty(b_s) || string.IsNullOrEmpty(E_s))
            {
                info = "参数不全，请检查参数！";
                return -1;
            }
            #endregion

            double γ;
            double c;
            double φ;
            double e;
            double v;
            double b;
            double E;

            try
            {
                γ = Convert.ToDouble(γ_s);
                c = Convert.ToDouble(c_s);
                φ = Convert.ToDouble(φ_s) * Math.PI / 180;
                e = Convert.ToDouble(e_s);
                v = Convert.ToDouble(v_s);
                b = Convert.ToDouble(b_s);
                E = Convert.ToDouble(E_s);
            }
            catch (Exception ex)
            {
                info = "参数错误：" + ex.Message;
                return -1;
            }

            //裂缝临界宽度判据
            double len = Math.Sqrt((768 * Math.Pow(e, 2) * Math.Pow(c, 3)) * Math.Pow((1 - Math.Pow(v, 2)), 2) / (Math.Pow(Math.PI, 2) * γ * b * Math.Pow(E, 2) * Math.Pow(Math.Cos(φ) - (1 - Math.Sin(φ)) * Math.Tan(φ), 3)));
            return Math.Round(len * 1000, 2);
        }

        /// <summary>
        /// 倾倒型倾倒式和倾倒压碎式崩塌裂缝临界宽度判据
        /// </summary>
        /// <param name="h_s">危岩单体高度</param>
        /// <param name="X_s">危岩单体重心距离底部旋转点的水平距离</param>
        /// <param name="Y_s">危岩单体重心距离底部旋转点的垂直距离</param>
        /// <param name="info"></param>
        /// <returns></returns>
        private double RockfallWarningModelFunctionTwo(string h_s, string X_s, string Y_s, ref string info)
        {
            info = string.Empty;

            #region 参数检查
            if (string.IsNullOrEmpty(h_s) || string.IsNullOrEmpty(X_s) || string.IsNullOrEmpty(Y_s))
            {
                info = "参数不全，请检查参数！";
                return -1;
            }
            #endregion

            double h;
            double X;
            double Y;

            try
            {
                h = Convert.ToDouble(h_s);
                X = Convert.ToDouble(X_s);
                Y = Convert.ToDouble(Y_s);
            }
            catch (Exception ex)
            {
                info = "参数错误：" + ex.Message;
                return -1;
            }

            //裂缝临界宽度判据
            double len = h * (X / Y);
            return Math.Round(len * 1000, 2);
        }

        /// <summary>
        /// 倾倒压碎式（与母岩未脱离）裂缝临界宽度判据
        /// </summary>
        /// <param name="γ_s">岩体容重</param>
        /// <param name="e_s">危岩单体重心到后缘裂缝底部的水平距离</param>
        /// <param name="v_s">岩体泊松比</param>
        /// <param name="L_s">危岩单体高度</param>
        /// <param name="G_s">危岩单体自重</param>
        /// <param name="b_s">危岩单体宽度</param>
        /// <param name="c_s">底部软弱层内聚力</param>
        /// <param name="σ_s">单位单体下部软弱岩体潜在剪切段破裂面正应力</param>
        /// <param name="φ_s">底部软弱层内摩擦角</param>
        /// <param name="σt_s">危岩单体岩体抗拉强度</param>
        /// <param name="E_s">岩体弹性模量</param>
        /// <param name="info">消息</param>
        /// <returns></returns>
        private double RockfallWarningModelFunctionThree(string γ_s, string e_s, string v_s, string L_s, string G_s, string b_s, string c_s, string σ_s, string φ_s, string σt_s, string E_s, ref string info)
        {
            info = string.Empty;

            #region 参数检查
            if (string.IsNullOrEmpty(γ_s) || string.IsNullOrEmpty(e_s) || string.IsNullOrEmpty(v_s) || string.IsNullOrEmpty(L_s) || string.IsNullOrEmpty(G_s) || string.IsNullOrEmpty(b_s) || string.IsNullOrEmpty(c_s) || string.IsNullOrEmpty(σ_s) || string.IsNullOrEmpty(φ_s) || string.IsNullOrEmpty(σt_s) || string.IsNullOrEmpty(E_s))
            {
                info = "参数不全，请检查参数！";
                return -1;
            }
            #endregion

            double γ;
            double e;
            double v;
            double L;
            double G;
            double b;
            double c;
            double σ;
            double φ;
            double σt;
            double E;

            try
            {
                γ = Convert.ToDouble(γ_s);
                e = Convert.ToDouble(e_s);
                v = Convert.ToDouble(v_s);
                L = Convert.ToDouble(L_s);
                G = Convert.ToDouble(G_s);
                b = Convert.ToDouble(b_s);
                c = Convert.ToDouble(c_s);
                σ = Convert.ToDouble(σ_s);
                φ = Convert.ToDouble(φ_s) * Math.PI / 180;
                σt = Convert.ToDouble(σt_s);
                E = Convert.ToDouble(E_s);
            }
            catch (Exception ex)
            {
                info = "参数错误：" + ex.Message;
                return -1;
            }

            double u1 = Math.Sqrt(96) * γ * e * (1 - v * v);
            double u2 = (G * b - ((2 * (c + σ * Math.Tan(φ))) / (Math.Cos(φ))) * (b * b)) / (σt);
            double u3 = 0;
            if (u2 > 0)
            {
                u3 = Math.Pow(u2, 1.0 / 3);
            }
            else
            {
                u3 = -Math.Pow(-u2, 1.0 / 3);
            }
            double u4 = Math.Pow((L - u3), 3.0 / 2);
            double d = Math.PI * E * Math.Sqrt(b);

            //裂缝临界宽度判据
            double len = u1 * u4 / d;
            return Math.Round(len * 1000, 2);
        }

        /// <summary>
        /// 错断式崩塌连通率判据
        /// </summary>
        /// <param name="G_s">危岩单体自重</param>
        /// <param name="b_s">危岩单体宽度</param>
        /// <param name="τ0_s">岩石抗剪强度</param>
        /// <param name="l_s">危岩单体高度</param>
        /// <param name="Rt_s">岩体单轴抗压强度</param>
        /// <param name="info">消息</param>
        /// <returns></returns>
        private double RockfallWarningModelFunctionFour(string G_s, string b_s, string τ0_s, string l_s, string Rt_s, ref string info)
        {
            info = string.Empty;

            #region 参数检查
            if (string.IsNullOrEmpty(G_s) || string.IsNullOrEmpty(b_s) || string.IsNullOrEmpty(τ0_s) || string.IsNullOrEmpty(l_s) || string.IsNullOrEmpty(Rt_s))
            {
                info = "参数不全，请检查参数！";
                return -1;
            }
            #endregion

            double G;
            double b;
            double τ0;
            double l;
            double Rt;

            try
            {
                G = Convert.ToDouble(G_s);
                b = Convert.ToDouble(b_s);
                τ0 = Convert.ToDouble(τ0_s);
                l = Convert.ToDouble(l_s);
                Rt = Convert.ToDouble(Rt_s);
            }
            catch (Exception ex)
            {
                info = "参数错误：" + ex.Message;
                return -1;
            }

            //连通率判据
            double len = (G - Math.Sqrt((G * b * Math.Pow(τ0, 2)) / Rt)) / (τ0 * l);
            return len;
        }
        #endregion


    }
}

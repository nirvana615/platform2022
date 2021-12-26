using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using COM;
using DAL;
using MODEL;

namespace SERVICE.Controllers
{
    /// <summary>
    /// 自动化监测数据
    /// </summary>
    public class DataController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(DataController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取监测点预设时间范围监测数据
        /// </summary>
        /// <param name="id">监测点id</param>
        /// <param name="type">监测点类型</param>
        /// <param name="predatetime">预设时间范围编码</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetAutoDatabyPreDateTime(int id, string type, string predatetime, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                //获取时间范围
                string datetime = GetDateTimebyPre(Convert.ToInt16(predatetime));
                if (!string.IsNullOrEmpty(datetime))
                {
                    return GetAutoDatabyDateTime(id, type, datetime, userbsms);
                }
            }
            else
            {
                //验权失败
            }

            return string.Empty;
        }

        /// <summary>
        /// 获取监测点自定义时间范围监测数据
        /// </summary>
        /// <param name="id">监测点id</param>
        /// <param name="type">监测点类型</param>
        /// <param name="customdatetime">自定义时间范围</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetAutoDatabyCustomDateTime(int id, string type, string customdatetime, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                try
                {
                    //获取时间范围
                    string[] timerange = customdatetime.Replace(" - ", ";").Split(new char[] { ';' });
                    return GetAutoDatabyDateTime(id, type, string.Format("(gcsj>='{0}' AND gcsj<'{1}')", timerange[0], timerange[1]), userbsms);
                }
                catch 
                { }
            }
            else
            {
                //验权失败
            }

            return string.Empty;
        }








        #region 方法
        /// <summary>
        /// 获取监测点设备指定时间范围数据
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        private string GetAutoDatabyDateTime(int id, string type, string time, string userbsms)
        {
            if (type == MODEL.EnumMonitor.AutoDeviceType.GNSS.GetRemark())
            {
                #region GNSS
                //根据监测点号获取设备
                MapMonitorDevice mapMonitorDevice = ParseMonitorHelper.ParseMapMonitorDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_monitor_device WHERE monitorid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                if (mapMonitorDevice != null)
                {
                    //获取设备
                    Device device = ParseMonitorHelper.ParseDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE id={0} AND sblx={1} AND bsm{2} AND ztm={3}", mapMonitorDevice.DeviceId, (int)MODEL.EnumMonitor.AutoDeviceType.GNSS, userbsms, (int)MODEL.Enum.State.InUse)));
                    if (device != null)
                    {
                        MapDeviceValue mapDeviceValue = ParseMonitorHelper.ParseMapDeviceValue(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_basevalue WHERE deviceid={0} AND ztm={1}", device.Id, (int)MODEL.Enum.State.InUse)));

                        if (mapDeviceValue != null)
                        {
                            //获取初始值
                            Value value = ParseMonitorHelper.ParseValue(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_basevalue WHERE id={0} AND ztm={1} AND bsm{2}", mapDeviceValue.ValueId, (int)MODEL.Enum.State.InUse, userbsms)));
                            if (value != null)
                            {
                                GNSSValue gnssValue = JsonHelper.ToObject<GNSSValue>(value.VALUE);
                                if (gnssValue != null)
                                {
                                    // dx dy dxy dh time type
                                    string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT temp.dx,temp.dy,SQRT(temp.dx*temp.dx+temp.dy*temp.dy) dxy,temp.dh,temp.datetime,temp.datatype FROM (SELECT (x-CAST((SELECT value->>'X' FROM monitor_basevalue WHERE id={0} AND ztm={1}) as numeric))*1000 dx,(y-CAST((SELECT value->>'Y' FROM monitor_basevalue WHERE id={0} AND ztm={1}) as numeric))*1000 dy,(h-CAST((SELECT value->>'H' FROM monitor_basevalue WHERE id={0} AND ztm={1}) as numeric))*1000 dh,gcsj datetime,lb datatype FROM monitor_data_gnss WHERE code='{2}' AND {3} AND bsm{4} ORDER BY gcsj) temp", value.Id, (int)MODEL.Enum.State.InUse, device.Code, time, userbsms));
                                    if (!string.IsNullOrEmpty(data))
                                    {
                                        string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                                        if (rows.Length > 0)
                                        {
                                            GNSSMonitor gnssMonitor = new GNSSMonitor();

                                            #region 监测数据
                                            List<GNSSDelta> gnssdeltas = new List<GNSSDelta>();
                                            List<double> xs = new List<double>();//全部δx值
                                            List<double> ys = new List<double>();//全部δy值
                                            List<double> xys = new List<double>();//全部δxy值(水平位移)
                                            List<double> hs = new List<double>();//全部δh值(垂直位移)
                                            for (int i = 0; i < rows.Length; i++)
                                            {
                                                GNSSDelta gnssdelta = ParseMonitorHelper.ParseGNSSDelta(rows[i], id, 0);
                                                if (gnssdelta != null)
                                                {
                                                    gnssdeltas.Add(gnssdelta);
                                                    xs.Add(gnssdelta.Dx);
                                                    ys.Add(gnssdelta.Dy);
                                                    xys.Add(gnssdelta.Dxy);
                                                    hs.Add(gnssdelta.Dh);
                                                }
                                            }
                                            gnssMonitor.Datas = gnssdeltas;
                                            #endregion

                                            #region 统计量
                                            List<DataStatistics> dslist = new List<DataStatistics>();
                                            dslist.Add(GetAutoDataStatistics("X位移", xs));
                                            dslist.Add(GetAutoDataStatistics("Y位移", ys));
                                            dslist.Add(GetAutoDataStatistics("水平位移", xys));
                                            dslist.Add(GetAutoDataStatistics("垂直位移", hs));
                                            gnssMonitor.Statistics = dslist;
                                            #endregion

                                            if ((gnssMonitor.Datas != null) && (gnssMonitor.Statistics != null))
                                            {
                                                return JsonHelper.ToJson(gnssMonitor);
                                            }
                                        }
                                    }
                                }

                            }
                        }
                        else
                        {
                            //无初始值，则将第一条数据作为初始值
                            GNSS gnss = ParseMonitorHelper.ParseGNSS(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_data_gnss WHERE code='{0}' AND bsm{1} ORDER BY gcsj ASC LIMIT 1", device.Code, userbsms)));
                            if (gnss != null)
                            {
                                // dx dy dxy dh time type
                                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT temp.dx,temp.dy,SQRT(temp.dx*temp.dx+temp.dy*temp.dy) dxy,temp.dh,temp.datetime,temp.datatype FROM (SELECT (x-({0}))*1000 dx,(y-({1}))*1000 dy,(h-({2}))*1000 dh,gcsj datetime,lb datatype FROM monitor_data_gnss WHERE code='{3}' AND {4} AND bsm{5} ORDER BY gcsj) temp", gnss.X, gnss.Y, gnss.H, device.Code, time, userbsms));

                                if (!string.IsNullOrEmpty(data))
                                {
                                    string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                                    if (rows.Length > 0)
                                    {
                                        GNSSMonitor gnssMonitor = new GNSSMonitor();

                                        #region 监测数据
                                        List<GNSSDelta> gnssdeltas = new List<GNSSDelta>();
                                        List<double> xs = new List<double>();//全部δx值
                                        List<double> ys = new List<double>();//全部δy值
                                        List<double> xys = new List<double>();//全部δxy值(水平位移)
                                        List<double> hs = new List<double>();//全部δh值(垂直位移)
                                        for (int i = 0; i < rows.Length; i++)
                                        {
                                            GNSSDelta gnssdelta = ParseMonitorHelper.ParseGNSSDelta(rows[i], id, 0);
                                            if (gnssdelta != null)
                                            {
                                                gnssdeltas.Add(gnssdelta);
                                                xs.Add(gnssdelta.Dx);
                                                ys.Add(gnssdelta.Dy);
                                                xys.Add(gnssdelta.Dxy);
                                                hs.Add(gnssdelta.Dh);
                                            }
                                        }
                                        gnssMonitor.Datas = gnssdeltas;
                                        #endregion

                                        #region 统计量
                                        List<DataStatistics> dslist = new List<DataStatistics>();
                                        dslist.Add(GetAutoDataStatistics("X位移", xs));
                                        dslist.Add(GetAutoDataStatistics("Y位移", ys));
                                        dslist.Add(GetAutoDataStatistics("水平位移", xys));
                                        dslist.Add(GetAutoDataStatistics("垂直位移", hs));
                                        gnssMonitor.Statistics = dslist;
                                        #endregion

                                        if ((gnssMonitor.Datas != null) && (gnssMonitor.Statistics != null))
                                        {
                                            return JsonHelper.ToJson(gnssMonitor);
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
                #endregion
            }
            else if (type == MODEL.EnumMonitor.AutoDeviceType.LF.GetRemark())
            {
                #region 裂缝
                MapMonitorDevice mapMonitorDevice = ParseMonitorHelper.ParseMapMonitorDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_monitor_device WHERE monitorid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                if (mapMonitorDevice != null)
                {
                    Device device = ParseMonitorHelper.ParseDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE id={0} AND sblx={1} AND bsm{2} AND ztm={3}", mapMonitorDevice.DeviceId, (int)MODEL.EnumMonitor.AutoDeviceType.LF, userbsms, (int)MODEL.Enum.State.InUse)));
                    if (device != null)
                    {
                        //TODO获取初始值

                        string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT value,gcsj,lb FROM monitor_data_lf WHERE code='{0}' AND {1} AND bsm{2} ORDER BY gcsj", device.Code, time, userbsms));
                        if (!string.IsNullOrEmpty(data))
                        {
                            string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                            if (rows.Length > 0)
                            {
                                LFMonitor lfMonitor = new LFMonitor();

                                List<LFDelta> lfdeltas = new List<LFDelta>();
                                List<double> lens = new List<double>();//全部变形量
                                for (int i = 0; i < rows.Length; i++)
                                {
                                    LFDelta lfdelta = ParseMonitorHelper.ParseLFDelta(rows[i], id, 0);
                                    if (lfdelta != null)
                                    {
                                        lfdeltas.Add(lfdelta);
                                        lens.Add(lfdelta.Dv);
                                    }
                                }

                                lfMonitor.Datas = lfdeltas;
                                lfMonitor.Statistics = new List<DataStatistics> { GetAutoDataStatistics("变形量", lens) };

                                if ((lfMonitor.Datas != null) && (lfMonitor.Statistics != null))
                                {
                                    return JsonHelper.ToJson(lfMonitor);
                                }
                            }
                        }
                    }
                }
                #endregion
            }
            else if (type == MODEL.EnumMonitor.AutoDeviceType.QJ.GetRemark())
            {
                #region 倾角
                MapMonitorDevice mapMonitorDevice = ParseMonitorHelper.ParseMapMonitorDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_monitor_device WHERE monitorid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                if (mapMonitorDevice != null)
                {
                    Device device = ParseMonitorHelper.ParseDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE id={0} AND sblx={1} AND bsm{2} AND ztm={3}", mapMonitorDevice.DeviceId, (int)MODEL.EnumMonitor.AutoDeviceType.QJ, userbsms, (int)MODEL.Enum.State.InUse)));
                    if (device != null)
                    {
                        //TODO获取初始值

                        string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT x,y,z,gcsj,lb FROM monitor_data_qj WHERE code='{0}' AND {1} AND bsm{2} ORDER BY gcsj", device.Code, time, userbsms));
                        if (!string.IsNullOrEmpty(data))
                        {
                            string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                            if (rows.Length > 0)
                            {
                                QJMonitor qjMonitor = new QJMonitor();

                                List<QJDelta> qjdeltas = new List<QJDelta>();
                                List<double> xs = new List<double>();
                                List<double> ys = new List<double>();
                                List<double> zs = new List<double>();

                                for (int i = 0; i < rows.Length; i++)
                                {
                                    QJDelta qjdelta = ParseMonitorHelper.ParseQJDelta(rows[i], id, 0);
                                    if (qjdelta != null)
                                    {
                                        qjdeltas.Add(qjdelta);
                                        xs.Add(qjdelta.Dx);
                                        ys.Add(qjdelta.Dy);
                                        if (qjdelta.Dz != null)
                                        {
                                            zs.Add(Convert.ToDouble(qjdelta.Dz));
                                        }
                                    }
                                }

                                qjMonitor.Datas = qjdeltas;

                                List<DataStatistics> dslist = new List<DataStatistics>();
                                dslist.Add(GetAutoDataStatistics("x方向", xs));
                                dslist.Add(GetAutoDataStatistics("y方向", ys));
                                if (zs.Count > 0)
                                {
                                    dslist.Add(GetAutoDataStatistics("z方向", zs));
                                }
                                qjMonitor.Statistics = dslist;

                                if ((qjMonitor.Datas != null) && (qjMonitor.Statistics != null))
                                {
                                    return JsonHelper.ToJson(qjMonitor);
                                }
                            }
                        }
                    }
                }
                #endregion
            }
            else if (type == MODEL.EnumMonitor.AutoDeviceType.SBWY.GetRemark())
            {
                #region 深部位移
                //根据监测点号获取设备
                MapMonitorDevice mapMonitorDevice = ParseMonitorHelper.ParseMapMonitorDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_monitor_device WHERE monitorid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                if (mapMonitorDevice != null)
                {
                    //获取设备
                    Device device = ParseMonitorHelper.ParseDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE id={0} AND sblx={1} AND bsm{2} AND ztm={3}", mapMonitorDevice.DeviceId, (int)MODEL.EnumMonitor.AutoDeviceType.SBWY, userbsms, (int)MODEL.Enum.State.InUse)));
                    if (device != null)
                    {
                        string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT x,y,z,gcsj,lb FROM monitor_data_sbwy WHERE code='{0}' AND bsm{1} AND {2} ORDER BY gcsj", device.Code, userbsms, time));
                        if (!string.IsNullOrEmpty(data))
                        {
                            string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                            if (rows.Length > 0)
                            {
                                SBWYMonitor sbwyMonitor = new SBWYMonitor();

                                List<SBWYDelta> sbwydeltas = new List<SBWYDelta>();
                                List<double> xs = new List<double>();
                                List<double> ys = new List<double>();

                                for (int i = 0; i < rows.Length; i++)
                                {
                                    SBWYDelta sbwydelta = ParseMonitorHelper.ParseSBWYDelta(rows[i], id, 0);
                                    if (sbwydelta != null)
                                    {
                                        sbwydeltas.Add(sbwydelta);
                                        xs.Add(sbwydelta.X);
                                        ys.Add(sbwydelta.Y);
                                    }
                                }
                                sbwyMonitor.Datas = sbwydeltas;
                                sbwyMonitor.Statistics = new List<DataStatistics> { GetAutoDataStatistics("x方向位移", xs), GetAutoDataStatistics("y方向位移", ys) };

                                if ((sbwyMonitor.Datas != null) && (sbwyMonitor.Statistics != null))
                                {
                                    return JsonHelper.ToJson(sbwyMonitor);
                                }
                            }
                        }
                    }
                }
                #endregion
            }
            else if (type == MODEL.EnumMonitor.AutoDeviceType.WATER.GetRemark())
            {
                #region 地下水位
                /*
                 * 绝对地下水位=孔口高程-(孔深-相对于孔底的相对水位)
                 */

                //获取监测点
                Monitor monitor = ParseMonitorHelper.ParseMonitor(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_monitor WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse)));
                if (monitor != null)
                {
                    //根据监测点号获取设备
                    MapMonitorDevice mapMonitorDevice = ParseMonitorHelper.ParseMapMonitorDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_monitor_device WHERE monitorid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                    if (mapMonitorDevice != null)
                    {
                        //获取设备
                        Device device = ParseMonitorHelper.ParseDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE id={0} AND sblx={1} AND bsm{2} AND ztm={3}", mapMonitorDevice.DeviceId, (int)MODEL.EnumMonitor.AutoDeviceType.WATER, userbsms, (int)MODEL.Enum.State.InUse)));
                        if (device != null)
                        {
                            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT value,gcsj,lb FROM monitor_data_water WHERE code='{0}' AND bsm{1} AND {2} ORDER BY gcsj", device.Code, userbsms, time));
                            if (!string.IsNullOrEmpty(data))
                            {
                                string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                                if (rows.Length > 0)
                                {
                                    List<WATERDelta> waterdeltas = new List<WATERDelta>();

                                    for (int i = 0; i < rows.Length; i++)
                                    {
                                        WATERDelta waterdelta = ParseMonitorHelper.ParseWATERDelta(rows[i], id, 0, monitor.GC, monitor.KS);
                                        if (waterdelta != null)
                                        {
                                            waterdeltas.Add(waterdelta);
                                        }
                                    }

                                    if (waterdeltas.Count > 0)
                                    {
                                        WATERMonitor watermonitor = new WATERMonitor();
                                        watermonitor.Height = monitor.GC;
                                        watermonitor.Deep = Convert.ToDouble(monitor.KS);
                                        watermonitor.Datas = waterdeltas;

                                        return JsonHelper.ToJson(watermonitor);
                                    }
                                }
                            }
                        }
                    }
                }
                #endregion
            }
            else if (type == MODEL.EnumMonitor.AutoDeviceType.YL.GetRemark())
            {
                #region 应力
                MapMonitorDevice mapMonitorDevice = ParseMonitorHelper.ParseMapMonitorDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_monitor_device WHERE monitorid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                if (mapMonitorDevice != null)
                {
                    Device device = ParseMonitorHelper.ParseDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE id={0} AND sblx={1} AND bsm{2} AND ztm={3}", mapMonitorDevice.DeviceId, (int)MODEL.EnumMonitor.AutoDeviceType.YL, userbsms, (int)MODEL.Enum.State.InUse)));
                    if (device != null)
                    {
                        //TODO获取初始值

                        string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT value,gcsj,lb FROM monitor_data_yl WHERE code='{0}' AND bsm{1} AND {2} ORDER BY gcsj", device.Code, userbsms, time));
                        if (!string.IsNullOrEmpty(data))
                        {
                            string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                            if (rows.Length > 0)
                            {
                                YLMonitor ylMonitor = new YLMonitor();

                                List<YLDelta> yldeltas = new List<YLDelta>();
                                List<double> values = new List<double>();
                                for (int i = 0; i < rows.Length; i++)
                                {
                                    YLDelta yldelta = ParseMonitorHelper.ParseYLDelta(rows[i], id, 0);
                                    if (yldelta != null)
                                    {
                                        yldeltas.Add(yldelta);
                                        values.Add(yldelta.Dv);
                                    }
                                }

                                ylMonitor.Datas = yldeltas;
                                ylMonitor.Statistics = new List<DataStatistics> { GetAutoDataStatistics("变形量", values) };

                                if ((ylMonitor.Datas != null) && (ylMonitor.Statistics != null))
                                {
                                    return JsonHelper.ToJson(ylMonitor);
                                }
                            }
                        }
                    }
                }
                #endregion
            }
            else if (type == MODEL.EnumMonitor.AutoDeviceType.RAIN.GetRemark())
            {
                #region 雨量
                //根据监测点号获取设备
                MapMonitorDevice mapMonitorDevice = ParseMonitorHelper.ParseMapMonitorDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_monitor_device WHERE monitorid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                if (mapMonitorDevice != null)
                {
                    //获取设备
                    Device device = ParseMonitorHelper.ParseDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE id={0} AND sblx={1} AND bsm{2} AND ztm={3}", mapMonitorDevice.DeviceId, (int)MODEL.EnumMonitor.AutoDeviceType.RAIN, userbsms, (int)MODEL.Enum.State.InUse)));
                    if (device != null)
                    {
                        string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT sum(value),substring(gcsj,0,11) FROM monitor_data_rain WHERE code='{0}' AND bsm{1} AND {2} GROUP BY substring(gcsj,0,11) ORDER BY substring(gcsj,0,11)", device.Code, userbsms, time));
                        if (!string.IsNullOrEmpty(data))
                        {
                            string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                            if (rows.Length > 0)
                            {
                                List<RAINDelta> raindeltas = new List<RAINDelta>();
                                for (int i = 0; i < rows.Length; i++)
                                {
                                    RAINDelta raindelta = ParseMonitorHelper.ParseRAINDelta(rows[i], id, 0);
                                    if (raindelta != null)
                                    {
                                        raindeltas.Add(raindelta);
                                    }
                                }

                                if (raindeltas.Count > 0)
                                {
                                    return JsonHelper.ToJson(raindeltas);
                                }
                            }
                        }
                    }
                }
                #endregion
            }

            return string.Empty;
        }

        /// <summary>
        /// 根据预设获取观测时间范围
        /// 大于等于开始时间且小于结束时间
        /// </summary>
        /// <param name="pre"></param>
        /// <returns></returns>
        private string GetDateTimebyPre(int pre)
        {
            if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.Today)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM-dd") + " 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisTen)
            {
                int day = Convert.ToInt32(DateTime.Now.ToString("dd"));
                if ((day > 0) && (day < 11))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                }
                else if ((day > 10) && (day < 21))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM") + "-11 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                }
                else
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                }
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisMonth)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisQuarterly)
            {
                int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
                if ((month > 0) && (month < 4))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-01-01 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                }
                else if ((month > 3) && (month < 7))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-04-01 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                }
                else if ((month > 6) && (month < 10))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-07-01 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                }
                else
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-10-01 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                }
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.FirstHalf)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-01-01 00:00:00", DateTime.Now.ToString("yyyy") + "-06-30 23:59:59");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.SencondHalf)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-07-01 00:00:00", DateTime.Now.ToString("yyyy") + "-12-31 23:59:59");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisYear)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-01-01 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.Yesterday)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 00:00:00", DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 23:59:59");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreTen)
            {
                int year = Convert.ToInt32(DateTime.Now.ToString("yyyy"));
                int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
                int day = Convert.ToInt32(DateTime.Now.ToString("dd"));
                if ((month == 1) && (day >= 1) && (day <= 10))//1月1到十号  上一年
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddYears(-1).ToString("yyyy") + "-12-21 00:00:00", DateTime.Now.AddYears(-1).ToString("yyyy") + "-12-31 23:59:59");
                }
                else
                {
                    if ((day >= 1) && (day <= 10))//  求上个月的
                    {     //(month == 1) ||   month==1  不会进来了
                        if ((month == 2) || (month == 4) || (month == 6) || (month == 8) || (month == 9) || (month == 11))//其实是2
                        {
                            return string.Format("(gcsj>='{0}' AND gcsj<='{1}')", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-21 00:00:00", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-31 23:59:59");
                        }
                        else if ((month == 5) || (month == 7) || (month == 10) || (month == 12))
                        {
                            return string.Format("(gcsj>='{0}' AND gcsj<='{1}')", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-21 00:00:00", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-30 23:59:59");
                        }
                        else//当前是3月才来判断2月的情况
                        {
                            if (year % 4 == 0)
                            {
                                return string.Format("(gcsj>='{0}' AND gcsj<='{1}')", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-21 00:00:00", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-29 23:59:59");
                            }
                            else
                            {
                                return string.Format("(gcsj>='{0}' AND gcsj<='{1}')", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-21 00:00:00", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-28 23:59:59");
                            }
                        }
                    }
                    else if ((day >= 11) && (day <= 20))
                    {
                        return string.Format("(gcsj>='{0}' AND gcsj<='{1}')", DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-10 23:59:59");
                    }
                    else
                    {
                        return string.Format("(gcsj>='{0}' AND gcsj<='{1}')", DateTime.Now.ToString("yyyy-MM") + "-11 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-20 23:59:59");
                    }
                }

            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreMonth)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-01 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-01-01 00:00:00");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreQuarterly)
            {
                int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
                if ((month > 0) && (month < 4))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddYears(-1).ToString("yyyy") + "-10-01 00:00:00", DateTime.Now.ToString("yyyy") + "-01-01 00:00:00");
                }
                else if ((month > 3) && (month < 7))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-01-01 00:00:00", DateTime.Now.ToString("yyyy") + "-04-01 00:00:00");
                }
                else if ((month > 6) && (month < 10))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-04-01 00:00:00", DateTime.Now.ToString("yyyy") + "-07-01 00:00:00");
                }
                else
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-07-01 00:00:00", DateTime.Now.ToString("yyyy") + "-10-01 00:00:00");
                }
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreYear)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddYears(-1).ToString("yyyy") + "-01-01 00:00:00", DateTime.Now.AddYears(-1).ToString("yyyy") + "-12-31 23:59:59");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.All)
            {
                return "gcsj IS NOT NULL";
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.LastMonth)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddDays(-29).ToString("yyyy-MM-dd") + " 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreTenLastDay)//需要上一旬的最后一天的数据
            {
                int year = Convert.ToInt32(DateTime.Now.ToString("yyyy"));
                int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
                int day = Convert.ToInt32(DateTime.Now.ToString("dd"));
                if ((month == 1) && (day >= 1) && (day <= 10))//1月1到十号  上一年
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddYears(-1).ToString("yyyy") + "-12-31 00:00:00", DateTime.Now.AddYears(-1).ToString("yyyy") + "-12-31 23:59:59");
                }
                else
                {
                    if ((day >= 1) && (day <= 10))//  求上个月的
                    {     //(month == 1) ||   month==1  不会进来了
                        if ((month == 2) || (month == 4) || (month == 6) || (month == 8) || (month == 9) || (month == 11))//其实是2
                        {
                            return string.Format("(gcsj>='{0}' AND gcsj<='{1}')", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-31 00:00:00", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-31 23:59:59");
                        }
                        else if ((month == 5) || (month == 7) || (month == 10) || (month == 12))
                        {
                            return string.Format("(gcsj>='{0}' AND gcsj<='{1}')", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-30 00:00:00", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-30 23:59:59");
                        }
                        else//当前是3月才来判断2月的情况
                        {
                            if (year % 4 == 0)
                            {
                                return string.Format("(gcsj>='{0}' AND gcsj<='{1}')", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-29 00:00:00", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-29 23:59:59");
                            }
                            else
                            {
                                return string.Format("(gcsj>='{0}' AND gcsj<='{1}')", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-28 00:00:00", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-28 23:59:59");
                            }
                        }
                    }
                    else if ((day >= 11) && (day <= 20))
                    {
                        return string.Format("(gcsj>='{0}' AND gcsj<='{1}')", DateTime.Now.ToString("yyyy-MM") + "-10 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-10 23:59:59");
                    }
                    else
                    {
                        return string.Format("(gcsj>='{0}' AND gcsj<='{1}')", DateTime.Now.ToString("yyyy-MM") + "-20 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-20 23:59:59");
                    }
                }
            }


            return string.Empty;
        }

        /// <summary>
        /// 计算一组数据统计量
        /// 最小值、最大值、平均值、标准差
        /// </summary>
        /// <param name="name"></param>
        /// <param name="datas"></param>
        /// <returns></returns>
        private DataStatistics GetAutoDataStatistics(string name, List<double> datas)
        {
            DataStatistics ds = new DataStatistics();
            ds.Name = name;
            ds.Min = Math.Round(datas.Min(), 3);
            ds.Max = Math.Round(datas.Max(), 3);
            ds.Avg = Math.Round(datas.Average(), 3);
            ds.Sd = Math.Round(COM.StatisticsHelper.STDEP(datas), 3);
            return ds;
        }
        #endregion


    }
}

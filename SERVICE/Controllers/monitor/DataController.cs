using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
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

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
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

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
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

        /// <summary>
        /// 获取待处理监测点预设时间范围监测数据
        /// </summary>
        /// <param name="id">监测点id</param>
        /// <param name="type">监测点类型</param>
        /// <param name="predatetime">预设时间范围编码</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetEditAutoDatabyPreDateTime(int id, string type, string predatetime, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                //获取时间范围
                string datetime = GetDateTimebyPre(Convert.ToInt16(predatetime));
                if (!string.IsNullOrEmpty(datetime))
                {
                    return GetEditAutoDatabyDateTime(id, type, datetime, userbsms);
                }
            }
            else
            {
                //验权失败
            }

            return string.Empty;
        }

        /// <summary>
        /// 获取待处理监测点自定义时间范围监测数据
        /// </summary>
        /// <param name="id">监测点id</param>
        /// <param name="type">监测点类型</param>
        /// <param name="customdatetime">自定义时间范围</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetEditAutoDatabyCustomDateTime(int id, string type, string customdatetime, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                try
                {
                    //获取时间范围
                    string[] timerange = customdatetime.Replace(" - ", ";").Split(new char[] { ';' });
                    return GetEditAutoDatabyDateTime(id, type, string.Format("(gcsj>='{0}' AND gcsj<'{1}')", timerange[0], timerange[1]), userbsms);
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

        /// <summary>
        /// 编辑待处理监测数据
        /// 剔除监测数据
        /// </summary>
        /// <param name="id">监测点id</param>
        /// <param name="type">监测点类型</param>
        /// <param name="datas">剔除监测数据id</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string DeleteEditAutoData(int id, string type, string deletedata, string cookie)
        {
            string[] dataids = deletedata.Split(',');
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int Counts = 0;
                try
                {
                    #region 获取数据表及设备类型
                    string table = string.Empty;
                    if (type == MODEL.EnumMonitor.AutoDeviceType.GNSS.GetRemark())
                    {
                        table = "monitor_data_gnss";
                    }
                    else if (type == MODEL.EnumMonitor.AutoDeviceType.LF.GetRemark())
                    {
                        table = "monitor_data_lf";
                    }
                    else if (type == MODEL.EnumMonitor.AutoDeviceType.QJ.GetRemark())
                    {
                        table = "monitor_data_qj";
                    }
                    else if (type == MODEL.EnumMonitor.AutoDeviceType.SBWY.GetRemark())
                    {
                        table = "monitor_data_sbwy";
                    }
                    else if (type == MODEL.EnumMonitor.AutoDeviceType.WATER.GetRemark())
                    {
                        table = "monitor_data_water";
                    }
                    else if (type == MODEL.EnumMonitor.AutoDeviceType.YL.GetRemark())
                    {
                        table = "monitor_data_yl";
                    }
                    else if (type == MODEL.EnumMonitor.AutoDeviceType.RAIN.GetRemark())
                    {
                        table = "monitor_data_rain";
                    }
                    #endregion
                    if (dataids.Length > 0)
                    {

                        for (var i = 0; i < dataids.Length; i++)
                        {
                            int count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE {0} SET lb={1} WHERE id={2}", table, MODEL.EnumMonitor.AutoDataFlag.Less.GetRemark(), Convert.ToInt32(dataids[i])));
                            if(count>0)
                            {
                                Counts+=1;
                            }
                            
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "已删除数据", string.Empty));
                    }

                }
                catch
                {
                    //
                }

                if (Counts>0)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "已删除数据", string.Empty));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除失败", string.Empty));
                }
            }
            else
            {
                return "验权失败！";
            }
        }


        /// <summary>
        /// 获取待分析监测点预设时间范围监测数据(除降雨外)
        /// </summary>
        /// <param name="id">监测点id</param>
        /// <param name="type">监测点类型</param>
        /// <param name="predatetime">预设时间范围编码</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetAnalysisAutoDatabyPreDateTime(string monitros, string predatetime, string cookie)
        {
            JObject monitorJson = (JObject)JsonConvert.DeserializeObject(monitros);
            JArray monitorArray = (JArray)monitorJson["monitorstr"];
            
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                //获取时间范围
                string datetime = GetDateTimebyPre(Convert.ToInt16(predatetime));
                if (!string.IsNullOrEmpty(datetime))
                {

                    return GetAnalysisAutoDatabyDateTime(monitorArray, datetime, userbsms);
                }
            }
            else
            {
                //验权失败
            }
            return string.Empty;
        }

        /// <summary>
        /// 获取待分析监测点预设时间范围监测数据(除降雨外)
        /// </summary>
        /// <param name="id">监测点id</param>
        /// <param name="type">监测点类型</param>
        /// <param name="customdatetime">自定义时间范围</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetAnalysisAutoDatabyCustomDateTime(string monitros, string customdatetime, string cookie)
        {
            JObject monitorJson = (JObject)JsonConvert.DeserializeObject(monitros);
            JArray monitorArray = (JArray)monitorJson["monitorstr"];
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                try
                {
                    //获取时间范围
                    string[] timerange = customdatetime.Replace(" - ", ";").Split(new char[] { ';' });
                    
                    return GetAnalysisAutoDatabyDateTime(monitorArray, string.Format("(gcsj>='{0}' AND gcsj<'{1}')", timerange[0], timerange[1]), userbsms);
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

        /// <summary>
        /// 获取待分析监测点预设时间范围降雨数据
        /// </summary>
        /// <param name="id">监测点id</param>
        /// <param name="type">监测点类型</param>
        /// <param name="predatetime">预设时间范围编码</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetAnalysisRainDatabyPreDateTime(int id, string type, string title, string predatetime, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                //获取时间范围
                string datetime = GetDateTimebyPre(Convert.ToInt16(predatetime));
                if (!string.IsNullOrEmpty(datetime))
                {

                    return GetAnalysisRainDatabyDateTime(id,type, title, datetime, userbsms);
                }
            }
            else
            {
                //验权失败
            }
            return string.Empty;
        }

        /// <summary>
        /// 获取待分析监测点预设时间范围降雨数据
        /// </summary>
        /// <param name="id">监测点id</param>
        /// <param name="type">监测点类型</param>
        /// <param name="customdatetime">自定义时间范围</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetAnalysisRainDatabyCustomDateTime(int id, string type,string title, string customdatetime, string cookie)
        {
            
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                try
                {
                    //获取时间范围
                    string[] timerange = customdatetime.Replace(" - ", ";").Split(new char[] { ';' });

                    return GetAnalysisRainDatabyDateTime(id,type,title, string.Format("(gcsj>='{0}' AND gcsj<'{1}')", timerange[0], timerange[1]), userbsms);
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
        /// 获取待处理监测点设备指定时间范围数据(除降雨外)
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        private string GetEditAutoDatabyDateTime(int id, string type, string time, string userbsms)
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
                                    string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT temp.id,0 ,temp.dx,temp.dy,SQRT(temp.dx*temp.dx+temp.dy*temp.dy) dxy,temp.dh,temp.datetime,temp.datatype FROM (SELECT id,(x-CAST((SELECT value->>'X' FROM monitor_basevalue WHERE id={0} AND ztm={1}) as numeric))*1000 dx,(y-CAST((SELECT value->>'Y' FROM monitor_basevalue WHERE id={0} AND ztm={1}) as numeric))*1000 dy,(h-CAST((SELECT value->>'H' FROM monitor_basevalue WHERE id={0} AND ztm={1}) as numeric))*1000 dh,gcsj datetime,lb datatype FROM monitor_data_gnss WHERE code='{2}' AND {3} AND bsm{4} ORDER BY gcsj) temp", value.Id, (int)MODEL.Enum.State.InUse, device.Code, time, userbsms));
                                    if (!string.IsNullOrEmpty(data))
                                    {
                                        string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
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
                                                GNSSDelta gnssdelta = ParseMonitorHelper.ParseGNSSDelta(rows[i]);
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
                                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT temp.id,0,temp.dx,temp.dy,SQRT(temp.dx*temp.dx+temp.dy*temp.dy) dxy,temp.dh,temp.datetime,temp.datatype FROM (SELECT id,(x-({0}))*1000 dx,(y-({1}))*1000 dy,(h-({2}))*1000 dh,gcsj datetime,lb datatype FROM monitor_data_gnss WHERE code='{3}' AND {4} AND bsm{5} ORDER BY gcsj) temp", gnss.X, gnss.Y, gnss.H, device.Code, time, userbsms));

                                if (!string.IsNullOrEmpty(data))
                                {
                                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
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
                                            GNSSDelta gnssdelta = ParseMonitorHelper.ParseGNSSDelta(rows[i]);
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

                        string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT id,0,value,gcsj,lb FROM monitor_data_lf WHERE code='{0}' AND {1} AND bsm{2} ORDER BY gcsj", device.Code, time, userbsms));
                        if (!string.IsNullOrEmpty(data))
                        {
                            string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                            if (rows.Length > 0)
                            {
                                LFMonitor lfMonitor = new LFMonitor();

                                List<LFDelta> lfdeltas = new List<LFDelta>();
                                List<double> lens = new List<double>();//全部变形量
                                for (int i = 0; i < rows.Length; i++)
                                {
                                    LFDelta lfdelta = ParseMonitorHelper.ParseLFDelta(rows[i]);
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

                        string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT id,0,x,y,z,gcsj,lb FROM monitor_data_qj WHERE code='{0}' AND {1} AND bsm{2} ORDER BY gcsj", device.Code, time, userbsms));
                        if (!string.IsNullOrEmpty(data))
                        {
                            string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                            if (rows.Length > 0)
                            {
                                QJMonitor qjMonitor = new QJMonitor();

                                List<QJDelta> qjdeltas = new List<QJDelta>();
                                List<double> xs = new List<double>();
                                List<double> ys = new List<double>();
                                List<double> zs = new List<double>();

                                for (int i = 0; i < rows.Length; i++)
                                {
                                    QJDelta qjdelta = ParseMonitorHelper.ParseQJDelta(rows[i]);
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
                        string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT id,0,x,y,z,gcsj,lb FROM monitor_data_sbwy WHERE code='{0}' AND bsm{1} AND {2} ORDER BY gcsj", device.Code, userbsms, time));
                        if (!string.IsNullOrEmpty(data))
                        {
                            string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                            if (rows.Length > 0)
                            {
                                SBWYMonitor sbwyMonitor = new SBWYMonitor();

                                List<SBWYDelta> sbwydeltas = new List<SBWYDelta>();
                                List<double> xs = new List<double>();
                                List<double> ys = new List<double>();

                                for (int i = 0; i < rows.Length; i++)
                                {
                                    SBWYDelta sbwydelta = ParseMonitorHelper.ParseSBWYDelta(rows[i]);
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
                            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT id,0,value,gcsj,lb FROM monitor_data_water WHERE code='{0}' AND bsm{1} AND {2} ORDER BY gcsj", device.Code, userbsms, time));
                            if (!string.IsNullOrEmpty(data))
                            {
                                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                                if (rows.Length > 0)
                                {
                                    List<WATERDelta> waterdeltas = new List<WATERDelta>();

                                    for (int i = 0; i < rows.Length; i++)
                                    {
                                        WATERDelta waterdelta = ParseMonitorHelper.ParseWATERDelta(rows[i], monitor.GC, monitor.KS);
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

                        string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT id,0,value,gcsj,lb FROM monitor_data_yl WHERE code='{0}' AND bsm{1} AND {2} ORDER BY gcsj", device.Code, userbsms, time));
                        if (!string.IsNullOrEmpty(data))
                        {
                            string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                            if (rows.Length > 0)
                            {
                                YLMonitor ylMonitor = new YLMonitor();

                                List<YLDelta> yldeltas = new List<YLDelta>();
                                List<double> values = new List<double>();
                                for (int i = 0; i < rows.Length; i++)
                                {
                                    YLDelta yldelta = ParseMonitorHelper.ParseYLDelta(rows[i]);
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
                            string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
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
        /// 获取待分析监测点设备指定时间范围数据(除降雨外)
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        private string GetAnalysisAutoDatabyDateTime( JArray monitorArray, string time, string userbsms)
        {
            MonitorDataAnalysis monitorDataAnalysis = new MonitorDataAnalysis();
            monitorDataAnalysis.GNSSAnalysisArr = new List<GNSSAnalysis>();
            monitorDataAnalysis.LFAnalysisArr = new List<LFAnalysis>();
            monitorDataAnalysis.QJAnalysisArr = new List<QJAnalysis>();
            monitorDataAnalysis.SBWYAnalysisArr = new List<SBWYAnalysis>();
            monitorDataAnalysis.WATERAnalysisArr = new List<WATERAnalysis>();
            monitorDataAnalysis.YLAnalysisArr = new List<YLAnalysis>();
            monitorDataAnalysis.RAINAnalysisArr = new List<RAINAnalysis>();
            foreach (var jObject in monitorArray)
            {
                int id = Convert.ToInt16(jObject["id"].ToString());
                string type = jObject["type"].ToString();
                string title = jObject["title"].ToString();
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
                                            string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                                            if (rows.Length > 0)
                                            {
                                                GNSSAnalysis gnssanalysis = new GNSSAnalysis();
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
                                                gnssanalysis.Datas = gnssdeltas;
                                                gnssanalysis.Id = id;
                                                gnssanalysis.Name = title;

                                                #endregion
                                                
                                                if (gnssanalysis.Datas != null)
                                                {
                                                    monitorDataAnalysis.GNSSAnalysisArr.Add(gnssanalysis);
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
                                        string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                                        if (rows.Length > 0)
                                        {
                                            GNSSAnalysis gnssanalysis = new GNSSAnalysis();
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
                                            gnssanalysis.Datas = gnssdeltas;
                                            gnssanalysis.Id = id;
                                            gnssanalysis.Name = title;

                                            #endregion
                                            
                                            if (gnssanalysis.Datas != null)
                                            {
                                                monitorDataAnalysis.GNSSAnalysisArr.Add(gnssanalysis);
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
                                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                                if (rows.Length > 0)
                                {
                                    LFAnalysis lfanalysis = new LFAnalysis();

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

                                    lfanalysis.Datas = lfdeltas;

                                    lfanalysis.Id = id;
                                    lfanalysis.Name = title;

                                    
                                    if (lfanalysis.Datas != null)
                                    {
                                        monitorDataAnalysis.LFAnalysisArr.Add(lfanalysis);
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
                                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                                if (rows.Length > 0)
                                {
                                    QJAnalysis qjanalysis = new QJAnalysis();

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

                                    qjanalysis.Datas = qjdeltas;

                                    qjanalysis.Datas = qjdeltas;

                                    qjanalysis.Id = id;
                                    qjanalysis.Name = title;

                                   
                                    if (qjanalysis.Datas != null)
                                    {
                                        monitorDataAnalysis.QJAnalysisArr.Add(qjanalysis);
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
                                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                                if (rows.Length > 0)
                                {
                                    SBWYAnalysis sbwyanalysis = new SBWYAnalysis();

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
                                    sbwyanalysis.Datas = sbwydeltas;
                                    sbwyanalysis.Id = id;
                                    sbwyanalysis.Name = title;

                                    
                                    if (sbwyanalysis.Datas != null)
                                    {
                                        monitorDataAnalysis.SBWYAnalysisArr.Add(sbwyanalysis);
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
                                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                                    if (rows.Length > 0)
                                    {
                                        WATERAnalysis wateranalysis = new WATERAnalysis();
                                        List<WATERDelta> waterdeltas = new List<WATERDelta>();

                                        for (int i = 0; i < rows.Length; i++)
                                        {
                                            WATERDelta waterdelta = ParseMonitorHelper.ParseWATERDelta(rows[i], id, 0, monitor.GC, monitor.KS);
                                            if (waterdelta != null)
                                            {
                                                waterdeltas.Add(waterdelta);
                                            }
                                        }

                                        wateranalysis.Datas = waterdeltas;
                                        wateranalysis.Id = id;
                                        wateranalysis.Name = title;

                                        
                                        if (wateranalysis.Datas != null)
                                        {
                                            monitorDataAnalysis.WATERAnalysisArr.Add(wateranalysis);
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
                                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                                if (rows.Length > 0)
                                {
                                    YLAnalysis ylanalysis = new YLAnalysis();

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

                                    ylanalysis.Datas = yldeltas;
                                    ylanalysis.Id = id;
                                    ylanalysis.Name = title;

                                    
                                    if (ylanalysis.Datas != null)
                                    {
                                        monitorDataAnalysis.YLAnalysisArr.Add(ylanalysis);
                                    }
                                }
                            }
                        }
                    }
                    #endregion
                }
            }
            return JsonHelper.ToJson(monitorDataAnalysis);
            
        }
        /// <summary>
        /// 获取待分析监测点设备指定时间范围数据(除降雨外)
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        private string GetAnalysisRainDatabyDateTime(int id,string type,string title, string time, string userbsms)
        {
            
            List<RAINAnalysis> RAINAnalysisArr = new List<RAINAnalysis>();
            if (type == "dayrain")
            {
                #region 日雨量
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
                            string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                            if (rows.Length > 0)
                            {
                                RAINAnalysis rainanalysis = new RAINAnalysis();
                                List<RAINDelta> raindeltas = new List<RAINDelta>();
                                for (int i = 0; i < rows.Length; i++)
                                {
                                    RAINDelta raindelta = ParseMonitorHelper.ParseRAINDelta(rows[i], id, 0);
                                    if (raindelta != null)
                                    {
                                        raindeltas.Add(raindelta);
                                    }
                                }

                                rainanalysis.Datas = raindeltas;
                                rainanalysis.Id = id;
                                rainanalysis.Name = title;
                                rainanalysis.Type = type;

                                if (rainanalysis.Datas != null)
                                {
                                    RAINAnalysisArr.Add(rainanalysis);
                                }
                            }
                        }
                    }
                }
                #endregion
            }
            else if (type == "hourrain")
            {
                #region 小时雨量
                //根据监测点号获取设备
                MapMonitorDevice mapMonitorDevice = ParseMonitorHelper.ParseMapMonitorDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_monitor_device WHERE monitorid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                if (mapMonitorDevice != null)
                {
                    //获取设备
                    Device device = ParseMonitorHelper.ParseDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE id={0} AND sblx={1} AND bsm{2} AND ztm={3}", mapMonitorDevice.DeviceId, (int)MODEL.EnumMonitor.AutoDeviceType.RAIN, userbsms, (int)MODEL.Enum.State.InUse)));
                    if (device != null)
                    {
                        string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT sum(value),substring(gcsj,0,14) FROM monitor_data_rain WHERE code='{0}' AND bsm{1} AND {2} GROUP BY substring(gcsj,0,14) ORDER BY substring(gcsj,0,14)", device.Code, userbsms, time));
                        if (!string.IsNullOrEmpty(data))
                        {
                            string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                            if (rows.Length > 0)
                            {
                                RAINAnalysis rainanalysis = new RAINAnalysis();
                                List<RAINDelta> raindeltas = new List<RAINDelta>();
                                for (int i = 0; i < rows.Length; i++)
                                {
                                    RAINDelta raindelta = ParseMonitorHelper.ParseRAINDelta(rows[i], id, 0);
                                    if (raindelta != null)
                                    {
                                        raindeltas.Add(raindelta);
                                    }
                                }

                                rainanalysis.Datas = raindeltas;
                                rainanalysis.Id = id;
                                rainanalysis.Name = title;
                                rainanalysis.Type = type;
                                
                                if (rainanalysis.Datas != null)
                                {
                                    RAINAnalysisArr.Add(rainanalysis);
                                }
                            }
                        }
                    }
                }
                #endregion
            }
            return JsonHelper.ToJson(RAINAnalysisArr);

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
            }//上一月的最后一天。
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreMonthLastDay)
            {
                int year = Convert.ToInt32(DateTime.Now.AddMonths(-1).ToString("yyyy"));
                int month = Convert.ToInt32(DateTime.Now.AddMonths(-1).ToString("MM"));
                if ( (month == 4) || (month == 6) || (month == 9) || (month == 11))//其实是小月
                {

                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-30 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00");
                }
                else if ((month == 1) || (month == 3) || (month == 8) || (month == 5) || (month == 7) || (month == 10) || (month == 12))//大月
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-31 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00");
                }
                else//当前是2月
                {
                    if (year % 4 == 0)
                    {
                        return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-29 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00");
                    }
                    else
                    {
                        return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-28 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00");
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
        
        /// <summary>
        /// 获取项目预设时间范围监测数据
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="predatetime">预设时间范围编码</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetBianXinLiangPreDateTime(int id, string predatetime, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                //获取时间范围
                string datetime = GetDateTimebyPre(Convert.ToInt16(predatetime));
                if (!string.IsNullOrEmpty(datetime))
                {
                    return GetAutoDatabyBianXing(id, datetime, userbsms);
                }
            }
            else
            {
                //验权失败
            }

            return string.Empty;
        }

        /// <summary>
        /// 获取项目自定义时间范围监测数据
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="customdatetime">自定义时间范围</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetBianXinLiangCustomDateTime(int id,  string customdatetime, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                try
                {
                    //获取时间范围
                    string[] timerange = customdatetime.Replace(" - ", ";").Split(new char[] { ';' });
                    return GetAutoDatabyBianXing(id, string.Format("(gcsj>='{0}' AND gcsj<'{1}')", timerange[0], timerange[1]), userbsms);
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
        /// <param name="id"></param>//projectId
        /// <param name="type"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        private string GetAutoDatabyBianXing(int id,  string time, string userbsms)
        {
            //查询BSM吗？
            string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT a.* from monitor_device a,monitor_project  b where a.bsm=b.bsm and b.id={0}  ORDER BY a.sblx", id));

            string gnssCode = "(";//组装code数据
            string lieFenCode = "(";//组装code数据
            string qinjiaoCode = "(";//组装code数据
            string yingLiCode = "(";//组装code数据
            string sbwyCode = "(";//组装code数据
            string dxswCode = "(";//组装code数据
            List<DataBianXinLiang> bianXingList = new List<DataBianXinLiang>();
            if (!string.IsNullOrEmpty(datas))
            {
                string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    Device device = ParseMonitorHelper.ParseDevice(rows[i]);
                    if (device != null)
                    {
                        if (device.SBLX == 0)//GNSS
                        {
                            gnssCode += "'"+device.Code + "',";
                        }
                        else if (device.SBLX == 1)//裂缝
                        {
                            lieFenCode += "'" + device.Code + "',";
                        }
                        else if (device.SBLX == 2)//倾角
                        {
                            qinjiaoCode += "'" + device.Code + "',";
                        }
                        else if (device.SBLX == 3)//应力
                        {
                            yingLiCode += "'" + device.Code + "',";
                        }
                        else if (device.SBLX == 4)//深部位移
                        {
                            sbwyCode += "'" + device.Code + "',";
                        }
                        else if (device.SBLX == 5)//地下水位
                        {
                            dxswCode += "'" + device.Code + "',";
                        }

                    }
                }
                if (gnssCode.Length>1)
                {
                    gnssCode=gnssCode.Substring(0, gnssCode.Length-1)+")";
                    string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT code,cast(SQRT((max(x)-min(x))*(max(x)-min(x))+(max(y)-min(y))*(max(y)-min(y)))*1000 as decimal(10, 3)) bxl,cast((max(h)-min(h))*1000 as decimal(10, 3)) blx2 FROM monitor_data_Gnss WHERE code in {0} AND {1} AND bsm{2}  GROUP BY code ORDER BY bxl desc", gnssCode, time, userbsms));
                    if (!string.IsNullOrEmpty(data))
                    {
                        string[] rows1 = data.Split(new char[] { COM.ConstHelper.rowSplit });
                        if (rows1.Length > 0)
                        {
                          
                            for (int i = 0; i < rows1.Length; i++)
                            {
                                DataBianXinLiang dataBianXinLiang = ParseMonitorHelper.ParseBianXinLiang(rows1[i]);
                                if (dataBianXinLiang != null)
                                {
                                    dataBianXinLiang.remark = "GNSS";
                                    dataBianXinLiang.danWei = "mm";

                                    bianXingList.Add(dataBianXinLiang);
                                }
                            }
                        }
                    }
                }
                if (lieFenCode.Length > 1)
                {
                    lieFenCode = lieFenCode.Substring(0, lieFenCode.Length - 1) + ")";
                    string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT code,cast((max(value)-min(value)) as decimal(10, 3)) as bxl FROM monitor_data_lf WHERE code in {0} AND {1} AND bsm{2}  GROUP BY code ORDER BY bxl desc", lieFenCode, time, userbsms));
                    if (!string.IsNullOrEmpty(data))
                    {
                        string[] rows1 = data.Split(new char[] { COM.ConstHelper.rowSplit });
                        if (rows1.Length > 0)
                        {

                            for (int i = 0; i < rows1.Length; i++)
                            {
                                DataBianXinLiang dataBianXinLiang = ParseMonitorHelper.ParseBianXinLiang(rows1[i]);
                                if (dataBianXinLiang != null)
                                {
                                    dataBianXinLiang.remark = "裂缝";
                                    dataBianXinLiang.danWei = "mm";
                                    bianXingList.Add(dataBianXinLiang);
                                }
                            }
                        }
                    }
                }
                if (qinjiaoCode.Length > 1)//倾角
                {
                    qinjiaoCode = qinjiaoCode.Substring(0, qinjiaoCode.Length - 1) + ")";
                    string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT code,cast((max(x)-min(x))  as decimal(10, 3)) as bxl,cast((max(y)-min(y)) as decimal(10, 3))  as bxl2,cast((max(z)-min(z)) as decimal(10, 3))  as bxl3 FROM monitor_data_qj  WHERE code in {0} AND {1} AND bsm{2}  GROUP BY code ORDER BY bxl desc", qinjiaoCode, time, userbsms));
                    if (!string.IsNullOrEmpty(data))
                    {
                        string[] rows1 = data.Split(new char[] { COM.ConstHelper.rowSplit });
                        if (rows1.Length > 0)
                        {

                            for (int i = 0; i < rows1.Length; i++)
                            {
                                DataBianXinLiang dataBianXinLiang = ParseMonitorHelper.ParseBianXinLiang(rows1[i]);
                                if (dataBianXinLiang != null)
                                {
                                    dataBianXinLiang.remark = "倾角";
                                    dataBianXinLiang.danWei = "°";
                                    bianXingList.Add(dataBianXinLiang);
                                }
                            }
                        }
                    }
                }
                if (yingLiCode.Length > 1)//应力
                {
                    yingLiCode = yingLiCode.Substring(0, yingLiCode.Length - 1) + ")";
                    string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT code,cast((max(value)-min(value))  as decimal(10, 3)) as bxl FROM monitor_data_yl  WHERE code in {0} AND {1} AND bsm{2}  GROUP BY code ORDER BY bxl desc", yingLiCode, time, userbsms));
                    if (!string.IsNullOrEmpty(data))
                    {
                        string[] rows1 = data.Split(new char[] { COM.ConstHelper.rowSplit });
                        if (rows1.Length > 0)
                        {

                            for (int i = 0; i < rows1.Length; i++)
                            {
                                DataBianXinLiang dataBianXinLiang = ParseMonitorHelper.ParseBianXinLiang(rows1[i]);
                                if (dataBianXinLiang != null)
                                {
                                    dataBianXinLiang.remark = "应力";
                                    dataBianXinLiang.danWei = "KN";
                                    bianXingList.Add(dataBianXinLiang);
                                }
                            }
                        }
                    }
                }
                if (sbwyCode.Length > 1)
                {
                    sbwyCode = sbwyCode.Substring(0, sbwyCode.Length - 1) + ")";
                    string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT code,cast((max(x)-min(x))  as decimal(10, 3)) as bxl,cast((max(y)-min(y)) as decimal(10, 3))  as bxl2 FROM monitor_data_sbwy  WHERE code in {0} AND {1} AND bsm{2}  GROUP BY code ORDER BY bxl desc", sbwyCode, time, userbsms));
                    if (!string.IsNullOrEmpty(data))
                    {
                        string[] rows1 = data.Split(new char[] { COM.ConstHelper.rowSplit });
                        if (rows1.Length > 0)
                        {

                            for (int i = 0; i < rows1.Length; i++)
                            {
                                DataBianXinLiang dataBianXinLiang = ParseMonitorHelper.ParseBianXinLiang(rows1[i]);
                                if (dataBianXinLiang != null)
                                {
                                    dataBianXinLiang.remark = "深部位移";
                                    dataBianXinLiang.danWei = "mm";
                                    bianXingList.Add(dataBianXinLiang);
                                }
                            }
                        }
                    }
                }
                if (dxswCode.Length > 1)
                {
                    dxswCode = dxswCode.Substring(0, dxswCode.Length - 1) + ")";
                    string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT code,cast((max(value)-min(value))  as decimal(10, 3)) as bxl FROM monitor_data_water WHERE code in {0} AND {1} AND bsm{2}  GROUP BY code ORDER BY bxl desc", dxswCode, time, userbsms));
                    if (!string.IsNullOrEmpty(data))
                    {
                        string[] rows1 = data.Split(new char[] { COM.ConstHelper.rowSplit });
                        if (rows1.Length > 0)
                        {

                            for (int i = 0; i < rows1.Length; i++)
                            {
                                DataBianXinLiang dataBianXinLiang = ParseMonitorHelper.ParseBianXinLiang(rows1[i]);
                                if (dataBianXinLiang != null)
                                {
                                    dataBianXinLiang.remark = "地下水位";
                                    dataBianXinLiang.danWei = "m";
                                    bianXingList.Add(dataBianXinLiang);
                                }
                            }
                        }
                    }
                }
                if (bianXingList.Count > 0)
                {
                    return JsonHelper.ToJson(bianXingList);
                }
            }

            else
            {

                return string.Empty;
            }
            return string.Empty;
        }
        #endregion
        /// <summary>
        /// 根据项目id获取监测点数据
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetMonitorYueZhi(int id, string jcff, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {


                string sql = "select m.*,c.id as yuZhiId,c.back_track,c.yue_zhi_one,c.yue_zhi_two,c.yue_zhi_three,c.last_update_time from(SELECT a.id, a.jcdbh, a.jcff from monitor_monitor a, monitor_project b where a.bsm= b.bsm and a.jcff!= '6'  and b.id ={0}";
                if (!string.IsNullOrEmpty(jcff))
                {
                    sql = sql + " and a.jcff= " + SQLHelper.UpdateString(jcff);
                }
                sql += ") m left join monitor_alarm_threshold c on m.id = c.monitor_id  ORDER BY m.jcff,m.jcdbh";
                string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql, id));
                if (!string.IsNullOrEmpty(datas))
                {
                    List<MonitorAndThreshold> MonitorAndThresholdList = new List<MonitorAndThreshold>();

                    string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        MonitorAndThreshold monitorAndThreshold = ParseMonitorHelper.ParseMonitorAndThreshold(rows[i]);       //ParseMapProjectWarningInfo(rows[i]);
                        if (monitorAndThreshold != null)
                        {
                            MonitorAndThresholdList.Add(monitorAndThreshold);

                        }
                    }

                    if (MonitorAndThresholdList.Count > 0)
                    {
                        return JsonHelper.ToJson(MonitorAndThresholdList);
                    }
                    else
                    {
                        return string.Empty;
                    }
                }
                else
                {
                    return string.Empty;
                }
            }
            else
            {
                //验权失败
            }

            return string.Empty;
        }

        /// <summary>
        /// 获取项目预设时间范围监测数据
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="predatetime">预设时间范围编码</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetPushDataPreDateTime(int id, string predatetime, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                return GetPushDataby(id, predatetime, userbsms);
                ////获取时间范围
                //string datetime = GetDateTimebyPre(Convert.ToInt16(predatetime));
                //if (!string.IsNullOrEmpty(datetime))
                //{
                //    return GetPushDataby(id, datetime, userbsms);
                //}
            }
            else
            {
                //验权失败
            }

            return string.Empty;
        }



        #region 方法
        /// <summary>
        /// 获取监测点设备指定时间范围数据的推送失败数据
        /// </summary>
        /// <param name="id"></param>//projectId
        /// <param name="type"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        private string GetPushDataby(int id, string time, string userbsms)
        {
            #region 
            //查设备id
            Device device = ParseMonitorHelper.ParseDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT a.* FROM monitor_device a,monitor_map_monitor_device b  WHERE a.id=b.deviceid and b.ztm='1'  and  monitorid={0}  AND bsm{1} AND a.ztm={2}", id,  userbsms, (int)MODEL.Enum.State.InUse)));
            PushDataList pushDataList = new PushDataList();
            if (device != null)
            {
                //TODO获取但当前点好阈值。

                string thresholdValue = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(" select c.id,c.threshold from      monitor_cq_device a ,monitor_cqmap_device_threshold b ,monitor_cq_threshold c  where a.zbh={0} and a.id=b.deviceid and b.thresholdid=c.id and a.ztm='1'  and b.ztm='1' and c.ztm='1' ", SQLHelper.UpdateString(device.Code)));

                if (!string.IsNullOrEmpty(thresholdValue))//阈值。阈值id放进来，修改阈值，启动推送
                {
                    string[] row = thresholdValue.Split(new char[] { COM.ConstHelper.columnSplit });
                    pushDataList.threshold = row[1];
                    pushDataList.thresholdId = Convert.ToInt32(row[0].ToString());
                }
                var gcsj = "2000-01-01";
                //成功的时间，最后一次啊
                string suscessTime = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(" select max(c.uploadtime) from      monitor_cq_device a ,monitor_cqmap_device_success b ,monitor_cq_success c  where  a.zbh={0} and  a.id=b.deviceid and b.successid=c.id and a.ztm='1'  and b.ztm='1'  ", SQLHelper.UpdateString(device.Code)));

                if (!string.IsNullOrEmpty(suscessTime))//阈值。
                {
                    pushDataList.pushNowTime = suscessTime;
                    gcsj = suscessTime;
                }
                //查询失败数据。
                string sql = string.Format(" select * from 		( select c.id,c.zbh,c.sbsj->>'sendTime'  as gcsj ,c.sbsj->>'data' as sendData from      monitor_cq_device a ,monitor_cqmap_device_failure b ,monitor_cq_failure c  where   a.zbh={0} and a.id=b.deviceid and b.failureid=c.id and a.ztm='1'  and b.ztm='1' and c.ztm='1' and c.sbyy='1') tablea where 1=1 and gcsj>{1}  ORDER BY gcsj desc ", SQLHelper.UpdateString(device.Code), SQLHelper.UpdateString(gcsj)); 
                string faildata = PostgresqlHelper.QueryData(pgsqlConnection,sql );

                if (!string.IsNullOrEmpty(faildata))
                {
                    string[] rows = faildata.Split(new char[] { COM.ConstHelper.rowSplit });
                    
                    if (rows.Length > 0)
                    {
                        List<PushFailureData> pushFailureDataList = new List<PushFailureData>();
                        for (int i = 0; i < rows.Length; i++)
                        {
                            PushFailureData pushFailureData = ParseMonitorHelper.ParsePushFailureData(rows[i]);
                            pushFailureDataList.Add(pushFailureData);
                        }
                        pushDataList.pushFailureList = pushFailureDataList;


                    }
                }
                
                if ((pushDataList != null))
                {
                    return JsonHelper.ToJson(pushDataList);
                }
                else
                {
                    return string.Empty;
                }
            }
            return string.Empty;
            #endregion
        }

        /// <summary>
        /// 获取项目自定义时间范围监测数据
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="customdatetime">自定义时间范围</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetPushDataCustomDateTime(int id, string customdatetime, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                try
                {
                    //获取时间范围
                    string[] timerange = customdatetime.Replace(" - ", ";").Split(new char[] { ';' });
                    return GetPushDataby(id, string.Format("(gcsj>='{0}' AND gcsj<'{1}')", timerange[0], timerange[1]), userbsms);
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
        #endregion
    }
}

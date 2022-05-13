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
    /// 系统参数
    /// </summary>
    public class ParameterController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParameterController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        #region 管理参数
        /// <summary>
        /// 坐标系统
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetSRID()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_coordinate WHERE ztm={0}", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(data))
            {
                List<Coordinate> coordinates = new List<Coordinate>();
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    Coordinate coordinate = ParseManageHelper.ParseCoordinate(rows[i]);
                    if (coordinate != null)
                    {
                        coordinates.Add(coordinate);
                    }
                }

                if (coordinates.Count > 0)
                {
                    return JsonHelper.ToJson(coordinates);
                }
            }

            return string.Empty;
        }
        /// <summary>
        /// 高程系统
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetGCXT()
        {
            List<string[]> gcxts = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumModel.ElevationSystem));
            foreach (var value in values)
            {
                string[] gcxt = (EnumExtension.GetRemark((MODEL.EnumModel.ElevationSystem)System.Enum.Parse(typeof(MODEL.EnumModel.ElevationSystem), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                gcxts.Add(gcxt);
            }

            if (gcxts.Count > 0)
            {
                return JsonHelper.ToJson(gcxts);
            }

            return string.Empty;
        }
        /// <summary>
        /// 县级行政区
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetXJXZQ()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_xzq_district WHERE ztm={0}", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(data))
            {
                List<XZQ> xjxzqs = new List<XZQ>();
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    XZQ xjxzq = ParseManageHelper.ParseXZQ(rows[i]);
                    if (xjxzq != null)
                    {
                        xjxzqs.Add(xjxzq);
                    }
                }

                if (xjxzqs.Count > 0)
                {
                    return JsonHelper.ToJson(xjxzqs);
                }
            }

            return string.Empty;
        }
        #endregion


        #region 监测参数
        /// <summary>
        /// 项目类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetXMLX()
        {
            //List<string[]> xmlxs = new List<string[]>();
            //System.Array values = System.Enum.GetValues(typeof(MODEL.Enum.GeodisasterType));
            //foreach (var value in values)
            //{
            //    string[] xmlx = (EnumExtension.GetRemark((MODEL.Enum.GeodisasterType)System.Enum.Parse(typeof(MODEL.Enum.GeodisasterType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
            //    xmlxs.Add(xmlx);
            //}

            //if (xmlxs.Count > 0)
            //{
            //    return JsonHelper.ToJson(xmlxs);
            //}

            return string.Empty;
        }
        /// <summary>
        /// 项目类别
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetXMLB()
        {
            List<string[]> xmlbs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumMonitor.ProjectCategory));
            foreach (var value in values)
            {
                string[] xmlb = (EnumExtension.GetRemark((MODEL.EnumMonitor.ProjectCategory)System.Enum.Parse(typeof(MODEL.EnumMonitor.ProjectCategory), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                xmlbs.Add(xmlb);
            }

            if (xmlbs.Count > 0)
            {
                return JsonHelper.ToJson(xmlbs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 灾害类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetZHLX()
        {
            List<string[]> zhlxs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumMonitor.GeodisasterType));
            foreach (var value in values)
            {
                string[] zhlx = (EnumExtension.GetRemark((MODEL.EnumMonitor.GeodisasterType)System.Enum.Parse(typeof(MODEL.EnumMonitor.GeodisasterType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                zhlxs.Add(zhlx);
            }

            if (zhlxs.Count > 0)
            {
                return JsonHelper.ToJson(zhlxs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 灾害等级
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetZHDJ()
        {
            List<string[]> zhdjs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumMonitor.GeodisasterLevel));
            foreach (var value in values)
            {
                string[] zhdj = (EnumExtension.GetRemark((MODEL.EnumMonitor.GeodisasterLevel)System.Enum.Parse(typeof(MODEL.EnumMonitor.GeodisasterLevel), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                zhdjs.Add(zhdj);
            }

            if (zhdjs.Count > 0)
            {
                return JsonHelper.ToJson(zhdjs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 灾害险情
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetZHXQ()
        {
            List<string[]> zhxqs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumMonitor.GeodisasterDanger));
            foreach (var value in values)
            {
                string[] zhxq = (EnumExtension.GetRemark((MODEL.EnumMonitor.GeodisasterDanger)System.Enum.Parse(typeof(MODEL.EnumMonitor.GeodisasterDanger), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                zhxqs.Add(zhxq);
            }

            if (zhxqs.Count > 0)
            {
                return JsonHelper.ToJson(zhxqs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 预警级别
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetYJJB()
        {
            List<string[]> yjjbs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WarningLevel));
            foreach (var value in values)
            {
                string[] yjjb = (EnumExtension.GetRemark((MODEL.EnumEW.WarningLevel)System.Enum.Parse(typeof(MODEL.EnumEW.WarningLevel), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                yjjbs.Add(yjjb);
            }

            if (yjjbs.Count > 0)
            {
                return JsonHelper.ToJson(yjjbs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 监测级别
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetJCJB()
        {
            List<string[]> jcjbs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumMonitor.MonitorLevel));
            foreach (var value in values)
            {
                string[] jcjb = (EnumExtension.GetRemark((MODEL.EnumMonitor.MonitorLevel)System.Enum.Parse(typeof(MODEL.EnumMonitor.MonitorLevel), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                jcjbs.Add(jcjb);
            }

            if (jcjbs.Count > 0)
            {
                return JsonHelper.ToJson(jcjbs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 监测手段
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetJCSD()
        {
            List<string[]> jcsds = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumMonitor.MonitorMeans));
            foreach (var value in values)
            {
                string[] jcsd = (EnumExtension.GetRemark((MODEL.EnumMonitor.MonitorMeans)System.Enum.Parse(typeof(MODEL.EnumMonitor.MonitorMeans), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                jcsds.Add(jcsd);
            }

            if (jcsds.Count > 0)
            {
                return JsonHelper.ToJson(jcsds);
            }

            return string.Empty;
        }
        /// <summary>
        /// 面积单位
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetMJDW()
        {
            List<string[]> mjdws = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.Enum.AreaUnit));
            foreach (var value in values)
            {
                string[] mjdw = (EnumExtension.GetRemark((MODEL.Enum.AreaUnit)System.Enum.Parse(typeof(MODEL.Enum.AreaUnit), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                mjdws.Add(mjdw);
            }

            if (mjdws.Count > 0)
            {
                return JsonHelper.ToJson(mjdws);
            }

            return string.Empty;
        }
        /// <summary>
        /// 体积单位
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetTJDW()
        {
            List<string[]> tjdws = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.Enum.VolumeUnit));
            foreach (var value in values)
            {
                string[] tjdw = (EnumExtension.GetRemark((MODEL.Enum.VolumeUnit)System.Enum.Parse(typeof(MODEL.Enum.VolumeUnit), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                tjdws.Add(tjdw);
            }

            if (tjdws.Count > 0)
            {
                return JsonHelper.ToJson(tjdws);
            }

            return string.Empty;
        }
        /// <summary>
        /// 剖面类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetPMLX()
        {
            List<string[]> pmlxs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumMonitor.SectionType));
            foreach (var value in values)
            {
                string[] pmlx = (EnumExtension.GetRemark((MODEL.EnumMonitor.SectionType)System.Enum.Parse(typeof(MODEL.EnumMonitor.SectionType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                pmlxs.Add(pmlx);
            }

            if (pmlxs.Count > 0)
            {
                return JsonHelper.ToJson(pmlxs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 剖面等级
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetPMDJ()
        {
            List<string[]> pmdjs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumMonitor.SectionLevel));
            foreach (var value in values)
            {
                string[] pmdj = (EnumExtension.GetRemark((MODEL.EnumMonitor.SectionLevel)System.Enum.Parse(typeof(MODEL.EnumMonitor.SectionLevel), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                pmdjs.Add(pmdj);
            }

            if (pmdjs.Count > 0)
            {
                return JsonHelper.ToJson(pmdjs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 监测方法
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetJCFF()
        {
            List<string[]> jcffs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumMonitor.AutoDeviceType));
            foreach (var value in values)
            {
                string[] jcff = (EnumExtension.GetRemark((MODEL.EnumMonitor.AutoDeviceType)System.Enum.Parse(typeof(MODEL.EnumMonitor.AutoDeviceType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                jcffs.Add(jcff);
            }

            if (jcffs.Count > 0)
            {
                return JsonHelper.ToJson(jcffs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 监测站类型(GNSS 基站/监测站)
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetJCZLX()
        {
            List<string[]> jczlxs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumMonitor.GNSSStationType));
            foreach (var value in values)
            {
                string[] jczlx = (EnumExtension.GetRemark((MODEL.EnumMonitor.GNSSStationType)System.Enum.Parse(typeof(MODEL.EnumMonitor.GNSSStationType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                jczlxs.Add(jczlx);
            }

            if (jczlxs.Count > 0)
            {
                return JsonHelper.ToJson(jczlxs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 自动化监测数据时间范围（预设）
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetAutoDataDateTime()
        {
            List<string[]> autodatadatetimes = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumMonitor.AutoDataDateTime));
            foreach (var value in values)
            {
                string[] autodatadatetime = (EnumExtension.GetRemark((MODEL.EnumMonitor.AutoDataDateTime)System.Enum.Parse(typeof(MODEL.EnumMonitor.AutoDataDateTime), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                autodatadatetimes.Add(autodatadatetime);
            }

            if (autodatadatetimes.Count > 0)
            {
                return JsonHelper.ToJson(autodatadatetimes);
            }

            return string.Empty;
        }
        /// <summary>
        /// 获取全部自动化监测设备类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetDeviceType()
        {
            List<string[]> devicetypes = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumMonitor.AutoDeviceType));
            foreach (var value in values)
            {
                string[] devicetype = (EnumExtension.GetRemark((MODEL.EnumMonitor.AutoDeviceType)System.Enum.Parse(typeof(MODEL.EnumMonitor.AutoDeviceType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                devicetypes.Add(devicetype);
            }

            if (devicetypes.Count > 0)
            {
                return JsonHelper.ToJson(devicetypes);
            }

            return string.Empty;
        }
        /// <summary>
        /// 获取全部自动化监测设备供电方式
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetPowerType()
        {
            List<string[]> powertypes = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumMonitor.PowerType));
            foreach (var value in values)
            {
                string[] powertype = (EnumExtension.GetRemark((MODEL.EnumMonitor.PowerType)System.Enum.Parse(typeof(MODEL.EnumMonitor.PowerType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                powertypes.Add(powertype);
            }

            if (powertypes.Count > 0)
            {
                return JsonHelper.ToJson(powertypes);
            }

            return string.Empty;
        }
        #endregion


        #region 预警模型
        /// <summary>
        /// 崩塌（危岩体）运动形式
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWYYDXS()
        {
            List<string[]> wyydxss = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WYYDXS));
            foreach (var value in values)
            {
                string[] wyydxs = (EnumExtension.GetRemark((MODEL.EnumEW.WYYDXS)System.Enum.Parse(typeof(MODEL.EnumEW.WYYDXS), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                wyydxss.Add(wyydxs);
            }

            if (wyydxss.Count > 0)
            {
                return JsonHelper.ToJson(wyydxss);
            }

            return string.Empty;
        }
        /// <summary>
        /// 崩塌（危岩体）崩塌类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWYBTLX()
        {
            List<string[]> wylxs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WYBTLX));
            foreach (var value in values)
            {
                string[] wylx = (EnumExtension.GetRemark((MODEL.EnumEW.WYBTLX)System.Enum.Parse(typeof(MODEL.EnumEW.WYBTLX), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                wylxs.Add(wylx);
            }

            if (wylxs.Count > 0)
            {
                return JsonHelper.ToJson(wylxs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 崩塌（危岩体）控制结构面类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWYKZJGMLX()
        {
            List<string[]> wykzjgmlxs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WYKZJGMLX));
            foreach (var value in values)
            {
                string[] wykzjgmlx = (EnumExtension.GetRemark((MODEL.EnumEW.WYKZJGMLX)System.Enum.Parse(typeof(MODEL.EnumEW.WYKZJGMLX), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                wykzjgmlxs.Add(wykzjgmlx);
            }

            if (wykzjgmlxs.Count > 0)
            {
                return JsonHelper.ToJson(wykzjgmlxs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 崩塌（危岩体）宏观稳定性评价
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWYHGWDXPJ()
        {
            List<string[]> wyhgwdxpjs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WYHGWDXPJ));
            foreach (var value in values)
            {
                string[] wyhgwdxpj = (EnumExtension.GetRemark((MODEL.EnumEW.WYHGWDXPJ)System.Enum.Parse(typeof(MODEL.EnumEW.WYHGWDXPJ), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                wyhgwdxpjs.Add(wyhgwdxpj);
            }

            if (wyhgwdxpjs.Count > 0)
            {
                return JsonHelper.ToJson(wyhgwdxpjs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 崩塌（危岩体）活动状态
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWYHDZT()
        {
            List<string[]> wyhdzts = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WYHDZT));
            foreach (var value in values)
            {
                string[] wyhdzt = (EnumExtension.GetRemark((MODEL.EnumEW.WYHDZT)System.Enum.Parse(typeof(MODEL.EnumEW.WYHDZT), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                wyhdzts.Add(wyhdzt);
            }

            if (wyhdzts.Count > 0)
            {
                return JsonHelper.ToJson(wyhdzts);
            }

            return string.Empty;
        }
        /// <summary>
        /// 崩塌（危岩体）崩塌源扩展方式
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWYBTYKZFS()
        {
            List<string[]> wybtykzfss = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WYBTYKZFS));
            foreach (var value in values)
            {
                string[] wybtykzfs = (EnumExtension.GetRemark((MODEL.EnumEW.WYBTYKZFS)System.Enum.Parse(typeof(MODEL.EnumEW.WYBTYKZFS), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                wybtykzfss.Add(wybtykzfs);
            }

            if (wybtykzfss.Count > 0)
            {
                return JsonHelper.ToJson(wybtykzfss);
            }

            return string.Empty;
        }
        /// <summary>
        /// 崩塌（危岩体）诱发因素
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWYYFYS()
        {
            List<string[]> wyyfyss = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WYYFYS));
            foreach (var value in values)
            {
                string[] wyyfys = (EnumExtension.GetRemark((MODEL.EnumEW.WYYFYS)System.Enum.Parse(typeof(MODEL.EnumEW.WYYFYS), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                wyyfyss.Add(wyyfys);
            }

            if (wyyfyss.Count > 0)
            {
                return JsonHelper.ToJson(wyyfyss);
            }

            return string.Empty;
        }
        /// <summary>
        /// 崩塌（危岩体）规模等级
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWYGMDJ()
        {
            List<string[]> wygmdjs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WYGMDJ));
            foreach (var value in values)
            {
                string[] wygmdj = (EnumExtension.GetRemark((MODEL.EnumEW.WYGMDJ)System.Enum.Parse(typeof(MODEL.EnumEW.WYGMDJ), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                wygmdjs.Add(wygmdj);
            }

            if (wygmdjs.Count > 0)
            {
                return JsonHelper.ToJson(wygmdjs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 崩塌（危岩体）确定性程度
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWYQDXCD()
        {
            List<string[]> wyqdxcds = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WYQDXCD));
            foreach (var value in values)
            {
                string[] wyqdxcd = (EnumExtension.GetRemark((MODEL.EnumEW.WYQDXCD)System.Enum.Parse(typeof(MODEL.EnumEW.WYQDXCD), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                wyqdxcds.Add(wyqdxcd);
            }

            if (wyqdxcds.Count > 0)
            {
                return JsonHelper.ToJson(wyqdxcds);
            }

            return string.Empty;
        }
        /// <summary>
        /// 崩塌（危岩体）灾情等级
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWYZQDJ()
        {
            List<string[]> wyzqdjs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WYZQDJ));
            foreach (var value in values)
            {
                string[] wyzqdj = (EnumExtension.GetRemark((MODEL.EnumEW.WYZQDJ)System.Enum.Parse(typeof(MODEL.EnumEW.WYZQDJ), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                wyzqdjs.Add(wyzqdj);
            }

            if (wyzqdjs.Count > 0)
            {
                return JsonHelper.ToJson(wyzqdjs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 崩塌（危岩体）险情等级
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWYXQDJ()
        {
            List<string[]> wyxqdjs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WYXQDJ));
            foreach (var value in values)
            {
                string[] wyxqdj = (EnumExtension.GetRemark((MODEL.EnumEW.WYXQDJ)System.Enum.Parse(typeof(MODEL.EnumEW.WYXQDJ), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                wyxqdjs.Add(wyxqdj);
            }

            if (wyxqdjs.Count > 0)
            {
                return JsonHelper.ToJson(wyxqdjs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 崩塌（危岩体）威胁对象
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWYWXDX()
        {
            List<string[]> wywxdxs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WYWXDX));
            foreach (var value in values)
            {
                string[] wywxdx = (EnumExtension.GetRemark((MODEL.EnumEW.WYWXDX)System.Enum.Parse(typeof(MODEL.EnumEW.WYWXDX), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                wywxdxs.Add(wywxdx);
            }

            if (wywxdxs.Count > 0)
            {
                return JsonHelper.ToJson(wywxdxs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 危岩破坏模式
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWYPHMS()
        {
            List<string[]> wyphmss = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WYPHMSDM));
            foreach (var value in values)
            {
                string[] wyphms = (EnumExtension.GetRemark((MODEL.EnumEW.WYPHMSDM)System.Enum.Parse(typeof(MODEL.EnumEW.WYPHMSDM), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                wyphmss.Add(wyphms);
            }

            if (wyphmss.Count > 0)
            {
                return JsonHelper.ToJson(wyphmss);
            }

            return string.Empty;
        }
        /// <summary>
        /// 危岩破坏模式亚类
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWYPHMSYL()
        {
            List<string[]> wyphmsyls = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WYPHMSYXDM));
            foreach (var value in values)
            {
                string[] wyphmsyl = (EnumExtension.GetRemark((MODEL.EnumEW.WYPHMSYXDM)System.Enum.Parse(typeof(MODEL.EnumEW.WYPHMSYXDM), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                wyphmsyls.Add(wyphmsyl);
            }

            if (wyphmsyls.Count > 0)
            {
                return JsonHelper.ToJson(wyphmsyls);
            }

            return string.Empty;
        }
        /// <summary>
        /// 危岩崩塌临界条件判据公式
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWYBTLJTJPJGS()
        {
            List<string[]> pjgss = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WarningFunction));
            foreach (var value in values)
            {
                string[] pjgs = (EnumExtension.GetRemark((MODEL.EnumEW.WarningFunction)System.Enum.Parse(typeof(MODEL.EnumEW.WarningFunction), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                pjgss.Add(pjgs);
            }

            if (pjgss.Count > 0)
            {
                return JsonHelper.ToJson(pjgss);
            }

            return string.Empty;
        }
        /// <summary>
        /// 预警状态
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetYJZT()
        {
            List<string[]> yjzts = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WarningState));
            foreach (var value in values)
            {
                string[] yjzt = (EnumExtension.GetRemark((MODEL.EnumEW.WarningState)System.Enum.Parse(typeof(MODEL.EnumEW.WarningState), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                yjzts.Add(yjzt);
            }

            if (yjzts.Count > 0)
            {
                return JsonHelper.ToJson(yjzts);
            }

            return string.Empty;
        }
        /// <summary>
        /// 预警条件
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetYJTJ()
        {
            List<string[]> yjtjs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.WarningWay));
            foreach (var value in values)
            {
                string[] yjtj = (EnumExtension.GetRemark((MODEL.EnumEW.WarningWay)System.Enum.Parse(typeof(MODEL.EnumEW.WarningWay), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                yjtjs.Add(yjtj);
            }

            if (yjtjs.Count > 0)
            {
                return JsonHelper.ToJson(yjtjs);
            }

            return string.Empty;
        }
        #endregion


        #region 预警判据
        /// <summary>
        /// 裂缝判据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetLFPJ()
        {
            List<string[]> lfpjs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.LFPJ));
            foreach (var value in values)
            {
                string[] lfpj = (EnumExtension.GetRemark((MODEL.EnumEW.LFPJ)System.Enum.Parse(typeof(MODEL.EnumEW.LFPJ), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                lfpjs.Add(lfpj);
            }

            if (lfpjs.Count > 0)
            {
                return JsonHelper.ToJson(lfpjs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 倾角判据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetQJPJ()
        {
            List<string[]> qjpjs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.QJPJ));
            foreach (var value in values)
            {
                string[] qjpj = (EnumExtension.GetRemark((MODEL.EnumEW.QJPJ)System.Enum.Parse(typeof(MODEL.EnumEW.QJPJ), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                qjpjs.Add(qjpj);
            }

            if (qjpjs.Count > 0)
            {
                return JsonHelper.ToJson(qjpjs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 裂缝判据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetYLPJ()
        {
            List<string[]> ylpjs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumEW.YLPJ));
            foreach (var value in values)
            {
                string[] ylpj = (EnumExtension.GetRemark((MODEL.EnumEW.YLPJ)System.Enum.Parse(typeof(MODEL.EnumEW.YLPJ), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                ylpjs.Add(ylpj);
            }

            if (ylpjs.Count > 0)
            {
                return JsonHelper.ToJson(ylpjs);
            }

            return string.Empty;
        }
        #endregion


        #region 无人机参数
        /// <summary>
        /// 路径类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetLJLX()
        {
            List<string[]> ljlxs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumUAV.RouteType));
            foreach (var value in values)
            {
                string[] ljlx = (EnumExtension.GetRemark((MODEL.EnumUAV.RouteType)System.Enum.Parse(typeof(MODEL.EnumUAV.RouteType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                ljlxs.Add(ljlx);
            }

            if (ljlxs.Count > 0)
            {
                return JsonHelper.ToJson(ljlxs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 高程类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetGCLX()
        {
            List<string[]> gclxs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumUAV.AltitudeMode));
            foreach (var value in values)
            {
                string[] gclx = (EnumExtension.GetRemark((MODEL.EnumUAV.AltitudeMode)System.Enum.Parse(typeof(MODEL.EnumUAV.AltitudeMode), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                gclxs.Add(gclx);
            }

            if (gclxs.Count > 0)
            {
                return JsonHelper.ToJson(gclxs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 挂载类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetGZLX()
        {
            List<string[]> gzlxs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumUAV.PayloadType));
            foreach (var value in values)
            {
                string[] gzlx = (EnumExtension.GetRemark((MODEL.EnumUAV.PayloadType)System.Enum.Parse(typeof(MODEL.EnumUAV.PayloadType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                gzlxs.Add(gzlx);
            }

            if (gzlxs.Count > 0)
            {
                return JsonHelper.ToJson(gzlxs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 航点类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetHDLX()
        {
            List<string[]> hdlxs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumUAV.WaypointType));
            foreach (var value in values)
            {
                string[] hdlx = (EnumExtension.GetRemark((MODEL.EnumUAV.WaypointType)System.Enum.Parse(typeof(MODEL.EnumUAV.WaypointType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                hdlxs.Add(hdlx);
            }

            if (hdlxs.Count > 0)
            {
                return JsonHelper.ToJson(hdlxs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 动作类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetDZLX()
        {
            List<string[]> dzlxs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumUAV.WaypointActionType));
            foreach (var value in values)
            {
                string[] dzlx = (EnumExtension.GetRemark((MODEL.EnumUAV.WaypointActionType)System.Enum.Parse(typeof(MODEL.EnumUAV.WaypointActionType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                dzlxs.Add(dzlx);
            }

            if (dzlxs.Count > 0)
            {
                return JsonHelper.ToJson(dzlxs);
            }

            return string.Empty;
        }
        #endregion


        #region 影像参数
        /// <summary>
        /// 目标类型
        /// </summary>
        /// <returns></returns>
        public string GetMBLX()
        {
            List<string[]> mblxs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumIMG.TargetType));
            foreach (var value in values)
            {
                string[] mblx = (EnumExtension.GetRemark((MODEL.EnumIMG.TargetType)System.Enum.Parse(typeof(MODEL.EnumIMG.TargetType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                mblxs.Add(mblx);
            }

            if (mblxs.Count > 0)
            {
                return JsonHelper.ToJson(mblxs);
            }

            return string.Empty;
        }

        /// <summary>
        /// 靶区类型
        /// </summary>
        /// <returns></returns>
        public string GetBQLX()
        {
            List<string[]> bqlxs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumIMG.RoiType));
            foreach (var value in values)
            {
                string[] bqlx = (EnumExtension.GetRemark((MODEL.EnumIMG.RoiType)System.Enum.Parse(typeof(MODEL.EnumIMG.RoiType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                bqlxs.Add(bqlx);
            }
            if (bqlxs.Count > 0)
            {
                return JsonHelper.ToJson(bqlxs);
            }
            return string.Empty;
        }

        /// <summary>
        /// 匹配算法类型
        /// </summary>
        /// <returns></returns>
        public string GetPPSF()
        {
            List<string[]> ppsfs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumIMG.MatchType));
            foreach (var value in values)
            {
                string[] ppsf = (EnumExtension.GetRemark((MODEL.EnumIMG.MatchType)System.Enum.Parse(typeof(MODEL.EnumIMG.MatchType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                ppsfs.Add(ppsf);
            }
            if (ppsfs.Count > 0)
            {
                return JsonHelper.ToJson(ppsfs);
            }
            return string.Empty;
        }

        #endregion

        #region 模型参数
        /// <summary>
        /// 任务相机
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetRWXJ()
        {
            List<string[]> rwxjs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumModel.TaskCamera));
            foreach (var value in values)
            {
                string[] rwxj = (EnumExtension.GetRemark((MODEL.EnumModel.TaskCamera)System.Enum.Parse(typeof(MODEL.EnumModel.TaskCamera), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                rwxjs.Add(rwxj);
            }

            if (rwxjs.Count > 0)
            {
                return JsonHelper.ToJson(rwxjs);
            }

            return string.Empty;
        }
        /// <summary>
        /// 任务产品
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetRWCP()
        {
            List<string[]> rwcps = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumModel.TaskProduct));
            foreach (var value in values)
            {
                string[] rwcp = (EnumExtension.GetRemark((MODEL.EnumModel.TaskProduct)System.Enum.Parse(typeof(MODEL.EnumModel.TaskProduct), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                rwcps.Add(rwcp);
            }

            if (rwcps.Count > 0)
            {
                return JsonHelper.ToJson(rwcps);
            }

            return string.Empty;
        }
        /// <summary>
        /// 任务状态
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetRWZT()
        {
            List<string[]> rwzts = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumModel.TaskStatus));
            foreach (var value in values)
            {
                string[] rwzt = (EnumExtension.GetRemark((MODEL.EnumModel.TaskStatus)System.Enum.Parse(typeof(MODEL.EnumModel.TaskStatus), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                rwzts.Add(rwzt);
            }

            if (rwzts.Count > 0)
            {
                return JsonHelper.ToJson(rwzts);
            }

            return string.Empty;
        }
        /// <summary>
        /// 模型等级
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetMXDJ()
        {
            List<string[]> mxdjs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumModel.ModelLevel));
            foreach (var value in values)
            {
                string[] mxdj = (EnumExtension.GetRemark((MODEL.EnumModel.ModelLevel)System.Enum.Parse(typeof(MODEL.EnumModel.ModelLevel), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                mxdjs.Add(mxdj);
            }

            if (mxdjs.Count > 0)
            {
                return JsonHelper.ToJson(mxdjs);
            }

            return string.Empty;
        }
        #endregion

    }
}

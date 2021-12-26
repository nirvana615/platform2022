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
    public class ModelParameterController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(ModelParameterController));
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
        
        /// <summary>
        ///项目用途
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetXMYT()
        {
            List<string[]> xmyts = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumModel.ProjectPurpose));
            foreach (var value in values)
            {
                string[] xmyt = (EnumExtension.GetRemark((MODEL.EnumModel.ProjectPurpose)System.Enum.Parse(typeof(MODEL.EnumModel.ProjectPurpose), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                xmyts.Add(xmyt);
            }

            if (xmyts.Count > 0)
            {
                return JsonHelper.ToJson(xmyts);
            }

            return string.Empty;
        }

        /// <summary>
        ///采集设备
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetCJSB()
        {
            List<string[]> cjsbs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumModel.AircrafType));
            foreach (var value in values)
            {
                string[] cjsb = (EnumExtension.GetRemark((MODEL.EnumModel.AircrafType)System.Enum.Parse(typeof(MODEL.EnumModel.AircrafType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                cjsbs.Add(cjsb);
            }

            if (cjsbs.Count > 0)
            {
                return JsonHelper.ToJson(cjsbs);
            }

            return string.Empty;
        }
        /// <summary>
        ///所需成果
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetSXCG()
        {
            List<string[]> sxcgs = new List<string[]>();
            System.Array values = System.Enum.GetValues(typeof(MODEL.EnumModel.ResultType));
            foreach (var value in values)
            {
                string[] sxcg = (EnumExtension.GetRemark((MODEL.EnumModel.ResultType)System.Enum.Parse(typeof(MODEL.EnumModel.ResultType), ((int)value).ToString())) + ";" + (int)value).Split(new char[] { ';' });
                sxcgs.Add(sxcg);
            }

            if (sxcgs.Count > 0)
            {
                return JsonHelper.ToJson(sxcgs);
            }

            return string.Empty;
        }
        
        #endregion


    }
}

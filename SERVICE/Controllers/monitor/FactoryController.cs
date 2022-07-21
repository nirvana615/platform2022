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
    public class FactoryController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(FactoryController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString() == "" ? COM.ConstHelper.dbConn : ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 获取自动化监测设备厂家信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetFactoryInfo()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_devicefactory WHERE ztm={0} ORDER BY id ASC", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(data))
            {
                List<Factory> factories = new List<Factory>();
                string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                for (int i = 0; i < rows.Length; i++)
                {
                    Factory factory = ParseMonitorHelper.ParseFactory(rows[i]);
                    if (factory != null)
                    {
                        factories.Add(factory);
                    }
                }

                if (factories.Count > 0)
                {
                    return JsonHelper.ToJson(factories);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 创建自动化监测设备厂家
        /// </summary>
        [HttpPost]
        public string AddFactory()
        {
            string cjmc = HttpContext.Current.Request.Form["cjmc"];
            string cjjc = HttpContext.Current.Request.Form["cjjc"];
            string cjbm = HttpContext.Current.Request.Form["cjbm"];
            string bz = HttpContext.Current.Request.Form["bz"];

            if (!string.IsNullOrEmpty(cjmc) && !string.IsNullOrEmpty(cjjc) && !string.IsNullOrEmpty(cjbm))
            {
                string value = "("
                    + SQLHelper.UpdateString(cjmc) + ","
                    + SQLHelper.UpdateString(cjjc) + ","
                    + SQLHelper.UpdateString(cjbm) + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + (int)MODEL.Enum.State.InUse + ","
                    + SQLHelper.UpdateString(bz) + ")";

                int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO monitor_devicefactory (cjmc,cjjc,cjbm,cjsj,ztm,bz) VALUES" + value);
                if (id != -1)
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
                return "必填参数不全！";
            }
        }

        /// <summary>
        /// 更新自动化监测设备厂家信息
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateFactory()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string cjmc = HttpContext.Current.Request.Form["cjmc"];
            string cjjc = HttpContext.Current.Request.Form["cjjc"];
            string cjbm = HttpContext.Current.Request.Form["cjbm"];
            string bz = HttpContext.Current.Request.Form["bz"];

            int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_devicefactory WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
            if (count > 0)
            {
                count = 0;
                count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_devicefactory SET cjmc={0},cjjc={1},cjbm={2},bz={3} WHERE id={4} AND ztm={5}", SQLHelper.UpdateString(cjmc), SQLHelper.UpdateString(cjjc), SQLHelper.UpdateString(cjbm), SQLHelper.UpdateString(bz), id, (int)MODEL.Enum.State.InUse));

                if (count == 1)
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
                return "无此自动化监测设备厂家信息！";
            }
        }

        /// <summary>
        /// 删除自动化监测设备厂家
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteFactory()
        {
            string id = HttpContext.Current.Request.Form["id"];
            int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_devicefactory WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
            if (count > 0)
            {
                count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_devicefactory SET ztm={0} WHERE id={1}", (int)MODEL.Enum.State.NoUse, id));
                if (count == 1)
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
                return "无此自动化监测设备厂家！";
            }
        }

    }
}

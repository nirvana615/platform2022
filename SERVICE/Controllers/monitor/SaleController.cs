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
    public class SaleController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(SaleController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString() == "" ? COM.ConstHelper.dbConn : ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取自动化监测设备经销商信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetSaleInfo()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_devicesale WHERE ztm={0} ORDER BY id ASC", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(data))
            {
                List<Sale> sales = new List<Sale>();
                string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                for (int i = 0; i < rows.Length; i++)
                {
                    Sale sale = ParseMonitorHelper.ParseSale(rows[i]);
                    if (sale != null)
                    {
                        sales.Add(sale);
                    }
                }

                if (sales.Count > 0)
                {
                    return JsonHelper.ToJson(sales);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 创建自动化监测设备经销商
        /// </summary>
        [HttpPost]
        public string AddSale()
        {
            string jxsmc = HttpContext.Current.Request.Form["jxsmc"];
            string jxsjc = HttpContext.Current.Request.Form["jxsjc"];
            string jxsbm = HttpContext.Current.Request.Form["jxsbm"];
            string bz = HttpContext.Current.Request.Form["bz"];

            if (!string.IsNullOrEmpty(jxsmc) && !string.IsNullOrEmpty(jxsjc) && !string.IsNullOrEmpty(jxsbm))
            {
                string value = "("
                    + SQLHelper.UpdateString(jxsmc) + ","
                    + SQLHelper.UpdateString(jxsjc) + ","
                    + SQLHelper.UpdateString(jxsbm) + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + (int)MODEL.Enum.State.InUse + ","
                    + SQLHelper.UpdateString(bz) + ")";

                int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO monitor_devicesale (jxsmc,jxsjc,jxsbm,cjsj,ztm,bz) VALUES" + value);
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
        /// 更新自动化监测设备经销商信息
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateSale()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string jxsmc = HttpContext.Current.Request.Form["jxsmc"];
            string jxsjc = HttpContext.Current.Request.Form["jxsjc"];
            string jxsbm = HttpContext.Current.Request.Form["jxsbm"];
            string bz = HttpContext.Current.Request.Form["bz"];

            int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_devicesale WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
            if (count > 0)
            {
                count = 0;
                count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_devicesale SET jxsmc={0},jxsjc={1},jxsbm={2},bz={3} WHERE id={4} AND ztm={5}", SQLHelper.UpdateString(jxsmc), SQLHelper.UpdateString(jxsjc), SQLHelper.UpdateString(jxsbm), SQLHelper.UpdateString(bz), id, (int)MODEL.Enum.State.InUse));

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
                return "无此自动化监测设备经销商！";
            }
        }

        /// <summary>
        /// 删除自动化监测设备经销商
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteSale()
        {
            string id = HttpContext.Current.Request.Form["id"];
            int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_devicesale WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
            if (count > 0)
            {
                count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_devicesale SET ztm={0} WHERE id={1}", (int)MODEL.Enum.State.NoUse, id));
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
                return "无此自动化监测设备经销商！";
            }
        }
    }
}

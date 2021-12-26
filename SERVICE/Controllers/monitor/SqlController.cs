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
    public class SqlController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(SqlController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取SQL信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetSQLInfo()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_sql WHERE ztm={0} ORDER BY id ASC", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(data))
            {
                List<SQLString> sqlStrings = new List<SQLString>();
                string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                for (int i = 0; i < rows.Length; i++)
                {
                    SQLString sqlString = ParseMonitorHelper.ParseSQLString(rows[i]);
                    if (sqlString != null)
                    {
                        sqlStrings.Add(sqlString);
                    }
                }

                if (sqlStrings.Count > 0)
                {
                    return JsonHelper.ToJson(sqlStrings);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 全部读取SQL
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetReadSQLInfo()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_sql WHERE ztm={0} AND type={1}", (int)MODEL.Enum.State.InUse, (int)MODEL.Enum.SqlType.Read));
            if (!string.IsNullOrEmpty(data))
            {
                List<SQLString> sqlStrings = new List<SQLString>();
                string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                for (int i = 0; i < rows.Length; i++)
                {
                    SQLString sqlString = ParseMonitorHelper.ParseSQLString(rows[i]);
                    if (sqlString != null)
                    {
                        sqlStrings.Add(sqlString);
                    }
                }

                if (sqlStrings.Count > 0)
                {
                    return JsonHelper.ToJson(sqlStrings);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 全部写入SQL
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWriteSQLInfo()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_sql WHERE ztm={0} AND type={1}", (int)MODEL.Enum.State.InUse, (int)MODEL.Enum.SqlType.Write));
            if (!string.IsNullOrEmpty(data))
            {
                List<SQLString> sqlStrings = new List<SQLString>();
                string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                for (int i = 0; i < rows.Length; i++)
                {
                    SQLString sqlString = ParseMonitorHelper.ParseSQLString(rows[i]);
                    if (sqlString != null)
                    {
                        sqlStrings.Add(sqlString);
                    }
                }

                if (sqlStrings.Count > 0)
                {
                    return JsonHelper.ToJson(sqlStrings);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 创建SQL
        /// </summary>
        [HttpPost]
        public string AddSQL()
        {
            string sql = HttpContext.Current.Request.Form["sql"];
            string bz = HttpContext.Current.Request.Form["bz"];
            string type = HttpContext.Current.Request.Form["type"];

            if (!string.IsNullOrEmpty(sql) && !string.IsNullOrEmpty(bz) && !string.IsNullOrEmpty(type))
            {
                string value = "("
                    + SQLHelper.UpdateString(sql) + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + (int)MODEL.Enum.State.InUse + ","
                    + SQLHelper.UpdateString(bz) + ","
                    + type + ")";

                int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO monitor_sql (sql,cjsj,ztm,bz,type) VALUES" + value);
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
        /// 更新SQL
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateSQL()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string sql = HttpContext.Current.Request.Form["sql"];
            string bz = HttpContext.Current.Request.Form["bz"];
            string type = HttpContext.Current.Request.Form["type"];

            int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_sql WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
            if (count > 0)
            {
                count = 0;
                count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_sql SET sql={0},bz={1},type={2} WHERE id={3} AND ztm={4}", SQLHelper.UpdateString(sql), SQLHelper.UpdateString(bz), type, id, (int)MODEL.Enum.State.InUse));

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
                return "无此SQL信息！";
            }
        }

        /// <summary>
        /// 删除SQL
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteSQL()
        {
            string id = HttpContext.Current.Request.Form["id"];
            int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_sql WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
            if (count > 0)
            {
                count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_sql SET ztm={0} WHERE id={1}", (int)MODEL.Enum.State.NoUse, id));
                int mapcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_sql WHERE dbid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (mapcount > 0)
                {
                    mapcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_device_sql SET ztm={0} WHERE sqlid={1}", (int)MODEL.Enum.State.NoUse, id));
                    if (count > 0 && mapcount > 0)
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
                    if (count > 0)
                    {
                        return "删除成功！";
                    }
                    else
                    {
                        return "删除失败！";
                    }
                }
            }
            else
            {
                return "无此SQL信息！";
            }
        }
    }
}

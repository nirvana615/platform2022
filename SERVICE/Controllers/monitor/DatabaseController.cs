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
    /// 监测数据库
    /// </summary>
    public class DatabaseController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(DatabaseController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取自动化监测数据库
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetDatabaseInfo()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_database WHERE ztm={0} ORDER BY id ASC", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(data))
            {
                List<DatabaseString> databaseStrings = new List<DatabaseString>();
                string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                for (int i = 0; i < rows.Length; i++)
                {
                    DatabaseString databaseString = ParseMonitorHelper.ParseDatabaseString(rows[i]);
                    if (databaseString != null)
                    {
                        databaseStrings.Add(databaseString);
                    }
                }

                if (databaseStrings.Count > 0)
                {
                    return JsonHelper.ToJson(databaseStrings);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 创建自动化监测数据库
        /// </summary>
        [HttpPost]
        public string AddDatabase()
        {
            string dblx = HttpContext.Current.Request.Form["dblx"];
            string dbip = HttpContext.Current.Request.Form["dbip"];
            string dbport = HttpContext.Current.Request.Form["dbport"];
            string dbname = HttpContext.Current.Request.Form["dbname"];
            string dbuser = HttpContext.Current.Request.Form["dbuser"];
            string dbpw = HttpContext.Current.Request.Form["dbpw"];
            string dbadd = HttpContext.Current.Request.Form["dbadd"];
            string bz = HttpContext.Current.Request.Form["bz"];

            string value = string.Empty;

            if (dblx == ((int)MODEL.Enum.DbType.SQLite).ToString())
            {
                if (!string.IsNullOrEmpty(dbadd))
                {
                    value = "("
                       + dblx + ","
                       + SQLHelper.UpdateString(dbadd) + ","
                       + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                       + (int)MODEL.Enum.State.InUse + ","
                       + SQLHelper.UpdateString(bz) + ")";
                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO monitor_database (dblx,dbadd,cjsj,ztm,bz) VALUES" + value);
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
            else
            {
                if (!string.IsNullOrEmpty(dbip) && !string.IsNullOrEmpty(dbport) && !string.IsNullOrEmpty(dbname) && !string.IsNullOrEmpty(dbuser) && !string.IsNullOrEmpty(dbpw))
                {
                    value = "("
                    + dblx + ","
                    + SQLHelper.UpdateString(dbip) + ","
                    + SQLHelper.UpdateString(dbport) + ","
                    + SQLHelper.UpdateString(dbname) + ","
                    + SQLHelper.UpdateString(dbuser) + ","
                    + SQLHelper.UpdateString(dbpw) + ","
                    + SQLHelper.UpdateString(SQLHelper.GetConnectString(EnumExtension.GetRemark((MODEL.Enum.DbType)System.Enum.Parse(typeof(MODEL.Enum.DbType), dblx)), dbip, dbport, dbname, dbuser, dbpw)) + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + (int)MODEL.Enum.State.InUse + ","
                    + SQLHelper.UpdateString(bz) + ")";

                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO monitor_database (dblx,dbip,dbport,dbname,dbuser,dbpw,dbconn,cjsj,ztm,bz) VALUES" + value);
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
        }

        /// <summary>
        /// 更新自动化监测数据库
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateDatabase()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string dblx = HttpContext.Current.Request.Form["dblx"];
            string dbip = HttpContext.Current.Request.Form["dbip"];
            string dbport = HttpContext.Current.Request.Form["dbport"];
            string dbname = HttpContext.Current.Request.Form["dbname"];
            string dbuser = HttpContext.Current.Request.Form["dbuser"];
            string dbpw = HttpContext.Current.Request.Form["dbpw"];
            string dbadd = HttpContext.Current.Request.Form["dbadd"];
            string bz = HttpContext.Current.Request.Form["bz"];

            int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_database WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
            if (count > 0)
            {
                if (dblx == ((int)MODEL.Enum.DbType.SQLite).ToString())
                {
                    count = 0;
                    count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_database SET dblx={0},dbadd={1},bz={2} WHERE id={3} AND ztm={4}", dblx, SQLHelper.UpdateString(dbadd), SQLHelper.UpdateString(bz), id, (int)MODEL.Enum.State.InUse));

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
                    count = 0;
                    count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_database SET dblx={0},dbip={1},dbport={2},dbname={3},dbuser={4},dbpw={5},dbconn={6},bz={7}  WHERE id={8} AND ztm={9}", dblx, SQLHelper.UpdateString(dbip), SQLHelper.UpdateString(dbport), SQLHelper.UpdateString(dbname), SQLHelper.UpdateString(dbuser), SQLHelper.UpdateString(dbpw), SQLHelper.UpdateString(SQLHelper.GetConnectString(EnumExtension.GetRemark((MODEL.Enum.DbType)System.Enum.Parse(typeof(MODEL.Enum.DbType), dblx)), dbip, dbport, dbname, dbuser, dbpw)), SQLHelper.UpdateString(bz), id, (int)MODEL.Enum.State.InUse));

                    if (count == 1)
                    {
                        return "更新成功！";
                    }
                    else
                    {
                        return "更新失败！";
                    }
                }
            }
            else
            {
                return "无此自动化监测数据库！";
            }
        }

        /// <summary>
        /// 删除自动化监测数据库
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteDatabase()
        {
            string id = HttpContext.Current.Request.Form["id"];
            int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_database WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
            if (count > 0)
            {
                count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_database SET ztm={0} WHERE id={1}", (int)MODEL.Enum.State.NoUse, id));
                int mapcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_database WHERE dbid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (mapcount > 0)
                {
                    mapcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_device_database SET ztm={0} WHERE dbid={1}", (int)MODEL.Enum.State.NoUse, id));
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
                return "无此自动化监测数据库！";
            }
        }
    }
}

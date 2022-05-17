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
    public class DeviceController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(DeviceController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取自动化监测设备信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetDeviceInfo()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE ztm={0} ORDER BY id ASC", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(data))
            {
                List<DeviceString> deviceStrings = new List<DeviceString>();
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    DeviceString deviceString = ParseMonitorHelper.ParseDeviceString(rows[i]);
                    if (deviceString != null)
                    {
                        deviceStrings.Add(deviceString);
                    }
                }

                if (deviceStrings.Count > 0)
                {
                    return JsonHelper.ToJson(deviceStrings);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 获取未绑定自动化监测设备信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetFreeDevice()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE ztm={0} AND bsm IS NULL ORDER BY id ASC", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(data))
            {
                List<DeviceString> deviceStrings = new List<DeviceString>();
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    DeviceString deviceString = ParseMonitorHelper.ParseDeviceString(rows[i]);
                    if (deviceString != null)
                    {
                        deviceStrings.Add(deviceString);
                    }
                }

                if (deviceStrings.Count > 0)
                {
                    return JsonHelper.ToJson(deviceStrings);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 添加自动化监测设备
        /// </summary>
        [HttpPost]
        public string AddDevice()
        {
            string code = HttpContext.Current.Request.Form["code"];
            string sbmc = HttpContext.Current.Request.Form["sbmc"];
            string sbbh = HttpContext.Current.Request.Form["sbbh"];
            string sbxh = HttpContext.Current.Request.Form["sbxh"];
            string sblx = HttpContext.Current.Request.Form["sblx"];
            string gdfs = HttpContext.Current.Request.Form["gdfs"];
            string bz = HttpContext.Current.Request.Form["bz"];
            string cj = HttpContext.Current.Request.Form["cj"];
            string jxs = HttpContext.Current.Request.Form["jxs"];

            string db = HttpContext.Current.Request.Form["db"];
            string readsql = HttpContext.Current.Request.Form["readsql"];
            string writesql = HttpContext.Current.Request.Form["writesql"];

            if (!string.IsNullOrEmpty(code) && !string.IsNullOrEmpty(sbbh) && !string.IsNullOrEmpty(sblx) && !string.IsNullOrEmpty(gdfs))
            {
                string value = "("
                   + SQLHelper.UpdateString(code) + ","
                   + SQLHelper.UpdateString(sbmc) + ","
                   + SQLHelper.UpdateString(sbbh) + ","
                   + SQLHelper.UpdateString(sbxh) + ","
                   + sblx + ","
                   + gdfs + ","
                   + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                   + (int)MODEL.Enum.State.InUse + ","
                   + SQLHelper.UpdateString(bz) + ")";

                int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO monitor_device (code,sbmc,sbbh,sbxh,sblx,gdfs,cjsj,ztm,bz) VALUES" + value);
                if (id != -1)
                {
                    if (!string.IsNullOrEmpty(cj))
                    {
                        PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_device SET cjid={0} WHERE id={1}", cj, id));
                    }
                    if (!string.IsNullOrEmpty(jxs))
                    {
                        PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_device SET jxsid={0} WHERE id={1}", jxs, id));
                    }

                    if (!string.IsNullOrEmpty(db))
                    {
                        int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_database WHERE deviceid={0} AND dbid={1} AND ztm={2}", id, db, (int)MODEL.Enum.State.InUse));
                        if (count == 0)
                        {
                            PostgresqlHelper.InsertData(pgsqlConnection, string.Format("INSERT INTO monitor_map_device_database (deviceid,dbid,cjsj,ztm) VALUES({0},{1},{2},{3})", id, db, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        }
                    }
                    if (!string.IsNullOrEmpty(readsql))
                    {
                        int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_sql WHERE deviceid={0} AND sqlid={1} AND ztm={2}", id, readsql, (int)MODEL.Enum.State.InUse));
                        if (count == 0)
                        {
                            PostgresqlHelper.InsertData(pgsqlConnection, string.Format("INSERT INTO monitor_map_device_sql (deviceid,sqlid,cjsj,ztm) VALUES({0},{1},{2},{3})", id, readsql, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        }
                    }
                    if (!string.IsNullOrEmpty(writesql))
                    {
                        int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_sql WHERE deviceid={0} AND sqlid={1} AND ztm={2}", id, writesql, (int)MODEL.Enum.State.InUse));
                        if (count == 0)
                        {
                            PostgresqlHelper.InsertData(pgsqlConnection, string.Format("INSERT INTO monitor_map_device_sql (deviceid,sqlid,cjsj,ztm) VALUES({0},{1},{2},{3})", id, writesql, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        }
                    }

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
        /// 添加自动化监测设备（批量）
        /// </summary>
        [HttpPost]
        public void AddDevices()
        {
            string codeprefix = HttpContext.Current.Request.Form["codeprefix"];
            string startcode = HttpContext.Current.Request.Form["startcode"];
            string endcode = HttpContext.Current.Request.Form["endcode"];

            string sbmc = HttpContext.Current.Request.Form["sbmc"];
            string sbbh = HttpContext.Current.Request.Form["sbbh"];
            string sbxh = HttpContext.Current.Request.Form["sbxh"];
            string sblx = HttpContext.Current.Request.Form["sblx"];
            string gdfs = HttpContext.Current.Request.Form["gdfs"];
            string bz = HttpContext.Current.Request.Form["bz"];
            string cj = HttpContext.Current.Request.Form["cj"];
            string jxs = HttpContext.Current.Request.Form["jxs"];

            string db = HttpContext.Current.Request.Form["db"];
            string readsql = HttpContext.Current.Request.Form["readsql"];
            string writesql = HttpContext.Current.Request.Form["writesql"];

            if (!string.IsNullOrEmpty(codeprefix) && !string.IsNullOrEmpty(startcode) && !string.IsNullOrEmpty(endcode) && !string.IsNullOrEmpty(sbbh) && !string.IsNullOrEmpty(sblx) && !string.IsNullOrEmpty(gdfs))
            {
                int startindex = Convert.ToInt16(startcode);
                int endindex = Convert.ToInt16(endcode);

                if ((startindex < endindex) && (endindex < 100) && (startindex > 0))
                {
                    //1~99范围
                    List<string> codes = new List<string>();
                    for (int i = startindex; i < (endindex + 1); i++)
                    {
                        if (i < 10)
                        {
                            codes.Add(codeprefix + "0" + i);
                        }
                        else
                        {
                            codes.Add(codeprefix + i);
                        }
                    }

                    for (int i = 0; i < codes.Count; i++)
                    {
                        string value = "("
                        + SQLHelper.UpdateString(codes[i]) + ","
                        + SQLHelper.UpdateString(sbmc) + ","
                        + SQLHelper.UpdateString(sbbh) + ","
                        + SQLHelper.UpdateString(sbxh) + ","
                        + sblx + ","
                        + gdfs + ","
                        + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                        + (int)MODEL.Enum.State.InUse + ","
                        + SQLHelper.UpdateString(bz) + ")";

                        int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO monitor_device (code,sbmc,sbbh,sbxh,sblx,gdfs,cjsj,ztm,bz) VALUES" + value);
                        if (id != -1)
                        {
                            if (!string.IsNullOrEmpty(cj))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_device SET cjid={0} WHERE id={1}", cj, id));
                            }
                            if (!string.IsNullOrEmpty(jxs))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_device SET jxsid={0} WHERE id={1}", jxs, id));
                            }

                            if (!string.IsNullOrEmpty(db))
                            {
                                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_database WHERE deviceid={0} AND dbid={1} AND ztm={2}", id, db, (int)MODEL.Enum.State.InUse));
                                if (count == 0)
                                {
                                    PostgresqlHelper.InsertData(pgsqlConnection, string.Format("INSERT INTO monitor_map_device_database (deviceid,dbid,cjsj,ztm) VALUES({0},{1},{2},{3})", id, db, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                }
                            }
                            if (!string.IsNullOrEmpty(readsql))
                            {
                                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_sql WHERE deviceid={0} AND sqlid={1} AND ztm={2}", id, readsql, (int)MODEL.Enum.State.InUse));
                                if (count == 0)
                                {
                                    PostgresqlHelper.InsertData(pgsqlConnection, string.Format("INSERT INTO monitor_map_device_sql (deviceid,sqlid,cjsj,ztm) VALUES({0},{1},{2},{3})", id, readsql, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                }
                            }
                            if (!string.IsNullOrEmpty(writesql))
                            {
                                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_sql WHERE deviceid={0} AND sqlid={1} AND ztm={2}", id, writesql, (int)MODEL.Enum.State.InUse));
                                if (count == 0)
                                {
                                    PostgresqlHelper.InsertData(pgsqlConnection, string.Format("INSERT INTO monitor_map_device_sql (deviceid,sqlid,cjsj,ztm) VALUES({0},{1},{2},{3})", id, writesql, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                }
                            }
                        }
                    }
                }

            }
        }

        /// <summary>
        /// 更新自动化监测设备
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateDevice()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string code = HttpContext.Current.Request.Form["code"];
            string sbmc = HttpContext.Current.Request.Form["sbmc"];
            string sbbh = HttpContext.Current.Request.Form["sbbh"];
            string sbxh = HttpContext.Current.Request.Form["sbxh"];
            string sblx = HttpContext.Current.Request.Form["sblx"];
            string gdfs = HttpContext.Current.Request.Form["gdfs"];
            //string bsm = HttpContext.Current.Request.Form["bsm"];
            string bz = HttpContext.Current.Request.Form["bz"];
            string cj = HttpContext.Current.Request.Form["cj"];
            string jxs = HttpContext.Current.Request.Form["jxs"];

            string db = HttpContext.Current.Request.Form["db"];
            string readsql = HttpContext.Current.Request.Form["readsql"];
            string writesql = HttpContext.Current.Request.Form["writesql"];

            if (!string.IsNullOrEmpty(id) && !string.IsNullOrEmpty(code) && !string.IsNullOrEmpty(sbbh) && !string.IsNullOrEmpty(sblx) && !string.IsNullOrEmpty(gdfs))
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (count > 0)
                {
                    count = 0;
                    count = PostgresqlHelper.UpdateData(pgsqlConnection,
                        string.Format("UPDATE monitor_device SET code={0},sbmc={1},sbbh={2},sbxh={3},sblx={4},gdfs={5},bz={6} WHERE id={7} AND ztm={8}",
                            SQLHelper.UpdateString(code),
                            SQLHelper.UpdateString(sbmc),
                            SQLHelper.UpdateString(sbbh),
                            SQLHelper.UpdateString(sbxh),
                            sblx,
                            gdfs,
                            SQLHelper.UpdateString(bz),
                            id,
                            (int)MODEL.Enum.State.InUse));

                    if (count > 0)
                    {
                        if (!string.IsNullOrEmpty(cj))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_device SET cjid={0} WHERE id={1} AND ztm={2}", cj, id, (int)MODEL.Enum.State.InUse));
                        }

                        if (!string.IsNullOrEmpty(jxs))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_device SET jxsid={0} WHERE id={1} AND ztm={2}", jxs, id, (int)MODEL.Enum.State.InUse));
                        }

                        if (!string.IsNullOrEmpty(db))
                        {
                            int dbcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_database WHERE id={0} AND ztm={1}", db, (int)MODEL.Enum.State.InUse));
                            if (dbcount > 0)
                            {
                                int dbmapcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_database WHERE deviceid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                                if (dbmapcount == 0)
                                {
                                    PostgresqlHelper.InsertData(pgsqlConnection, string.Format("INSERT INTO monitor_map_device_database (deviceid,dbid,cjsj,ztm) VALUES({0},{1},{2},{3})", id, db, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                }
                                else
                                {
                                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_device_database SET dbid={0} WHERE deviceid={1} AND ztm={2}", db, id, (int)MODEL.Enum.State.InUse));
                                }
                            }
                        }

                        if (!string.IsNullOrEmpty(readsql))
                        {
                            int sqlcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_sql WHERE id={0} AND ztm={1} AND type={2}", readsql, (int)MODEL.Enum.State.InUse, (int)MODEL.Enum.SqlType.Read));
                            if (sqlcount > 0)
                            {
                                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_sql WHERE deviceid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                                if (string.IsNullOrEmpty(data))
                                {
                                    PostgresqlHelper.InsertData(pgsqlConnection, string.Format("INSERT INTO monitor_map_device_sql (deviceid,sqlid,cjsj,ztm) VALUES({0},{1},{2},{3})", id, readsql, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                }
                                else
                                {
                                    int mapid = -1;

                                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                                    for (int i = 0; i < rows.Length; i++)
                                    {
                                        MapDeviceSql mapDeviceSql = ParseMonitorHelper.ParseMapDeviceSql(rows[i]);
                                        if (mapDeviceSql != null)
                                        {
                                            SQL sql = ParseMonitorHelper.ParseSQL(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_sql WHERE id={0} AND ztm={1}", mapDeviceSql.SqlId, (int)MODEL.Enum.State.InUse)));
                                            if (sql != null && sql.Type == (int)MODEL.Enum.SqlType.Read)
                                            {
                                                mapid = mapDeviceSql.Id;
                                            }
                                        }
                                    }

                                    if (mapid == -1)
                                    {
                                        PostgresqlHelper.InsertData(pgsqlConnection, string.Format("INSERT INTO monitor_map_device_sql (deviceid,sqlid,cjsj,ztm) VALUES({0},{1},{2},{3})", id, readsql, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                    }
                                    else
                                    {
                                        PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_device_sql SET sqlid={0} WHERE id={1} AND ztm={2}", readsql, mapid, (int)MODEL.Enum.State.InUse));
                                    }
                                }

                            }
                        }

                        if (!string.IsNullOrEmpty(writesql))
                        {
                            int sqlcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_sql WHERE id={0} AND ztm={1} AND type={2}", writesql, (int)MODEL.Enum.State.InUse, (int)MODEL.Enum.SqlType.Write));
                            if (sqlcount > 0)
                            {
                                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_sql WHERE deviceid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                                if (string.IsNullOrEmpty(data))
                                {
                                    PostgresqlHelper.InsertData(pgsqlConnection, string.Format("INSERT INTO monitor_map_device_sql (deviceid,sqlid,cjsj,ztm) VALUES({0},{1},{2},{3})", id, writesql, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                }
                                else
                                {
                                    int mapid = -1;

                                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                                    for (int i = 0; i < rows.Length; i++)
                                    {
                                        MapDeviceSql mapDeviceSql = ParseMonitorHelper.ParseMapDeviceSql(rows[i]);
                                        if (mapDeviceSql != null)
                                        {
                                            SQL sql = ParseMonitorHelper.ParseSQL(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_sql WHERE id={0} AND ztm={1}", mapDeviceSql.SqlId, (int)MODEL.Enum.State.InUse)));
                                            if (sql != null && sql.Type == (int)MODEL.Enum.SqlType.Write)
                                            {
                                                mapid = mapDeviceSql.Id;
                                            }
                                        }
                                    }

                                    if (mapid == -1)
                                    {
                                        PostgresqlHelper.InsertData(pgsqlConnection, string.Format("INSERT INTO monitor_map_device_sql (deviceid,sqlid,cjsj,ztm) VALUES({0},{1},{2},{3})", id, writesql, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                    }
                                    else
                                    {
                                        PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_device_sql SET sqlid={0} WHERE id={1} AND ztm={2}", writesql, mapid, (int)MODEL.Enum.State.InUse));
                                    }
                                }

                            }
                        }


                        return "更新成功！";
                    }
                    else
                    {
                        return "更新失败！";
                    }
                }
                else
                {
                    return "无此设备！";
                }
            }
            else
            {
                return "必填参数不全！";
            }
        }

        /// <summary>
        /// 删除自动化监测设备
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteDevice()
        {
            string id = HttpContext.Current.Request.Form["id"];
            int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
            if (count > 0)
            {
                count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_device SET ztm={0} WHERE id={1}", (int)MODEL.Enum.State.NoUse, id));
                if (count > 0)
                {
                    int dbcount = 0;
                    dbcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_database WHERE deviceid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                    if (dbcount > 0)
                    {
                        dbcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_device_database SET ztm={0} WHERE deviceid={1}", (int)MODEL.Enum.State.NoUse, id));
                    }

                    int sqlcount = 0;
                    sqlcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_sql WHERE deviceid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                    if (sqlcount > 0)
                    {
                        sqlcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE monitor_map_device_sql SET ztm={0} WHERE deviceid={1}", (int)MODEL.Enum.State.NoUse, id));
                    }

                    if (dbcount == -1 || sqlcount == -1)
                    {
                        return "删除设备成功，删除映射失败！";
                    }
                    else
                    {
                        return "删除成功！";
                    }
                }
                else
                {
                    return "删除失败！";
                }
            }
            else
            {
                return "无此自动化监测设备信息！";
            }
        }


        /// <summary>
        /// 获取设备对应厂家
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetFactoryById()
        {
            string id = HttpContext.Current.Request.QueryString["id"];
            if (!string.IsNullOrEmpty(id))
            {
                Device device = ParseMonitorHelper.ParseDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                if (device != null && device.CJID != null)
                {
                    Factory factory = ParseMonitorHelper.ParseFactory(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_devicefactory WHERE id={0} AND ztm={1}", device.CJID, (int)MODEL.Enum.State.InUse)));
                    if (factory != null)
                    {
                        return JsonHelper.ToJson(factory);
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
                return string.Empty;
            }
        }

        /// <summary>
        /// 获取设备对应经销商
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetSaleById()
        {
            string id = HttpContext.Current.Request.QueryString["id"];
            if (!string.IsNullOrEmpty(id))
            {
                Device device = ParseMonitorHelper.ParseDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                if (device != null && device.JXSID != null)
                {
                    Sale sale = ParseMonitorHelper.ParseSale(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_devicesale WHERE id={0} AND ztm={1}", device.JXSID, (int)MODEL.Enum.State.InUse)));
                    if (sale != null)
                    {
                        return JsonHelper.ToJson(sale);
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
                return string.Empty;
            }
        }

        /// <summary>
        /// 获取设备对应监测数据库
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetDatabasebyId()
        {
            string id = HttpContext.Current.Request.QueryString["id"];

            if (!string.IsNullOrEmpty(id))
            {
                MapDeviceDatabase mapDeviceDatabase = ParseMonitorHelper.ParseMapDeviceDatabase(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_database WHERE deviceid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                if (mapDeviceDatabase != null)
                {
                    DatabaseString databaseString = ParseMonitorHelper.ParseDatabaseString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_database WHERE id={0} AND ztm={1}", mapDeviceDatabase.DbId, (int)MODEL.Enum.State.InUse)));
                    if (databaseString != null)
                    {
                        return JsonHelper.ToJson(databaseString);
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
                return string.Empty;
            }
        }

        /// <summary>
        /// 获取设备对应读取SQL
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetReadSQLbyId()
        {
            string id = HttpContext.Current.Request.QueryString["id"];

            if (!string.IsNullOrEmpty(id))
            {
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_sql WHERE deviceid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(data))
                {
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        MapDeviceSql mapDeviceSql = ParseMonitorHelper.ParseMapDeviceSql(rows[i]);
                        if (mapDeviceSql != null)
                        {
                            SQL sql = ParseMonitorHelper.ParseSQL(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_sql WHERE id={0} AND ztm={1}", mapDeviceSql.SqlId, (int)MODEL.Enum.State.InUse)));
                            if (sql != null && sql.Type == (int)MODEL.Enum.SqlType.Read)
                            {
                                return JsonHelper.ToJson(sql);
                            }
                        }
                    }
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 获取设备对应写入SQL
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetWriteSQLbyId()
        {
            string id = HttpContext.Current.Request.QueryString["id"];

            if (!string.IsNullOrEmpty(id))
            {
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_device_sql WHERE deviceid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(data))
                {
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        MapDeviceSql mapDeviceSql = ParseMonitorHelper.ParseMapDeviceSql(rows[i]);
                        if (mapDeviceSql != null)
                        {
                            SQL sql = ParseMonitorHelper.ParseSQL(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_sql WHERE id={0} AND ztm={1}", mapDeviceSql.SqlId, (int)MODEL.Enum.State.InUse)));
                            if (sql != null && sql.Type == (int)MODEL.Enum.SqlType.Write)
                            {
                                return JsonHelper.ToJson(sql);
                            }
                        }
                    }
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 获取设备预设时间范围全部日期在线设备
        /// </summary>
        /// <param name="id"></param>
        /// <param name="predatetime"></param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetProjectDevicebyPreDateTime(int id, string predatetime, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                string starttime = string.Empty;//开始时间（含）
                string endtime = string.Empty;//结束时间（含）
                string datetime = GetDateTimebyPre(Convert.ToInt16(predatetime), ref starttime, ref endtime);//时间范围
                if (!string.IsNullOrEmpty(datetime))
                {
                    try
                    {
                        DeviceOnlineResult deviceOnlineResult = GetDeviceOnlineResult(id, starttime, endtime, datetime, userbsms);

                        if (deviceOnlineResult != null)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(deviceOnlineResult)));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无数据！", string.Empty));
                        }
                    }
                    catch (Exception ex)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "出现异常：" + ex.Message, string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "获取时间范围为空！", string.Empty));
                }
            }
            else
            {
                //验权失败
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, COM.CookieHelper.CookieResult.SuccessCookie.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 返回设备自定义时间范围全部日期在线设备
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <param name="customdatetime"></param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetProjectDevicebyCustomDateTime(int id, string customdatetime, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                try
                {
                    //获取时间范围
                    string[] timerange = customdatetime.Replace(" - ", ";").Split(new char[] { ';' });
                    string starttime = timerange[0] + " 00:00:00";//开始时间（含）
                    string endtime = timerange[1] + " 59:59:59";//结束时间（含）
                    string datetime = string.Format("gcsj>='{0}' AND gcsj<'{1}'", starttime, endtime);
                    DeviceOnlineResult deviceOnlineResult = GetDeviceOnlineResult(id, timerange[0], timerange[1], datetime, userbsms);

                    if (deviceOnlineResult != null)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(deviceOnlineResult)));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "数据为空！", string.Empty));
                    }
                }
                catch (Exception ex)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "出现异常：" + ex.Message, string.Empty));
                }
            }
            else
            {
                //验权失败
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, COM.CookieHelper.CookieResult.SuccessCookie.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 返回指定时间段监测设备在线信息
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        private DeviceOnlineResult GetDeviceOnlineResult(int id, string starttime, string endtime, string datetime, string userbsms)
        {
            DeviceOnlineResult deviceOnlineResult = new DeviceOnlineResult();
            deviceOnlineResult.DateTimes = COM.DateHelper.GetAllDays(starttime, endtime);

            List<MonitorDeviceMap> MonitorDeviceMaps = new List<MonitorDeviceMap>();
            List<GNSS> GNSSDatas = new List<GNSS>();
            List<LF> LFDatas = new List<LF>();
            List<QJ> QJDatas = new List<QJ>();
            List<YL> YLDatas = new List<YL>();
            List<RAIN> RAINDatas = new List<RAIN>();
            List<SBWY> SBWYDatas = new List<SBWY>();
            List<WATER> WATERDatas = new List<WATER>();
            int monitorcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT * FROM monitor_project  WHERE id={0}  AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
            if (monitorcount != 0)
            {
                MonitorProject monitorproject = ParseMonitorHelper.ParseMonitorProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_project  WHERE id={0}  AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                if (monitorproject != null)
                {
                    //GNSS
                    string GNSSs = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_data_gnss WHERE id in(SELECT min(id) FROM monitor_data_gnss WHERE bsm={0} AND {1} GROUP BY LEFT(gcsj,10),code) ORDER BY code ASC,gcsj DESC", SQLHelper.UpdateString(monitorproject.BSM), datetime));
                    if (!string.IsNullOrEmpty(GNSSs))
                    {
                        string[] datarows = StringHelper.String2Array(GNSSs);
                        for (int j = 0; j < datarows.Length; j++)
                        {
                            GNSS GNSSData = ParseMonitorHelper.ParseGNSS(datarows[j]);
                            GNSSDatas.Add(GNSSData);
                        }
                        if (GNSSDatas.Count > 0)
                        {
                            deviceOnlineResult.GNSSDatas = GNSSDatas;
                        }

                    }
                    //裂缝
                    string LFs = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_data_lf WHERE id in(SELECT min(id) FROM monitor_data_lf WHERE bsm={0} AND {1} GROUP BY LEFT(gcsj,10),code) ORDER BY code ASC,gcsj DESC", SQLHelper.UpdateString(monitorproject.BSM), datetime));
                    if (!string.IsNullOrEmpty(LFs))
                    {
                        string[] datarows = StringHelper.String2Array(LFs);
                        for (int j = 0; j < datarows.Length; j++)
                        {
                            LF LFData = ParseMonitorHelper.ParseLF(datarows[j]);
                            LFDatas.Add(LFData);
                        }
                        if (LFDatas.Count > 0)
                        {
                            deviceOnlineResult.LFDatas = LFDatas;
                        }

                    }
                    //倾角
                    string QJs = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_data_qj WHERE id in(SELECT min(id) FROM monitor_data_qj WHERE bsm={0} AND {1} GROUP BY LEFT(gcsj,10),code) ORDER BY code ASC,gcsj DESC", SQLHelper.UpdateString(monitorproject.BSM), datetime));
                    if (!string.IsNullOrEmpty(QJs))
                    {
                        string[] datarows = StringHelper.String2Array(QJs);
                        for (int j = 0; j < datarows.Length; j++)
                        {
                            QJ QJData = ParseMonitorHelper.ParseQJ(datarows[j]);
                            QJDatas.Add(QJData);
                        }
                        if (QJDatas.Count > 0)
                        {
                            deviceOnlineResult.QJDatas = QJDatas;
                        }

                    }
                    //应力
                    string YLs = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_data_yl WHERE id in(SELECT min(id) FROM monitor_data_yl WHERE bsm={0} AND {1} GROUP BY LEFT(gcsj,10),code) ORDER BY code ASC,gcsj DESC", SQLHelper.UpdateString(monitorproject.BSM), datetime));
                    if (!string.IsNullOrEmpty(YLs))
                    {
                        string[] datarows = StringHelper.String2Array(YLs);
                        for (int j = 0; j < datarows.Length; j++)
                        {
                            YL YLData = ParseMonitorHelper.ParseYL(datarows[j]);
                            YLDatas.Add(YLData);
                        }
                        if (YLDatas.Count > 0)
                        {
                            deviceOnlineResult.YLDatas = YLDatas;
                        }

                    }
                    //雨量
                    string RAINs = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_data_rain WHERE id in(SELECT min(id) FROM monitor_data_rain WHERE bsm={0} AND {1} GROUP BY LEFT(gcsj,10),code) ORDER BY code ASC,gcsj DESC", SQLHelper.UpdateString(monitorproject.BSM), datetime));
                    if (!string.IsNullOrEmpty(RAINs))
                    {
                        string[] datarows = StringHelper.String2Array(RAINs);
                        for (int j = 0; j < datarows.Length; j++)
                        {
                            RAIN RAINData = ParseMonitorHelper.ParseRAIN(datarows[j]);
                            RAINDatas.Add(RAINData);
                        }
                        if (RAINDatas.Count > 0)
                        {
                            deviceOnlineResult.RAINDatas = RAINDatas;
                        }

                    }
                    //深部位移
                    string SBWYs = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_data_sbwy WHERE id in(SELECT min(id) FROM monitor_data_sbwy WHERE bsm={0} AND {1} GROUP BY LEFT(gcsj,10),code) ORDER BY code ASC,gcsj DESC", SQLHelper.UpdateString(monitorproject.BSM), datetime));
                    if (!string.IsNullOrEmpty(SBWYs))
                    {
                        string[] datarows = StringHelper.String2Array(SBWYs);
                        for (int j = 0; j < datarows.Length; j++)
                        {
                            SBWY SBWYData = ParseMonitorHelper.ParseSBWY(datarows[j]);
                            SBWYDatas.Add(SBWYData);
                        }
                        if (SBWYDatas.Count > 0)
                        {
                            deviceOnlineResult.SBWYDatas = SBWYDatas;
                        }

                    }
                    //水位
                    string WATERs = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_data_water WHERE id in(SELECT min(id) FROM monitor_data_water WHERE bsm={0} AND {1} GROUP BY LEFT(gcsj,10),code) ORDER BY code ASC,gcsj DESC", SQLHelper.UpdateString(monitorproject.BSM), datetime));
                    if (!string.IsNullOrEmpty(WATERs))
                    {
                        string[] datarows = StringHelper.String2Array(WATERs);
                        for (int j = 0; j < datarows.Length; j++)
                        {
                            WATER WATERData = ParseMonitorHelper.ParseWATER(datarows[j]);
                            WATERDatas.Add(WATERData);
                        }
                        if (WATERDatas.Count > 0)
                        {
                            deviceOnlineResult.WATERDatas = WATERDatas;
                        }

                    }

                }

            }
            return deviceOnlineResult;
        }

        /// <summary>
        /// 返回离线设备连续离线天数
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <param name="customdatetime"></param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetProjectDeviceDayCounts(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                DeviceOnlineResult deviceOnlineResult = new DeviceOnlineResult();
                List<MonitorDeviceMap> MonitorDeviceMaps = new List<MonitorDeviceMap>();
                List<GNSS> GNSSDatas = new List<GNSS>();
                List<LF> LFDatas = new List<LF>();
                List<QJ> QJDatas = new List<QJ>();
                List<YL> YLDatas = new List<YL>();
                List<RAIN> RAINDatas = new List<RAIN>();
                List<SBWY> SBWYDatas = new List<SBWY>();
                List<WATER> WATERDatas = new List<WATER>();
                int monitorcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT * FROM monitor_project  WHERE id={0}  AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (monitorcount != 0)
                {

                    MonitorProject monitorproject = ParseMonitorHelper.ParseMonitorProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_project  WHERE id={0}  AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                    if (monitorproject != null)
                    {
                        try
                        {
                            //GNSS
                            string GNSSs = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_data_gnss WHERE id in(SELECT max(id) FROM monitor_data_gnss WHERE GROUP BY code) ORDER BY code ASC,gcsj DESC", SQLHelper.UpdateString(monitorproject.BSM)));
                            if (!string.IsNullOrEmpty(GNSSs))
                            {
                                string[] datarows = StringHelper.String2Array(GNSSs);
                                for (int j = 0; j < datarows.Length; j++)
                                {
                                    GNSS GNSSData = ParseMonitorHelper.ParseGNSS(datarows[j]);
                                    GNSSDatas.Add(GNSSData);
                                }
                                if (GNSSDatas.Count > 0)
                                {
                                    deviceOnlineResult.GNSSDatas = GNSSDatas;
                                }

                            }
                            //裂缝
                            string LFs = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_data_lf WHERE id in(SELECT max(id) FROM monitor_data_lf WHERE bsm={0} GROUP BY code) ORDER BY code ASC,gcsj DESC", SQLHelper.UpdateString(monitorproject.BSM)));
                            if (!string.IsNullOrEmpty(LFs))
                            {
                                string[] datarows = StringHelper.String2Array(LFs);
                                for (int j = 0; j < datarows.Length; j++)
                                {
                                    LF LFData = ParseMonitorHelper.ParseLF(datarows[j]);
                                    LFDatas.Add(LFData);
                                }
                                if (LFDatas.Count > 0)
                                {
                                    deviceOnlineResult.LFDatas = LFDatas;
                                }

                            }
                            //倾角
                            string QJs = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_data_qj WHERE id in(SELECT max(id) FROM monitor_data_qj WHERE bsm={0} GROUP BY code) ORDER BY code ASC,gcsj DESC", SQLHelper.UpdateString(monitorproject.BSM)));
                            if (!string.IsNullOrEmpty(QJs))
                            {
                                string[] datarows = StringHelper.String2Array(QJs);
                                for (int j = 0; j < datarows.Length; j++)
                                {
                                    QJ QJData = ParseMonitorHelper.ParseQJ(datarows[j]);
                                    QJDatas.Add(QJData);
                                }
                                if (QJDatas.Count > 0)
                                {
                                    deviceOnlineResult.QJDatas = QJDatas;
                                }

                            }
                            //应力
                            string YLs = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_data_yl WHERE id in(SELECT max(id) FROM monitor_data_yl WHERE bsm={0} GROUP BY code) ORDER BY code ASC,gcsj DESC", SQLHelper.UpdateString(monitorproject.BSM)));
                            if (!string.IsNullOrEmpty(YLs))
                            {
                                string[] datarows = StringHelper.String2Array(YLs);
                                for (int j = 0; j < datarows.Length; j++)
                                {
                                    YL YLData = ParseMonitorHelper.ParseYL(datarows[j]);
                                    YLDatas.Add(YLData);
                                }
                                if (YLDatas.Count > 0)
                                {
                                    deviceOnlineResult.YLDatas = YLDatas;
                                }

                            }
                            //雨量
                            string RAINs = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_data_rain WHERE id in(SELECT max(id) FROM monitor_data_rain WHERE bsm={0} GROUP BY code) ORDER BY code ASC,gcsj DESC", SQLHelper.UpdateString(monitorproject.BSM)));
                            if (!string.IsNullOrEmpty(RAINs))
                            {
                                string[] datarows = StringHelper.String2Array(RAINs);
                                for (int j = 0; j < datarows.Length; j++)
                                {
                                    RAIN RAINData = ParseMonitorHelper.ParseRAIN(datarows[j]);
                                    RAINDatas.Add(RAINData);
                                }
                                if (RAINDatas.Count > 0)
                                {
                                    deviceOnlineResult.RAINDatas = RAINDatas;
                                }

                            }
                            //深部位移
                            string SBWYs = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_data_sbwy WHERE id in(SELECT max(id) FROM monitor_data_sbwy WHERE bsm={0} GROUP BY code) ORDER BY code ASC,gcsj DESC", SQLHelper.UpdateString(monitorproject.BSM)));
                            if (!string.IsNullOrEmpty(SBWYs))
                            {
                                string[] datarows = StringHelper.String2Array(SBWYs);
                                for (int j = 0; j < datarows.Length; j++)
                                {
                                    SBWY SBWYData = ParseMonitorHelper.ParseSBWY(datarows[j]);
                                    SBWYDatas.Add(SBWYData);
                                }
                                if (SBWYDatas.Count > 0)
                                {
                                    deviceOnlineResult.SBWYDatas = SBWYDatas;
                                }

                            }
                            //水位
                            string WATERs = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM monitor_data_water WHERE id in(SELECT max(id) FROM monitor_data_water WHERE bsm={0} GROUP BY code) ORDER BY code ASC,gcsj DESC", SQLHelper.UpdateString(monitorproject.BSM)));
                            if (!string.IsNullOrEmpty(WATERs))
                            {
                                string[] datarows = StringHelper.String2Array(WATERs);
                                for (int j = 0; j < datarows.Length; j++)
                                {
                                    WATER WATERData = ParseMonitorHelper.ParseWATER(datarows[j]);
                                    WATERDatas.Add(WATERData);
                                }
                                if (WATERDatas.Count > 0)
                                {
                                    deviceOnlineResult.WATERDatas = WATERDatas;
                                }

                            }

                            //获取monitor jcbh与device code映射
                            string monitordevice = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT a.jcdbh,c.code,c.sblx FROM monitor_monitor  a LEFT JOIN monitor_map_monitor_device b ON a.id=b.monitorid LEFT JOIN monitor_device c ON b.deviceid=c.id  WHERE a.bsm={0}  AND a.ztm={1} ORDER BY a.jcdbh", SQLHelper.UpdateString(monitorproject.BSM), (int)MODEL.Enum.State.InUse));
                            if (!string.IsNullOrEmpty(monitordevice))
                            {
                                string[] datarows = StringHelper.String2Array(monitordevice);
                                for (int i = 0; i < datarows.Length; i++)
                                {
                                    MonitorDeviceMap monitordevicemap = new MonitorDeviceMap();
                                    string[] row = datarows[i].Split(new char[] { COM.ConstHelper.columnSplit });
                                    monitordevicemap.JCDBH = row[0].ToString();
                                    monitordevicemap.CODE = row[1].ToString();
                                    MonitorDeviceMaps.Add(monitordevicemap);
                                }
                                if (MonitorDeviceMaps.Count > 0)
                                {
                                    deviceOnlineResult.MonitorDeviceMaps = MonitorDeviceMaps;
                                }

                            }
                        }
                        catch (Exception ex)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "出现异常：" + ex.Message, string.Empty));
                        }
                    }
                }
                if (deviceOnlineResult != null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(deviceOnlineResult)));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无数据！", string.Empty));
                }
            }
            else
            {
                //验权失败
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, COM.CookieHelper.CookieResult.SuccessCookie.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 返回设备预设时间范围全部日期数据采集数量
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <param name="predatetime"></param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetDeviceCountbyPreDateTime(int id, string type, string predatetime, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                string starttime = string.Empty;//开始时间（含）
                string endtime = string.Empty;//结束时间（含）
                string datetime = GetDateTimebyPre(Convert.ToInt16(predatetime), ref starttime, ref endtime);//时间范围

                if (predatetime == ((int)MODEL.EnumMonitor.AutoDataDateTime.All).ToString())
                {
                    //暂不支持查看全部
                }

                if (!string.IsNullOrEmpty(datetime))
                {
                    DeviceCountResult deviceCountResult = GetDeviceCountByDay(id, type, starttime, endtime, datetime, userbsms);
                    if (deviceCountResult != null)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(deviceCountResult)));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "设备采集数量为空！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "获取时间范围为空！", string.Empty));
                }
            }
            else
            {
                //验权失败
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, COM.CookieHelper.CookieResult.SuccessCookie.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 返回设备自定义时间范围全部日期数据采集数量
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <param name="customdatetime"></param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetDeviceCountbyCustomDateTime(int id, string type, string customdatetime, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                try
                {
                    //获取时间范围
                    string[] timerange = customdatetime.Replace(" - ", ";").Split(new char[] { ';' });
                    string starttime = timerange[0] + " 00:00:00";//开始时间（含）
                    string endtime = timerange[1] + " 59:59:59";//结束时间（含）

                    DeviceCountResult deviceCountResult = GetDeviceCountByDay(id, type, starttime, endtime, string.Format("(gcsj>='{0}' AND gcsj<'{1}')", starttime, endtime), userbsms);
                    if (deviceCountResult != null)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(deviceCountResult)));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "设备采集数量为空！", string.Empty));
                    }
                }
                catch (Exception ex)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "出现异常：" + ex.Message, string.Empty));
                }
            }
            else
            {
                //验权失败
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, COM.CookieHelper.CookieResult.SuccessCookie.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 获取监测指定时间段每天（含由数据和无数据）数据采集数量
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <param name="starttime"></param>
        /// <param name="endtime"></param>
        /// <param name="datetime"></param>
        /// <param name="userbsms"></param>
        /// <returns></returns>
        private DeviceCountResult GetDeviceCountByDay(int id, string type, string starttime, string endtime, string datetime, string userbsms)
        {
            DeviceCountResult deviceCountResult = new DeviceCountResult();

            #region 获取从开始日期到结束日期间所有日期（天）
            List<string> allDays = COM.DateHelper.GetAllDays(starttime, endtime);
            #endregion

            #region 获取数据表及设备类型
            string table = string.Empty;
            int sblx = -1;
            if (type == MODEL.EnumMonitor.AutoDeviceType.GNSS.GetRemark())
            {
                table = "monitor_data_gnss";
                sblx = (int)MODEL.EnumMonitor.AutoDeviceType.GNSS;
            }
            else if (type == MODEL.EnumMonitor.AutoDeviceType.LF.GetRemark())
            {
                table = "monitor_data_lf";
                sblx = (int)MODEL.EnumMonitor.AutoDeviceType.LF;
            }
            else if (type == MODEL.EnumMonitor.AutoDeviceType.QJ.GetRemark())
            {
                table = "monitor_data_qj";
                sblx = (int)MODEL.EnumMonitor.AutoDeviceType.QJ;
            }
            else if (type == MODEL.EnumMonitor.AutoDeviceType.SBWY.GetRemark())
            {
                table = "monitor_data_sbwy";
                sblx = (int)MODEL.EnumMonitor.AutoDeviceType.SBWY;
            }
            else if (type == MODEL.EnumMonitor.AutoDeviceType.WATER.GetRemark())
            {
                table = "monitor_data_water";
                sblx = (int)MODEL.EnumMonitor.AutoDeviceType.WATER;
            }
            else if (type == MODEL.EnumMonitor.AutoDeviceType.YL.GetRemark())
            {
                table = "monitor_data_yl";
                sblx = (int)MODEL.EnumMonitor.AutoDeviceType.YL;
            }
            else if (type == MODEL.EnumMonitor.AutoDeviceType.RAIN.GetRemark())
            {
                table = "monitor_data_rain";
                sblx = (int)MODEL.EnumMonitor.AutoDeviceType.RAIN;
            }
            #endregion

            MapMonitorDevice mapMonitorDevice = ParseMonitorHelper.ParseMapMonitorDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_monitor_device WHERE monitorid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
            if (mapMonitorDevice != null)
            {
                Device device = ParseMonitorHelper.ParseDevice(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_device WHERE id={0} AND sblx={1} AND bsm{2} AND ztm={3}", mapMonitorDevice.DeviceId, sblx, userbsms, (int)MODEL.Enum.State.InUse)));
                if (device != null)
                {
                    string counts = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT LEFT(gcsj, 10),count(*) FROM {0} WHERE code='{1}' AND bsm{2} AND {3} GROUP BY LEFT(gcsj, 10)", table, device.Code, userbsms, datetime));
                    Dictionary<string, int> datecount = new Dictionary<string, int>();
                    if (!string.IsNullOrEmpty(counts))
                    {
                        string[] rows = counts.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int i = 0; i < rows.Length; i++)
                        {
                            string[] row = rows[i].Split(new char[] { COM.ConstHelper.columnSplit });
                            datecount[row[0]] = Convert.ToInt32(row[1]);
                        }
                    }

                    List<DeviceCountDay> deviceCounts = new List<DeviceCountDay>();

                    for (int i = 0; i < allDays.Count; i++)
                    {
                        DeviceCountDay deviceCountDay = new DeviceCountDay();
                        deviceCountDay.Date = allDays[i];
                        if (datecount.Keys.Count > 0 && datecount.Keys.Contains(allDays[i]))
                        {
                            deviceCountDay.Count = datecount[allDays[i]];
                        }
                        else
                        {
                            deviceCountDay.Count = 0;
                        }

                        deviceCounts.Add(deviceCountDay);
                    }

                    if (deviceCounts.Count > 0)
                    {
                        int sum = 0;
                        for (int i = 0; i < deviceCounts.Count; i++)
                        {
                            sum += deviceCounts[i].Count;
                        }

                        deviceCountResult.DeviceCounts = deviceCounts;
                        deviceCountResult.Rate = Math.Round((sum) / (deviceCounts.Count * 24.0), 2);//24为1小时一次，应该根据设备采集频率换算
                        return deviceCountResult;
                    }
                }
            }

            return null;
        }

        /// <summary>
        /// 根据预设时间返回时间范围
        /// </summary>
        /// <param name="pre">预设时间</param>
        /// <param name="starttime">开始时间</param>
        /// <param name="endtime">结束时间</param>
        /// <returns></returns>
        private string GetDateTimebyPre(int pre, ref string starttime, ref string endtime)
        {
            if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.Today)
            {
                starttime = DateTime.Now.ToString("yyyy-MM-dd") + " 00:00:00";
                endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisTen)
            {
                int day = Convert.ToInt32(DateTime.Now.ToString("dd"));
                if ((day > 0) && (day < 11))
                {
                    starttime = DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                }
                else if ((day > 10) && (day < 21))
                {
                    starttime = DateTime.Now.ToString("yyyy-MM") + "-11 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                }
                else
                {
                    starttime = DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                }
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisMonth)
            {
                starttime = DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00";
                endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisQuarterly)
            {
                int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
                if ((month > 0) && (month < 4))
                {
                    starttime = DateTime.Now.ToString("yyyy") + "-01-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                }
                else if ((month > 3) && (month < 7))
                {
                    starttime = DateTime.Now.ToString("yyyy") + "-04-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                }
                else if ((month > 6) && (month < 10))
                {
                    starttime = DateTime.Now.ToString("yyyy") + "-07-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                }
                else
                {
                    starttime = DateTime.Now.ToString("yyyy") + "-10-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                }
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.FirstHalf)
            {
                starttime = DateTime.Now.ToString("yyyy") + "-01-01 00:00:00";
                endtime = DateTime.Now.ToString("yyyy") + "-06-30 23:59:59";
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.SencondHalf)
            {
                starttime = DateTime.Now.ToString("yyyy") + "-07-01 00:00:00";
                endtime = DateTime.Now.ToString("yyyy") + "-12-31 23:59:59";
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisYear)
            {
                starttime = DateTime.Now.ToString("yyyy") + "-01-01 00:00:00";
                endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.Yesterday)
            {
                starttime = DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 00:00:00";
                endtime = DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 23:59:59";
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreTen)
            {
                int year = Convert.ToInt32(DateTime.Now.ToString("yyyy"));
                int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
                int day = Convert.ToInt32(DateTime.Now.ToString("dd"));

                if ((day >= 1) && (day <= 10))
                {
                    if ((month == 1) || (month == 3) || (month == 5) || (month == 7) || (month == 8) || (month == 10) || (month == 12))
                    {
                        starttime = DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00";
                        endtime = DateTime.Now.ToString("yyyy-MM") + "-31 00:00:00";
                    }
                    else if ((month == 4) || (month == 6) || (month == 9) || (month == 11))
                    {
                        starttime = DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00";
                        endtime = DateTime.Now.ToString("yyyy-MM") + "-30 00:00:00";
                    }
                    else
                    {
                        if (year % 4 == 0)
                        {
                            starttime = DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00";
                            endtime = DateTime.Now.ToString("yyyy-MM") + "-29 00:00:00";
                        }
                        else
                        {
                            starttime = DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00";
                            endtime = DateTime.Now.ToString("yyyy-MM") + "-28 00:00:00";
                        }
                    }
                }
                else if ((day >= 11) && (day <= 20))
                {
                    starttime = DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM") + "-10 00:00:00";
                }
                else
                {
                    starttime = DateTime.Now.ToString("yyyy-MM") + "-11 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM") + "-20 00:00:00";
                }
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreMonth)
            {
                starttime = DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-01 00:00:00";
                endtime = DateTime.Now.ToString("yyyy-MM") + "-01-01 00:00:00";
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreQuarterly)
            {
                int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
                if ((month > 0) && (month < 4))
                {
                    starttime = DateTime.Now.AddYears(-1).ToString("yyyy") + "-10-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy") + "-01-01 00:00:00";
                }
                else if ((month > 3) && (month < 7))
                {
                    starttime = DateTime.Now.ToString("yyyy") + "-01-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy") + "-04-01 00:00:00";
                }
                else if ((month > 6) && (month < 10))
                {
                    starttime = DateTime.Now.ToString("yyyy") + "-04-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy") + "-07-01 00:00:00";
                }
                else
                {
                    starttime = DateTime.Now.ToString("yyyy") + "-07-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy") + "-10-01 00:00:00";
                }
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreYear)
            {
                starttime = DateTime.Now.AddYears(-1).ToString("yyyy") + "-01-01 00:00:00";
                endtime = DateTime.Now.AddYears(-1).ToString("yyyy") + "-12-31 23:59:59";
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.All)
            {
                starttime = string.Empty;
                endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                return "gcsj IS NOT NULL";
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.LastMonth)
            {
                starttime = DateTime.Now.AddDays(-29).ToString("yyyy-MM-dd") + " 00:00:00";
                endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            }

            return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", starttime, endtime);
        }


    }
}

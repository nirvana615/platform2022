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
    public class SridController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(SridController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString() == "" ? COM.ConstHelper.dbConn : ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取坐标系
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetSridInfo()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_coordinate WHERE ztm={0} ORDER BY id ASC", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(data))
            {
                List<Coordinate> coordinates = new List<Coordinate>();
                string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
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
        /// 创建坐标系
        /// </summary>
        [HttpPost]
        public string AddSrid()
        {
            string srid = HttpContext.Current.Request.Form["srid"];
            string name = HttpContext.Current.Request.Form["name"];
            string wkt = HttpContext.Current.Request.Form["wkt"];

            if (!string.IsNullOrEmpty(srid) && !string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(wkt))
            {
                string value = "("
                    + srid + ","
                    + SQLHelper.UpdateString(name) + ","
                    + SQLHelper.UpdateString(wkt) + ","
                    + (int)MODEL.Enum.State.InUse + ")";

                int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO manage_coordinate (srid,name,wkt,ztm) VALUES" + value);
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
        /// 更新坐标系
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateSrid()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string srid = HttpContext.Current.Request.Form["srid"];
            string name = HttpContext.Current.Request.Form["name"];
            string wkt = HttpContext.Current.Request.Form["wkt"];

            int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_coordinate WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
            if (count > 0)
            {
                if (!string.IsNullOrEmpty(srid) && !string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(wkt))
                {
                    count = 0;
                    count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE manage_coordinate SET srid={0},name={1},wkt={2} WHERE id={3} AND ztm={4}", srid, SQLHelper.UpdateString(name), SQLHelper.UpdateString(wkt), id, (int)MODEL.Enum.State.InUse));

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
                    return "内容不全！";
                }
            }
            else
            {
                return "无此坐标系！";
            }
        }

        /// <summary>
        /// 删除坐标系
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteSrid()
        {
            string id = HttpContext.Current.Request.Form["id"];
            int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_coordinate WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
            if (count > 0)
            {
                count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE manage_coordinate SET ztm={0} WHERE id={1}", (int)MODEL.Enum.State.NoUse, id));
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
                return "无此坐标系统！";
            }
        }

    }
}

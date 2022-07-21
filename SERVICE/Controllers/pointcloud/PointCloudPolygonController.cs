using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
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
    public class PointCloudPolygonController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(PointCloudPolygonController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString() == "" ? COM.ConstHelper.dbConn : ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 1-新建多边形信息
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string EditPolygon()
        {
            #region 参数
            string cookie = HttpContext.Current.Request.Form["cookie"];
            string points = HttpContext.Current.Request.Form["points"];
            string regionId = HttpContext.Current.Request.Form["regionid"];
            string type = HttpContext.Current.Request.Form["type"];
            string projectId = HttpContext.Current.Request.Form["projectId"];

            string axisx = HttpContext.Current.Request.Form["axisx"];
            string axisy = HttpContext.Current.Request.Form["axisy"];
            string normal = HttpContext.Current.Request.Form["normal"];
            string origin = HttpContext.Current.Request.Form["origin"];
            string vertices2d = HttpContext.Current.Request.Form["vertices2d"];
            string vertices3d = HttpContext.Current.Request.Form["vertices3d"];
            string vertices3dlbh = HttpContext.Current.Request.Form["vertices3dlbh"];
            string level = HttpContext.Current.Request.Form["level"];
            string vertical = HttpContext.Current.Request.Form["vertical"];
            string height = HttpContext.Current.Request.Form["height"];

            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }
                if (!string.IsNullOrEmpty(projectId)
                    && !string.IsNullOrEmpty(points)
                    && !string.IsNullOrEmpty(regionId)
                    )
                {
                    string polygonid = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT id FROM pointcloud_data_polygoninfo WHERE relateid={0}  AND ztm={1}", regionId, (int)MODEL.Enum.State.InUse));

                    if (polygonid == "")
                    {
                        string sql = "INSERT INTO pointcloud_data_polygoninfo (relateid,type,points,cjsj,projectid,ztm";
                        string value = "("
                        + regionId + ","
                        + type + ","
                        + SQLHelper.UpdateString(points) + ","
                        + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                        + projectId + ","
                        + (int)MODEL.Enum.State.InUse;


                        if (!string.IsNullOrEmpty(axisx))
                        {
                            sql = sql + ",axisx";
                            value = value + "," + SQLHelper.UpdateString(axisx);
                        }
                        if (!string.IsNullOrEmpty(axisy))
                        {
                            sql = sql + ",axisy";
                            value = value + "," + SQLHelper.UpdateString(axisy);
                        }
                        if (!string.IsNullOrEmpty(normal))
                        {
                            sql = sql + ",normal";
                            value = value + "," + SQLHelper.UpdateString(normal);
                        }
                        if (!string.IsNullOrEmpty(origin))
                        {
                            sql = sql + ",origin";
                            value = value + "," + SQLHelper.UpdateString(origin);
                        }
                        if (!string.IsNullOrEmpty(vertices2d))
                        {
                            sql = sql + ",vertices2d";
                            value = value + "," + SQLHelper.UpdateString(vertices2d);
                        }
                        if (!string.IsNullOrEmpty(vertices3d))
                        {
                            sql = sql + ",vertices3d";
                            value = value + "," + SQLHelper.UpdateString(vertices3d);
                        }
                        if (!string.IsNullOrEmpty(vertices3dlbh))
                        {
                            sql = sql + ",vertices3dlbh";
                            value = value + "," + SQLHelper.UpdateString(vertices3dlbh);
                        }
                        if (!string.IsNullOrEmpty(level))
                        {
                            sql = sql + ",level";
                            value = value + "," + SQLHelper.UpdateString(level);
                        }
                        if (!string.IsNullOrEmpty(vertical))
                        {
                            sql = sql + ",vertical";
                            value = value + "," + SQLHelper.UpdateString(vertical);
                        }
                        if (!string.IsNullOrEmpty(height))
                        {
                            sql = sql + ",height";
                            value = value + "," + SQLHelper.UpdateString(height);
                        }

                        int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, sql + ") VALUES" + value + ")");
                        if (id != -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", string.Empty));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "保存失败！", string.Empty));
                        }
                    }
                    else
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE pointcloud_data_polygoninfo SET" +
                            " points={0},cjsj={1}, axisx={2},axisy={3} ,normal={4},origin={5},vertices2d={6},vertices3d={7}," +
                            "vertices3dlbh={8},level={9},vertical={10},height={11}" +
                            "WHERE relateid={12}  AND ztm={13}",
                            SQLHelper.UpdateString(points),
                            SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")),
                             SQLHelper.UpdateString(axisx),
                             SQLHelper.UpdateString(axisy),
                             SQLHelper.UpdateString(normal),
                             SQLHelper.UpdateString(origin),
                             SQLHelper.UpdateString(vertices2d),
                             SQLHelper.UpdateString(vertices3d),
                             SQLHelper.UpdateString(vertices3dlbh),

                            SQLHelper.UpdateString(level),
                            SQLHelper.UpdateString(vertical),
                            SQLHelper.UpdateString(height),
                            regionId,
                            (int)MODEL.Enum.State.InUse));

                        if (updatecount == 1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "更新成功！", string.Empty));

                        }
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "更新失败，请重试！！", string.Empty));


                    }





                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "参数不全！", string.Empty));
                }
            }

            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "验证用户失败！", string.Empty));
            }

        }

        /// <summary>
        /// 2-多边形信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetPolygon(string relateid)
        {
            string polygoninfo = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM pointcloud_data_polygoninfo WHERE relateid={0} and ztm={1} ", relateid, (int)MODEL.Enum.State.InUse));
            string[] row = polygoninfo.Split(new char[] { COM.ConstHelper.rowSplit });
            if (!string.IsNullOrEmpty(polygoninfo))
            {
                PolygonInfo PolygonInfo = new PolygonInfo();
                PolygonInfo = ParsePointCloudHelper.ParsePolygonInfo(row[0]);
                return JsonHelper.ToJson(PolygonInfo);
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无相关信息！", string.Empty));
            }
        }
    }
}
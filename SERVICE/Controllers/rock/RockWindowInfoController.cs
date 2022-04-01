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
    /// 消落带项目
    /// </summary>
    public class RockWindowInfoController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(RockWindowInfoController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 新建测区
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddRockWindow()
        {
            #region 参数
            string projectId = HttpContext.Current.Request.Form["projectId"];
            string points = HttpContext.Current.Request.Form["points"];
            string creatTime = HttpContext.Current.Request.Form["creatTime"];
            string name = HttpContext.Current.Request.Form["name"];
            string remarks = HttpContext.Current.Request.Form["remarks"];
            string sideLength = HttpContext.Current.Request.Form["sideLength"];
            string sidebLength = HttpContext.Current.Request.Form["sidebLength"];
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
                    && !string.IsNullOrEmpty(creatTime)
                    && !string.IsNullOrEmpty(name)
                    && !string.IsNullOrEmpty(remarks)
                    && !string.IsNullOrEmpty(sideLength))
                {
                    string sql = "INSERT INTO flz_window_info (project_id,points,creat_time,name,side_length,remarks";
                    string value = "("
                    + projectId + ","
                    + SQLHelper.UpdateString(points) + ","
                    + SQLHelper.UpdateString(creatTime) + ","
                    + SQLHelper.UpdateString(name) + ","
                    + SQLHelper.UpdateString(sideLength) + ","
                    + SQLHelper.UpdateString(remarks);

                    if (!string.IsNullOrEmpty(sidebLength))
                    {
                        sql = sql + ",sideb_length";
                        value = value + "," + SQLHelper.UpdateString(sidebLength);
                    }
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
                        value = value + "," + SQLHelper.UpdateString(normal) ;
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
                        
                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, sql +") VALUES" + value + ")" );
                    if (id != -1)
                    {
                        return id + "";
                    }
                    else
                    {
                        return "保存失败！";
                    }

                }
                else
                {
                    return "参数不全！";
                }
            }
            else
            {
                return "验证用户失败！";
            }
        }
        /// <summary>
        /// 更新项目
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string UpdateRockWindow()
        {
            #region 参数
            string name = HttpContext.Current.Request.Form["name"];
            string remarks = HttpContext.Current.Request.Form["remarks"];
            string id = HttpContext.Current.Request.Form["id"];

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

                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(" UPDATE flz_window_info set name={0} ,remarks={1} where id={2}"
                        , SQLHelper.UpdateString(name),
                            SQLHelper.UpdateString(remarks),
                            id));
                if (updatecount == 1)
                {
                    return "更新成功";
                }
                else
                {
                    return "更新失败";
                }
            }
            else
            {
                return "验证用户失败！";
            }
        }
        /// <summary>
        /// 删除项目
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteRockWindow()
        {
            string id = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE FROM  flz_window_info  WHERE id={0}", id));
                if (updatecount == 1)
                {
                    return "删除成功";
                }
                else
                {
                    return "删除失败";
                }
            }
            else
            {
                return "用户验证失败！";
            }
        }
        /// <summary>
        /// 获取图层信息
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie">用户信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetWindowInfoList(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);


            RockProject project = ParseRockHelper.ParseProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM flz_project WHERE id={0}  AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
            if (project != null)
            {
                #region
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM flz_window_info WHERE project_id={0}", id));
                if (!string.IsNullOrEmpty(data))
                {
                    List<RockWindowInfo> flzWindowInfo = new List<RockWindowInfo>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        RockWindowInfo flzData = ParseRockHelper.ParseRockWindowInfo(rows[i]);
                        flzWindowInfo.Add(flzData);
                    }
                    return JsonHelper.ToJson(flzWindowInfo);
                }
            }
            #endregion


            return "没有项目";
        }

        /// <summary>
        /// 自定义测区
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string getWindowInfo()
        {
            #region 参数
            string bpsList = HttpContext.Current.Request.Form["bpsList"];//边界list
            string eyesList = HttpContext.Current.Request.Form["eyesList"];//视界list
            string spsList = HttpContext.Current.Request.Form["spsList"];//加密点list

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
                //Object list1 = JsonHelper.ToObject<string>(x);

                List<xyz> bps = JsonHelper.ToObject<List<xyz>>(bpsList);
                List<xyz> eyes = JsonHelper.ToObject<List<xyz>>(eyesList);
                List<xyz> sps = JsonHelper.ToObject<List<xyz>>(spsList);
                List<XYZ> bps_XYZ = new List<XYZ>();
                for (int i = 0; i < bps.Count; i++)
                {
                    bps_XYZ.Add(new XYZ(bps[i].x, bps[i].y, bps[i].z));
                }
                List<XYZ> eyes_XYZ = new List<XYZ>();
                for (int i = 0; i < eyes.Count; i++)
                {
                    eyes_XYZ.Add(new XYZ(eyes[i].x, eyes[i].y, eyes[i].z));
                }
                List<XYZ> sps_XYZ = new List<XYZ>();
                for (int i = 0; i < sps.Count; i++)
                {
                    sps_XYZ.Add(new XYZ(sps[i].x, sps[i].y, sps[i].z));
                }


                COM.GeologyWindow gw = COM.Fit.FitPlane(bps_XYZ, eyes_XYZ, sps_XYZ);
                

           

                if (!string.IsNullOrEmpty(bpsList)
                    && !string.IsNullOrEmpty(eyesList) && !string.IsNullOrEmpty(spsList))
                {

                    //string value = "("
                    //+ projectId + ","
                    //+ SQLHelper.UpdateString(points) + ","
                    //+ SQLHelper.UpdateString(creatTime) + ","
                    //+ SQLHelper.UpdateString(name) + ","
                    //+ SQLHelper.UpdateString(sideLength) + ","
                    //+ SQLHelper.UpdateString(remarks)
                    //+ ")";


                    //int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO flz_window_info (project_id,points,creat_time,name,side_length,remarks) VALUES" + value);
                    //if (id != -1)
                    //{
                    //    return id + "";
                    //}
                    //else
                    //{
                    //    return "保存失败！";
                    //}
                    return JsonHelper.ToJson(gw);//无角色
                    //return bpsList;
                }
                else
                {
                    return "参数不全！";
                }
            }
            else
            {
                return "验证用户失败！";
            }
        }

    }
}

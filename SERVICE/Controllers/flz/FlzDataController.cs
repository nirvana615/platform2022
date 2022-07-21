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
    public class FlzDataController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(FlzDataController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString() == "" ? COM.ConstHelper.dbConn : ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 新建点
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddFlzPoint()
        {
            #region 参数
            string projectId = HttpContext.Current.Request.Form["projectId"];
            string position = HttpContext.Current.Request.Form["position"];
            string type = HttpContext.Current.Request.Form["type"];

            string name = HttpContext.Current.Request.Form["name"];
            string remarks = HttpContext.Current.Request.Form["remarks"];
            string src = HttpContext.Current.Request.Form["src"];
            string inclination = HttpContext.Current.Request.Form["inclination"];
            string dipAngle = HttpContext.Current.Request.Form["dipAngle"];
            string trend = HttpContext.Current.Request.Form["trend"];
            string traceLength = HttpContext.Current.Request.Form["traceLength"];
            string avgOpening = HttpContext.Current.Request.Form["avgOpening"];
            string creatTime = HttpContext.Current.Request.Form["creatTime"];
            string modleTime = HttpContext.Current.Request.Form["modleTime"];
            string windowId = HttpContext.Current.Request.Form["windowId"];
            string measure = HttpContext.Current.Request.Form["measure"];
            string modleId = HttpContext.Current.Request.Form["modleId"];
            string collector = HttpContext.Current.Request.Form["collector"];

            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion
            if(type=="3"|| type == "4"|| type == "2"){//结构面，节理,线标注
                name = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("select  max(id) from flz_data_point "));
            }
            if (string.IsNullOrEmpty(name))
            {
                name = "1";
            }
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }

                if (!string.IsNullOrEmpty(projectId)
                    && !string.IsNullOrEmpty(position)
                    && !string.IsNullOrEmpty(type)
                    && !string.IsNullOrEmpty(name)
                    && !string.IsNullOrEmpty(remarks))
                {
                    
                    if (true)
                    {
                        string sql = "INSERT INTO flz_data_point(project_id, position, type, name, remarks" ; 
                        string value = "("
                        + projectId + ","
                        + SQLHelper.UpdateString(position) + ","
                        + SQLHelper.UpdateString(type) + ","
                        + SQLHelper.UpdateString(name) + ","
                        + SQLHelper.UpdateString(remarks);

                        if (!string.IsNullOrEmpty(src))
                        {
                            sql = sql + ", src";
                            value = value + "," + SQLHelper.UpdateString(src);
                        }
                        if (!string.IsNullOrEmpty(inclination))
                        {
                            sql = sql + ", inclination";
                            value = value + "," + SQLHelper.UpdateString(inclination);
                        }
                        if (!string.IsNullOrEmpty(dipAngle))
                        {
                            sql = sql + ", dip_angle";
                            value = value + "," + SQLHelper.UpdateString(dipAngle);
                        }
                        if (!string.IsNullOrEmpty(trend))
                        {
                            sql = sql + ", trend";
                            value = value + "," + SQLHelper.UpdateString(trend);
                        }
                        if (!string.IsNullOrEmpty(traceLength))
                        {
                            sql = sql + ", trace_length";
                            value = value + "," + SQLHelper.UpdateString(traceLength);
                        }
                        if (!string.IsNullOrEmpty(avgOpening))
                        {
                            sql = sql + ", avg_opening";
                            value = value + "," + SQLHelper.UpdateString(avgOpening);
                        }
                        if (!string.IsNullOrEmpty(creatTime))
                        {
                            sql = sql + ", creat_time";
                            value = value + "," + SQLHelper.UpdateString(creatTime);
                        }
                        if (!string.IsNullOrEmpty(modleTime))
                        {
                            sql = sql + ", modle_time";
                            value = value + "," + SQLHelper.UpdateString(modleTime);
                        }
                        if (!string.IsNullOrEmpty(windowId))
                        {
                            sql = sql + ", window_id";
                            value = value + "," + SQLHelper.UpdateString(windowId);
                        }
                        if (!string.IsNullOrEmpty(measure))
                        {
                            sql = sql + ", measure";
                            value = value + "," + SQLHelper.UpdateString(measure);
                        }
                        if (!string.IsNullOrEmpty(modleId))
                        {
                            sql = sql + ", modle_id";
                            value = value + "," + SQLHelper.UpdateString(modleId);
                        }
                        if (!string.IsNullOrEmpty(collector))
                        {
                            sql = sql + ", collector";
                            value = value + "," + SQLHelper.UpdateString(collector);
                        }
                        

                       sql = sql+  ") VALUES"+ value + ")";

                        int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, sql);
                        if (id != -1)
                        {
                            return id+"";
                        }
                        else
                        {
                            return "保存失败！";
                        }
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
        public string UpdateFlzPoint()
        {
            #region 参数
            string name = HttpContext.Current.Request.Form["name"];
            string remarks = HttpContext.Current.Request.Form["remarks"];
            string avgOpening = HttpContext.Current.Request.Form["avgOpening"];
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
                
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(" UPDATE flz_data_point set name={0} ,remarks={1},avg_opening={2} where id={3}"
                            , SQLHelper.UpdateString(name),
                                SQLHelper.UpdateString(remarks),
                                SQLHelper.UpdateString(avgOpening),
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
        public string DeleteFlzPoint()
        {
            string id = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE FROM  flz_data_point  WHERE id={0}", id));
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
        /// 获取节理信息
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie">用户信息</param>
        /// <param name="modleId">模型id</param>
        /// <param name="windowId">测窗id</param>
        /// <param name="collector">采集人</param>
        /// <param name="type">数据类型</param>
        /// <returns></returns>
        [HttpGet]
        public string GetWindowInfoList(int id, string cookie,string collector, string modleId, string windowId,string type)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);


            FlzProject project = ParseFlzoneHelper.ParseProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM flz_project WHERE id={0}  AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
            if (project != null)
            {

                #region
                string sql = "SELECT * FROM flz_data_point WHERE project_id={0} ";
                if (!string.IsNullOrEmpty(collector))
                {
                    sql = sql + " and collector like '%" + collector + "%'";
                }
                if (!string.IsNullOrEmpty(modleId))
                {
                    sql = sql + " and modle_id  =" + modleId + "";
                }
                if (!string.IsNullOrEmpty(windowId))
                {
                    sql = sql + " and window_id  =" + windowId + "";
                }
                if (!string.IsNullOrEmpty(type))
                {
                    sql = sql + " and type  ='" + type + "'";
                }
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql, id));
                if (!string.IsNullOrEmpty(data))
                {
                    List<FlzData> flzDateList = new List<FlzData>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        FlzData flzData = ParseFlzoneHelper.ParseFlzData(rows[i]);
                        flzDateList.Add(flzData);

                    }
                    return JsonHelper.ToJson(flzDateList);
                }
                
                

            }
            #endregion


            return "";
        }



        /// <summary>
        /// 获取节理信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetAllfoList()
        {
            #region
            string sql = "select b.* from  flz_window_info a ,flz_data_point b  where   a.name like 'CC9%' and a.id=b.window_id ";

            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql));
            if (!string.IsNullOrEmpty(data))
            {
                List<FlzData> flzDateList = new List<FlzData>();
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    FlzData flzData = ParseFlzoneHelper.ParseFlzData(rows[i]);
                    flzDateList.Add(flzData);

                }
                return JsonHelper.ToJson(flzDateList);
            }

            #endregion

            return "";
        }
        /// <summary>
        /// 更新项目
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string UpdateFlzPointJiChang()
        {
            
            string traceLength = HttpContext.Current.Request.Form["traceLength"];
            string measure = HttpContext.Current.Request.Form["measure"];
            string avgOpening = HttpContext.Current.Request.Form["avgOpening"];
            string id = HttpContext.Current.Request.Form["id"];



            int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(" UPDATE flz_data_point set trace_length={0},measure={1},avg_opening={2}  where id={3}"
                    , SQLHelper.UpdateString(traceLength),
                    SQLHelper.UpdateString(measure),
                    SQLHelper.UpdateString(avgOpening),
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

        /// <summary>
        /// 三位坐标转二维
        /// </summary>
        /// <param name="xyzs">项目id</param>
        /// <param name="mw">用户信息</param>

        /// <returns></returns>
        [HttpGet]
        public string GetXYZ2sxy( string xyzs, string mw)
        {
            return Geology.XYZs2xys(xyzs, mw);
        }
        
    }
}

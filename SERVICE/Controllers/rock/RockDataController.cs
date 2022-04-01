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
    public class RockDataController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(RockDataController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 新建点
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddRockPoint()
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

            string colour = HttpContext.Current.Request.Form["colour"];//颜色
            string lineType = HttpContext.Current.Request.Form["lineType"];//线的类型
            string lineSize = HttpContext.Current.Request.Form["lineSize"];//大小





            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion
            if(type == "1" || type =="3"|| type == "4"){//结构面，节理
                name = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("select  max(id) from rock_data_point "));
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
                        string sql = "INSERT INTO rock_data_point(project_id, position, type, name, remarks" ; 
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
                        if (!string.IsNullOrEmpty(user.UserName))
                        {
                            sql = sql + ", collector";
                            value = value + "," + SQLHelper.UpdateString(user.UserName);
                        }
                        if (!string.IsNullOrEmpty(colour))//颜色
                        {
                            sql = sql + ", colour";
                            value = value + "," + SQLHelper.UpdateString(colour);
                        }
                        if (!string.IsNullOrEmpty(lineType))//线性
                        {
                            sql = sql + ", line_type";
                            value = value + "," + SQLHelper.UpdateString(lineType);
                        }

                        if (!string.IsNullOrEmpty(lineSize))//线大小
                        {
                            sql = sql + ", line_size";
                            value = value + "," + SQLHelper.UpdateString(lineSize);
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
        public string UpdateRockPoint()
        {
            #region 参数
            string name = HttpContext.Current.Request.Form["name"];
            string remarks = HttpContext.Current.Request.Form["remarks"];
            string id = HttpContext.Current.Request.Form["id"];
            string postion = HttpContext.Current.Request.Form["postion"];

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
      
                int updatecount = 0;
                if (!string.IsNullOrEmpty(postion)) 
                {
                    

                     updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(" UPDATE rock_data_point set name ={0} ,remarks ={1},position={2} where id={3}"
                            , SQLHelper.UpdateString(name),
                                SQLHelper.UpdateString(remarks), 
                                SQLHelper.UpdateString(postion),
                                id));
                }
                else
                {
                    updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(" UPDATE rock_data_point set name ={0} ,remarks ={1} where id={2}"
                          , SQLHelper.UpdateString(name),
                              SQLHelper.UpdateString(remarks),
                              id));
                }
            

                
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
        public string DeleteRockPoint()
        {
            string id = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE FROM  rock_data_point  WHERE id={0}", id));
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


            RockProject project = ParseRockHelper.ParseProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM rock_project WHERE id={0}  AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
            if (project != null)
            {

                #region
                string sql = "SELECT * FROM rock_data_point WHERE project_id={0} ";
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
                    List<RockData> flzDateList = new List<RockData>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        RockData flzData = ParseRockHelper.ParseRockData(rows[i]);
                        flzDateList.Add(flzData);

                    }
                    return JsonHelper.ToJson(flzDateList);
                }
                
                

            }
            #endregion


            return "";
        }

        /// <summary>
        /// 获取模型标注信息
        /// </summary>
        /// <param name="projectId">项目id</param>
        /// <param name="cookie">用户信息</param>
        /// <param name="modleId">模型id</param>
        /// <param name="type">数据类型</param>
        /// <param name="user">登录名</param>
        /// <returns></returns>
        [HttpGet]
        public string GetBiaozhunListInfo(int projectId, string cookie, string modleId, string type,string user)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
          
                #region
                string sql = "SELECT * FROM rock_data_point WHERE project_id={0} ";
               
                if (!string.IsNullOrEmpty(modleId))
                {
                    sql = sql + " and modle_id  =" + modleId + "";
                }
                if (!string.IsNullOrEmpty(type))
                {
                    sql = sql + " and type  ='" + type + "'";
                }
                if (!string.IsNullOrEmpty(user))
                {
                    sql = sql + " and collector  ='" + user + "'";
                }
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql, projectId));
                if (!string.IsNullOrEmpty(data))
                {
                    List<RockData> rockDateList = new List<RockData>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        RockData flzData = ParseRockHelper.ParseRockData(rows[i]);
                        rockDateList.Add(flzData);

                    }
                    return JsonHelper.ToJson(rockDateList);
                }



            
            #endregion


            return "";
        }



    }
}

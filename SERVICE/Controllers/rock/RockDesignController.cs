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
    /// 设计数据表
    /// 
    /// </summary>
    public class RockDesignController : ApiController
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
            string name = HttpContext.Current.Request.Form["name"];
            string remarks = HttpContext.Current.Request.Form["remarks"];
            string profilePostion = HttpContext.Current.Request.Form["profilePostion"];
            string drillHolePostion = HttpContext.Current.Request.Form["drillHolePostion"];
            string measurWindowPostion = HttpContext.Current.Request.Form["measurWindowPostion"];
            string probeSlotPostion = HttpContext.Current.Request.Form["probeSlotPostion"];





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
                    && !string.IsNullOrEmpty(profilePostion)
                    && !string.IsNullOrEmpty(name)
                    && !string.IsNullOrEmpty(remarks))
                {

                    if (true)
                    {
                        string sql = "INSERT INTO rock_design_data(project_id,profile_position , name, remarks";
                        string value = "("
                        + projectId + ","
                        + SQLHelper.UpdateString(profilePostion) + ","
                        + SQLHelper.UpdateString(name) + ","
                        + SQLHelper.UpdateString(remarks);

                        if (!string.IsNullOrEmpty(drillHolePostion))
                        {
                            sql = sql + ", drill_hole_position";
                            value = value + "," + SQLHelper.UpdateString(drillHolePostion);
                        }
                        if (!string.IsNullOrEmpty(measurWindowPostion))
                        {
                            sql = sql + ", measur_window_position";
                            value = value + "," + SQLHelper.UpdateString(measurWindowPostion);
                        }
                        if (!string.IsNullOrEmpty(probeSlotPostion))
                        {
                            sql = sql + ", probe_slot_position";
                            value = value + "," + SQLHelper.UpdateString(probeSlotPostion);
                        }


                        sql = sql + ") VALUES" + value + ")";

                        int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, sql);
                        if (id != -1)
                        {
                            return id + "";
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
        public string UpdateRockDesignPoint()
        {
            #region 参数
            string remark = HttpContext.Current.Request.Form["remark"];
            string profilePostion = HttpContext.Current.Request.Form["profilePostion"];
            string id = HttpContext.Current.Request.Form["id"];
            string drillHolePostion = HttpContext.Current.Request.Form["drillHolePostion"];
            string measurWindowPostion = HttpContext.Current.Request.Form["measurWindowPostion"];
            string probeSlotPostion = HttpContext.Current.Request.Form["probeSlotPostion"]; 
            string lastModifiedPro = HttpContext.Current.Request.Form["lastModifiedPro"]; //最后修改人，改为剖面线
            string name = HttpContext.Current.Request.Form["name"]; //名称
            

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
                
                if (!string.IsNullOrEmpty(profilePostion))
                {
                    string sql = " UPDATE rock_design_data set remark={0},profile_position={1},name={2} WHERE id={3}";
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(sql
                            , SQLHelper.UpdateString(remark), SQLHelper.UpdateString(profilePostion), SQLHelper.UpdateString(name), id));
                    if (updatecount == 1)
                    {
                        return "更新成功";
                    }
                    else
                    {
                        return "更新失败";
                    }
                }else if (!string.IsNullOrEmpty(drillHolePostion))
                {
                    string sql = " UPDATE rock_design_data set remark={0},drill_hole_position={1} WHERE id={2}";
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(sql
                            , SQLHelper.UpdateString(remark), SQLHelper.UpdateString(drillHolePostion), id));
                    if (updatecount == 1)
                    {
                        return "更新成功";
                    }
                    else
                    {
                        return "更新失败";
                    }
                }
                else if (!string.IsNullOrEmpty(measurWindowPostion))//测窗
                {
                    string sql = " UPDATE rock_design_data set remark={0}, measur_window_position={1} WHERE id={2}";
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(sql
                             , SQLHelper.UpdateString(remark), SQLHelper.UpdateString(measurWindowPostion), id));
                    if (updatecount == 1)
                    {
                        return "更新成功";
                    }
                    else
                    {
                        return "更新失败";
                    }
                }
                else if (!string.IsNullOrEmpty(probeSlotPostion))
                {
                    string sql = " UPDATE rock_design_data set remark={0},probe_slot_position={1} WHERE id={2}";
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(sql
                            , SQLHelper.UpdateString(remark), SQLHelper.UpdateString(probeSlotPostion), id));
                    if (updatecount == 1)
                    {
                        return "更新成功";
                    }
                    else
                    {
                        return "更新失败";
                    }
                }
                else if (!string.IsNullOrEmpty(lastModifiedPro))
                {
                    string sql = " UPDATE rock_design_data set last_modified_pro={0} WHERE id={1}";
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(sql
                            , SQLHelper.UpdateString(lastModifiedPro), id));
                    if (updatecount == 1)
                    {
                        return "更新成功";
                    }
                    else
                    {
                        return "更新失败";
                    }
                }
                return "砸出来了";


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
        public string DeleteRockkDesignPoint()
        {
            string id = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE FROM  rock_design_data  WHERE id={0}", id));
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
        ///// <param name="modleId">模型id</param>
        ///// <param name="type">数据类型</param>
        ///// <param name="user">登录名</param>
        /// <returns></returns>
        [HttpGet]
        public string GetRockDesignListInfo(int projectId, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
          
                #region
                string sql = "SELECT * FROM rock_design_data WHERE project_id={0}  ORDER BY length(name),name ASC";
               
                //if (!string.IsNullOrEmpty(modleId))
                //{
                //    sql = sql + " and modle_id  =" + modleId + "";
                //}
                //if (!string.IsNullOrEmpty(type))
                //{
                //    sql = sql + " and type  ='" + type + "'";
                //}
                //if (!string.IsNullOrEmpty(user))
                //{
                //    sql = sql + " and collector  ='" + user + "'";
                //}
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql, projectId));
                if (!string.IsNullOrEmpty(data))
                {
                    List<RockDesignData> rockDateList = new List<RockDesignData>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                    RockDesignData rockDesignData = ParseRockHelper.ParseRockDesignData((rows[i]));
                        rockDateList.Add(rockDesignData);

                    }
                    return JsonHelper.ToJson(rockDateList);
                }



            
            #endregion


            return "";
        }
        /// <summary>
        /// 航线信息
        /// </summary>
        /// <param name="WindowInfo">项目id</param>

        /// <returns></returns>
        [HttpGet]
        public string GethangLine(string WindowInfo)
        {
            // GeologyWindow x = new GeologyWindow();
            GeologyWindow x = COM.JsonHelper.ToObject<GeologyWindow>(WindowInfo);
            #region
            return MeasureWindowRoute.CreateRoute(x);

            #endregion


            //return "";
        }
        /// <summary>
        /// 获取模型地址
        /// </summary>
        /// <param name="windowName">项目id</param>

        /// <returns></returns>
        [HttpGet]
        public string getModelurl(string windowName)
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT mxlj FROM survey_model WHERE mxmc={0} ", SQLHelper.UpdateString(windowName)));
            #region
            return data;

            #endregion


            //return "";
        }

    }
}

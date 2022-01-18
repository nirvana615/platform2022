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
    /// 测绘
    /// </summary>
    public class PatrolEquipmentController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(SurveyController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取未处理的数据,返回未处理的信息
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string getUntreatedPatrolEquipmentInfo(string id, string cookie, string patrolStatus, string equipmentName, string patrolNum)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                string sql= "SELECT * FROM patrol_equipment_info WHERE project_id ={0}";
              
                if (!string.IsNullOrEmpty(patrolStatus))
                {
                    sql = sql + "and patrol_status = " + SQLHelper.UpdateString(patrolStatus);
                }
                if (!string.IsNullOrEmpty(equipmentName))
                {
                    sql = sql + "and equipment_name like  " + SQLHelper.UpdateString("%"+ equipmentName + "%");
                }
                if (!string.IsNullOrEmpty(patrolNum))
                {
                    sql = sql + "and patrol_num =  " + SQLHelper.UpdateString(patrolNum);
                }
                string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql, SQLHelper.UpdateString(id)));
                if (!string.IsNullOrEmpty(datas))
                {
                    List<PatrolEquipmentInfo> patrolEquipmentInfoList= new List<PatrolEquipmentInfo>();

                    string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        PatrolEquipmentInfo patrolEquipmentInfo = ParseMonitorHelper.ParsePatrolEquipmentInfo(rows[i]);       //ParseMapProjectWarningInfo(rows[i]);
                        if (patrolEquipmentInfo != null)
                        {
                            patrolEquipmentInfoList.Add(patrolEquipmentInfo);
                         
                        }
                    }

                    if (patrolEquipmentInfoList.Count > 0)
                    {
                        return JsonHelper.ToJson(patrolEquipmentInfoList);
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
                //验权失败
                return "登陆过期";
            }
        }
      
        
        /// <summary>
        /// 更新巡视信息
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdatePartorSheBei()
        {
            string bzwh = HttpContext.Current.Request.Form["bzwh"];//标志
            string cgqgr = HttpContext.Current.Request.Form["cgqgr"];//
            string equipmentDesc = HttpContext.Current.Request.Form["equipmentDesc"];
            string flzz = HttpContext.Current.Request.Form["flzz"];
            string id = HttpContext.Current.Request.Form["id"];
            string jclz = HttpContext.Current.Request.Form["jclz"];
            string patrolDesc = HttpContext.Current.Request.Form["patrolDesc"];
            string patrolResult = HttpContext.Current.Request.Form["patrolResult"];
            string patrolStatus = HttpContext.Current.Request.Form["patrolStatus"];
            string txxlph = HttpContext.Current.Request.Form["txxlph"];
            string tynzd = HttpContext.Current.Request.Form["tynzd"];
            string cookie = HttpContext.Current.Request.Form["cookie"];
            string photoName = HttpContext.Current.Request.Form["photoName"];//照片改为异物入侵

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE patrol_equipment_info " +
                    "SET bzwh={0},cgqgr={1},equipment_desc={2},flzz={3},jclz={4},patrol_desc={5},patrol_result={6},patrol_status={7},txxlph={8},tynzd={9},photo_name={10} WHERE id={11} "
                    , SQLHelper.UpdateString(string.IsNullOrEmpty(bzwh)?"0":"1"), SQLHelper.UpdateString(string.IsNullOrEmpty(cgqgr) ? "0" : "1"), SQLHelper.UpdateString(string.IsNullOrEmpty(equipmentDesc) ? "0" : "1"), SQLHelper.UpdateString(string.IsNullOrEmpty(flzz) ? "0" : "1"), SQLHelper.UpdateString(string.IsNullOrEmpty(jclz) ? "0" : "1"), SQLHelper.UpdateString(string.IsNullOrEmpty(patrolDesc) ? "0" : "1"), SQLHelper.UpdateString(patrolResult), SQLHelper.UpdateString(patrolStatus), SQLHelper.UpdateString(string.IsNullOrEmpty(txxlph) ? "0" : "1"), SQLHelper.UpdateString(string.IsNullOrEmpty(tynzd) ? "0" : "1"), SQLHelper.UpdateString(string.IsNullOrEmpty(photoName) ? "0" : "1"), id));

                if (updatecount == 1)
                {
                    return "更新成功！";
                }
            }
            else
            {
                //无此权限
                return "重新登陆！";
            }

            return string.Empty;
        }

        /// <summary>
        /// 获取未处理的数据,返回未处理的信息.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string getDianYunShuJu(string id, string cookie,string xmmc,string regionname,string xszt)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                string sql = " select b.regionalboundary, b.regionname,d.id as projectId,d.xmmc,LEFT(c.cjsj,10) as xssj,c.id as pointDataId,c.regionid,c.xszt,c.xsjg,f.mxlj,h.level,h.vertical	from pointcloud_project_monitor_project a ,pointcloud_data_region b,pointcloud_data c,pointcloud_project d ,monitor_map_project_survey e ,survey_model f,pointcloud_data_polygoninfo h where a.mprojectid={0} and a.pcprojectid = b.projectid and b.id=c.regionid and a.pcprojectid=d.id and e.projectid=d.id and e.role='6' and e.surveyid=f.id and h.relateid=b.id ";
                if (!string.IsNullOrEmpty(xmmc))
                {
                    sql = sql + "and d.xmmc like  " + SQLHelper.UpdateString("%" + xmmc + "%");
                }
                if (!string.IsNullOrEmpty(regionname))
                {
                    sql = sql + "and b.regionname like  " + SQLHelper.UpdateString("%" + regionname + "%");
                }
                if (!string.IsNullOrEmpty(xszt))
                {
                    sql = sql + "and c.xszt = " + SQLHelper.UpdateString(xszt);
                }
                string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql, SQLHelper.UpdateString(id)));
                if (!string.IsNullOrEmpty(datas))
                {
                    List<DianYun> DianYunInfoList = new List<DianYun>();

                    string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        DianYun dianYunInfo = ParseMonitorHelper.ParseDianYunInfo(rows[i]);       //ParseMapProjectWarningInfo(rows[i]);
                        if (dianYunInfo != null)
                        {
                            DianYunInfoList.Add(dianYunInfo);

                        }
                    }

                    if (DianYunInfoList.Count > 0)
                    {
                       return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(DianYunInfoList)));
                    }
                    else
                    {
                      
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无点云处理数据！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无点云处理数据！", string.Empty));
                }
            }
            else
            {
                //验权失败
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "登陆过期！", string.Empty));
            }
        }

        /// <summary>
        /// 获取对应期数的全部的对比变化数据.getDianYunShuJu
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string getDianYunChangesShuJu(string id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                string sql = "  SELECT a.changes,a.cjsj,LEFT(b.cjsj,10) as targetXssj,LEFT(c.cjsj,10) as sourceXssj from  pointcloud_data_task_changes a ,pointcloud_data b,pointcloud_data c   WHERE targetid={0} and a.targetid=b.id and a.sourceid=c.id ";

                string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql, SQLHelper.UpdateString(id)));
                if (!string.IsNullOrEmpty(datas))
                {
                    List<DianYunChanges> DianYunChangesInfoList = new List<DianYunChanges>();

                    string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        DianYunChanges DianYunChangesInfo = ParseMonitorHelper.ParseDianYunChangesInfo(rows[i]);       //ParseMapProjectWarningInfo(rows[i]);
                        if (DianYunChangesInfo != null)
                        {
                            DianYunChangesInfoList.Add(DianYunChangesInfo);

                        }
                    }

                    if (DianYunChangesInfoList.Count > 0)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(DianYunChangesInfoList)));
                    }
                    else
                    {

                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无该期点云对比数据！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无该期点云对比数据！", string.Empty));
                }
            }
            else
            {
                //验权失败
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "登陆过期！", string.Empty));
            }
        }
        /// <summary>
        /// 获取对应期数的全部的对比变化数据.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string getDianYunModel(string id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                string sql = " SELECT a.dymc,a.dylj from survey_pointcloud a ,pointcloud_project_survey b where b.surveyid=a.id and b.regionid={0}  ";

                string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql, SQLHelper.UpdateString(id)));
                if (!string.IsNullOrEmpty(datas))
                {
                    List<DianYunUrl> DianYunUrlInfoList = new List<DianYunUrl>();

                    string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        DianYunUrl DianYunUrlInfo = ParseMonitorHelper.ParseDianYuUrlInfo(rows[i]);     
                        if (DianYunUrlInfo != null)
                        {
                            DianYunUrlInfoList.Add(DianYunUrlInfo);

                        }
                    }

                    if (DianYunUrlInfoList.Count > 0)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(DianYunUrlInfoList)));
                    }
                    else
                    {

                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无该期点云对比数据！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无该期点云对比数据！", string.Empty));
                }
            }
            else
            {
                //验权失败
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "登陆过期！", string.Empty));
            }
        }
        /// <summary>
        /// 更新巡视信息
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdatePartorDianYun()
        {
            string xszt = HttpContext.Current.Request.Form["xszt"];//状态
            string xsjg = HttpContext.Current.Request.Form["xsjg"];//结果
            string cookie = HttpContext.Current.Request.Form["cookie"];
            string id = HttpContext.Current.Request.Form["id"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE pointcloud_data SET xszt={0},xsjg={1} WHERE id={2} ", SQLHelper.UpdateString(xszt), SQLHelper.UpdateString(xsjg), SQLHelper.UpdateString(id)));
                if (updatecount == 1)
                {
                    return "更新成功";
                }
            }
            else
            {
                //无此权限
                return "重新登陆！";
            }

            return string.Empty;
        }

        /// <summary>
        /// 获取巡视的照片信息
        /// </summary>
        /// <param name="id"></param>
        /// <param name="patrolNum">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string getPatrolPhotoInfo(string id, string patrolNum)
        {
           
           
                string sql = "SELECT * FROM patrol_photo_info WHERE project_id ={0}";
                if (!string.IsNullOrEmpty(patrolNum))
                {
                    sql = sql + " and patrol_num = " + SQLHelper.UpdateString(patrolNum);
                }

                sql = sql + "ORDER BY patrol_num DESC";
                string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql, SQLHelper.UpdateString(id)));
                if (!string.IsNullOrEmpty(datas))
                {
                    List<PatrolPhotoInfo> patrolPhotoInfoList = new List<PatrolPhotoInfo>();

                    string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                    PatrolPhotoInfo patrolPhotoInfo = ParseMonitorHelper.ParsePatrolPhotoInfo(rows[i]);       //ParseMapProjectWarningInfo(rows[i]);
                        if (patrolPhotoInfo != null)
                        {
                        patrolPhotoInfoList.Add(patrolPhotoInfo);

                        }
                    }

                    if (patrolPhotoInfoList.Count > 0)
                    {
                        return JsonHelper.ToJson(patrolPhotoInfoList);
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
        /// 删除照片
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeletePhoto()
        {
            string id = HttpContext.Current.Request.Form["id"];

            
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE from patrol_photo_info  WHERE id={0}", id));
                if (updatecount == 1)
                {
                   return "删除成功！";
                }
                else
                {
                   return "删除照片失败！";
                }
         }
        /// <summary>
        /// 获取巡视的照片信息
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="monitorId">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string getConstPhotoInfo(string projectId, string monitorId)
        {


            string sql = "SELECT * FROM const_photo_info WHERE project_id ={0}";
            if (!string.IsNullOrEmpty(monitorId))
            {
                sql = sql + " and monitor_id = " + SQLHelper.UpdateString(monitorId);
            }

            sql = sql + "ORDER BY type ";
            string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql, SQLHelper.UpdateString(projectId)));
            if (!string.IsNullOrEmpty(datas))
            {
                List<ConstPhotoInfo> constPhotoInfoList = new List<ConstPhotoInfo>();

                string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    ConstPhotoInfo constPhotoInfo = ParseMonitorHelper.ParseConstPhotoInfo(rows[i]);       //ParseMapProjectWarningInfo(rows[i]);
                    if (constPhotoInfo != null)
                    {
                        constPhotoInfoList.Add(constPhotoInfo);

                    }
                }

                if (constPhotoInfoList.Count > 0)
                {
                    return JsonHelper.ToJson(constPhotoInfoList);
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
        
    }
}

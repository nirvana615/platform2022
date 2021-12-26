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
    public class PointCloudTaskController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(PointCloudTaskController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();
        /// <summary>
        /// 获取时序数据信息（后台）
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]

        public string   GetTaskData()
        {
            string currentprojectid = HttpContext.Current.Request.Form["currentprojectid"];
            string taskregionid = HttpContext.Current.Request.Form["taskregionid"];
            string cjsj = HttpContext.Current.Request.Form["taskcjsjid"];
            string bz = HttpContext.Current.Request.Form["bz"];
            string registration_way = HttpContext.Current.Request.Form["registration_way"];
            string registrationpoints = HttpContext.Current.Request.Form["registrationpoints"];
            string sourcepointcloud = HttpContext.Current.Request.Form["sourcepointcloud"].Replace("[", "").Replace("]", "");
            string targetpointcloud = HttpContext.Current.Request.Form["targetpointcloud"].Replace("[", "").Replace("]", "");


            PCloudData sourceData = COM.JsonHelper.ToObject<PCloudData>(sourcepointcloud);
            PCloudData targetData= COM.JsonHelper.ToObject<PCloudData>(targetpointcloud);
            List<RegistrationPoints> registrationpointslist= COM.JsonHelper.ToObject<List<RegistrationPoints>>(registrationpoints);


            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion


            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                PCloudProject project = ParsePointCloudHelper.ParsePCloudProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM pointcloud_project WHERE id={0} AND ztm={1}", currentprojectid, (int)MODEL.Enum.State.InUse)));

                if (user == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户为空！", string.Empty));
                }

                if (
                    (!string.IsNullOrEmpty(currentprojectid))
                    && (!string.IsNullOrEmpty(taskregionid))
                    && (!string.IsNullOrEmpty(cjsj))
                    && (!string.IsNullOrEmpty(registration_way))
                    && (!string.IsNullOrEmpty(sourcepointcloud))
                    && (!string.IsNullOrEmpty(targetpointcloud))
                    )     //1---必填选项，填入则可创建项目id
                {
                    string value = "("
                     + sourceData.Id + ","
                     + targetData.Id + ","
                    + currentprojectid + ","
                    + taskregionid + ","
                    + 1 + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + SQLHelper.UpdateString(project.BSM) + ","
                    + (int)MODEL.Enum.State.InUse + ","
                    + SQLHelper.UpdateString(bz) + ")";

                    int taskid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO pointcloud_data_task (sourceid,targetid,projectid,regionid,taskprocess,cjsj,bsm,ztm,bz) VALUES" + value);
                    if (taskid != -1)
                    {
                        string icp_value = "("
                         + sourceData.Id + ","
                         + taskid + ","
                        + registration_way + ","
                        + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                        + SQLHelper.UpdateString(project.BSM) + ","
                        + (int)MODEL.Enum.State.InUse+ ")";

                        int icpid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO pointcloud_data_task_icp (sourceid,taskid,matchway,cjsj,bsm,ztm) VALUES" + icp_value);

                        if (icpid!=-1)
                        {
                            if (registration_way == "0")//手动配准
                            {
                                string match_value = "("
                                 + taskid + ","
                                 + icpid + ","
                                +"'"+ registrationpoints + "',"
                                + registrationpointslist.Count + ","
                                + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                                + SQLHelper.UpdateString(project.BSM) + ","
                                + (int)MODEL.Enum.State.InUse + ")";

                                PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO pointcloud_data_task_match (taskid,icpid,match,num,cjsj,bsm,ztm) VALUES" + match_value);

                            }

                        }

                        //更新任务名称
                        if (taskid<10)
                        {
                            string taskname = DateTime.Now.ToString("yyyyMMdd")  + taskid.ToString().PadLeft(1, '0');
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE pointcloud_data_task SET name={0} WHERE id={1}", taskname, taskid));
                        }
                        else
                        {
                            string taskname = DateTime.Now.ToString("yyyyMMdd") + taskid.ToString();
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE pointcloud_data_task SET name={0} WHERE id={1}", taskname, taskid));

                        }
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "创建任务成功！", string.Empty));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建任务失败！", string.Empty));
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
        /// 获取时序数据信息（后台）
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetPointCloudDataInfo(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {

                    string tasklist = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM pointcloud_data_task WHERE projectid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                    string[] row = tasklist.Split(new char[] { COM.ConstHelper.rowSplit });
                    if (!string.IsNullOrEmpty(tasklist))
                    {
                        List<PointCloudTask> PointCloudTask = new List<PointCloudTask>();

                        for (int j = 0; j < row.Length; j++)
                        {
                            PointCloudTask PointCloudTask_temp = new PointCloudTask();
                            PointCloudTask_temp = ParsePointCloudHelper.ParsePointCloudTask(row[j]);
                            PointCloudTask.Add(PointCloudTask_temp);
                        }
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(PointCloudTask)));
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

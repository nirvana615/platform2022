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
    public class PointCloudRegionController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(PointCloudUploadController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString() == "" ? COM.ConstHelper.dbConn : ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 1---创建项目区域
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddRegion()
        {
            #region 参数
            string xmmc = HttpContext.Current.Request.Form["xmmc"];        //Request.Form  获取表单元素
            string currentprojectid = HttpContext.Current.Request.Form["currentprojectid"];           
            string zxjd = HttpContext.Current.Request.Form["zxjd"];
            string zxwd = HttpContext.Current.Request.Form["zxwd"];
            string cjsj = HttpContext.Current.Request.Form["cjsj"];
            string regionname = HttpContext.Current.Request.Form["regionname"];
            string bz = HttpContext.Current.Request.Form["bz"];

            #endregion
            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion


            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                PCloudProject project = ParsePointCloudHelper.ParsePCloudProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM pointcloud_project WHERE id={0} AND ztm={1}", currentprojectid, (int)MODEL.Enum.State.InUse)));

                if (user == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户为空！", string.Empty));
                }

                if (
                    (!string.IsNullOrEmpty(regionname))
                    && (!string.IsNullOrEmpty(zxjd))
                    && (!string.IsNullOrEmpty(zxwd))
                    && (!string.IsNullOrEmpty(cjsj))
                    && (!string.IsNullOrEmpty(currentprojectid))
                    )     //1---必填选项，填入则可创建项目id
                {
                    string value = "("
                    + SQLHelper.UpdateString(regionname) + ","
                    + currentprojectid + ","
                    + zxjd + ","
                    + zxwd + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + SQLHelper.UpdateString(project.BSM) + ","
                    + (int)MODEL.Enum.State.InUse + ","
                    + SQLHelper.UpdateString(bz) + ")";

                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO pointcloud_data_region (regionname,projectid,zxjd,zxwd,cjsj,bsm,ztm,bz) VALUES" + value);
                    if (id != -1)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", string.Empty));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建项目区域失败！", string.Empty));
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
        /// 更新点云时序数据信息
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateRegionlBoundaryInfo()
        {
            #region 参数
            string cookie = HttpContext.Current.Request.Form["cookie"];
            string regionalboundary = HttpContext.Current.Request.Form["regionalboundary"];
            string projectId = HttpContext.Current.Request.Form["projectId"];
            string regionid = HttpContext.Current.Request.Form["regionid"];

            #endregion

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE pointcloud_data_region SET regionalboundary={0} WHERE id={1}  AND ztm={2}", SQLHelper.UpdateString(regionalboundary), regionid, (int)MODEL.Enum.State.InUse));
                if (updatecount == 1)
                {
                    return "更新成功！";
                }
                return "更新失败，请重试！";

            }
            else
            {
                return "用户无权限！";
            }
        }
    }
}
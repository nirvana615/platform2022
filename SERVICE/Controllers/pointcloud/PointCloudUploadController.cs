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


using System.Web.UI;
using System.Web.UI.WebControls;

namespace SERVICE.Controllers
{
    public class PointCloudUploadController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(PointCloudUploadController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();
        /// <summary>
        /// 获取时序数据信息（后台）
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpPost]

        public string   UploadData()
        {
            #region 参数
            string projectid = HttpContext.Current.Request.Form["projectid"];
            string rgionid = HttpContext.Current.Request.Form["rgionid"];
            string kjck = HttpContext.Current.Request.Form["kjck"];
            string cjsj = HttpContext.Current.Request.Form["cjsj"];
            string people = HttpContext.Current.Request.Form["people"];
            string deviceid = HttpContext.Current.Request.Form["deviceid"];
            string sjgsid = HttpContext.Current.Request.Form["sjgsid"];
            string bz = HttpContext.Current.Request.Form["bz"];
            #endregion


            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion


            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                PCloudProject project = ParsePointCloudHelper.ParsePCloudProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM pointcloud_project WHERE id={0} AND ztm={1}", projectid, (int)MODEL.Enum.State.InUse)));

                if (user == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户为空！", string.Empty));
                }

                if (
                    (!string.IsNullOrEmpty(projectid))
                    && (!string.IsNullOrEmpty(rgionid))
                    && (!string.IsNullOrEmpty(cjsj))
                    )     //1---必填选项，填入则可创建项目id
                {
                    string value = "("
                    + projectid + ","
                    + rgionid + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + kjck + ","
                    + 1 + ","
                    + SQLHelper.UpdateString(people) + ","
                    + sjgsid + ","
                    + deviceid + ","
                    + SQLHelper.UpdateString(project.BSM) + ","
                    + (int)MODEL.Enum.State.InUse + ","
                    + SQLHelper.UpdateString(bz) + ")";

                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO pointcloud_data (projectid,regionid,cjsj,srid,typeid,cjry,sjgsid,deviceid,bsm,ztm,bz) VALUES" + value);
                    if (id != -1)
                    {


                        # region 上传点云功能
                        HttpFileCollection uploadFiles = System.Web.HttpContext.Current.Request.Files;
                        for (int i = 0; i < uploadFiles.Count; i++)
                        {
                            //逐个获取上传文件
                            System.Web.HttpPostedFile postedFile = uploadFiles[i];
                            string savePath = postedFile.FileName;//完整的路径
                            string fileName = System.IO.Path.GetFileName(postedFile.FileName); //获取到名称
                            string fileExtension = System.IO.Path.GetExtension(fileName);  //文件的扩展名称 
                            if (uploadFiles[i].ContentLength > 0)
                                uploadFiles[i].SaveAs(HttpContext.Current.Server.MapPath("~/Data/SurPointCloud/") + fileName);// +".txt");
                        }

                        #endregion

                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "上传成功！", string.Empty));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "上传失败！请重试", string.Empty));
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
    }
}

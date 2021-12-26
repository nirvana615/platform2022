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
    /// 影像项目
    /// </summary>
    public class ImageProjectController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(ImageProjectController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 1---新建项目
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddProject()
        {
            #region 参数
            string xmmc = HttpContext.Current.Request.Form["image_xmmc_add"];        //Request.Form  获取页面表单元素
            string xmbm = HttpContext.Current.Request.Form["image_xmbm_add"];
            string zxjd = HttpContext.Current.Request.Form["image_zxjd_add"];
            string zxwd = HttpContext.Current.Request.Form["image_zxwd_add"];
            string srid = HttpContext.Current.Request.Form["image_kjck_add"];
            string ms = HttpContext.Current.Request.Form["image_ms_add"];
            string bz = HttpContext.Current.Request.Form["image_bz_add"];
            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                if (user == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户为空！", string.Empty));
                }

                if (
                    (!string.IsNullOrEmpty(xmmc))
                    && (!string.IsNullOrEmpty(zxjd))
                    && (!string.IsNullOrEmpty(zxwd))
                    && (!string.IsNullOrEmpty(srid))
                    )     //1---必填选项，填入则可创建项目id
                {
                    string value = "("
                    + SQLHelper.UpdateString(xmmc) + ","
                    + SQLHelper.UpdateString(xmbm) + ","
                    + zxjd + ","
                    + zxwd + ","
                    + srid + ","
                    + SQLHelper.UpdateString(ms) + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + SQLHelper.UpdateString(Guid.NewGuid().ToString("D")) + ","
                    + (int)MODEL.Enum.State.InUse + ","
                    + SQLHelper.UpdateString(bz) + ")";

                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO image_project (xmmc,xmbm,zxjd,zxwd,srid,ms,cjsj,bsm,ztm,bz) VALUES" + value);
                    if (id != -1)
                    {
                        //2---非必填选项，有值则更新信息至image_project
                        if (!string.IsNullOrEmpty(xmbm))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_project SET xmbm={0} WHERE id={1}", xmbm, id));
                        }
                        if (!string.IsNullOrEmpty(ms))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_project SET ms={0} WHERE id={1}", ms, id));
                        }
                        if (!string.IsNullOrEmpty(bz))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_project SET bz={0} WHERE id={1}", bz, id));
                        }

                        int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO image_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", user.Id, id, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        if (mapid == -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建用户-影像项目映射失败！", string.Empty));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", string.Empty));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建影像项目失败！", string.Empty));
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

        ///// <summary>  old获取当前用户所有项目:GetUserImageProjectList(string cookie)
        ///// 2---获取当前用户所有项目
        ///// </summary>
        ///// <param name="cookie"></param>
        ///// <returns></returns>
        //[HttpGet]
        //public string GetUserImageProjectList(string cookie)
        //{
        //    string userbsms = string.Empty;
        //    COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

        //    if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
        //    {
        //        List<ImageProjectInfo> imageProjectInfos = new List<ImageProjectInfo>();

        //        string projectdatas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_project WHERE bsm{0} AND ztm={1} ORDER BY id DESC", userbsms, (int)MODEL.Enum.State.InUse));
        //        if (!string.IsNullOrEmpty(projectdatas))
        //        {
        //            string[] projectrows = projectdatas.Split(new char[] { COM.ConstHelper.rowSplit });
        //            for (int i = 0; i < projectrows.Length; i++)
        //            {
        //                ImageProject imageProject = ParseImageHelper.ParseImageProject(projectrows[i]);
        //                if (imageProject != null)
        //                {
        //                    ImageProjectInfo imageProjectInfo = new ImageProjectInfo();
        //                    imageProjectInfo.ImageProject = imageProject;

        //                    #region 项目对应目标
        //                    string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_map_project_target WHERE projectid={0} AND ztm={1} ORDER BY cjsj ASC", imageProject.Id, (int)MODEL.Enum.State.InUse));
        //                    if (!string.IsNullOrEmpty(maps))
        //                    {
        //                        List<Target> targets = new List<Target>();
        //                        string[] maprows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
        //                        for (int j = 0; j < maprows.Length; j++)
        //                        {
        //                            MapImageProjecTarget mapImageProjecTarget = ParseImageHelper.ParseMapImageProjecTarget(maprows[j]);
        //                            if (mapImageProjecTarget != null)
        //                            {
        //                                Target target = ParseImageHelper.ParseTarget(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_target WHERE id={0} AND bsm{1} AND ztm={2}", mapImageProjecTarget.TargetId, userbsms, (int)MODEL.Enum.State.InUse)));
        //                                if (target != null)
        //                                {
        //                                    targets.Add(target);
        //                                }
        //                            }
        //                        }

        //                        if (targets.Count > 0)
        //                        {
        //                            imageProjectInfo.Targets = targets;
        //                        }
        //                    }
        //                    #endregion

        //                    imageProjectInfos.Add(imageProjectInfo);
        //                }
        //            }
        //        }

        //        if (imageProjectInfos.Count > 0)
        //        {
        //            //有项目信息
        //            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(imageProjectInfos)));
        //        }
        //        else
        //        {
        //            //无项目信息
        //            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无项目信息！", string.Empty));
        //        }
        //    }
        //    else
        //    {
        //        //验证失败
        //        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
        //    }
        //}

        /// <summary>
        /// 2---获取当前用户所有项目，以及各项目下的实景模型及目标信息
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserImageProjectList(string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                List<ImageProjectInfo> imageProjectInfos = new List<ImageProjectInfo>();

                string projectdatas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_project WHERE bsm{0} AND ztm={1} ORDER BY id DESC", userbsms, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(projectdatas))
                {
                    string[] projectrows = projectdatas.Split(new char[] { COM.ConstHelper.rowSplit });

                    for (int i = 0; i < projectrows.Length; i++)
                    {
                        ImageProject imageProject = ParseImageHelper.ParseImageProject(projectrows[i]);
                        if (imageProject != null)
                        {
                            ImageProjectInfo imageProjectInfo = new ImageProjectInfo();
                            imageProjectInfo.ImageProject = imageProject;

                            #region 项目对应模型
                            string project_model_maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_map_project_surveymodel WHERE projectid={0} AND ztm={1} ORDER BY cjsj ASC", imageProject.Id, (int)MODEL.Enum.State.InUse));
                            if(!string.IsNullOrEmpty(project_model_maps))
                            {
                                SurModelInfos surModelInfos = new SurModelInfos();
                                surModelInfos.Title = "实景模型";
                                #region 项目对应实景模型
                                List<SurModel> models = new List<SurModel>();

                                string[] maprows = project_model_maps.Split(new char[] { COM.ConstHelper.rowSplit });
                                for (int j = 0; j < maprows.Length; j++)
                                {
                                    MapImageProjecModel mapImageProjecModel = ParseImageHelper.ParseMapImageProjecModel(maprows[j]);
                                    if (mapImageProjecModel != null)
                                    {
                                        SurModel surModel = ParseMonitorHelper.ParseSurModel(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM survey_model WHERE id={0} AND ztm={2}", mapImageProjecModel.ModelId, userbsms, (int)MODEL.Enum.State.InUse)));
                                        if (surModel != null)
                                        {
                                            models.Add(surModel);
                                        }
                                    }
                                }
                                #endregion

                                if (models.Count>0)
                                {
                                    surModelInfos.ModelList = models;
                                    imageProjectInfo.SurModels = surModelInfos;
                                }    
                            }
                            #endregion                          

                            #region 项目对应目标
                            string project_target_maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_map_project_target WHERE projectid={0} AND ztm={1} ORDER BY cjsj ASC", imageProject.Id, (int)MODEL.Enum.State.InUse));
                            if (!string.IsNullOrEmpty(project_target_maps))
                            {
                                TargetInfos targetInfos = new TargetInfos();
                                targetInfos.Title = "目标";

                                #region 项目对应的目标
                                List<Target> targets = new List<Target>();

                                string[] maprows = project_target_maps.Split(new char[] { COM.ConstHelper.rowSplit });
                                for (int j = 0; j < maprows.Length; j++)
                                {
                                    MapImageProjecTarget mapImageProjecTarget = ParseImageHelper.ParseMapImageProjecTarget(maprows[j]);
                                    if (mapImageProjecTarget != null)
                                    {
                                        Target target = ParseImageHelper.ParseTarget(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_target WHERE id={0} AND bsm{1} AND ztm={2}", mapImageProjecTarget.TargetId, userbsms, (int)MODEL.Enum.State.InUse)));
                                        if (target != null)
                                        {
                                            targets.Add(target);
                                        }
                                    }
                                }

                                if (targets.Count > 0)
                                {
                                    targetInfos.TargetList = targets;
                                    imageProjectInfo.Targets = targetInfos;
                                }
                                #endregion    
                            }
                            #endregion

                            imageProjectInfos.Add(imageProjectInfo);
                        }
                    }
                    if (imageProjectInfos.Count > 0)
                    {
                        //有项目信息
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(imageProjectInfos)));
                    }
                    else
                    {
                        //无项目信息
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无项目信息！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无项目信息！", string.Empty));
                }             
            }
            else
            {
                //验证失败
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }











        /// <summary>
        /// 3---获取影像项目信息（查看+编辑项目）
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetImageProjectInfo(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                ImageProject imageproject = ParseImageHelper.ParseImageProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM image_project WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms)));
                if (imageproject != null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(imageproject)));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无此项目！", string.Empty));
                }
            }
            else
            {
                //验证失败
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }


        /// <summary>
        /// 3.1---更新影像项目信息（编辑后保存）
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateImageProject()
        {
            #region 参数
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string xmmc = HttpContext.Current.Request.Form["image_xmmc_edit"];
            string xmbm = HttpContext.Current.Request.Form["image_xmbm_edit"];
            string zxjd = HttpContext.Current.Request.Form["image_zxjd_edit"];
            string zxwd = HttpContext.Current.Request.Form["image_zxwd_edit"];
            string srid = HttpContext.Current.Request.Form["image_kjck_edit"];
            string ms = HttpContext.Current.Request.Form["image_ms_edit"];
            string bz = HttpContext.Current.Request.Form["image_bz_edit"];
            #endregion


            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM image_project WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms));
                if (count == 1)
                {
                    if (!string.IsNullOrEmpty(xmmc)
                    && !string.IsNullOrEmpty(zxjd)
                    && !string.IsNullOrEmpty(zxwd)
                    && !string.IsNullOrEmpty(srid))
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(
                             "UPDATE image_project SET xmmc={0},xmbm={1},zxjd={2},zxwd={3},srid={4},ms={5},bz={6} WHERE id={7} AND bsm{8} AND ztm={9}",
                             SQLHelper.UpdateString(xmmc),
                             SQLHelper.UpdateString(xmbm),
                             zxjd,
                             zxwd,
                             srid,
                             SQLHelper.UpdateString(ms),
                             SQLHelper.UpdateString(bz),
                             id,
                             userbsms,
                             (int)MODEL.Enum.State.InUse));

                        if (updatecount == 1)
                        {
                            if (!string.IsNullOrEmpty(xmbm))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_project SET xmbm={0} WHERE id={1} AND bsm{2} AND ztm={3}", xmbm, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }
                            if (!string.IsNullOrEmpty(ms))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_project SET ms={0} WHERE id={1} AND bsm{2} AND ztm={3}", ms, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }
                            if (!string.IsNullOrEmpty(bz))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_project SET bz={0} WHERE id={1} AND bsm{2} AND ztm={3}", bz, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "更新成功！", string.Empty));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "更新项目失败！", string.Empty));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "缺少必需参数！", string.Empty));
                    }
                }

                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无此项目！", string.Empty));
                }
            }
            else
            {
                //验证失败
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "验证失败", string.Empty));
            }
        }

        /// <summary>
        /// 4---删除影像项目
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteImageProject() {
            string id = HttpContext.Current.Request.Form["id"];
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int updateprojectcount = PostgresqlHelper.UpdateData(pgsqlConnection,string.Format("UPDATE image_project SET ztm={0} WHERE id={1}",(int)MODEL.Enum.State.NoUse,id));
                if (updateprojectcount == 1)
                {
                    //①map_user_project
                    int updatemapusercount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_map_user_project SET ztm={0} WHERE userid={1} AND projectid={2}", (int)MODEL.Enum.State.NoUse, user.Id, id));

                    if (updatemapusercount==1) {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "删除成功！", string.Empty));                        
                    }
                    else {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除用户——项目映射失败！", string.Empty));
                    }
                }
                else {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除项目出错！", string.Empty));
                }
            }
            else {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }



        /// <summary>
        /// 根据监测系统项目id，获取影像系统项目id
        /// </summary>
        /// <param name="id">项目id</param>

        /// <returns></returns>
        [HttpGet]
        public string getYinXiangProjectId(int  id)
        {
            string imgProjectId = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT img_projectid FROM image_map_project_monitor_project WHERE mon_projectid={0} ", id));
            #region
           
            if (string.IsNullOrEmpty(imgProjectId))
            {
                return "";
            }
            else
            {
                return imgProjectId;
            }
            

            #endregion
            //return "";
        }














    }
}


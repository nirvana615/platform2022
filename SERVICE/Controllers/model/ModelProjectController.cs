﻿using System;
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
    /// <summary>
    /// 模型项目
    /// </summary>
    public class ModelProjectController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(ModelProjectController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString() == "" ? COM.ConstHelper.dbConn : ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 后台获取全部模型项目
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetAllModelProjects()
        {
            string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE ztm={0} ORDER BY id DESC", (int)MODEL.Enum.State.InUse));
            if (string.IsNullOrEmpty(datas))
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无项目！", string.Empty));
            }
            else
            {
                List<ModelProject> modelProjects = new List<ModelProject>();
                string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    ModelProject modelProject = ParseModelHelper.ParseModelProject(rows[i]);
                    if (modelProject != null)
                    {
                        modelProjects.Add(modelProject);
                    }
                }

                if (modelProjects.Count > 0)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(modelProjects)));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无项目！", string.Empty));
                }
            }
        }

        /// <summary>
        /// 获取用户-模型项目映射
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetMapUserModelProject(int id)
        {
            string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_map_user_project WHERE userid={0} AND ztm={1} ORDER BY id ASC", id, (int)MODEL.Enum.State.InUse));
            if (string.IsNullOrEmpty(maps))
            {
                return string.Empty;
            }
            else
            {
                List<MapUserModelProject> mapUserModelProjects = new List<MapUserModelProject>();

                string[] rows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    MapUserModelProject mapUserModelProject = ParseModelHelper.ParseMapUserModelProject(rows[i]);
                    if (mapUserModelProject != null)
                    {
                        mapUserModelProjects.Add(mapUserModelProject);
                    }
                }

                if (mapUserModelProjects.Count > 0)
                {
                    return JsonHelper.ToJson(mapUserModelProjects);
                }
                else
                {
                    return string.Empty;
                }
            }
        }

        /// <summary>
        /// 更新用户-模型项目映射
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateMapUserModelProject()
        {
            string userid = HttpContext.Current.Request.Form["userid"];
            string allmodelprojectids = HttpContext.Current.Request.Form["allmodelprojectids"];
            string modelprojectids = HttpContext.Current.Request.Form["modelprojectids"];

            List<string> usermodelprojectlist = new List<string>();
            List<string> authmodelprojectlist = new List<string>();
            List<string> existmodelprojectlist = new List<string>();

            if (!string.IsNullOrEmpty(allmodelprojectids))
            {
                usermodelprojectlist = allmodelprojectids.Split(new char[] { ',' }).ToList();//授权用户全部项目模型
            }
            if (!string.IsNullOrEmpty(modelprojectids))
            {
                authmodelprojectlist = modelprojectids.Split(new char[] { ',' }).ToList();//授权项目模型
            }

            //查询用户已有模型项目
            string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_map_user_project WHERE userid={0} AND ztm={1}", userid, (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(maps))
            {
                string[] rows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    MapUserModelProject mapUserModelProject = ParseModelHelper.ParseMapUserModelProject(rows[i]);
                    if (mapUserModelProject != null)
                    {
                        ModelProject modelProject = ParseModelHelper.ParseModelProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE id={0} AND ztm={1}", mapUserModelProject.ModelProjectId, (int)MODEL.Enum.State.InUse)));
                        if (modelProject != null)
                        {
                            existmodelprojectlist.Add(modelProject.Id.ToString());
                        }
                    }
                }
            }

            //增加
            for (int i = 0; i < authmodelprojectlist.Count; i++)
            {
                if (!existmodelprojectlist.Contains(authmodelprojectlist[i]))
                {
                    PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO model_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", userid, authmodelprojectlist[i], SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                }
            }


            //减少
            for (int i = 0; i < existmodelprojectlist.Count; i++)
            {
                if (usermodelprojectlist.Contains(existmodelprojectlist[i]) && !authmodelprojectlist.Contains(existmodelprojectlist[i]))
                {
                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_map_user_project SET ztm={0} WHERE userid={1} AND ztm={2} AND projectid={3}", (int)MODEL.Enum.State.NoUse, userid, (int)MODEL.Enum.State.InUse, existmodelprojectlist[i]));
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 获取用户全部模型项目数据（含项目、任务）
        /// 模型处理专用
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetAllModelProjectDatas(string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                List<ModelProjectData> modelProjectDatas = new List<ModelProjectData>();

                string projects = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE ztm={0} ORDER BY xmsj DESC", (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(projects))
                {
                    string[] projectrows = projects.Split(new char[] { COM.ConstHelper.rowSplit });

                    for (int i = 0; i < projectrows.Length; i++)
                    {
                        ModelProject modelProject = ParseModelHelper.ParseModelProject(projectrows[i]);
                        if (modelProject != null)
                        {
                            ModelProjectData modelProjectData = new ModelProjectData();
                            modelProjectData.Project = modelProject;

                            #region 模型
                            string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_map_project_task WHERE projectid={0} AND ztm={1} ORDER BY cjsj DESC", modelProject.Id, (int)MODEL.Enum.State.InUse));
                            if (!string.IsNullOrEmpty(maps))
                            {
                                List<ModelTask> Tasks = new List<ModelTask>();

                                string[] maprows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                                for (int j = 0; j < maprows.Length; j++)
                                {
                                    MapModelProjecTask mapModelProjecTask = ParseModelHelper.ParseMapModelProjecTask(maprows[j]);
                                    if (mapModelProjecTask != null)
                                    {
                                        ModelTask modelTask = ParseModelHelper.ParseModelTask(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0} AND ztm={1}", mapModelProjecTask.TaskId, (int)MODEL.Enum.State.InUse)));
                                        if (modelTask != null)
                                        {
                                            Tasks.Add(modelTask);
                                        }
                                    }
                                }

                                if (Tasks.Count > 0)
                                {
                                    modelProjectData.Tasks = Tasks;
                                }
                            }
                            #endregion

                            modelProjectDatas.Add(modelProjectData);
                        }
                    }

                    if (modelProjectDatas.Count > 0)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(modelProjectDatas)));
                    }
                    else
                    {
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
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 获取用户全部模型项目数据（含项目、不含任务）
        /// 用于快速展示
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserModelProject(string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                List<ModelProjectData> modelProjectDatas = new List<ModelProjectData>();

                string projects = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE bsm{0} AND ztm={1} ORDER BY xmsj DESC", userbsms, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(projects))
                {
                    string[] projectrows = projects.Split(new char[] { COM.ConstHelper.rowSplit });

                    for (int i = 0; i < projectrows.Length; i++)
                    {
                        ModelProject modelProject = ParseModelHelper.ParseModelProject(projectrows[i]);
                        if (modelProject != null)
                        {
                            ModelProjectData modelProjectData = new ModelProjectData();
                            modelProjectData.Project = modelProject;
                            modelProjectDatas.Add(modelProjectData);
                        }
                    }

                    if (modelProjectDatas.Count > 0)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(modelProjectDatas)));
                    }
                    else
                    {
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
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 获取用户全部模型项目数据（含项目、任务）
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserModelProjectDatas(string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                List<ModelProjectData> modelProjectDatas = new List<ModelProjectData>();

                string projects = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE bsm{0} AND ztm={1} ORDER BY xmsj DESC", userbsms, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(projects))
                {
                    string[] projectrows = projects.Split(new char[] { COM.ConstHelper.rowSplit });

                    for (int i = 0; i < projectrows.Length; i++)
                    {
                        ModelProject modelProject = ParseModelHelper.ParseModelProject(projectrows[i]);
                        if (modelProject != null)
                        {
                            ModelProjectData modelProjectData = new ModelProjectData();
                            modelProjectData.Project = modelProject;

                            #region 模型
                            string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_map_project_task WHERE projectid={0} AND ztm={1} ORDER BY cjsj DESC", modelProject.Id, (int)MODEL.Enum.State.InUse));
                            if (!string.IsNullOrEmpty(maps))
                            {
                                List<ModelTask> Tasks = new List<ModelTask>();

                                string[] maprows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                                for (int j = 0; j < maprows.Length; j++)
                                {
                                    MapModelProjecTask mapModelProjecTask = ParseModelHelper.ParseMapModelProjecTask(maprows[j]);
                                    if (mapModelProjecTask != null)
                                    {
                                        ModelTask modelTask = ParseModelHelper.ParseModelTask(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0} AND ztm={1}", mapModelProjecTask.TaskId, (int)MODEL.Enum.State.InUse)));
                                        if (modelTask != null)
                                        {
                                            Tasks.Add(modelTask);
                                        }
                                    }
                                }

                                if (Tasks.Count > 0)
                                {
                                    modelProjectData.Tasks = Tasks;
                                }
                            }
                            #endregion

                            modelProjectDatas.Add(modelProjectData);
                        }
                    }

                    if (modelProjectDatas.Count > 0)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(modelProjectDatas)));
                    }
                    else
                    {
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
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 获取用户全部未关联模型项目数据（含项目、任务）
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserNoUseModelProjectDatas(string cookie, string usedmodelid)
        {
            //业务系统已关联的模型id
            List<int> usedmodelids = new List<int>();
            if (!string.IsNullOrEmpty(usedmodelid))
            {
                usedmodelids = JsonHelper.ToObject<List<int>>(usedmodelid);
            }

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                List<ModelProjectData> modelProjectDatas = new List<ModelProjectData>();

                string projects = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE bsm{0} AND ztm={1} ORDER BY xmsj DESC", userbsms, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(projects))
                {
                    string[] projectrows = projects.Split(new char[] { COM.ConstHelper.rowSplit });

                    for (int i = 0; i < projectrows.Length; i++)
                    {
                        ModelProject modelProject = ParseModelHelper.ParseModelProject(projectrows[i]);
                        if (modelProject != null)
                        {
                            ModelProjectData modelProjectData = new ModelProjectData();
                            modelProjectData.Project = modelProject;

                            #region 项目模型
                            string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_map_project_task WHERE projectid={0} AND ztm={1} ORDER BY cjsj DESC", modelProject.Id, (int)MODEL.Enum.State.InUse));
                            if (!string.IsNullOrEmpty(maps))
                            {
                                List<ModelTask> Tasks = new List<ModelTask>();

                                string[] maprows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                                for (int j = 0; j < maprows.Length; j++)
                                {
                                    MapModelProjecTask mapModelProjecTask = ParseModelHelper.ParseMapModelProjecTask(maprows[j]);
                                    if (mapModelProjecTask != null)
                                    {
                                        ModelTask modelTask = ParseModelHelper.ParseModelTask(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0} AND ztm={1}", mapModelProjecTask.TaskId, (int)MODEL.Enum.State.InUse)));
                                        if (modelTask != null && !usedmodelids.Contains(modelTask.Id))
                                        {
                                            Tasks.Add(modelTask);
                                        }
                                    }
                                }

                                if (Tasks.Count > 0)
                                {
                                    modelProjectData.Tasks = Tasks;
                                    modelProjectDatas.Add(modelProjectData);
                                }
                            }
                            #endregion
                        }
                    }

                    if (modelProjectDatas.Count > 0)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(modelProjectDatas)));
                    }
                    else
                    {
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
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 新建项目
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddModelProject()
        {
            string xmmc = HttpContext.Current.Request.Form["model_xmmc_add"];                   //项目名称
            string xmjc = HttpContext.Current.Request.Form["model_xmjc_add"];                   //项目简称
            string xmprovince = HttpContext.Current.Request.Form["model_province_add"];         //省市
            string xmdistrict = HttpContext.Current.Request.Form["model_district_add"];         //县级行政区
            string zxjd = HttpContext.Current.Request.Form["model_zxjd_add"];                   //中心经度
            string zxwd = HttpContext.Current.Request.Form["model_zxwd_add"];                   //中心纬度
            string xmsj = HttpContext.Current.Request.Form["model_xmsj_add"];                   //项目时间
            string xzqbm = HttpContext.Current.Request.Form["model_district_add"];
            string xmwz = HttpContext.Current.Request.Form["model_xmwz_add"];
            string bz = HttpContext.Current.Request.Form["model_bz_add"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户为空！", string.Empty));
                }

                string xmbm = CreateModelProjectCode(xzqbm);//生成模型项目编码

                if ((!string.IsNullOrEmpty(xmmc)) && (!string.IsNullOrEmpty(zxjd)) && (!string.IsNullOrEmpty(zxwd)))
                {
                    string value = "("
                    + SQLHelper.UpdateString(xmmc) + ","
                    + SQLHelper.UpdateString(xmjc) + ","
                    + SQLHelper.UpdateString(xmbm) + ","
                    + zxjd + ","
                    + zxwd + ","
                    + xzqbm + ","
                    + SQLHelper.UpdateString(xmsj) + ","
                    + SQLHelper.UpdateString(xmwz) + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + SQLHelper.UpdateString(Guid.NewGuid().ToString("D")) + ","
                    + (int)MODEL.Enum.State.InUse + ","
                    + SQLHelper.UpdateString(bz) + ")";

                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO model_project (xmmc,xmjc,xmbm,zxjd,zxwd,xzqbm,xmsj,xmwz,cjsj,bsm,ztm,bz) VALUES" + value);
                    if (id != -1)
                    {
                        int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO model_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", user.Id, id, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        if (mapid == -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建用户-项目映射失败！", string.Empty));
                        }
                        else
                        {
                            ModelProject modelProject = ParseModelHelper.ParseModelProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                            if (modelProject != null)
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(modelProject)));
                            }
                            else
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "返回项目信息失败！", string.Empty));
                            }
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建项目失败！", string.Empty));
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
        /// 更新项目
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateModelProject()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string xmmc = HttpContext.Current.Request.Form["model_xmmc_edit"];
            string xmjc = HttpContext.Current.Request.Form["model_xmjc_edit"];
            string zxjd = HttpContext.Current.Request.Form["model_zxjd_edit"];
            string zxwd = HttpContext.Current.Request.Form["model_zxwd_edit"];
            string xmsj = HttpContext.Current.Request.Form["model_xmsj_edit"];
            string xmwz = HttpContext.Current.Request.Form["model_xmwz_edit"];
            string bz = HttpContext.Current.Request.Form["model_bz_edit"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (count == 1)
                {
                    if (
                    (!string.IsNullOrEmpty(xmmc)) && (!string.IsNullOrEmpty(zxjd)) && (!string.IsNullOrEmpty(zxwd)))
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_project SET xmmc={0},xmjc={1},zxjd={2},zxwd={3},xmsj={4},xmwz={5},bz={6} WHERE id={7} AND bsm{8} AND ztm={9}",
                             SQLHelper.UpdateString(xmmc),
                             SQLHelper.UpdateString(xmjc),
                             zxjd,
                             zxwd,
                             SQLHelper.UpdateString(xmsj),
                             SQLHelper.UpdateString(xmwz),
                             SQLHelper.UpdateString(bz),
                             id,
                             userbsms,
                             (int)MODEL.Enum.State.InUse));

                        if (updatecount == 1)
                        {
                            ModelProject modelProject = ParseModelHelper.ParseModelProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse)));
                            if (modelProject != null)
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "更新成功！", COM.JsonHelper.ToJson(modelProject)));
                            }
                            else
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "未返回项目信息！", string.Empty));
                            }
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "更新失败！", string.Empty));
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
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "验证失败", string.Empty));
            }
        }

        /// <summary>
        /// 删除项目
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteModelProject()
        {
            string projectid = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM model_map_user_project WHERE userid={0} AND projectid={1} AND ztm={2}", user.Id, projectid, (int)MODEL.Enum.State.InUse));
                if (count == 1)
                {
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_map_user_project SET ztm={0} WHERE userid={1} AND projectid={2} AND ztm={3}", (int)MODEL.Enum.State.NoUse, user.Id, projectid, (int)MODEL.Enum.State.InUse));
                    if (updatecount == 1)
                    {
                        int usecount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM model_map_user_project WHERE projectid={0} AND ztm={1}", projectid, (int)MODEL.Enum.State.InUse));
                        if (usecount == 0)
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_project SET ztm={0} WHERE id={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, projectid, (int)MODEL.Enum.State.InUse));
                        }

                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "删除成功！", string.Empty));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除失败！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户下无此项目！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 新增业务系统使用模型
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddUserModelProjectUse()
        {
            string useprojectid = HttpContext.Current.Request.Form["useprojectid"];
            string syscode = HttpContext.Current.Request.Form["syscode"];
            string modelinfo = HttpContext.Current.Request.Form["modelinfo"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                List<ModelUse> modelUses = JsonHelper.ToObject<List<ModelUse>>(modelinfo);
                if (modelUses.Count > 0)
                {
                    List<int> successmodelids = new List<int>();

                    for (int i = 0; i < modelUses.Count; i++)
                    {
                        int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO model_map_project_use (syscode,useprojectid,modelprojectid,modeltaskid,cjsj,ztm) VALUES({0},{1},{2},{3},{4},{5})", syscode, useprojectid, modelUses[i].projectid, modelUses[i].modelid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        if (id != -1)
                        {
                            successmodelids.Add(modelUses[i].modelid);
                        }
                    }

                    if (successmodelids.Count > 0)
                    {
                        if (successmodelids.Count == modelUses.Count)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(successmodelids)));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "部分添加成功！", JsonHelper.ToJson(successmodelids)));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "添加实景模型失败！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无模型信息！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "验证用户失败！", string.Empty));
            }
        }

        /// <summary>
        /// 取消业务系统使用模型
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string CancelUserModelProjectUse()
        {
            string useprojectid = HttpContext.Current.Request.Form["useprojectid"];
            string syscode = HttpContext.Current.Request.Form["syscode"];
            string modelid = HttpContext.Current.Request.Form["modelid"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_map_project_use SET ztm={0} WHERE syscode={1} AND useprojectid={2} AND modeltaskid={3} AND ztm={4}", (int)MODEL.Enum.State.NoUse, syscode, useprojectid, modelid, (int)MODEL.Enum.State.InUse));
                if (count == 1)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "删除成功！", modelid));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除失败！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "验证用户失败！", string.Empty));
            }
        }

        #region 方法
        /// <summary>
        /// 生成模型项目编码
        /// </summary>
        /// <param name="xjxzq"></param>
        /// <returns></returns>
        private string CreateModelProjectCode(string xjxzq)
        {
            if (!string.IsNullOrEmpty(xjxzq) && !string.IsNullOrEmpty(xjxzq))
            {
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE xzqbm='{0}'", xjxzq));
                if (data == string.Empty)
                {
                    return xjxzq + "0001";
                }
                else
                {
                    List<long> codes = new List<long>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        try
                        {
                            ModelProject project = ParseModelHelper.ParseModelProject(rows[i]);
                            long code = Convert.ToInt64(project.XMBM);
                            codes.Add(code);
                        }
                        catch
                        {
                            return string.Empty;
                        }
                    }

                    long maxcode = codes.Max();
                    return (maxcode + 1).ToString();
                }
            }
            else
            {
                return string.Empty;
            }
        }
        #endregion
    }
}
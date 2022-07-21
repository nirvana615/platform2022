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
    /// 航任务项目
    /// </summary>
    public class UavProjectController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(UavProjectController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString() == "" ? COM.ConstHelper.dbConn : ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 后台获取全部航线任务项目
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetAllUavProjects()
        {
            List<UavProject> uavProjects = new List<UavProject>();
            string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_project WHERE ztm={0} ORDER BY id DESC", (int)MODEL.Enum.State.InUse));
            if (string.IsNullOrEmpty(datas))
            {
                return string.Empty;
            }

            string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
            if (rows.Length < 1)
            {
                return string.Empty;
            }

            for (int i = 0; i < rows.Length; i++)
            {
                UavProject uavProject = ParseUavHelper.ParseUavProject(rows[i]);
                if (uavProject != null)
                {
                    uavProjects.Add(uavProject);
                }
            }

            if (uavProjects.Count > 0)
            {
                return JsonHelper.ToJson(uavProjects);
            }
            else
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// 获取用户全部航线任务项目
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserUavProjects(string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                List<UavProject> uavProjects = new List<UavProject>();

                string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_project WHERE bsm{0} AND ztm={1} ORDER BY id DESC", userbsms, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(datas))
                {
                    string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        UavProject uavProject = ParseUavHelper.ParseUavProject(rows[i]);
                        if (uavProject != null)
                        {
                            uavProjects.Add(uavProject);
                        }
                    }
                }

                if (uavProjects.Count > 0)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(uavProjects)));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "当前用户无航线项目！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 获取用户航线任务项目数据（含项目信息、模型信息和路径信息）
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserUavProjectInfos(string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_project WHERE bsm{0} AND ztm={1} ORDER BY id DESC", userbsms, (int)MODEL.Enum.State.InUse));
                if (string.IsNullOrEmpty(data))
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "当前用户无航线项目！", string.Empty));
                }
                else
                {
                    List<UavProjectInfo> uavProjectInfos = new List<UavProjectInfo>();

                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        UavProject uavProject = ParseUavHelper.ParseUavProject(rows[i]);
                        if (uavProject != null)
                        {
                            UavProjectInfo uavProjectInfo = new UavProjectInfo();
                            uavProjectInfo.Project = uavProject;

                            #region 模型数据
                            List<ModelTask> models = new List<ModelTask>();

                            string modelmaps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_map_project_use WHERE syscode={0} AND useprojectid={1} AND ztm={2} ORDER BY id DESC", (int)MODEL.Enum.System.Uav, uavProject.Id, (int)MODEL.Enum.State.InUse));
                            if (!string.IsNullOrEmpty(modelmaps))
                            {
                                string[] modelrows = modelmaps.Split(new char[] { COM.ConstHelper.rowSplit });
                                for (int j = 0; j < modelrows.Length; j++)
                                {
                                    MapModelProjectUse mapModelProjectUse = ParseModelHelper.ParseMapModelProjectUse(modelrows[j]);
                                    if (mapModelProjectUse != null)
                                    {
                                        ModelTask model = ParseModelHelper.ParseModelTask(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0} AND ztm={1}", mapModelProjectUse.ModelTaskId, (int)MODEL.Enum.State.InUse)));
                                        if (model != null)
                                        {
                                            models.Add(model);
                                        }
                                    }
                                }
                            }

                            if (models.Count > 0)
                            {
                                uavProjectInfo.Models = models;
                            }
                            #endregion

                            #region 路径信息
                            List<UavRoute> routes = new List<UavRoute>();

                            string routemaps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_map_project_route WHERE projectid={0} AND ztm={1} ORDER BY id DESC", uavProject.Id, (int)MODEL.Enum.State.InUse));
                            if (!string.IsNullOrEmpty(routemaps))
                            {
                                string[] routerows = routemaps.Split(new char[] { COM.ConstHelper.rowSplit });
                                for (int j = 0; j < routerows.Length; j++)
                                {
                                    MapProjectRoute mapProjectRoute = ParseUavHelper.ParseMapProjectRoute(routerows[j]);
                                    if (mapProjectRoute != null)
                                    {
                                        UavRoute route = ParseUavHelper.ParseUavRoute(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_route WHERE id={0} AND ztm={1}", mapProjectRoute.RouteId, (int)MODEL.Enum.State.InUse)));
                                        if (route != null)
                                        {
                                            routes.Add(route);
                                        }
                                    }
                                }
                            }

                            if (routes.Count > 0)
                            {
                                uavProjectInfo.Routes = routes;
                            }
                            #endregion

                            uavProjectInfos.Add(uavProjectInfo);
                        }
                    }

                    if (uavProjectInfos.Count > 0)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(uavProjectInfos)));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "当前用户无航线项目！", string.Empty));
                    }
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 获取用户-航线项目映射
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetMapUserUavProject(int id)
        {
            string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_map_user_project WHERE userid={0} AND ztm={1} ORDER BY id ASC", id, (int)MODEL.Enum.State.InUse));
            if (string.IsNullOrEmpty(maps))
            {
                return string.Empty;
            }
            else
            {
                List<MapUserUavProject> mapUserUavProjects = new List<MapUserUavProject>();

                string[] rows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    MapUserUavProject mapUserUavProject = ParseUavHelper.ParseMapUserUavProject(rows[i]);
                    if (mapUserUavProject != null)
                    {
                        mapUserUavProjects.Add(mapUserUavProject);
                    }
                }

                if (mapUserUavProjects.Count > 0)
                {
                    return JsonHelper.ToJson(mapUserUavProjects);
                }
                else
                {
                    return string.Empty;
                }
            }
        }

        /// <summary>
        /// 更新用户-航线项目映射
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateMapUserUavProject()
        {
            string userid = HttpContext.Current.Request.Form["userid"];
            string alluavprojectids = HttpContext.Current.Request.Form["alluavprojectids"];
            string uavprojectids = HttpContext.Current.Request.Form["uavprojectids"];

            List<string> useruavprojectlist = new List<string>();
            List<string> authuavprojectlist = new List<string>();
            List<string> existuavprojectlist = new List<string>();

            if (!string.IsNullOrEmpty(alluavprojectids))
            {
                useruavprojectlist = alluavprojectids.Split(new char[] { ',' }).ToList();//授权用户全部航线项目
            }
            if (!string.IsNullOrEmpty(uavprojectids))
            {
                authuavprojectlist = uavprojectids.Split(new char[] { ',' }).ToList();//授权项目模型
            }

            //查询用户已有模型项目
            string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_map_user_project WHERE userid={0} AND ztm={1}", userid, (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(maps))
            {
                string[] rows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    MapUserUavProject mapUserUavProject = ParseUavHelper.ParseMapUserUavProject(rows[i]);
                    if (mapUserUavProject != null)
                    {
                        UavProject uavProject = ParseUavHelper.ParseUavProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_project WHERE id={0} AND ztm={1}", mapUserUavProject.UavProjectId, (int)MODEL.Enum.State.InUse)));
                        if (uavProject != null)
                        {
                            existuavprojectlist.Add(uavProject.Id.ToString());
                        }
                    }
                }
            }

            //增加
            for (int i = 0; i < authuavprojectlist.Count; i++)
            {
                if (!existuavprojectlist.Contains(authuavprojectlist[i]))
                {
                    PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", userid, authuavprojectlist[i], SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                }
            }


            //减少
            for (int i = 0; i < existuavprojectlist.Count; i++)
            {
                if (useruavprojectlist.Contains(existuavprojectlist[i]) && !authuavprojectlist.Contains(existuavprojectlist[i]))
                {
                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE uav_map_user_project SET ztm={0} WHERE userid={1} AND ztm={2} AND projectid={3}", (int)MODEL.Enum.State.NoUse, userid, (int)MODEL.Enum.State.InUse, existuavprojectlist[i]));
                }
            }

            return string.Empty;
        }


        /// <summary>
        /// 新建航线项目
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddUavProject()
        {
            string xmmc = HttpContext.Current.Request.Form["uav-project-add-xmmc"];
            string bz = HttpContext.Current.Request.Form["uav-project-add-bz"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "未找到该用户！", string.Empty));
                }
                if (string.IsNullOrEmpty(xmmc))
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "参数不能为空！", string.Empty));
                }

                int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_project (xmmc,xmbm,cjsj,bsm,ztm,bz) VALUES({0},{1},{2},{3},{4},{5})", SQLHelper.UpdateString(xmmc), SQLHelper.UpdateString(DateTime.Now.ToString("yyyyMMddHHmmssfff")), SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), SQLHelper.UpdateString(Guid.NewGuid().ToString("D")), (int)MODEL.Enum.State.InUse, SQLHelper.UpdateString(bz)));
                if (id == -1)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建航线项目失败！", string.Empty));
                }
                else
                {
                    int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", user.Id, id, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                    if (mapid == -1)
                    {
                        //TODO增加删除已创建项目
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建用户-项目映射失败！", string.Empty));
                    }
                    else
                    {
                        UavProject uavProject = ParseUavHelper.ParseUavProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_project WHERE id={0}", id)));
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "创建成功！", JsonHelper.ToJson(uavProject)));
                    }
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }


        /// <summary>
        /// 更新航线项目
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateUavProject()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string xmmc = HttpContext.Current.Request.Form["uav-project-edit-xmmc"];
            string bz = HttpContext.Current.Request.Form["uav-project-edit-bz"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                string updatetime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                int updatecout = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE uav_project SET xmmc={0},gxsj={1},bz={2} WHERE id={3} AND ztm={4} AND bsm{5}", SQLHelper.UpdateString(xmmc), SQLHelper.UpdateString(updatetime), SQLHelper.UpdateString(bz), id, (int)MODEL.Enum.State.InUse, userbsms));
                if (updatecout == 1)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "更新成功！", updatetime));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "更新失败！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }










        /// <summary>
        /// 获取无人机项目信息
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUavProject(int id, string cookie)
        {
            return string.Empty;
        }






        /// <summary>
        /// 删除航线任务项目
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteUavProject()
        {
            string id = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                //删除用户与项目映射
                int updatemapcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE uav_map_user_project SET ztm={0} WHERE userid={1} AND projectid={2} AND ztm={3}", (int)MODEL.Enum.State.NoUse, user.Id, id, (int)MODEL.Enum.State.InUse));
                if (updatemapcount == 1)
                {
                    int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM uav_map_user_project WHERE projectid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                    if (count==0)
                    {
                        PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE uav_project SET ztm={0} AND id={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, id, (int)MODEL.Enum.State.InUse));
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
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }
    }
}

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
    /// 无人机项目
    /// </summary>
    public class UavProjectController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(UavProjectController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


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

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
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

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
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

                            string modelmaps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_map_project_use WHERE syscode={0} AND useproject={1} AND ztm={2} ORDER BY id DESC", (int)MODEL.Enum.System.Uav, uavProject.Id, (int)MODEL.Enum.State.InUse));
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
            string uavprojectids = HttpContext.Current.Request.Form["uavprojectids"];

            if (string.IsNullOrEmpty(uavprojectids))
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM uav_map_user_project WHERE userid={0} AND ztm={1}", userid, (int)MODEL.Enum.State.InUse));
                if (count > 0)
                {
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE uav_map_user_project SET ztm={0} WHERE userid={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, userid, (int)MODEL.Enum.State.InUse));
                    if (updatecount > 0)
                    {
                        return "更新用户授权成功！";
                    }
                    else
                    {
                        return "更新用户授权失败！";
                    }
                }
            }
            else
            {
                List<string> newuavprojectidlist = uavprojectids.Split(new char[] { ',' }).ToList();

                List<string> deluavprojectidlist = new List<string>();//需要删除的
                List<string> uavprojectidlist = new List<string>();//保留的，不做更改

                string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_map_user_project WHERE userid={0} AND ztm={1}", userid, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(maps))
                {
                    string[] rows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        MapUserUavProject mapUserUavProject = ParseUavHelper.ParseMapUserUavProject(rows[i]);
                        if (mapUserUavProject != null)
                        {
                            if (newuavprojectidlist.Contains(mapUserUavProject.UavProjectId.ToString()))
                            {
                                uavprojectidlist.Add(mapUserUavProject.UavProjectId.ToString());
                            }
                            else
                            {
                                deluavprojectidlist.Add(mapUserUavProject.UavProjectId.ToString());
                            }
                        }
                    }
                }

                if (deluavprojectidlist.Count > 0)
                {
                    for (int i = 0; i < deluavprojectidlist.Count; i++)
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE uav_map_user_project SET ztm={0} WHERE userid={1} AND projectid={2} AND ztm={3}", (int)MODEL.Enum.State.NoUse, userid, deluavprojectidlist[i], (int)MODEL.Enum.State.InUse));
                        if (updatecount != 1)
                        {
                            return "更新用户授权（删除原有授权）失败！";
                        }
                    }
                }

                for (int i = 0; i < newuavprojectidlist.Count; i++)
                {
                    if (uavprojectidlist.Count > 0)
                    {
                        if (uavprojectidlist.Contains(newuavprojectidlist[i]))
                        {
                            continue;
                        }
                    }

                    PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", userid, newuavprojectidlist[i], SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                }

                return "更新用户授权成功！";
            }

            return string.Empty;
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
        /// 更新无人机项目
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateUavProject()
        {
            return string.Empty;
        }

        /// <summary>
        /// 新建无人机项目
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddUavProject()
        {
            #region 参数
            string xmmc = HttpContext.Current.Request.Form["uav-project-add-xmmc"];
            string bz = HttpContext.Current.Request.Form["uav-project-add-bz"];
            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                if (user == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "未找到该用户！", string.Empty));
                }

                #region 参数检查
                if (string.IsNullOrEmpty(xmmc))
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "参数为空！", string.Empty));
                }
                #endregion

                int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_project (xmmc,xmbm,cjsj,bsm,ztm,bz) VALUES({0},{1},{2},{3},{4},{5})", SQLHelper.UpdateString(xmmc), SQLHelper.UpdateString(DateTime.Now.ToString("yyyyMMddHHmmssfff")), SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), SQLHelper.UpdateString(Guid.NewGuid().ToString("D")), (int)MODEL.Enum.State.InUse, SQLHelper.UpdateString(bz)));
                if (id == -1)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建项目失败！", string.Empty));
                }
                else
                {
                    int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", user.Id, id, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                    if (mapid == -1)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建用户-项目映射失败！", string.Empty));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "创建成功！", id.ToString()));
                    }
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }


        /// <summary>
        /// 删除无人机项目
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteUavProject()
        {
            string id = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE uav_project SET ztm={0} WHERE id={1}", (int)MODEL.Enum.State.NoUse, id));
                if (updatecount == 1)
                {
                    int updatemapcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE uav_map_user_project SET ztm={0} WHERE userid={1} AND projectid={2}", (int)MODEL.Enum.State.NoUse, user.Id, id));
                    if (updatemapcount == 1)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "删除成功！", string.Empty));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除用户-项目映射出错！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除项目出错！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }




    }
}

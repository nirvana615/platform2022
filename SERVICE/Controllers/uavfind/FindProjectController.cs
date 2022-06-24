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
    /// <summary>
    /// 巡查项目
    /// </summary>
    public class FindProjectController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(FindProjectController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 新建项目
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddFindProject()
        {
            string xmmc = HttpContext.Current.Request.Form["find_xmmc_add"];                   //项目名称
            string xmjc = HttpContext.Current.Request.Form["find_xmjc_add"];                   //项目简称
            string xmprovince = HttpContext.Current.Request.Form["find_province_add"];         //省市
            string xmdistrict = HttpContext.Current.Request.Form["find_district_add"];         //县级行政区
            string zxjd = HttpContext.Current.Request.Form["find_zxjd_add"];                   //中心经度
            string zxwd = HttpContext.Current.Request.Form["find_zxwd_add"];                   //中心纬度
            string xmsj = HttpContext.Current.Request.Form["find_xmsj_add"];                   //项目时间
            string xzqbm = HttpContext.Current.Request.Form["find_district_add"];
            string xmwz = HttpContext.Current.Request.Form["find_xmwz_add"];
            string bz = HttpContext.Current.Request.Form["find_bz_add"];
            string cookie = HttpContext.Current.Request.Form["cookie"];
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户为空！", string.Empty));
                }

                string xmbm = CreateFindProjectCode(xzqbm);//生成巡查项目编码

                if ((!string.IsNullOrEmpty(xmmc)) && (!string.IsNullOrEmpty(zxjd)) && (!string.IsNullOrEmpty(zxwd)))
                {
                    string value = "("
                    + SQLHelper.UpdateString(xmmc) + ","
                    + SQLHelper.UpdateString(xmbm) + ","
                    + SQLHelper.UpdateString(xmjc) + ","
                    + zxjd + ","
                    + zxwd + ","
                    + xzqbm + ","
                    + SQLHelper.UpdateString(xmsj) + ","
                    + SQLHelper.UpdateString(xmwz) + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + SQLHelper.UpdateString(Guid.NewGuid().ToString("D")) + ","
                    + (int)MODEL.Enum.State.InUse + ","
                    + SQLHelper.UpdateString(bz) + ")";

                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO uavfind_project (xmmc,xmbm,xmjc,zxjd,zxwd,xzqbm,xmsj,xmwz,cjsj,bsm,ztm,bz) VALUES" + value);
                    if (id != -1)
                    {
                        int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uavfind_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", user.Id, id, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        if (mapid == -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建用户-项目映射失败！", string.Empty));
                        }
                        else
                        {
                            FindProject findProject = ParseUavFindHelper.ParseFindProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uavfind_project WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                            if (findProject != null)
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(findProject)));
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
        public string UpdateFindProject()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string xmmc = HttpContext.Current.Request.Form["find_xmmc_edit"];
            string xmjc = HttpContext.Current.Request.Form["find_xmjc_edit"];
            string zxjd = HttpContext.Current.Request.Form["find_zxjd_edit"];
            string zxwd = HttpContext.Current.Request.Form["find_zxwd_edit"];
            string xmsj = HttpContext.Current.Request.Form["find_xmsj_edit"];
            string xmwz = HttpContext.Current.Request.Form["find_xmwz_edit"];
            string bz = HttpContext.Current.Request.Form["find_bz_edit"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM uavfind_project WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (count == 1)
                {
                    if (
                    (!string.IsNullOrEmpty(xmmc)) && (!string.IsNullOrEmpty(zxjd)) && (!string.IsNullOrEmpty(zxwd)))
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE uavfind_project SET xmmc={0},xmjc={1},zxjd={2},zxwd={3},xmsj={4},xmwz={5},bz={6} WHERE id={7} AND bsm{8} AND ztm={9}",
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
                            FindProject findproject = ParseUavFindHelper.ParseFindProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uavfind_project WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse)));
                            if (findproject != null)
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "更新成功！", COM.JsonHelper.ToJson(findproject)));
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
        public string DeleteFindProject()
        {
            string projectid = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM uavfind_map_user_project WHERE userid={0} AND projectid={1} AND ztm={2}", user.Id, projectid, (int)MODEL.Enum.State.InUse));
                if (count == 1)
                {
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE uavfind_map_user_project SET ztm={0} WHERE userid={1} AND projectid={2} AND ztm={3}", (int)MODEL.Enum.State.NoUse, user.Id, projectid, (int)MODEL.Enum.State.InUse));
                    if (updatecount == 1)
                    {
                        int usecount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM uavfind_map_user_project WHERE projectid={0} AND ztm={1}", projectid, (int)MODEL.Enum.State.InUse));
                        if (usecount == 0)
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE uavfind_project SET ztm={0} WHERE id={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, projectid, (int)MODEL.Enum.State.InUse));
                        }

                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "删除成功！", projectid));
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
        /// 获取用户全部巡查项目数据（含项目、不含模型）
        /// 用于快速展示
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserFindProject(string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                List<FindProjectData> findProjectDatas = new List<FindProjectData>();

                string projects = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uavfind_project WHERE bsm{0} AND ztm={1} ORDER BY cjsj DESC", userbsms, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(projects))
                {
                    string[] projectrows = projects.Split(new char[] { COM.ConstHelper.rowSplit });

                    for (int i = 0; i < projectrows.Length; i++)
                    {
                        FindProject findProject = ParseUavFindHelper.ParseFindProject(projectrows[i]);
                        if (findProject != null)
                        {
                            FindProjectData findProjectData = new FindProjectData();
                            findProjectData.Project = findProject;
                            findProjectDatas.Add(findProjectData);
                        }
                    }

                    if (findProjectDatas.Count > 0)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(findProjectDatas)));
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
        /// 获取用户全部巡查项目数据（含项目、模型）
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserFindProjectDatas(string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                List<FindProjectData> findProjectDatas = new List<FindProjectData>();

                string projects = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uavfind_project WHERE bsm{0} AND ztm={1} ORDER BY cjsj DESC", userbsms, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(projects))
                {
                    string[] projectrows = projects.Split(new char[] { COM.ConstHelper.rowSplit });

                    for (int i = 0; i < projectrows.Length; i++)
                    {
                        FindProject findProject = ParseUavFindHelper.ParseFindProject(projectrows[i]);
                        if (findProject != null)
                        {
                            FindProjectData findprojectdata = new FindProjectData();
                            findprojectdata.Project = findProject;

                            #region 1-模型                      
                            string modelmaps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_map_project_use WHERE syscode={0} AND useprojectid={1} AND ztm={2} ORDER BY id DESC", (int)MODEL.Enum.System.UavFind, findProject.Id, (int)MODEL.Enum.State.InUse));
                            if (!string.IsNullOrEmpty(modelmaps))
                            {
                                List<ModelTask> models = new List<ModelTask>();

                                string[] maprows = modelmaps.Split(new char[] { COM.ConstHelper.rowSplit });
                                for (int j = 0; j < maprows.Length; j++)
                                {
                                    MapModelProjectUse mapModelProjectUse = ParseModelHelper.ParseMapModelProjectUse(maprows[j]);
                                    if (mapModelProjectUse != null)
                                    {
                                        ModelTask model = ParseModelHelper.ParseModelTask(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0} AND ztm={1}", mapModelProjectUse.ModelTaskId, (int)MODEL.Enum.State.InUse)));
                                        if (model != null)
                                        {
                                            models.Add(model);
                                        }
                                    }
                                }

                                if (models.Count > 0)
                                {
                                    findprojectdata.Models = models;
                                }
                            }
                            #endregion


                            #region TODO 2-航线
                            string routemaps = PostgresqlHelper.QueryData(pgsqlConnection,string.Format("SELECT *FROM uavfind_map_project_route WHERE projectid={0} AND ztm={1} ORDER BY id DESC", findProject.Id, (int)MODEL.Enum.State.InUse));
                            if (!string.IsNullOrEmpty(routemaps))
                            {
                                List<UavRoute> uavroutes = new List<UavRoute>();

                                string[] maprows = routemaps.Split(new char[] { COM.ConstHelper.rowSplit });
                                for (int j=0;j<maprows.Length;j++)
                                {
                                    MapFindProjectRoute mapFindProjectRoute = ParseUavFindHelper.ParseMapFindProjectRoute(maprows[j]);
                                    if (mapFindProjectRoute != null)
                                    {
                                        UavRoute uavroute = ParseUavHelper.ParseUavRoute(PostgresqlHelper.QueryData(pgsqlConnection,string.Format("SELECT *FROM uav_route WHERE id={0} AND ztm={1}", mapFindProjectRoute.RouteId, (int)MODEL.Enum.State.InUse)));
                                        if (uavroute != null)
                                        {
                                            uavroutes.Add(uavroute);
                                        }
                                    }
                                }
                                if (uavroutes.Count>0)
                                {
                                    findprojectdata.Routes = uavroutes;
                                }
                            }

                            #endregion

                            #region TODO 3-目标
                            #endregion

                            findProjectDatas.Add(findprojectdata);
                        }
                        
                    }

                    if (findProjectDatas.Count > 0)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(findProjectDatas)));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无项目信息！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "当前用户无巡查项目！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 获取用户-巡查项目映射
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetMapUserFindProject(int userid)
        {
            string maps = PostgresqlHelper.QueryData(pgsqlConnection,string.Format("SELECT *FROM uavfind_map_user_project WHERE userid={0} AND ztm={1} ORDER BY id ASC", userid, (int)MODEL.Enum.State.InUse));
            if (string.IsNullOrEmpty(maps))
            {
                return string.Empty;
            }
            else
            {
                List<MapUserFindProject> mapUserFindProjects = new List<MapUserFindProject>();
                string[] rows = maps.Split(new char[] {COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    MapUserFindProject mapUserFindProject = ParseUavFindHelper.ParseMapUserFindProject(rows[i]);
                    if (mapUserFindProject!=null)
                    {
                        mapUserFindProjects.Add(mapUserFindProject);
                    }
                }
                if (mapUserFindProjects.Count>0)
                {
                    return JsonHelper.ToJson(mapUserFindProjects);
                }
                else
                {
                    return string.Empty;
                }
            }

        }

        /// <summary>
        /// 更新用户-巡查项目映射
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateMapUserFindProject()
        {
            string userid = HttpContext.Current.Request.Form["userid"];
            string allfindprojectids = HttpContext.Current.Request.Form["allfindprojectids"];
            string findprojectids = HttpContext.Current.Request.Form["findprojectids"];

            List<string> userfindprojectlist = new List<string>();
            List<string> authfindprojectlist = new List<string>();
            List<string> existfindprojectlist = new List<string>();

            if (!string.IsNullOrEmpty(allfindprojectids))
            {
                userfindprojectlist = allfindprojectids.Split(new char[] { ',' }).ToList();//授权用户全部航线项目
            }
            if (!string.IsNullOrEmpty(findprojectids))
            {
                authfindprojectlist = findprojectids.Split(new char[] { ',' }).ToList();//授权项目模型
            }

            //查询用户已有模型项目
            string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uavfind_map_user_project WHERE userid={0} AND ztm={1}", userid, (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(maps))
            {
                string[] rows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    MapUserFindProject mapUserFindProject = ParseUavFindHelper.ParseMapUserFindProject(rows[i]);
                    if (mapUserFindProject != null)
                    {
                        FindProject findProject = ParseUavFindHelper.ParseFindProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uavfind_project WHERE id={0} AND ztm={1}", mapUserFindProject.FindProjectId, (int)MODEL.Enum.State.InUse)));
                        if (findProject != null)
                        {
                            existfindprojectlist.Add(findProject.Id.ToString());
                        }
                    }
                }
            }

            //增加
            for (int i = 0; i < authfindprojectlist.Count; i++)
            {
                if (!existfindprojectlist.Contains(authfindprojectlist[i]))
                {
                    PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uavfind_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", userid, authfindprojectlist[i], SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                }
            }


            //减少
            for (int i = 0; i < existfindprojectlist.Count; i++)
            {
                if (userfindprojectlist.Contains(existfindprojectlist[i]) && !userfindprojectlist.Contains(existfindprojectlist[i]))
                {
                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE uavfind_map_user_project SET ztm={0} WHERE userid={1} AND ztm={2} AND projectid={3}", (int)MODEL.Enum.State.NoUse, userid, (int)MODEL.Enum.State.InUse, existfindprojectlist[i]));
                }
            }

            return string.Empty;
        }







        #region 方法
        /// <summary>
        /// 生成巡查项目编码
        /// </summary>
        /// <param name="xjxzq"></param>
        /// <returns></returns>
        private string CreateFindProjectCode(string xjxzq)
        {

            if (!string.IsNullOrEmpty(xjxzq) && !string.IsNullOrEmpty(xjxzq))
            {
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uavfind_project WHERE xzqbm='{0}'", xjxzq));
                if (data == string.Empty)
                {
                    return xjxzq + (int)MODEL.Enum.System.UavFind + "00001";
                }
                else
                {
                    List<long> codes = new List<long>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        try
                        {
                            FindProject project = ParseUavFindHelper.ParseFindProject(rows[i]);
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
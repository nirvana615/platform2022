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
    /// 项目权限
    /// </summary>
    public class ModelProjectRightController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(ModelProjectRightController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        //获取本用户的项目列表
        [HttpGet]
        public string GetModelProjectlist(string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                List<ModelProject> modelProjectLists = new List<ModelProject>();

                string projectdatas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE bsm{0} AND ztm={1} ORDER BY id DESC", userbsms, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(projectdatas))
                {
                    string[] projectrows = projectdatas.Split(new char[] { COM.ConstHelper.rowSplit });

                    for (int i = 0; i < projectrows.Length; i++)
                    {
                        ModelProject modelProject = ParseModelHelper.ParseModelProject(projectrows[i]);
                        if (modelProject != null)
                        {
                            modelProjectLists.Add(modelProject);
                        }
                    }
                    if (modelProjectLists.Count > 0)
                    {
                        //有项目信息
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(modelProjectLists)));
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
        
        //获取实景模型系统用户列表
        [HttpGet]
        public string GetModelUserInfo(string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                List<User> users = new List<User>();

                string usermaps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_map_user_sysrole WHERE  ztm={0}", (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(usermaps))
                {
                    string[] rows = usermaps.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        MapUserRole mapUserRole = ParseManageHelper.ParseMapUserRole(rows[i]);
                        if (mapUserRole != null)
                        {
                            User userinfo = ParseManageHelper.ParseUser(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE id={0} AND ztm={1}", mapUserRole.UserId, (int)MODEL.Enum.State.InUse)));
                            if (userinfo != null)
                            {
                                users.Add(userinfo);
                            }

                        }
                    }
                    if (users.Count > 0)
                    {
                        return JsonHelper.ToJson(users);
                    }
                    else
                    {
                        //用户信息
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无用户信息！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无用户信息！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无用户信息！", string.Empty));
            }

            return string.Empty;
        }

        //获取用户-模型项目映射
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
        
        // 更新用户-项目映射
        [HttpPut]
        public string UpdateMapUserModelProject()
        {
            string userid = HttpContext.Current.Request.Form["userid"];
            string modelprojectids = HttpContext.Current.Request.Form["modelprojectids"];

            if (string.IsNullOrEmpty(modelprojectids))
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM model_map_user_project WHERE userid={0} AND ztm={1}", userid, (int)MODEL.Enum.State.InUse));
                if (count > 0)
                {
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_map_user_project SET ztm={0} WHERE userid={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, userid, (int)MODEL.Enum.State.InUse));
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
                List<string> newmodelprojectidlist = modelprojectids.Split(new char[] { ',' }).ToList();

                List<string> delmodelprojectidlist = new List<string>();
                List<string> modelprojectidlist = new List<string>();

                string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_map_user_project WHERE userid={0} AND ztm={1}", userid, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(maps))
                {
                    string[] rows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        MapUserModelProject mapUserModelProject = ParseModelHelper.ParseMapUserModelProject(rows[i]);
                        if (mapUserModelProject != null)
                        {
                            if (newmodelprojectidlist.Contains(mapUserModelProject.ModelProjectId.ToString()))
                            {
                                modelprojectidlist.Add(mapUserModelProject.ModelProjectId.ToString());
                            }
                            else
                            {
                                delmodelprojectidlist.Add(mapUserModelProject.ModelProjectId.ToString());
                            }
                        }
                    }
                }

                if (delmodelprojectidlist.Count > 0)
                {
                    for (int i = 0; i < delmodelprojectidlist.Count; i++)
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_map_user_project SET ztm={0} WHERE userid={1} AND projectid={2} AND ztm={3}", (int)MODEL.Enum.State.NoUse, userid, delmodelprojectidlist[i], (int)MODEL.Enum.State.InUse));
                        if (updatecount != 1)
                        {
                            return "更新用户授权（删除原有授权）失败！";
                        }
                    }
                }

                for (int i = 0; i < newmodelprojectidlist.Count; i++)
                {
                    if (modelprojectidlist.Count > 0)
                    {
                        if (modelprojectidlist.Contains(newmodelprojectidlist[i]))
                        {
                            continue;
                        }
                    }

                    PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO model_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", userid, newmodelprojectidlist[i], SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                }

                return "更新用户授权成功！";
            }

            return string.Empty;
        }

    }
}
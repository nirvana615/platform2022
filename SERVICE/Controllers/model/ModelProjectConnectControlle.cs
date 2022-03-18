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
    public class ModelProjectConnectController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(DisasterController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 获取当前用户模型系统所有项目
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserModelProjectInfo(string cookie)
        {
            //User user = null;
            //COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref user);

            //string username = user.UserName;
            //int userid = user.Id;
            //if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            //{
            //    List<ModelProject> modelProjectLists = new List<ModelProject>();

            //    //根据user获取模型项目
            //    int modelprojectcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT * FROM model_map_user_project WHERE userid={0} AND ztm={1}", userid, (int)MODEL.Enum.State.InUse));
            //    if (modelprojectcount != 0)
            //    {
            //        string usermodelprojectmaps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_map_user_project WHERE userid={0} AND ztm={1} ORDER BY id DESC", userid, (int)MODEL.Enum.State.InUse));

            //        if (!string.IsNullOrEmpty(usermodelprojectmaps))
            //        {
            //            List<ModelProject> modelprojects = new List<ModelProject>();
            //            string[] maprows = usermodelprojectmaps.Split(new char[] { COM.ConstHelper.rowSplit });
            //            for (int i = 0; i < maprows.Length; i++)
            //            {
            //                MapDataUserModelProject mapDataUserModelProject = ParseModelHelper.ParseMapDataUserModelProject(maprows[i]);
            //                ModelProject modelProject = ParseModelHelper.ParseModelProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM model_project WHERE id={0} AND ztm={1}", mapDataUserModelProject.ModelProjectId, (int)MODEL.Enum.State.InUse)));
            //                if (modelProject != null)
            //                {
            //                    modelprojects.Add(modelProject);
            //                }
            //            }
            //            if (modelprojects.Count > 0)
            //            {
            //                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(modelprojects)));
            //            }
            //            else
            //            {
            //                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无模型项目！", string.Empty));
            //            }
            //        }
            //        else
            //        {
            //            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "该用户无模型项目！", string.Empty));
            //        }
            //    }
            //    else
            //    {
            //        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "该用户无模型项目！", string.Empty));
            //    }
            //}
            //else
            //{
            //    //验证失败
            //    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            //}

            return string.Empty;
        }


        /// <summary>
        /// 更新当前项目与模型项目关联
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpPut]
        public string UpdataCurrentProjectModel()
        {
            string cookie = HttpContext.Current.Request.Form["cookie"];
            string modelprojectids = HttpContext.Current.Request.Form["modelprojectids"];
            string currentprojectid = HttpContext.Current.Request.Form["currentprojectid"];
            User user = null;
            int syscode = 0;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref user, ref syscode);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                if (string.IsNullOrEmpty(modelprojectids))  //选项为空
                {
                    int mapcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM model_map_project_modelproject WHERE projectid={0} AND syscode={1} AND ztm={2}", currentprojectid, syscode, (int)MODEL.Enum.State.InUse));
                    if (mapcount > 0)  //当前项目原来有关联（ztm=1）
                    {
                        //清除所有关联
                        int clearncount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_map_project_modelproject SET ztm={0} WHERE projectid={1} AND syscode={2}AND ztm={3}", (int)MODEL.Enum.State.NoUse, currentprojectid, syscode, (int)MODEL.Enum.State.InUse));
                        if (clearncount > 0)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "已清除关联！", string.Empty));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "清除关联失败！", string.Empty));
                        }
                    }
                    else
                    {
                        //提示先选择项目模型
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "请先勾选！", string.Empty));
                    }
                }
                else  //选项不为空
                {
                    List<string> newmodelprojectidlist = modelprojectids.Split(new char[] { ',' }).ToList(); //最新关联模型项目id
                    List<string> delmodelprojectidlist = new List<string>();
                    List<string> staymodelprojectidlist = new List<string>();

                    string oldmodelprojectid = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT modelprojectid FROM model_map_project_modelproject WHERE projectid={0} AND syscode={1}AND ztm={2}", currentprojectid, syscode, (int)MODEL.Enum.State.InUse));//当前项目原有关联的模型项目id
                    if (!string.IsNullOrEmpty(oldmodelprojectid))
                    {
                        string[] oldmodelprojectidrows = oldmodelprojectid.Split(new char[] { COM.ConstHelper.rowSplit });
                        for(int i=0;i< oldmodelprojectidrows.Length;i++)
                        {
                            if (newmodelprojectidlist.Contains(oldmodelprojectidrows[i]))
                            {
                                staymodelprojectidlist.Add(oldmodelprojectidrows[i]);
                            }
                            else
                            {
                                delmodelprojectidlist.Add(oldmodelprojectidrows[i]);
                            }
                        }
                        if (delmodelprojectidlist.Count > 0)
                        {
                            for (int i = 0; i < delmodelprojectidlist.Count; i++)
                            {
                                int updatedelcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_map_project_modelproject SET ztm={0} WHERE projectid={1} AND syscode={2} AND modelprojectid={3} AND ztm={4}", (int)MODEL.Enum.State.NoUse, currentprojectid, syscode, delmodelprojectidlist[i], (int)MODEL.Enum.State.InUse));
                                if (updatedelcount <0)
                                {
                                    return "删除已有关联失败！";
                                }
                            }
                        }
                    }
                    for (int i = 0; i < newmodelprojectidlist.Count; i++)
                    {
                        if (staymodelprojectidlist.Count > 0)
                        {
                            if (staymodelprojectidlist.Contains(newmodelprojectidlist[i]))
                            {
                                continue;
                            }
                        }
                        int insertenewcount = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO model_map_project_modelproject (projectid,syscode,modelprojectid,cjsj,ztm) VALUES({0},{1},{2},{3},{4})", currentprojectid, syscode, newmodelprojectidlist[i], SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        if (insertenewcount < 0)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "更新失败！", string.Empty));
                        }                       
                    }
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "更新成功！", JsonHelper.ToJson(syscode)));
                }
            }
            else
            {
                //验证失败
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 读取当前项目对应模型项目映射
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetMapProjectModelProjectInfo(int currentprojectid, string cookie)
        {
            User user = null;
            int syscode = 0;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref user, ref syscode);
            if (cookieResult == CookieHelper.CookieResult.SuccessCookkie)
            {
                string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT modelprojectid FROM model_map_project_modelproject WHERE projectid={0} AND syscode={1} AND ztm={2}", currentprojectid, syscode, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(maps))
                {
                    string[] mapmodelprojectids = StringHelper.String2Array(maps);
                    if (mapmodelprojectids.Length > 0)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "", JsonHelper.ToJson(mapmodelprojectids)));
                    }
                }
                else
                {
                    return string.Empty;
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
            return null;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;

using COM;
using DAL;
using MODEL;


namespace SERVICE.Controllers
{
    /// <summary>
    /// 航测任务
    /// </summary>
    public class ModelTaskController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(ModelTaskController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();
        private static string webhookmodel = ConfigurationManager.AppSettings["webhookmodel"] != null ? ConfigurationManager.AppSettings["webhookmodel"].ToString() : string.Empty;


        /// <summary>
        /// 获取用户业务项目使用模型（暂未使用）
        /// </summary>
        /// <param name="syscode">系统编码</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        public string GetUserUseModels(string syscode, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                List<ModelTask> models = new List<ModelTask>();

                string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_map_project_use WHERE syscode={0} AND bsm{1} AND ztm={2} ORDER BY id DESC", syscode, userbsms, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(maps))
                {
                    string[] rows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        MapModelProjectUse mapModelProjectUse = ParseModelHelper.ParseMapModelProjectUse(rows[i]);
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
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(models)));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "当前用户无项目！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 新建模型
        /// </summary>
        [HttpPost]
        public string AddTask()
        {
            string projectid = HttpContext.Current.Request.Form["projectid"];//项目id
            string rwmc = HttpContext.Current.Request.Form["model_rwmc_add"];//模型名称
            string yxcjsj = HttpContext.Current.Request.Form["model_yxcjsj_add"];//采集时间
            string yxcjry = HttpContext.Current.Request.Form["model_yxcjry_add"];//采集人员（可为空）
            string yxcjsb = HttpContext.Current.Request.Form["model_yxcjsb_add"];//采集设备（可为空）
            string yxsl = HttpContext.Current.Request.Form["model_yxsl_add"];//影像数量
            string yxcflj = HttpContext.Current.Request.Form["model_yxcflj_add"];//影像地址（可为空）
            string yxkzd = HttpContext.Current.Request.Form["model_yxkzd_add"];//相控点（可为空）
            string yxpos = HttpContext.Current.Request.Form["model_yxpos_add"];//影像POS（可为空）
            string srid = HttpContext.Current.Request.Form["model_kjck_add"];//坐标系统
            string gcxt = HttpContext.Current.Request.Form["model_gcxt_add"];//高程系统（可为空）
            string gcyc = HttpContext.Current.Request.Form["model_gcyc_add"];//高程异常（可为空）
            string mxdj = HttpContext.Current.Request.Form["model_mxdj_add"];//模型等级（可为空）
            string sxcg = HttpContext.Current.Request.Form["model_sxcg_add"];//成果
            string rwms = HttpContext.Current.Request.Form["model_rwms_add"];//描述（可为空）

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                ModelProject modelProject = ParseModelHelper.ParseModelProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_project WHERE id={0} AND ztm={1}", projectid, (int)MODEL.Enum.State.InUse)));
                if (modelProject == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无此项目！", string.Empty));
                }

                string rwbm = CreateTaskCode(modelProject.XMBM, modelProject.BSM);//模型编码

                if ((!string.IsNullOrEmpty(rwmc)) && (!string.IsNullOrEmpty(rwbm)) && (!string.IsNullOrEmpty(yxcjsj)) && (!string.IsNullOrEmpty(yxsl)) && (!string.IsNullOrEmpty(sxcg)) && (!string.IsNullOrEmpty(srid)))
                {
                    string value = "("
                    + SQLHelper.UpdateString(rwmc) + ","
                    + SQLHelper.UpdateString(rwbm) + ","
                    + SQLHelper.UpdateString(string.IsNullOrEmpty(yxcjry) ? user.UserName : yxcjry) + ","
                    + SQLHelper.UpdateString(yxcjsj) + ","
                    + yxsl + ","
                    + srid + ","
                    + SQLHelper.UpdateString(sxcg) + ","
                    + SQLHelper.UpdateString(yxkzd) + ","
                    + SQLHelper.UpdateString(yxpos) + ","
                    + SQLHelper.UpdateString(yxcflj) + ","
                    + SQLHelper.UpdateString(rwms) + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + (int)MODEL.EnumModel.TaskStatus.Pending + ","
                    + SQLHelper.UpdateString(modelProject.BSM) + ","
                    + (int)MODEL.Enum.State.InUse
                    + ")";

                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO model_task (rwmc,rwbm,yxcjry,yxcjsj,yxsl,kjck,sxcg,yxkzd,yxpos,yxcflj,rwms,rwcjsj,rwzt,bsm,ztm) VALUES" + value);
                    if (id != -1)
                    {
                        if (!string.IsNullOrEmpty(yxcjsb))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET yxcjsb={0} WHERE id={1}", yxcjsb, id));
                        }

                        if (!string.IsNullOrEmpty(mxdj))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET mxdj={0} WHERE id={1}", mxdj, id));
                        }

                        if (!string.IsNullOrEmpty(gcxt))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET gcxt={0} WHERE id={1}", gcxt, id));
                        }

                        if (!string.IsNullOrEmpty(gcyc))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET gcyc={0} WHERE id={1}", gcyc, id));
                        }

                        int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO model_map_project_task (projectid,taskid,cjsj,ztm) VALUES({0},{1},{2},{3})", projectid, id, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        if (mapid == -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建项目-任务映射失败！", string.Empty));
                        }
                        else
                        {
                            string message = "### 您有1个新任务，请及时处理! \n" + @">采集人员：" + @"<font color=\""warning\"">" + user.AliasName + @"</font>" + "\n" + @">任务名称：" + @"<font color=\""warning\"">" + rwmc + @"</font>";
                            COM.WeComHelper.Push(webhookmodel, message);

                            ModelTask modelTask = ParseModelHelper.ParseModelTask(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0}", id)));
                            if (modelTask == null)
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "返回模型信息为空！", string.Empty));
                            }
                            else
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(modelTask)));
                            }
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建任务失败！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "必需参数不全！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 更新模型
        /// </summary>
        [HttpPut]
        public string UpdateTask()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string rwmc = HttpContext.Current.Request.Form["model_rwmc_edit"];//模型名称
            string yxcjsj = HttpContext.Current.Request.Form["model_yxcjsj_edit"];//采集时间
            string yxcjry = HttpContext.Current.Request.Form["model_yxcjry_edit"];//采集人员（可为空）
            string yxcjsb = HttpContext.Current.Request.Form["model_yxcjsb_edit"];//采集设备（可为空）
            string yxsl = HttpContext.Current.Request.Form["model_yxsl_edit"];//影像数量
            string yxcflj = HttpContext.Current.Request.Form["model_yxcflj_edit"];//影像地址（可为空）
            string yxkzd = HttpContext.Current.Request.Form["model_yxkzd_edit"];//相控点（可为空）
            string yxpos = HttpContext.Current.Request.Form["model_yxpos_edit"];//影像POS（可为空）
            string srid = HttpContext.Current.Request.Form["model_kjck_edit"];//坐标系统
            string gcxt = HttpContext.Current.Request.Form["model_gcxt_edit"];//高程系统（可为空）
            string gcyc = HttpContext.Current.Request.Form["model_gcyc_edit"];//高程异常（可为空）
            string mxdj = HttpContext.Current.Request.Form["model_mxdj_edit"];//模型等级（可为空）
            string sxcg = HttpContext.Current.Request.Form["model_sxcg_edit"];//成果
            string rwms = HttpContext.Current.Request.Form["model_rwms_edit"];//描述（可为空）

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms));
                if (count == 1)
                {
                    if ((!string.IsNullOrEmpty(rwmc)) && (!string.IsNullOrEmpty(yxcjsj)) && (!string.IsNullOrEmpty(yxsl)) && (!string.IsNullOrEmpty(sxcg)) && (!string.IsNullOrEmpty(srid)))
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(
                               "UPDATE model_task SET rwmc={0},yxcjry={1},yxcjsj={2},yxsl={3},kjck={4},sxcg={5},yxkzd={6},yxpos={7},yxcflj={8},rwms={9} WHERE id={10} AND bsm{11} AND ztm={12}",
                               SQLHelper.UpdateString(rwmc),
                               SQLHelper.UpdateString(yxcjry),
                               SQLHelper.UpdateString(yxcjsj),
                               yxsl,
                               srid,
                               SQLHelper.UpdateString(sxcg),
                               SQLHelper.UpdateString(yxkzd),
                               SQLHelper.UpdateString(yxpos),
                               SQLHelper.UpdateString(yxcflj),
                               SQLHelper.UpdateString(rwms),
                               id,
                               userbsms,
                               (int)MODEL.Enum.State.InUse));

                        if (updatecount != 1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "更新项目失败！", string.Empty));
                        }

                        if (!string.IsNullOrEmpty(yxcjsb))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET yxcjsb={0} WHERE id={1}", yxcjsb, id));
                        }
                        else
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET yxcjsb=NULL WHERE id={0}", id));
                        }
                        if (!string.IsNullOrEmpty(mxdj))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET mxdj={0} WHERE id={1}", mxdj, id));
                        }
                        else
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET mxdj=NULL WHERE id={0}", id));
                        }
                        if (!string.IsNullOrEmpty(gcxt))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET gcxt={0} WHERE id={1}", gcxt, id));
                        }
                        else
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET gcxt=NULL WHERE id={0}", id));
                        }
                        if (!string.IsNullOrEmpty(gcyc))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET gcyc={0} WHERE id={1}", gcyc, id));
                        }
                        else
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET gcyc=NULL WHERE id={0}", id));
                        }

                        ModelTask modelTask = ParseModelHelper.ParseModelTask(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0}", id)));
                        if (modelTask == null)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "返回模型信息为空！", string.Empty));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(modelTask)));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "缺少必需参数！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无此模型！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 更新模型视角
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateModelView()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string mxsj = HttpContext.Current.Request.Form["mxsj"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET mxsj={0} WHERE id={1} AND bsm{2}", SQLHelper.UpdateString(mxsj), id, userbsms));
                if (updatecount == 1)
                {
                    ModelTask modelTask = ParseModelHelper.ParseModelTask(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0}", id)));
                    if (modelTask == null)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "返回模型信息为空！", string.Empty));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "设置成功！", JsonHelper.ToJson(modelTask)));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "设置失败！", string.Empty));
                }

            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 删除任务
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteTask()
        {
            string id = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int updatetaskcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET ztm={0} WHERE id={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, id, (int)MODEL.Enum.State.InUse));
                if (updatetaskcount == 1)
                {
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

        /// <summary>
        /// 已生产完成的模型
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string FinshTask(string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                List<ModelTask> modelTasks = new List<ModelTask>();
                string modeldata = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE bsm{0} AND ztm={1} AND rwzt={2}", userbsms, (int)MODEL.Enum.State.InUse, (int)MODEL.EnumModel.TaskStatus.Finished));
                if (string.IsNullOrEmpty(modeldata))
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无已完成生产模型！", string.Empty));
                }
                else
                {
                    string[] rows = modeldata.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        ModelTask modelTask = ParseModelHelper.ParseModelTask(rows[i]);
                        if (modelTask != null)
                        {
                            modelTasks.Add(modelTask);
                        }
                    }

                    if (modelTasks.Count > 0)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(modelTasks)));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无已完成生产模型！", string.Empty));
                    }
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 处理任务
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string ProcessTask()
        {
            string id = HttpContext.Current.Request.Form["id"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref userbsms);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (count == 1)
                {
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE model_task SET rwzt={0} WHERE id={1}", (int)MODEL.EnumModel.TaskStatus.Processing, id));
                    if (updatecount == 1)
                    {
                        ModelTask modelTask = ParseModelHelper.ParseModelTask(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0}", id)));
                        if (modelTask != null)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(modelTask)));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "返回模型任务信息为空！", string.Empty));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "失败！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无此模型任务，或已被删除！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }


        #region 方法
        /// <summary>
        /// 创建任务编码
        /// </summary>
        /// <param name="xmbm"></param>
        /// <param name="bsm"></param>
        /// <returns></returns>
        private string CreateTaskCode(string xmbm, string bsm)
        {
            if (!string.IsNullOrEmpty(bsm) && !string.IsNullOrEmpty(xmbm))
            {
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE bsm='{0}'", bsm));
                if (data == string.Empty)
                {
                    return xmbm + "001";
                }
                else
                {
                    List<long> codes = new List<long>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        try
                        {
                            ModelTask task = ParseModelHelper.ParseModelTask(rows[i]);
                            long code = Convert.ToInt64(task.RWBM);
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

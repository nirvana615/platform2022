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
    /// 消落带项目
    /// </summary>
    public class FlzController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(FlzController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();
        
        /// <summary>
        /// 获取当前用户所有项目
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserFlzProjectList(string cookie,string user)
        {
            string userbsms = string.Empty;
            logger.Info("【" + pgsqlConnection + "】pgsqlConnection");
            logger.Info("【" + cookie + "】cookie");
            logger.Info("【" + user + "】cookie");

            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            logger.Info("【" + cookieResult + "】cookieResult");
            
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                //有效cookie  ViewBag.User
                List<FlzProject> projectList = new List<FlzProject>();
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM flz_project WHERE bsm{0}  ORDER BY id ASC", userbsms));
                if (string.IsNullOrEmpty(data))
                {
                    //无项目信息
                    return string.Empty;
                }

                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length < 1)
                {
                    //无项目信息
                    return string.Empty;
                }

                for (int i = 0; i < rows.Length; i++)
                {
                    FlzProject project = ParseFlzoneHelper.ParseProject(rows[i]);
                    if (project != null)
                    {
                        projectList.Add(project);
                    }
                }

                if (projectList.Count > 0)
                {
                    return JsonHelper.ToJson(projectList);
                }
                else
                {
                    return string.Empty;
                }
            }
            else
            {
                //无效cookie
                return string.Empty;
            }
        }

        /// <summary>
        /// 新建项目
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddProject()
        {
            #region 参数
            string xmmc = HttpContext.Current.Request.Form["xmmc"];
            string xzqbm = HttpContext.Current.Request.Form["district"];
            string xmwz = HttpContext.Current.Request.Form["xmwz"];
            string xmkssj = HttpContext.Current.Request.Form["xmkssj"];
            string bz = HttpContext.Current.Request.Form["bz"];
            string zxjd = HttpContext.Current.Request.Form["zxjd"];
            string zxwd = HttpContext.Current.Request.Form["zxwd"];


            string mianJi = HttpContext.Current.Request.Form["mianJi"];
            string zhongChang = HttpContext.Current.Request.Form["zhongChang"];
            string tiJi = HttpContext.Current.Request.Form["tiJi"];
            string puoXiang = HttpContext.Current.Request.Form["puoXiang"];
            string hygc = HttpContext.Current.Request.Form["hygc"];
            string gshd = HttpContext.Current.Request.Form["gshd"];

            string dcyx = HttpContext.Current.Request.Form["dcyx"];
            string ytjg = HttpContext.Current.Request.Form["ytjg"];
            string yccz = HttpContext.Current.Request.Form["yccz"];
            string apjg = HttpContext.Current.Request.Form["apjg"];
            string qglx = HttpContext.Current.Request.Form["qglx"];
            string dmbj = HttpContext.Current.Request.Form["dmbj"];
            string bxjx = HttpContext.Current.Request.Form["bxjx"];
            string ytlh = HttpContext.Current.Request.Form["ytlh"];
            string zbfg = HttpContext.Current.Request.Form["zbfg"];
            string dcyxScore = HttpContext.Current.Request.Form["dcyxScore"];
            string ytjgScore = HttpContext.Current.Request.Form["ytjgScore"];
            string ycczScore = HttpContext.Current.Request.Form["ycczScore"];
            string apjgScore = HttpContext.Current.Request.Form["apjgScore"];
            string qglxScore = HttpContext.Current.Request.Form["qglxScore"];
            string dmbjScore = HttpContext.Current.Request.Form["dmbjScore"];
            string bxjxScore = HttpContext.Current.Request.Form["bxjxScore"];
            string ytlhScore = HttpContext.Current.Request.Form["ytlhScore"];
            string zbfgScore = HttpContext.Current.Request.Form["zbfgScore"];
            string dcyxWeight = HttpContext.Current.Request.Form["dcyxWeight"];
            string ytjgWeight = HttpContext.Current.Request.Form["ytjgWeight"];
            string ycczWeight = HttpContext.Current.Request.Form["ycczWeight"];
            string apjgWeight = HttpContext.Current.Request.Form["apjgWeight"];
            string qglxWeight = HttpContext.Current.Request.Form["qglxWeight"];
            string dmbjWeight = HttpContext.Current.Request.Form["dmbjWeight"];
            string bxjxWeight = HttpContext.Current.Request.Form["bxjxWeight"];
            string ytlhWeight = HttpContext.Current.Request.Form["ytlhWeight"];
            string zbfgWeight = HttpContext.Current.Request.Form["zbfgWeight"];


            string projectScore = HttpContext.Current.Request.Form["projectScore"];//项目得分
           

            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }

                if (!string.IsNullOrEmpty(xmmc)
                    && !string.IsNullOrEmpty(zxjd)
                    && !string.IsNullOrEmpty(zxwd)
                    && !string.IsNullOrEmpty(xzqbm))
                {
                    string xmbm = "9999";//生产项目编码
                    if (!string.IsNullOrEmpty(xmbm))
                    {
                        string value = "("
                        + SQLHelper.UpdateString(xmmc) + ","
                        + SQLHelper.UpdateString(xmbm) + ","
                        + zxjd + ","
                        + zxwd + ","
                        + SQLHelper.UpdateString(xzqbm) + ","
                        + SQLHelper.UpdateString(xmwz) + ","
                        + SQLHelper.UpdateString(xmkssj) + ","
                        + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                        + SQLHelper.UpdateString(Guid.NewGuid().ToString("D")) + ","
                        + (int)MODEL.Enum.State.InUse + ","
                        + SQLHelper.UpdateString(bz) + ","
                        + SQLHelper.UpdateString(user.UserName); 

                        string sql = " INSERT INTO flz_project(xmmc, xmbm, zxjd, zxwd, xzqbm, xmwz, xmkssj, cjsj, bsm, ztm, bz, fzr";
                        if (!string.IsNullOrEmpty(mianJi))
                        {
                            sql = sql + ", mian_ji";
                            value = value + "," + SQLHelper.UpdateString(mianJi);
                        }
                        if (!string.IsNullOrEmpty(zhongChang))
                        {
                            sql = sql + ", zhong_chang";
                            value = value + "," + SQLHelper.UpdateString(zhongChang);
                        }
                        if (!string.IsNullOrEmpty(tiJi))
                        {
                            sql = sql + ", ti_ji";
                            value = value + "," + SQLHelper.UpdateString(tiJi);
                        }
                        if (!string.IsNullOrEmpty(puoXiang))
                        {
                            sql = sql + ", puo_xiang";
                            value = value + "," + SQLHelper.UpdateString(puoXiang);
                        }
                        if (!string.IsNullOrEmpty(hygc))
                        {
                            sql = sql + ", hygc";
                            value = value + "," + SQLHelper.UpdateString(hygc);
                        }
                        if (!string.IsNullOrEmpty(gshd))
                        {
                            sql = sql + ", gshd";
                            value = value + "," + SQLHelper.UpdateString(gshd);
                        }
                        if (!string.IsNullOrEmpty(dcyx))
                        {
                            sql = sql + ", dcyx";
                            value = value + "," + SQLHelper.UpdateString(dcyx);
                        }
                        if (!string.IsNullOrEmpty(ytjg))
                        {
                            sql = sql + ", ytjg";
                            value = value + "," + SQLHelper.UpdateString(ytjg);
                        }
                        if (!string.IsNullOrEmpty(yccz))
                        {
                            sql = sql + ", yccz";
                            value = value + "," + SQLHelper.UpdateString(yccz);
                        }
                        if (!string.IsNullOrEmpty(apjg))
                        {
                            sql = sql + ", apjg";
                            value = value + "," + SQLHelper.UpdateString(apjg);
                        }
                        if (!string.IsNullOrEmpty(qglx))
                        {
                            sql = sql + ", qglx";
                            value = value + "," + SQLHelper.UpdateString(qglx);
                        }
                        if (!string.IsNullOrEmpty(dmbj))
                        {
                            sql = sql + ", dmbj";
                            value = value + "," + SQLHelper.UpdateString(dmbj);
                        }
                        if (!string.IsNullOrEmpty(bxjx))
                        {
                            sql = sql + ", bxjx";
                            value = value + "," + SQLHelper.UpdateString(bxjx);
                        }
                        if (!string.IsNullOrEmpty(ytlh))
                        {
                            sql = sql + ", ytlh";
                            value = value + "," + SQLHelper.UpdateString(ytlh);
                        }
                        if (!string.IsNullOrEmpty(zbfg))
                        {
                            sql = sql + ", zbfg";
                            value = value + "," + SQLHelper.UpdateString(zbfg);
                        }
                        if (!string.IsNullOrEmpty(dcyxScore))
                        {
                            sql = sql + ", dcyx_score";
                            value = value + "," + SQLHelper.UpdateString(dcyxScore);
                        }
                        if (!string.IsNullOrEmpty(ytjgScore))
                        {
                            sql = sql + ", ytjg_score";
                            value = value + "," + SQLHelper.UpdateString(ytjgScore);
                        }
                        if (!string.IsNullOrEmpty(ycczScore))
                        {
                            sql = sql + ", yccz_score";
                            value = value + "," + SQLHelper.UpdateString(ycczScore);
                        }
                        if (!string.IsNullOrEmpty(apjgScore))
                        {
                            sql = sql + ", apjg_score";
                            value = value + "," + SQLHelper.UpdateString(apjgScore);
                        }
                        if (!string.IsNullOrEmpty(qglxScore))
                        {
                            sql = sql + ", qglx_score";
                            value = value + "," + SQLHelper.UpdateString(qglxScore);
                        }
                        if (!string.IsNullOrEmpty(dmbjScore))
                        {
                            sql = sql + ", dmbj_score";
                            value = value + "," + SQLHelper.UpdateString(dmbjScore);
                        }
                        if (!string.IsNullOrEmpty(bxjxScore))
                        {
                            sql = sql + ", bxjx_score";
                            value = value + "," + SQLHelper.UpdateString(bxjxScore);
                        }
                        if (!string.IsNullOrEmpty(ytlhScore))
                        {
                            sql = sql + ", ytlh_score";
                            value = value + "," + SQLHelper.UpdateString(ytlhScore);
                        }
                        if (!string.IsNullOrEmpty(zbfgScore))
                        {
                            sql = sql + ", zbfg_score";
                            value = value + "," + SQLHelper.UpdateString(zbfgScore);
                        }
                        if (!string.IsNullOrEmpty(dcyxWeight))
                        {
                            sql = sql + ", dcyx_weight";
                            value = value + "," + SQLHelper.UpdateString(dcyxWeight);
                        }
                        if (!string.IsNullOrEmpty(ytjgWeight))
                        {
                            sql = sql + ", ytjg_weight";
                            value = value + "," + SQLHelper.UpdateString(ytjgWeight);
                        }
                        if (!string.IsNullOrEmpty(ycczWeight))
                        {
                            sql = sql + ", yccz_weight";
                            value = value + "," + SQLHelper.UpdateString(ycczWeight);
                        }
                        if (!string.IsNullOrEmpty(apjgWeight))
                        {
                            sql = sql + ", apjg_weight";
                            value = value + "," + SQLHelper.UpdateString(apjgWeight);
                        }
                        if (!string.IsNullOrEmpty(qglxWeight))
                        {
                            sql = sql + ", qglx_weight";
                            value = value + "," + SQLHelper.UpdateString(qglxWeight);
                        }
                        if (!string.IsNullOrEmpty(dmbjWeight))
                        {
                            sql = sql + ", dmbj_weight";
                            value = value + "," + SQLHelper.UpdateString(dmbjWeight);
                        }
                        if (!string.IsNullOrEmpty(bxjxWeight))
                        {
                            sql = sql + ", bxjx_weight";
                            value = value + "," + SQLHelper.UpdateString(bxjxWeight);
                        }
                        if (!string.IsNullOrEmpty(ytlhWeight))
                        {
                            sql = sql + ", ytlh_weight";
                            value = value + "," + SQLHelper.UpdateString(ytlhWeight);
                        }
                        if (!string.IsNullOrEmpty(zbfgWeight))
                        {
                            sql = sql + ", zbfg_weight";
                            value = value + "," + SQLHelper.UpdateString(zbfgWeight);
                        }
                        if (!string.IsNullOrEmpty(projectScore))
                        {
                            sql = sql + ", project_score";
                            value = value + "," + SQLHelper.UpdateString(projectScore);
                        }
                        int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, sql+") VALUES" + value+ ")");
                        if (id != -1)
                        {
                           int projectMapUserId= PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO flz_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", user.Id, id, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                            if (projectMapUserId != -1)
                            {

                                return id + "";
                            }
                            else
                            {
                                return "生成项目关联表失败！";
                            }
                        }
                        else
                        {
                            return "创建监测项目失败！";
                        }
                    }
                    else
                    {
                        return "生成项目唯一编码失败！";
                    }
                }
                else
                {
                    return "参数不全！";
                }
            }
            else
            {
                return "验证用户失败！";
            }
        }



        /// <summary>
        /// 删除项目
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteProject()
        {
            string id = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {

                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM flz_window_info WHERE project_id={0}", id));
                if (!string.IsNullOrEmpty(data))
                {
                    return "请先删除测窗";
                }
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE FROM  flz_project  WHERE id={0}", id));
                //删除关联信息表
                int deletecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE FROM  flz_map_user_project  WHERE projectid={0}", id));
                
                if (updatecount == 1)
                {
                    return "删除成功";
                }
                else
                {
                    return "删除失败";
                }
            }
            else
            {
                return "验证失败！";
            }
        }

        /// <summary>
        /// 获取项目基本信息
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetProjectInfo(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                FlzProject project = ParseFlzoneHelper.ParseProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM flz_project WHERE id={0}", id)));
                if (project != null)
                {
                    return JsonHelper.ToJson(project);
                }
            }

            return string.Empty;
        }
        /// <summary>
        /// 更新项目
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateProject()
        {
            #region 参数
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string xmmc = HttpContext.Current.Request.Form["xmmc"];
            string xzqbm = HttpContext.Current.Request.Form["district"];
            string xmwz = HttpContext.Current.Request.Form["xmwz"];
            string xmkssj = HttpContext.Current.Request.Form["xmkssj"];
            string bz = HttpContext.Current.Request.Form["bz"];
            string zxjd = HttpContext.Current.Request.Form["zxjd"];
            string zxwd = HttpContext.Current.Request.Form["zxwd"];

            string mianJi = HttpContext.Current.Request.Form["mianJi"];
            string zhongChang = HttpContext.Current.Request.Form["zhongChang"];
            string tiJi = HttpContext.Current.Request.Form["tiJi"];
            string puoXiang = HttpContext.Current.Request.Form["puoXiang"];
            string hygc = HttpContext.Current.Request.Form["hygc"];
            string gshd = HttpContext.Current.Request.Form["gshd"];
            string dcyx = HttpContext.Current.Request.Form["dcyx"];
            string ytjg = HttpContext.Current.Request.Form["ytjg"];
            string yccz = HttpContext.Current.Request.Form["yccz"];
            string apjg = HttpContext.Current.Request.Form["apjg"];
            string qglx = HttpContext.Current.Request.Form["qglx"];
            string dmbj = HttpContext.Current.Request.Form["dmbj"];
            string bxjx = HttpContext.Current.Request.Form["bxjx"];
            string ytlh = HttpContext.Current.Request.Form["ytlh"];
            string zbfg = HttpContext.Current.Request.Form["zbfg"];
            string dcyxScore = HttpContext.Current.Request.Form["dcyxScore"];
            string ytjgScore = HttpContext.Current.Request.Form["ytjgScore"];
            string ycczScore = HttpContext.Current.Request.Form["ycczScore"];
            string apjgScore = HttpContext.Current.Request.Form["apjgScore"];
            string qglxScore = HttpContext.Current.Request.Form["qglxScore"];
            string dmbjScore = HttpContext.Current.Request.Form["dmbjScore"];
            string bxjxScore = HttpContext.Current.Request.Form["bxjxScore"];
            string ytlhScore = HttpContext.Current.Request.Form["ytlhScore"];
            string zbfgScore = HttpContext.Current.Request.Form["zbfgScore"];
            string dcyxWeight = HttpContext.Current.Request.Form["dcyxWeight"];
            string ytjgWeight = HttpContext.Current.Request.Form["ytjgWeight"];
            string ycczWeight = HttpContext.Current.Request.Form["ycczWeight"];
            string apjgWeight = HttpContext.Current.Request.Form["apjgWeight"];
            string qglxWeight = HttpContext.Current.Request.Form["qglxWeight"];
            string dmbjWeight = HttpContext.Current.Request.Form["dmbjWeight"];
            string bxjxWeight = HttpContext.Current.Request.Form["bxjxWeight"];
            string ytlhWeight = HttpContext.Current.Request.Form["ytlhWeight"];
            string zbfgWeight = HttpContext.Current.Request.Form["zbfgWeight"];

            string flzRange = HttpContext.Current.Request.Form["flzRange"];//项目边界

            string projectScore = HttpContext.Current.Request.Form["projectScore"];//项目得分
            #endregion

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM flz_project WHERE id={0} ", id));
                if (count == 1)
                {
                    if (!string.IsNullOrEmpty(xmmc))
                    {
                        string sql = "UPDATE flz_project SET xmmc={0}";
                        if (!string.IsNullOrEmpty(zxjd))
                        {
                            sql = sql + ", zxjd = '" + zxjd + "'";
                        }
                        if (!string.IsNullOrEmpty(zxwd))
                        {
                            sql = sql + ", zxwd = '" + zxwd + "'";
                        }
                        if (!string.IsNullOrEmpty(xzqbm))
                        {
                            sql = sql + ", xzqbm = '" + xzqbm + "'";
                        }
                        if (!string.IsNullOrEmpty(xmwz))
                        {
                            sql = sql + ", xmwz = '" + xmwz + "'";
                        }
                        if (!string.IsNullOrEmpty(bz))
                        {
                            sql = sql + ", bz = '" + bz + "'";
                        }
                        if (!string.IsNullOrEmpty(mianJi))
                        {
                            sql = sql + ", mian_ji = '" + mianJi + "'";
                        }
                        if (!string.IsNullOrEmpty(zhongChang))
                        {
                            sql = sql + ", zhong_chang = '" + zhongChang + "'";
                        }
                        if (!string.IsNullOrEmpty(tiJi))
                        {
                            sql = sql + ", ti_ji = '" + tiJi + "'";
                        }
                        if (!string.IsNullOrEmpty(puoXiang))
                        {
                            sql = sql + ", puo_xiang = '" + puoXiang + "'";
                        }
                        if (!string.IsNullOrEmpty(hygc))
                        {
                            sql = sql + ", hygc = '" + hygc + "'";
                        }
                        if (!string.IsNullOrEmpty(gshd))
                        {
                            sql = sql + ", gshd = '" + gshd + "'";
                        }
                        if (!string.IsNullOrEmpty(dcyx))
                        {
                            sql = sql + ", dcyx = '" + dcyx + "'";
                        }
                        if (!string.IsNullOrEmpty(ytjg))
                        {
                            sql = sql + ", ytjg = '" + ytjg + "'";
                        }
                        if (!string.IsNullOrEmpty(yccz))
                        {
                            sql = sql + ", yccz = '" + yccz + "'";
                        }
                        if (!string.IsNullOrEmpty(apjg))
                        {
                            sql = sql + ", apjg = '" + apjg + "'";
                        }
                        if (!string.IsNullOrEmpty(qglx))
                        {
                            sql = sql + ", qglx = '" + qglx + "'";
                        }
                        if (!string.IsNullOrEmpty(dmbj))
                        {
                            sql = sql + ", dmbj = '" + dmbj + "'";
                        }
                        if (!string.IsNullOrEmpty(bxjx))
                        {
                            sql = sql + ", bxjx = '" + bxjx + "'";
                        }
                        if (!string.IsNullOrEmpty(ytlh))
                        {
                            sql = sql + ", ytlh = '" + ytlh + "'";
                        }
                        if (!string.IsNullOrEmpty(zbfg))
                        {
                            sql = sql + ", zbfg = '" + zbfg + "'";
                        }
                        if (!string.IsNullOrEmpty(dcyxScore))
                        {
                            sql = sql + ", dcyx_score = '" + dcyxScore + "'";
                        }
                        if (!string.IsNullOrEmpty(ytjgScore))
                        {
                            sql = sql + ", ytjg_score = '" + ytjgScore + "'";
                        }
                        if (!string.IsNullOrEmpty(ycczScore))
                        {
                            sql = sql + ", yccz_score = '" + ycczScore + "'";
                        }
                        if (!string.IsNullOrEmpty(apjgScore))
                        {
                            sql = sql + ", apjg_score = '" + apjgScore + "'";
                        }
                        if (!string.IsNullOrEmpty(qglxScore))
                        {
                            sql = sql + ", qglx_score = '" + qglxScore + "'";
                        }
                        if (!string.IsNullOrEmpty(dmbjScore))
                        {
                            sql = sql + ", dmbj_score = '" + dmbjScore + "'";
                        }
                        if (!string.IsNullOrEmpty(bxjxScore))
                        {
                            sql = sql + ", bxjx_score = '" + bxjxScore + "'";
                        }
                        if (!string.IsNullOrEmpty(ytlhScore))
                        {
                            sql = sql + ", ytlh_score = '" + ytlhScore + "'";
                        }
                        if (!string.IsNullOrEmpty(zbfgScore))
                        {
                            sql = sql + ", zbfg_score = '" + zbfgScore + "'";
                        }
                        if (!string.IsNullOrEmpty(dcyxWeight))
                        {
                            sql = sql + ", dcyx_weight = '" + dcyxWeight + "'";
                        }
                        if (!string.IsNullOrEmpty(ytjgWeight))
                        {
                            sql = sql + ", ytjg_weight = '" + ytjgWeight + "'";
                        }
                        if (!string.IsNullOrEmpty(ycczWeight))
                        {
                            sql = sql + ", yccz_weight = '" + ycczWeight + "'";
                        }
                        if (!string.IsNullOrEmpty(apjgWeight))
                        {
                            sql = sql + ", apjg_weight = '" + apjgWeight + "'";
                        }
                        if (!string.IsNullOrEmpty(qglxWeight))
                        {
                            sql = sql + ", qglx_weight = '" + qglxWeight + "'";
                        }
                        if (!string.IsNullOrEmpty(dmbjWeight))
                        {
                            sql = sql + ", dmbj_weight = '" + dmbjWeight + "'";
                        }
                        if (!string.IsNullOrEmpty(bxjxWeight))
                        {
                            sql = sql + ", bxjx_weight = '" + bxjxWeight + "'";
                        }
                        if (!string.IsNullOrEmpty(ytlhWeight))
                        {
                            sql = sql + ", ytlh_weight = '" + ytlhWeight + "'";
                        }
                        if (!string.IsNullOrEmpty(zbfgWeight))
                        {
                            sql = sql + ", zbfg_weight = '" + zbfgWeight + "'";
                        }
                        
                        if (!string.IsNullOrEmpty(flzRange))
                        {
                            sql = sql + ", flz_range = '" + flzRange + "'";
                        }

                        if (!string.IsNullOrEmpty(projectScore))
                        {
                            sql = sql + ", project_score = '" + projectScore + "'";
                        }

                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(
                             sql + "WHERE id={1} ",
                             SQLHelper.UpdateString(xmmc),id));

                        if (updatecount == 1)
                        {
                            return "更新成功！";
                        }
                        else
                        {
                            return "更新项目失败！";
                        }
                    }
                    else//UPDATE flz_project SET xmmc={0}   直接更新数据库
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(
                            "UPDATE flz_project SET flz_range={0}  WHERE id={1} ",
                            SQLHelper.UpdateString(flzRange), id));

                        if (updatecount == 1)
                        {
                            return "更新成功！";
                        }
                        else
                        {
                            return "更新项目失败！";
                        }
                        
                    }
                }
                else
                {
                    return "无此项目！";
                }
            }
            else
            {
                return "用户无权限！";
            }
        }

        /// <summary>
        /// 后台获取地质采集项目。
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetFlzProjectList()
        {
            List<UavProject> uavProjects = new List<UavProject>();
            string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM flz_project WHERE ztm={0} ORDER BY id DESC", (int)MODEL.Enum.State.InUse));
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
        /// 获取用户-采集项目映射
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetMapUserFlzProject(int id)
        {
            string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM flz_map_user_project WHERE userid={0} AND ztm={1} ORDER BY id ASC", id, (int)MODEL.Enum.State.InUse));
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
        public string UpdateMapUserFlzProject()
        {
            string userid = HttpContext.Current.Request.Form["userid"];
            string geologyprojectids = HttpContext.Current.Request.Form["geologyprojectids"];

            if (string.IsNullOrEmpty(geologyprojectids))
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM flz_map_user_project WHERE userid={0} AND ztm={1}", userid, (int)MODEL.Enum.State.InUse));
                if (count > 0)
                {
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE flz_map_user_project SET ztm={0} WHERE userid={1} AND ztm={2}", (int)MODEL.Enum.State.NoUse, userid, (int)MODEL.Enum.State.InUse));
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
                List<string> newuavprojectidlist = geologyprojectids.Split(new char[] { ',' }).ToList();

                List<string> deluavprojectidlist = new List<string>();//需要删除的
                List<string> uavprojectidlist = new List<string>();//保留的，不做更改

                string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM flz_map_user_project WHERE userid={0} AND ztm={1}", userid, (int)MODEL.Enum.State.InUse));
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
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE flz_map_user_project SET ztm={0} WHERE userid={1} AND projectid={2} AND ztm={3}", (int)MODEL.Enum.State.NoUse, userid, deluavprojectidlist[i], (int)MODEL.Enum.State.InUse));
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

                    PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO flz_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", userid, newuavprojectidlist[i], SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                }

                return "更新用户授权成功！";
            }

            return string.Empty;
        }





    }
}

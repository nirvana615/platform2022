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
    /// 剖面表
    /// 
    /// </summary>
    public class RockSelectController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(RockDataController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 模型
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddRockSelectLine()
        {
            #region 参数
            string pmmc = HttpContext.Current.Request.Form["pmmc"];
            string pmid = HttpContext.Current.Request.Form["pmid"];
            string xmid = HttpContext.Current.Request.Form["xmid"];
            string ysline = HttpContext.Current.Request.Form["ysline"];
            string xgline = HttpContext.Current.Request.Form["xgline"];
            string gcline = HttpContext.Current.Request.Form["gcline"];
            string startpoint = HttpContext.Current.Request.Form["startpoint"];
            string endpoint = HttpContext.Current.Request.Form["endpoint"];





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
                //查询是否已有剖面。
                RockSelectLine rockSelectLine = ParseRockHelper.ParseRockSelectLine(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM rock_select_line WHERE pmid={0}", SQLHelper.UpdateString(pmid))));
                if (rockSelectLine==null)//没有新增
                {//
                    string sql = "INSERT INTO rock_select_line (pmmc,pmid , xmid, ysline,xgline,gcline,startpoint,endpoint) VALUES ";
                    string value = "("
                    
                    + SQLHelper.UpdateString(pmmc) + ","
                    + pmid + ","
                    + xmid + ","
                    + SQLHelper.UpdateString(ysline) + ","
                    + SQLHelper.UpdateString(xgline) + ","
                    + SQLHelper.UpdateString(gcline) + ","
                    + SQLHelper.UpdateString(startpoint) + ","
                    + SQLHelper.UpdateString(endpoint) + ")";



                    sql = sql + value;

                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, sql);
                    if (id != -1)
                    {
                        return "新增成功";
                    }
                    else
                    {
                        return "保存失败！";
                    }

                }
                else//，有就更新
                {
                    int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(" UPDATE rock_select_line set " +
                        "pmmc={0} ," +
                        "pmid={1} ," +
                        "xmid={2} ," +
                        "ysline={3} ," +
                        "xgline={4}, " +
                        "gcline={5} ," +
                        "startpoint={6}, " +
                        "endpoint={7} " +
                        "where id={8}"
                        , SQLHelper.UpdateString(pmmc),
                            pmid,
                            xmid,
                            SQLHelper.UpdateString(ysline),
                            SQLHelper.UpdateString(xgline),
                            SQLHelper.UpdateString(gcline),
                            SQLHelper.UpdateString(startpoint),
                            SQLHelper.UpdateString(endpoint), rockSelectLine.id
                         ));
                    if (updatecount == 1)//string sql = "INSERT INTO rock_select_line (pmmc,pmid , xmid, ysline,xgline,gcline,startpoint,endpoint) VALUES ";
                    {
                        return "更新成功";
                    }
                    else
                    {
                        return "更新失败";
                    }
                }
            }
            else
            {
                return "验证用户失败！";
            }
        }//
        /// <summary>
        /// GetPouMianXian
        /// </summary>
        /// <param name="WindowInfo">项目id</param>

        /// <returns></returns>
        [HttpGet]
        public string GetPouMianXian(int id)
        {
            // GeologyWindow x = new GeologyWindow();
            //查询是否已有剖面。
            RockSelectLine rockSelectLine = ParseRockHelper.ParseRockSelectLine(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM rock_select_line WHERE pmid={0}", id)));

            #region
            
            if (rockSelectLine != null)
            {
                return JsonHelper.ToJson(rockSelectLine);
            }
            else
            {
                return "";
            }

            #endregion


            //return "";
        }
    }
}

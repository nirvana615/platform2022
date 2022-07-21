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
    /// 测绘
    /// </summary>
    public class SurveyController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(SurveyController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString() == "" ? COM.ConstHelper.dbConn : ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取测绘信息
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetSurveyInfo(int id, string cookie)
        {
            return string.Empty;
        }

        /// <summary>
        /// 更新模型表最佳视角
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateModelGoodView()
        {
            string mxfw = HttpContext.Current.Request.Form["mxfw"];//最佳试图
            string id = HttpContext.Current.Request.Form["id"];

        
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE survey_model SET mxfw={0} WHERE id={1} ", SQLHelper.UpdateString(mxfw),SQLHelper.UpdateString(id)));
                if (updatecount == 1)
                {
                    return "更新成功";
                }
                else
                {
                    return "更新失败";
                }
          

            
        }




    }
}

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

using COM;

namespace SERVICE.Controllers
{
    public class MessageController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(AuthController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();
        private static string webhook = ConfigurationManager.AppSettings["webhook"] != null ? ConfigurationManager.AppSettings["webhook"].ToString() : string.Empty;


        /// <summary>
        /// 企业微信信息推送
        /// </summary>
        [HttpPost]
        public void PushToWeCom()
        {
            string message = HttpContext.Current.Request.Form["message"]; 

            if (!string.IsNullOrEmpty(message))
            {
                if (string.IsNullOrEmpty(webhook))
                {
                    logger.Error("企业微信webhook不存在！");
                }
                else
                {
                    string result = COM.WeComHelper.Push(webhook, message);
                    if (!string.IsNullOrEmpty(result))
                    {
                        logger.Error("企业微信信息推送出现异常：" + result);
                    }
                }
            }
        }





    }
}

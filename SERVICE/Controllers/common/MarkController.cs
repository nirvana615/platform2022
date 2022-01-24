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
    public class MarkController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(DisasterController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        [HttpPost]
        public string AddMark()
        {
            string cookie = HttpContext.Current.Request.Form["cookie"];
            string markinfo = HttpContext.Current.Request.Form["markinfo"];


            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);


            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                return "";
            }
            else
            {
                return "无权限！";
            }
        }






    }
}
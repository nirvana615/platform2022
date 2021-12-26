using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using COM;
using DAL;
using MODEL;

namespace SERVICE.Controllers
{
    public class GeologyController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(GeologyController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取地质信息
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetGeologyInfo(int id, string cookie)
        {
            return string.Empty;
        }






    }
}

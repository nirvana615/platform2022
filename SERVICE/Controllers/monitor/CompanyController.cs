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
    public class CompanyController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(CompanyController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取项目单位信息
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetCompanyInfo(int id, string cookie)
        {
            return string.Empty;
        }

















    }
}

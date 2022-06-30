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

namespace SERVICE
{
    public class ConstructionController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(ConstructionController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        [HttpGet]
        public string GetConstructionInfo(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int con_infocount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM monitor_const_information WHERE project_id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (con_infocount != 0)
                {
                    ConstructionInfo constructionInfo = ParseContruction.ParseConstructionInfo(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_const_information WHERE project_id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                    if (constructionInfo != null)
                    {
                        return JsonHelper.ToJson(constructionInfo);
                    }
                }
            }
            return string.Empty;
        }
    }
}
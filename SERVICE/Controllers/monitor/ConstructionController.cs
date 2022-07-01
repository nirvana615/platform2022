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


        /// <summary>
        /// 施工信息
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cookie"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 施工影像集
        /// </summary>
        /// <param name="projectid"></param>
        /// <param name="drasterid"></param>
        /// <param name="monitorid"></param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetConstructionPhoto(string projectid, string drasterid, string monitorid, string cookie)
        {
            string sql = "SELECT * FROM monitor_const_photo WHERE project_id ={0}";
            if (!string.IsNullOrEmpty(drasterid))
            {
                sql = sql + " and drasterid = " + SQLHelper.UpdateString(drasterid);
            }
            if (!string.IsNullOrEmpty(monitorid))
            {
                sql = sql + " and monitorid = " + SQLHelper.UpdateString(monitorid);
            }

            sql = sql + "ORDER BY type_id ";
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql, SQLHelper.UpdateString(projectid)));
            if (!string.IsNullOrEmpty(data))
            {
                List<ConstructionPhoto> constPhotoList = new List<ConstructionPhoto>();

                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    ConstructionPhoto constPhoto = ParseContruction.ParseConstructionPhoto(rows[i]);       //ParseMapProjectWarningInfo(rows[i]);
                    if (constPhoto != null)
                    {
                        constPhotoList.Add(constPhoto);
                    }
                }

                if (constPhotoList.Count > 0)
                {
                    return JsonHelper.ToJson(constPhotoList);
                }
                else
                {
                    return string.Empty;
                }
            }
            else
            {
                return string.Empty;
            }
        }
    }
}
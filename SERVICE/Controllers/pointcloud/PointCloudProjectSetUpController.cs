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
    public class PointCloudProjectSetUpController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(PointCloudProjectSetUpController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取时序数据设置信息（后台）
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetPointCloudSetupInfo(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                ProjectSetUp projectSet = new ProjectSetUp();
                projectSet.Id = id;
                projectSet.StatisticoutlierPara = ParsePointCloudHelper.ParseStatisticoutlierPara(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT   * FROM pointcloud_statisticoutlier_para  WHERE dataid ={0} ORDER BY cjsj DESC LIMIT 1", id)));
                projectSet.ICPPara = ParsePointCloudHelper.ParseICPPara(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT   * FROM pointcloud_icp_para  WHERE dataid ={0} ORDER BY cjsj DESC LIMIT 1", id)));
                projectSet.OverlapPara = ParsePointCloudHelper.ParseOverlap(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT   * FROM pointcloud_overlap  WHERE dataid ={0} ORDER BY cjsj DESC LIMIT 1", id)));
                projectSet.ShapePara = ParsePointCloudHelper.ParseShape(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT   * FROM pointcloud_shape  WHERE dataid ={0} ORDER BY cjsj DESC LIMIT 1", id)));
                return JsonHelper.ToJson(projectSet);
            }
            return string.Empty;
        }

    }
}

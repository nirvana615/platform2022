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
    public class PointCloud_MointorProjectController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(PointCloud_MointorProjectController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 获取与点云处理关联监测项目
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetPointCloud_MointorProjectList()
        {
            List<MonitorProject> projectList = new List<MonitorProject>();

            string monitorProject = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT DISTINCT mprojectid FROM pointcloud_project_monitor_project"));
            string[] row = monitorProject.Split(new char[] { COM.ConstHelper.rowSplit });
            if (!string.IsNullOrEmpty(monitorProject))
            {
                for (int i = 0; i < row.Length; i++)
                {
                    string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_project WHERE id={0} AND ztm={1} ORDER BY id ASC", row[i], (int)MODEL.Enum.State.InUse));
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int j = 0; j< rows.Length; j++)
                    {
                        MonitorProject project = ParseMonitorHelper.ParseMonitorProject(rows[j]);
                        if (project != null)
                        {
                            projectList.Add(project);
                        }
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
                return string.Empty;

            }
        }

        ///<summary>
        ///获取监测项目信息
        /// </summary>
        [HttpGet]
        public string GetMointorProjectInfo(int id, string cookie)
        {
            string userbsms = string.Empty;

            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                MonitorProjectString projectString = ParseMonitorHelper.ParseMonitorProjectString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_project WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
                if (projectString != null)
                {
                    if (!string.IsNullOrEmpty(projectString.SRID))
                    {
                        Coordinate coordinate = ParseManageHelper.ParseCoordinate(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_coordinate WHERE srid={0}", projectString.SRID)));
                        if (coordinate != null)
                        {
                            projectString.SRID = coordinate.NAME;
                        }
                    }

                    return JsonHelper.ToJson(projectString);
                }
            }

            return string.Empty;
        }

    }
}
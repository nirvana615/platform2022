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
    public class PointCloudParameterController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(PointCloudParameterController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString() == "" ? COM.ConstHelper.dbConn : ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 获取所有的项目选项
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetPointCloudProject()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM pointcloud_project WHERE ztm={0}", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(data))
            {
                List<PCloudProject> projects = new List<PCloudProject>();
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    PCloudProject project = ParsePointCloudHelper.ParsePCloudProject(rows[i]);
                    if (project != null)
                    {
                        projects.Add(project);
                    }
                }

                if (projects.Count > 0)
                {
                    return JsonHelper.ToJson(projects);
                }
            }
            return string.Empty;
        }
        /// <summary>
        /// 获取所有的项目选项
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetPointCloudRegion(string  projectid)
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM pointcloud_data_region WHERE projectid={0} AND ztm={1}",projectid, (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(data))
            {
                List<Region> regions = new List<Region>();
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    Region region = ParsePointCloudHelper.ParsePCloudRegion(rows[i]);
                    if (region != null)
                    {
                        regions.Add(region);
                    }
                }

                if (regions.Count > 0)
                {
                    return JsonHelper.ToJson(regions);
                }
            }
            return string.Empty;
        }


    }
}
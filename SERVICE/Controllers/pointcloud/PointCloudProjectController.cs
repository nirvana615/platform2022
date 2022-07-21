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
    /// 3D 点云项目
    /// </summary>
    public class PointCloudProjectController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(PointCloudProjectController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString() == "" ? COM.ConstHelper.dbConn : ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 1---新建项目
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddProject()
        {
            #region 参数
            string xmmc = HttpContext.Current.Request.Form["xmmc"];        //Request.Form  获取表单元素
            string zxjd = HttpContext.Current.Request.Form["zxjd"];
            string zxwd = HttpContext.Current.Request.Form["zxwd"];
            string srid = HttpContext.Current.Request.Form["kjck"];
            string xzqbm = HttpContext.Current.Request.Form["district"];
            string cjsj = HttpContext.Current.Request.Form["xmkssj"];
            string swmx = HttpContext.Current.Request.Form["swmx"];
            string sfjs = HttpContext.Current.Request.Form["sfjs"];
            string bz = HttpContext.Current.Request.Form["bz"];
            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户为空！", string.Empty));
                }

                if (
                    (!string.IsNullOrEmpty(xmmc))
                    && (!string.IsNullOrEmpty(zxjd))
                    && (!string.IsNullOrEmpty(zxwd))
                    && (!string.IsNullOrEmpty(srid))
                    )     //1---必填选项，填入则可创建项目id
                {
                    string value = "("
                    + SQLHelper.UpdateString(xmmc) + ","
                    + zxjd + ","
                    + zxwd + ","
                    + srid + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + SQLHelper.UpdateString(Guid.NewGuid().ToString("D")) + ","
                    + (int)MODEL.Enum.State.InUse + ","
                    + SQLHelper.UpdateString(bz) + ")";

                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO pointcloud_project (xmmc,zxjd,zxwd,srid,cjsj,bsm,ztm,bz) VALUES" + value);
                    if (id != -1)
                    {
                        //2---非必填选项，有值则更新信息至pointcloud_project

                        if (!string.IsNullOrEmpty(srid))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE pointcloud_project SET srid={0} WHERE id={1}", srid, id));
                        }
                        if (!string.IsNullOrEmpty(xzqbm))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE pointcloud_project SET xzqbm={0} WHERE id={1}", xzqbm, id));
                        }
                        //if (!string.IsNullOrEmpty(swmx))
                        //{
                        //    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE pointcloud_project SET xmkjwz={0} WHERE id={1}", swmx, id));
                        //}
                        if (!string.IsNullOrEmpty(sfjs))
                        {
                            PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE pointcloud_project SET sfjs={0} WHERE id={1}", sfjs, id));
                        }
                        int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO pointcloud_map_user_project (userid,projectid,cjsj,ztm) VALUES({0},{1},{2},{3})", user.Id, id, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        if (mapid == -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建用户-点云项目映射失败！", string.Empty));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", string.Empty));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建点云时序对比项目失败！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "参数不全！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "验证用户失败！", string.Empty));
            }
        }

        /// <summary>
        /// 获取全部项目图层（后台）
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetPCloudProjectList(int id)
        {
            string pcloudProject = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT  pcprojectid FROM pointcloud_project_monitor_project WHERE mprojectid={0}",id));
            string[] row_pcloudProject = pcloudProject.Split(new char[] { COM.ConstHelper.rowSplit });

            if (!string.IsNullOrEmpty(pcloudProject))
            {

                List<PCloudProject> projectList = new List<PCloudProject>();
                for (int j = 0; j < row_pcloudProject.Length; j++)
                {
                    string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM pointcloud_project WHERE id={0} ORDER BY id ASC", row_pcloudProject[j]));
                    if (string.IsNullOrEmpty(data))
                    {
                        return string.Empty;
                    }

                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    if (rows.Length < 1)
                    {
                        return string.Empty;
                    }

                    for (int i = 0; i < rows.Length; i++)
                    {
                        PCloudProject project = ParsePointCloudHelper.ParsePCloudProject(rows[i]);
                        if (project != null)
                        {
                            projectList.Add(project);
                        }
                    }

                }






                if (projectList.Count > 0)
                {

                    for (int i = 0; i < projectList.Count; i++)
                    {
                        //项目区域
                        string region = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM pointcloud_data_region WHERE projectid={0}", projectList[i].Id));
                        string[] row = region.Split(new char[] { COM.ConstHelper.rowSplit });
                        if (!string.IsNullOrEmpty(region))
                        {
                            List<Region> Region_temp = new List<Region>();

                            for (int j = 0; j < row.Length; j++)
                            {
                                Region region_temp = new Region();
                                region_temp = ParsePointCloudHelper.ParsePCloudRegion(row[j]);

                                string pointcloud_data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM pointcloud_data WHERE regionid={0} AND projectid={1}", region_temp.Id, projectList[i].Id));
                                string[] row_pointcloud_data = pointcloud_data.Split(new char[] { COM.ConstHelper.rowSplit });
                                if (!string.IsNullOrEmpty(pointcloud_data))
                                {
                                    List<PCloudData> PCloudData_temp = new List<PCloudData>();
                                    for (int n = 0; n < row_pointcloud_data.Length; n++)
                                    {
                                        PCloudData pCloudData = new PCloudData();
                                        pCloudData = ParsePointCloudHelper.ParsePCloudData(row_pointcloud_data[n]);
                                        PCloudData_temp.Add(pCloudData);
                                    }
                                    region_temp.PCloudDataList = PCloudData_temp;
                                }

                                Region_temp.Add(region_temp);
                            }
                            projectList[i].RegionList = Region_temp;
                        }

                        //三维实景模型
                        string model = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT a.* from survey_model a join monitor_map_project_survey b on a.id=b.surveyid where b.projectid={0} and b.type={1}", projectList[i].Id, '6'));
                        if (!string.IsNullOrEmpty(model))
                        {
                            SurModels surModels = new SurModels();
                            surModels.Title = "三维实景模型";

                            List<SurModel> surModelList = new List<SurModel>();
                            string[] SurModelrows = model.Split(new char[] { COM.ConstHelper.rowSplit });
                            for (int b = 0; b < SurModelrows.Length; b++)
                            {
                                SurModel surModel = ParseMonitorHelper.ParseSurModel(SurModelrows[b]);
                                surModelList.Add(surModel);
                            }

                            if (surModelList.Count > 0)
                            {
                                surModels.SurModelList = surModelList;
                            }

                            projectList[i].surModels = surModels;
                        }
                    }
                    Layer layer = new Layer();
                    layer.PCloudProjectList = projectList;

                    return JsonHelper.ToJson(layer);
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

        /// <summary>
        /// 获取时序数据信息（后台）
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetPointCloudDataInfo(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                PCloudData pCloudData = ParsePointCloudHelper.ParsePCloudData(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM pointcloud_data WHERE id={0}",id)));
                if (pCloudData != null)
                {
                    if (!string.IsNullOrEmpty(pCloudData.SRID.ToString()))
                    {
                        Coordinate coordinate = ParseManageHelper.ParseCoordinate(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_coordinate WHERE srid={0}", pCloudData.SRID)));
                        if (coordinate != null)
                        {
                            pCloudData.SRID = coordinate.NAME;
                        }
                    }
                    if (!string.IsNullOrEmpty(pCloudData.ProjectId.ToString()))
                    {
                        PCloudProject project = ParsePointCloudHelper.ParsePCloudProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM pointcloud_project WHERE id={0}", pCloudData.ProjectId)));
                        if (project != null)
                        {
                            pCloudData.XMMC = project.XMMC;
                            pCloudData.ZXJD = project.ZXJD.ToString();
                            pCloudData.ZXWD = project.ZXWD.ToString();
                        }
                    }

                    pCloudData.projectSet = new ProjectSetUp();
                    pCloudData.projectSet.StatisticoutlierPara = ParsePointCloudHelper.ParseStatisticoutlierPara(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT   * FROM pointcloud_statisticoutlier_para  WHERE dataid ={0} ORDER BY cjsj DESC LIMIT 1", id)));
                    pCloudData.projectSet.ICPPara = ParsePointCloudHelper.ParseICPPara(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT   * FROM pointcloud_icp_para  WHERE dataid ={0} ORDER BY cjsj DESC LIMIT 1", id)));
                    pCloudData.projectSet.OverlapPara = ParsePointCloudHelper.ParseOverlap(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT   * FROM pointcloud_overlap  WHERE dataid ={0} ORDER BY cjsj DESC LIMIT 1", id)));
                    pCloudData.projectSet.ShapePara = ParsePointCloudHelper.ParseShape(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT   * FROM pointcloud_shape  WHERE dataid ={0} ORDER BY cjsj DESC LIMIT 1", id)));



                    return JsonHelper.ToJson(pCloudData);
                }
            }
            return string.Empty;
        }


        /// <summary>
        /// 更新点云时序数据信息
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdatePointCloudProjectInfo()
        {
            #region 参数
            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string XMMC = HttpContext.Current.Request.Form["xmmc"];
            string CJRY = HttpContext.Current.Request.Form["cjry"];
            string CJSJ = HttpContext.Current.Request.Form["cjsj"];
            string Regionid = HttpContext.Current.Request.Form["xmqy"];
            string ZXJD = HttpContext.Current.Request.Form["zxjd"];
            string ZXWD = HttpContext.Current.Request.Form["zxwd"];
            string SRID = HttpContext.Current.Request.Form["kjck"];
            string SJGSid = HttpContext.Current.Request.Form["sjgs"];
            string Deviceid = HttpContext.Current.Request.Form["cjsb"];
            string Typeid = HttpContext.Current.Request.Form["sjgs"];
            string DYSM = HttpContext.Current.Request.Form["dysm"];
            string MQLCid = HttpContext.Current.Request.Form["mqlc"];
            string CJZQid = HttpContext.Current.Request.Form["cjzq"];
            string BZ = HttpContext.Current.Request.Form["bz"];
            #endregion

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM pointcloud_project WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (count == 1)
                {
                    if (!string.IsNullOrEmpty(CJRY)&& !string.IsNullOrEmpty(CJSJ)&& !string.IsNullOrEmpty(DYSM)&& !string.IsNullOrEmpty(BZ))
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(
                         "UPDATE pointcloud_data SET cjry={0},cjsj={1},number={2},bz={3} WHERE id={4}  AND ztm={5}",
                            SQLHelper.UpdateString(CJRY),
                            SQLHelper.UpdateString(CJSJ),
                            DYSM,
                            SQLHelper.UpdateString(BZ),
                            id,
                            (int)MODEL.Enum.State.InUse));
                    }
                }
                return "更新成功！";
            }
            else
            {
                return "用户无权限！";
            }
        }

    }
}

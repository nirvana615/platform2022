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
    public class FlzLayerController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(FlzLayerController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 获取图层信息
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie">用户信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetLayerInfo(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            
                FlzProject project = ParseFlzoneHelper.ParseProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM flz_project WHERE id={0}  AND ztm={1}", id,  (int)MODEL.Enum.State.InUse)));
                if (project != null)
                {
                    LayerList layers = new LayerList();

                    layers.Id = project.Id;



                    ProjectLayer projectLayer = new ProjectLayer();
                    projectLayer.Title = project.XMMC;
                    #region
                    if ((project.ZXJD != null) && (project.ZXWD != null))
                    {
                        BL bl = new BL(Convert.ToDouble(project.ZXWD), Convert.ToDouble(project.ZXJD));
                        projectLayer.CenterPoint = new CenterPoint
                        {
                            Title = "位置",
                            BL = bl,
                            Label = project.XMMC
                        };
                    }

                //TODO
                if (!string.IsNullOrEmpty(project.flzRange))
                {
                    Extent extent = new Extent();
                    extent.Title = "边界范围";
                    extent.GeoJSON = project.flzRange;
                    projectLayer.KJFW = extent;
                }
                else
                {
                    projectLayer.KJFW = null;
                }
                    
                    projectLayer.YXFW = null;

                List<ModelTask> models = new List<ModelTask>();

                string modelmaps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_map_project_use WHERE syscode={0} AND useprojectid={1} AND ztm={2} ORDER BY id DESC", (int)MODEL.Enum.System.Geology, id, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(modelmaps))
                {
                    string[] modelrows = modelmaps.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int j = 0; j < modelrows.Length; j++)
                    {
                        MapModelProjectUse mapModelProjectUse = ParseModelHelper.ParseMapModelProjectUse(modelrows[j]);
                        if (mapModelProjectUse != null)
                        {
                            ModelTask model = ParseModelHelper.ParseModelTask(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM model_task WHERE id={0} AND ztm={1}", mapModelProjectUse.ModelTaskId, (int)MODEL.Enum.State.InUse)));
                            if (model != null)
                            {
                                models.Add(model);
                            }
                        }
                    }
                }

                if (models.Count > 0)
                {
                    projectLayer.Models = models;
                }

                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT a.* from survey_model a join monitor_map_project_survey b on a.id=b.surveyid where b.projectid={0} and b.type={1}", id, '5'));
                if (!string.IsNullOrEmpty(data))
                {
                    SurModels surModels = new SurModels();
                    surModels.Title = "三维实景模型";

                    List<SurModel> surModelList = new List<SurModel>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        SurModel surModel = ParseMonitorHelper.ParseSurModel(rows[i]);
                        surModelList.Add(surModel);
                    }

                    if (surModelList.Count > 0)
                    {
                        surModels.SurModelList = surModelList;
                    }

                    projectLayer.SurModels = surModels;
                }

                layers.ProjectLayer = projectLayer;
                #endregion

                FlzDataLayer flzDataLayer = new FlzDataLayer();
                flzDataLayer.Title = "数据采集";
                #region
                data = string.Empty;
                data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM flz_data_point WHERE project_id={0}", id));
                if (!string.IsNullOrEmpty(data))
                {
                    List<FlzData> flzDateList = new List<FlzData>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        FlzData flzData = ParseFlzoneHelper.ParseFlzData(rows[i]);
                        flzDateList.Add(flzData);

                    }
                    flzDataLayer.FlzDataList = flzDateList;

                }
                #endregion


                #region
                data = string.Empty;
                data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM flz_window_info WHERE project_id={0}", id));
                if (!string.IsNullOrEmpty(data))
                {
                    List<FlzWindowInfo> flzWindowInfo = new List<FlzWindowInfo>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        FlzWindowInfo flzData = ParseFlzoneHelper.ParseFlzWindowInfo(rows[i]);
                        flzWindowInfo.Add(flzData);

                    }
                    flzDataLayer.FlzWindowInfoList = flzWindowInfo;

                }


                layers.FlzDataLayer = flzDataLayer;
                return JsonHelper.ToJson(layers);

                }
            #endregion


            return "没有项目";
        }






















    }
}

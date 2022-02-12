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
    public class LayerController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(LayerController));
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

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                MonitorProject project = ParseMonitorHelper.ParseMonitorProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_project WHERE id={0} AND bsm{1} AND ztm={2}", id, userbsms, (int)MODEL.Enum.State.InUse)));
                if (project != null)
                {
                    LayerList layers = new LayerList();

                    layers.Id = project.Id;



                    ProjectLayer projectLayer = new ProjectLayer();
                    projectLayer.Title = "项目";
                    #region
                    if ((project.ZXJD != null) && (project.ZXWD != null))
                    {
                        BL bl = new BL(Convert.ToDouble(project.ZXWD), Convert.ToDouble(project.ZXJD));
                        projectLayer.CenterPoint = new CenterPoint
                        {
                            Title = "位置",
                            BL = bl,
                            Label = project.ZHDMC//Label = project.XMMC
                        };
                    }

                    //TODO
                    projectLayer.KJFW = null;
                    projectLayer.YXFW = null;

                    string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_project_survey WHERE projectid={0} AND type={1} AND role={2} AND ztm={3}", id, (int)MODEL.EnumMonitor.SurveyDataType.Model, 1, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(data))
                    {
                        SurModels surModels = new SurModels();
                        surModels.Title = "三维实景模型";

                        List<SurModel> surModelList = new List<SurModel>();
                        string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int i = 0; i < rows.Length; i++)
                        {
                            MapProjectSurvey mapProjectSurvey = ParseMonitorHelper.ParseMapProjectSurvey(rows[i]);
                            if (mapProjectSurvey != null)
                            {
                                //SurModel surModel = ParseMonitorHelper.ParseSurModel(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM survey_model WHERE id={0} AND bsm{1} AND ztm={2} AND mxjb={3}", mapProjectSurvey.SurveyId, userbsms, (int)MODEL.Enum.State.InUse, (int)MODEL.EnumMonitor.ModelLevel.Whole)));
                                SurModel surModel = ParseMonitorHelper.ParseSurModel(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM survey_model WHERE id={0} AND ztm={1}", mapProjectSurvey.SurveyId, (int)MODEL.Enum.State.InUse)));
                                if (surModel != null)
                                {
                                    surModelList.Add(surModel);
                                }
                            }
                        }

                        if (surModelList.Count > 0)
                        {
                            surModels.SurModelList = surModelList;
                        }

                        projectLayer.SurModels = surModels;
                    }

                    layers.ProjectLayer = projectLayer;
                    #endregion

                    DisasterLayers disasterLayers = new DisasterLayers();
                    disasterLayers.Title = "灾害体";
                    #region
                    data = string.Empty;
                    data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_project_disaster WHERE projectid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(data))
                    {
                        List<DisasterLayer> disasterLayerList = new List<DisasterLayer>();

                        string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int i = 0; i < rows.Length; i++)
                        {
                            MapProjectDisaster mapProjectDisaster = ParseMonitorHelper.ParseMapProjectDisaster(rows[i]);
                            if (mapProjectDisaster != null)
                            {
                                DisasterString disasterString = ParseMonitorHelper.ParseDisasterString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", mapProjectDisaster.DisasterId, userbsms, (int)MODEL.Enum.State.InUse)));
                                if (disasterString != null)
                                {
                                    DisasterLayer disasterLayer = new DisasterLayer();
                                    disasterLayer.Title = disasterString.ZHTBH;
                                    if (!string.IsNullOrEmpty(disasterString.ZXWD) && !string.IsNullOrEmpty(disasterString.ZXJD))
                                    {
                                        BL bl = new BL(Convert.ToDouble(disasterString.ZXWD), Convert.ToDouble(disasterString.ZXJD));
                                        CenterPoint centerPoint = new CenterPoint
                                        {
                                            Title = disasterString.ZHTBH + "位置",
                                            BL = bl,
                                            Label = disasterString.ZHTBH
                                        };
                                        disasterLayer.CenterPoint = centerPoint;

                                        //TODO
                                        disasterLayer.KJFW = null;
                                        disasterLayer.YXFW = null;
                                        disasterLayer.SurModels = null;

                                        disasterLayerList.Add(disasterLayer);
                                    }
                                }
                            }
                        }


                        disasterLayers.DisasterLayerList = disasterLayerList;
                    }


                    layers.DisasterLayers = disasterLayers;
                    #endregion

                    MonitorLayer monitorLayer = new MonitorLayer();
                    monitorLayer.Title = "监测";

                    MonitorPointLayers monitorPointLayers = new MonitorPointLayers();
                    monitorPointLayers.Title = "监测点";
                    List<MonitorPointLayer> monitorPointLayerList = new List<MonitorPointLayer>();

                    MonitorSectoinLayers monitorSectoinLayers = new MonitorSectoinLayers();
                    monitorSectoinLayers.Title = "监测剖面";
                    List<MonitorSectoinLayer> monitorSectoinLayerList = new List<MonitorSectoinLayer>();

                    #region
                    data = string.Empty;
                    data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM  monitor_map_project_disaster WHERE projectid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(data))
                    {
                        string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int i = 0; i < rows.Length; i++)
                        {
                            MapProjectDisaster mapProjectDisaster = ParseMonitorHelper.ParseMapProjectDisaster(rows[i]);
                            if (mapProjectDisaster != null)
                            {
                                Disaster disaster = ParseMonitorHelper.ParseDisaster(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_disaster WHERE id={0} AND bsm{1} AND ztm={2}", mapProjectDisaster.DisasterId, userbsms, (int)MODEL.Enum.State.InUse)));
                                if (disaster != null)
                                {
                                    data = string.Empty;
                                    data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_section WHERE disasterid={0} AND ztm={1}", disaster.Id, (int)MODEL.Enum.State.InUse));
                                    if (!string.IsNullOrEmpty(data))
                                    {
                                        string[] rows1 = data.Split(new char[] { COM.ConstHelper.rowSplit });
                                        for (int j = 0; j < rows1.Length; j++)
                                        {
                                            MapDisasterSection mapDisasterSection = ParseMonitorHelper.ParseMapDisasterSection(rows1[j]);
                                            if (mapDisasterSection != null)
                                            {
                                                SectionString sectionString = ParseMonitorHelper.ParseSectionString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_section WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterSection.SectionId, userbsms, (int)MODEL.Enum.State.InUse)));
                                                if (sectionString != null)
                                                {
                                                    MonitorSectoinLayer monitorSectoinLayer = new MonitorSectoinLayer();
                                                    monitorSectoinLayer.Id = sectionString.Id;
                                                    monitorSectoinLayer.PMMC = sectionString.PMMC;
                                                    monitorSectoinLayer.PMBH = sectionString.PMBH;
                                                    monitorSectoinLayer.PMLX = sectionString.PMLX;
                                                    monitorSectoinLayer.PMDJ = sectionString.PMDJ;

                                                    List<XYZ> line = new List<XYZ>();
                                                    List<xyh> points = new List<xyh>();

                                                    data = string.Empty;
                                                    data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_section_monitor WHERE sectionid={0} AND ztm={1}", sectionString.Id, (int)MODEL.Enum.State.InUse));
                                                    if (!string.IsNullOrEmpty(data))
                                                    {
                                                        string[] rows2 = data.Split(new char[] { COM.ConstHelper.rowSplit });
                                                        for (int h = 0; h < rows2.Length; h++)
                                                        {
                                                            MapSectiontMonitor mapSectiontMonitor = ParseMonitorHelper.ParseMapSectiontMonitor(rows2[h]);
                                                            if (mapSectiontMonitor != null)
                                                            {
                                                                MonitorString monitorString = ParseMonitorHelper.ParseMonitorString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_monitor WHERE id={0} AND bsm{1} AND ztm={2}", mapSectiontMonitor.MonitorId, userbsms, (int)MODEL.Enum.State.InUse)));
                                                                if (monitorString != null)
                                                                {
                                                                    MonitorPointLayer monitorPointLayer = new MonitorPointLayer();
                                                                    monitorPointLayer.Id = monitorString.Id;
                                                                    monitorPointLayer.JCDMC = monitorString.JCDMC;
                                                                    monitorPointLayer.JCDBH = monitorString.JCDBH;
                                                                    monitorPointLayer.JCFF = monitorString.JCFF;
                                                                    monitorPointLayer.JCZLX = monitorString.JCZLX;




                                                                    XYZ XYZ = COM.CoordConvert.xyh2XYZ(new xyh(Convert.ToDouble(monitorString.PMWZX), Convert.ToDouble(monitorString.PMWZY), Convert.ToDouble(monitorString.GC)), Convert.ToInt32(monitorString.KJCK));
                                                                    if (XYZ != null)
                                                                    {
                                                                        monitorPointLayer.Center = XYZ;
                                                                        line.Add(XYZ);
                                                                    }

                                                                    monitorPointLayerList.Add(monitorPointLayer);

                                                                }
                                                            }
                                                        }
                                                    }

                                                    if (line.Count > 0)
                                                    {
                                                        monitorSectoinLayer.Line = line;
                                                    }

                                                    monitorSectoinLayerList.Add(monitorSectoinLayer);
                                                }
                                            }
                                        }




                                    }


                                    data = string.Empty;
                                    data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_disaster_monitor WHERE disasterid={0} AND ztm={1}", disaster.Id, (int)MODEL.Enum.State.InUse));
                                    if (!string.IsNullOrEmpty(data))
                                    {
                                        string[] rows3 = data.Split(new char[] { COM.ConstHelper.rowSplit });
                                        for (int k = 0; k < rows3.Length; k++)
                                        {
                                            MapDisasterMonitor mapDisasterMonitor = ParseMonitorHelper.ParseMapDisasterMonitor(rows3[k]);
                                            if (mapDisasterMonitor != null)
                                            {
                                                MonitorString monitorString = ParseMonitorHelper.ParseMonitorString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_monitor WHERE id={0} AND bsm{1} AND ztm={2}", mapDisasterMonitor.MonitorId, userbsms, (int)MODEL.Enum.State.InUse)));
                                                bool isIn = false;
                                                for (int m = 0; m < monitorPointLayerList.Count; m++)
                                                {
                                                    if (monitorPointLayerList[m].Id == monitorString.Id)
                                                    {
                                                        isIn = true;
                                                        break;
                                                    }

                                                }

                                                if (!isIn)
                                                {
                                                    MonitorPointLayer monitorPointLayer = new MonitorPointLayer();
                                                    monitorPointLayer.Id = monitorString.Id;
                                                    monitorPointLayer.JCDMC = monitorString.JCDMC;
                                                    monitorPointLayer.JCDBH = monitorString.JCDBH;
                                                    monitorPointLayer.JCFF = monitorString.JCFF;
                                                    monitorPointLayer.JCZLX = monitorString.JCZLX;

                                                    XYZ XYZ = COM.CoordConvert.xyh2XYZ(new xyh(Convert.ToDouble(monitorString.PMWZX), Convert.ToDouble(monitorString.PMWZY), Convert.ToDouble(monitorString.GC)), Convert.ToInt32(monitorString.KJCK));
                                                    if (XYZ != null)
                                                    {
                                                        monitorPointLayer.Center = XYZ;
                                                    }

                                                    monitorPointLayerList.Add(monitorPointLayer);
                                                }

                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }

                    data = string.Empty;
                    data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_map_project_monitor WHERE projectid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(data))
                    {
                        string[] rows4 = data.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int i = 0; i < rows4.Length; i++)
                        {
                            MapProjectMonitor mapProjectMonitor = ParseMonitorHelper.ParseMapProjectMonitor(rows4[i]);
                            if (mapProjectMonitor != null)
                            {
                                MonitorString monitorString = ParseMonitorHelper.ParseMonitorString(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_monitor WHERE id={0} AND bsm{1} AND ztm={2}", mapProjectMonitor.MonitorId, userbsms, (int)MODEL.Enum.State.InUse)));
                                if (monitorString != null)
                                {
                                    MonitorPointLayer monitorPointLayer = new MonitorPointLayer();
                                    monitorPointLayer.Id = monitorString.Id;
                                    monitorPointLayer.JCDMC = monitorString.JCDMC;
                                    monitorPointLayer.JCDBH = monitorString.JCDBH;
                                    monitorPointLayer.JCFF = monitorString.JCFF;
                                    monitorPointLayer.JCZLX = monitorString.JCZLX;

                                    XYZ XYZ = COM.CoordConvert.xyh2XYZ(new xyh(Convert.ToDouble(monitorString.PMWZX), Convert.ToDouble(monitorString.PMWZY), Convert.ToDouble(monitorString.GC)), Convert.ToInt32(monitorString.KJCK));
                                    if (XYZ != null)
                                    {
                                        monitorPointLayer.Center = XYZ;
                                    }

                                    monitorPointLayerList.Add(monitorPointLayer);
                                }
                            }
                        }
                    }


                    monitorPointLayers.MonitorPointLayerList = monitorPointLayerList;
                    monitorSectoinLayers.MonitorSectoinLayerList = monitorSectoinLayerList;


                    monitorLayer.MonitorPointLayers = monitorPointLayers;
                    monitorLayer.MonitorSectoinLayers = monitorSectoinLayers;

                    layers.MonitorLayer = monitorLayer;
                    #endregion






















                    return JsonHelper.ToJson(layers);

                }

            }

            return string.Empty;
        }






















    }
}

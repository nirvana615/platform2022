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
    public class PointCloudChangesController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(PointCloudChangesController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString() == "" ? COM.ConstHelper.dbConn : ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 获取所有的项目选项
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetPointCloudChanges(string projectid)
        {
            //项目区域
            string region = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM pointcloud_data_region WHERE projectid={0}", projectid));
            string[] row = region.Split(new char[] { COM.ConstHelper.rowSplit });
            if (!string.IsNullOrEmpty(region))
            {
                List<Region> Region_temp = new List<Region>();

                for (int j = 0; j < row.Length; j++)
                {
                    Region region_temp = new Region();
                    region_temp = ParsePointCloudHelper.ParsePCloudRegion(row[j]);

                    string changes_data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM pointcloud_data_task_changes WHERE bsm={0} AND ztm={1}", "'"+region_temp.BSM+"'", (int)MODEL.Enum.State.InUse));
                    string[] row_pointcloud_data = changes_data.Split(new char[] { COM.ConstHelper.rowSplit });
                    //热力图图层
                    if (!string.IsNullOrEmpty(changes_data))
                    {
                        List<PointCloudChanges> PointCloudChanges_temp = new List<PointCloudChanges>();
                        for (int n = 0; n < row_pointcloud_data.Length; n++)
                        {
                            PointCloudChanges PointCloudChanges = new PointCloudChanges();
                            PointCloudChanges = ParsePointCloudHelper.ParseChanges(row_pointcloud_data[n]);
                            int regionid=Convert.ToInt32( PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT regionid FROM pointcloud_data WHERE id={0} AND ztm ={1}", PointCloudChanges.Targetid, (int)MODEL.Enum.State.InUse)));
                            if (region_temp.Id== regionid)
                            {
                                List<HeatMapValue2> heatmapvaluesendlist =new List<HeatMapValue2>();

                                List<HeatMapValue> heatmapvaluelist = COM.JsonHelper.ToObject<List<HeatMapValue>>(PointCloudChanges.Changes);
                                for (int i=0;i< heatmapvaluelist.Count;i++)
                                {
                                    HeatMapValue2 heatMapValue = new HeatMapValue2();
                                     XYZ temp = new XYZ();
                                    temp.X = Convert.ToDouble( heatmapvaluelist[i].x);
                                    temp.Y = Convert.ToDouble(heatmapvaluelist[i].y);
                                    temp.Z = Convert.ToDouble(heatmapvaluelist[i].z);     
                                    string info="";
                                    BLH BLH = COM.CoordConvert.XYZ2BLH(temp, EnumCOM.Datum.CGCS2000, ref info);
                                    heatMapValue.x = Convert.ToDouble(BLH.L.ToString());
                                    heatMapValue.y = Convert.ToDouble(BLH.B.ToString());
                                    heatMapValue.value = heatmapvaluelist[i].value;
                                    heatmapvaluesendlist.Add(heatMapValue);

                                }
                                PointCloudChanges.Changes = JsonHelper.ToJson(heatmapvaluesendlist);
                                PointCloudChanges_temp.Add(PointCloudChanges);
                            }
                        }
                        region_temp.PointCloudChangeslist = PointCloudChanges_temp;
                    }
                    //变形定位图层
                    if (!string.IsNullOrEmpty(changes_data))
                    {
                        ChangePositions changePositions = new ChangePositions();
                        changePositions.Title = "点云变形定位";
                        List<HeatMapValues> heatmapvalueslist =new List<HeatMapValues>();
                        for (int n = 0; n < row_pointcloud_data.Length; n++)
                        {
                            PointCloudChanges PointCloudChanges = new PointCloudChanges();
                            PointCloudChanges = ParsePointCloudHelper.ParseChanges(row_pointcloud_data[n]);
                            int regionid = Convert.ToInt32(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT regionid FROM pointcloud_data WHERE id={0} AND ztm ={1}", PointCloudChanges.Targetid, (int)MODEL.Enum.State.InUse)));
                            if (region_temp.Id == regionid)
                            {
                                HeatMapValues heatMapValues = new HeatMapValues();
                                List<HeatMapValue> heatmapvaluelist_temp = COM.JsonHelper.ToObject<List<HeatMapValue>>(PointCloudChanges.Changes);
                                for(int z=0;z< heatmapvaluelist_temp.Count; z++)
                                {
                                    xy pointxy = new xy();
                                    pointxy.x= Convert.ToDouble(heatmapvaluelist_temp[z].x);
                                    pointxy.y = Convert.ToDouble(heatmapvaluelist_temp[z].y);

                                    XYZ temp = new XYZ();
                                    temp.X = Convert.ToDouble(heatmapvaluelist_temp[z].x);
                                    temp.Y = Convert.ToDouble(heatmapvaluelist_temp[z].y);
                                    temp.Z = Convert.ToDouble(heatmapvaluelist_temp[z].z);
                                    string info = "";
                                    BLH BLH = COM.CoordConvert.xy2BL(pointxy, EnumCOM.Datum.CGCS2000,3,108,false, ref info);
                                    HeatMapValue heatMapValue = new HeatMapValue();
                                    heatmapvaluelist_temp[z].x = Convert.ToDouble(BLH.L.ToString());
                                    heatmapvaluelist_temp[z].y = Convert.ToDouble(BLH.B.ToString());
                                    heatmapvaluelist_temp[z].z= heatmapvaluelist_temp[z].z;
                                }
                                heatMapValues.HeatMapValueList = JsonHelper.ToJson(heatmapvaluelist_temp);

                                heatmapvalueslist.Add(heatMapValues);

                                heatmapvaluelist_temp.Clear();

                            }
                        }
                            changePositions.ChangePositionsList = heatmapvalueslist;
                            region_temp.changePositions = changePositions;
                    }
                    //点云图层
                    string pointcloud= PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT a.* from survey_pointcloud a join pointcloud_project_survey b on a.id=b.surveyid where b.regionid={0} and b.type={1}", region_temp.Id, '6'));
                    if (!string.IsNullOrEmpty(pointcloud))
                    {
                        SurPointClouds SurPointClouds = new SurPointClouds();
                        SurPointClouds.Title = "点云变化图层";

                        List<SurPointCloud> surPointCloudList = new List<SurPointCloud>();
                        string[] SurPointCloudrows = pointcloud.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int b = 0; b < SurPointCloudrows.Length; b++)
                        {
                            SurPointCloud SurPointCloud = ParseMonitorHelper.ParseSurPointCloud(SurPointCloudrows[b]);
                            surPointCloudList.Add(SurPointCloud);
                        }

                        if (surPointCloudList.Count > 0)
                        {
                            SurPointClouds.SurPointCloudList = surPointCloudList;
                        }

                        region_temp.SurPointClouds = SurPointClouds;
                    }

                    Region_temp.Add(region_temp);
                }

                ChangesLayer changesLayer = new ChangesLayer();
                changesLayer.RegionList = Region_temp;

                return JsonHelper.ToJson(changesLayer);
            }
            else
            {
                return string.Empty;

            }
        }
    }
}
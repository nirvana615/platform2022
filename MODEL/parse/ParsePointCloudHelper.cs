using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace MODEL
{
    /// <summary>
    /// 解析点云
    /// </summary>
    public class ParsePointCloudHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParsePointCloudHelper));
        #region 1、业务
        /// <summary>
        /// 项目信息
        /// </summary> 
        /// <param name="data"></param>
        /// <returns></returns>
        public static PCloudProject ParsePCloudProject(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析Project数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("Project不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                PCloudProject project = new PCloudProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    XMMC = row[1].ToString(),
                    XMBM = row[2].ToString(),
                    XZQBM = row[8].ToString(),
                    XMWZ = row[9].ToString(),
                    CJSJ = row[11].ToString(),
                    BSM = row[12].ToString(),
                    ZTM = Convert.ToInt32(row[13].ToString()),
                    BZ = row[14].ToString(),
                    ZXJD = Convert.ToDouble(row[3].ToString()),
                    ZXWD = Convert.ToDouble(row[4].ToString()),
                };
                return project;
            }
            catch (Exception ex)
            {
                logger.Error("Project解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 解析项目区域信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Region ParsePCloudRegion(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("该项目无区域数据！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });


                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Region Region = new Region()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    RegionName = row[1].ToString(),
                    ProjectId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[5].ToString(),
                    BSM = row[6].ToString(),
                    ZTM = Convert.ToInt32(row[7].ToString()),
                    BZ = row[8].ToString(),
                    RegionlBoundary = row[9].ToString()
                };

                return Region;
            }
            catch (Exception ex)
            {
                logger.Error("Region解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 点云数据
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static PCloudData ParsePCloudData(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无点云数据！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });


                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                PCloudData PCloudData = new PCloudData()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ProjectId = Convert.ToInt32(row[1].ToString()),
                    CJSJ = row[2].ToString(),
                    SRID = row[4].ToString(),
                    BSM = row[5].ToString(),
                    ZTM = Convert.ToInt32(row[6].ToString()),
                    BZ = row[7].ToString(),
                    Regionid = Convert.ToInt32(row[8].ToString()),
                    Typeid = Convert.ToInt32(row[11].ToString()),
                    CJRY = row[12].ToString(),
                    SJGSid = Convert.ToInt32(row[13].ToString()),
                    Deviceid = Convert.ToInt32(row[14].ToString()),
                };
                if (!string.IsNullOrEmpty(row[10].ToString()))
                {
                    PCloudData.DYSM = row[10].ToString();
                }
                if (!string.IsNullOrEmpty(row[15].ToString()))
                {
                    PCloudData.CJZQ = Convert.ToInt32(row[15].ToString());
                }


                return PCloudData;
            }
            catch (Exception ex)
            {
                logger.Error("PCloudData解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 解析变化图层
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static PointCloudChanges ParseChanges(string data) {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无PointCloudChanges！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });


                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                PointCloudChanges PointCloudChanges = new PointCloudChanges()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Sourceid = Convert.ToInt32(row[1].ToString()),
                    Targetid = Convert.ToInt32(row[2].ToString()),
                    ICPid = Convert.ToInt32(row[3].ToString()),
                    CJSJ = row[4].ToString(),
                    Changes = row[5].ToString(),
                    LJ = row[6].ToString(),
                    BSM = row[7].ToString(),
                    ZTM = Convert.ToInt32(row[8].ToString()),
                };

                return PointCloudChanges;
            }
            catch (Exception ex)
            {
                logger.Error("PointCloudChanges解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 多边形信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static PolygonInfo ParsePolygonInfo(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无PolygonInfo！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });


                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                PolygonInfo PolygonInfo = new PolygonInfo()
                {
                    id = Convert.ToInt32(row[0].ToString()),
                    relateid = Convert.ToInt32(row[1].ToString()),
                    type = Convert.ToInt32(row[2].ToString()),
                    points = row[3].ToString(),
                    CJSJ = row[4].ToString(),
                    projectId = Convert.ToInt32(row[5].ToString()),
                    axisx = row[6].ToString(),
                    axisy = row[7].ToString(),
                    normal = row[8].ToString(),
                    origin = row[9].ToString(),
                    vertices2d = row[10].ToString(),
                    vertices3d = row[11].ToString(),
                    vertices3dlbh = row[12].ToString(),
                    level = row[13].ToString(),
                    vertical = row[14].ToString(),
                    height = row[15].ToString(),
                    bz = row[16].ToString(),
                    ztm = Convert.ToInt32(row[17].ToString())
                };

                return PolygonInfo;
            }
            catch (Exception ex)
            {
                logger.Error("PolygonInfo解析失败：" + data, ex);
                return null;
            }
        }

        ///<summary>
        ///任务列表
        /// </summary>
        public static PointCloudTask ParsePointCloudTask(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无PointCloudTask！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });


                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                PointCloudTask PointCloudTask = new PointCloudTask()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Sourceid = Convert.ToInt32(row[1].ToString()),
                    Targetid = Convert.ToInt32(row[2].ToString()),
                    name = row[3].ToString(),
                    Projectid = Convert.ToInt32(row[4].ToString()),
                    Regionid = Convert.ToInt32(row[5].ToString()),
                    Taskprocess = Convert.ToInt32(row[6].ToString()),
                    CJSJ = row[7].ToString(),
                    BSM = row[8].ToString(),
                    ZTM = Convert.ToInt32(row[9].ToString()),
                    BZ = row[10].ToString(),

                };
                return PointCloudTask;
            }
            catch (Exception ex)
            {
                logger.Error("PointCloudTask解析失败：" + data, ex);
                return null;
            }
        }



        /// <summary>
        /// 统计滤波参数
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static StatisticoutlierPara ParseStatisticoutlierPara(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无点云数据！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });


                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                StatisticoutlierPara Para = new StatisticoutlierPara()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Meank = Convert.ToInt32(row[4].ToString()),
                    StddevMulThresh = Convert.ToInt32(row[5].ToString()),
                    CJSJ = row[2].ToString(),
                    ZTM = Convert.ToInt32(row[8].ToString()),
                };

                return Para;
            }
            catch (Exception ex)
            {
                logger.Error("StatisticoutlierPara解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// ICP配准参数
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static ICPPara ParseICPPara(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无点云数据！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });


                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                ICPPara Para = new ICPPara()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    LeafSize = Convert.ToDouble(row[4].ToString()),
                    MaxIteration = Convert.ToInt32(row[6].ToString()),
                    RadiusSearch = Convert.ToDouble(row[5].ToString()),
                    CJSJ = row[2].ToString(),
                    ZTM = Convert.ToInt32(row[8].ToString()),
                };

                return Para;
            }
            catch (Exception ex)
            {
                logger.Error("ICPPara解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 非重叠区域参数
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static OverlapPara ParseOverlap(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无点云数据！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });


                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                OverlapPara Para = new OverlapPara()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    CJSJ = row[2].ToString(),
                    ZTM = Convert.ToInt32(row[5].ToString()),
                };

                return Para;
            }
            catch (Exception ex)
            {
                logger.Error("OverlapPara解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 边界提取参数
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static ShapePara ParseShape(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无点云数据！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });


                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                ShapePara Para = new ShapePara()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    BJFF = Convert.ToInt32(row[4].ToString()),
                    CJSJ = row[2].ToString(),
                    ZTM = Convert.ToInt32(row[6].ToString()),
                };

                return Para;
            }
            catch (Exception ex)
            {
                logger.Error("ShapePara解析失败：" + data, ex);
                return null;
            }
        }

        #endregion

        #region 二、映射
        /// <summary>
        /// 1---用户-影像项目映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapUserPointCloudProject ParseMapUserPointCloudProject(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("用户-点云项目映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("用户-点云项目映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapUserPointCloudProject mapUserPointCloudProject = new MapUserPointCloudProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    UserId = Convert.ToInt32(row[1].ToString()),
                    PointCloudProjectId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapUserPointCloudProject;
            }
            catch (Exception ex)
            {
                logger.Error("MapUserPointCloudProject解析失败：" + data, ex);
                return null;
            }
        }

        #endregion
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using COM;

namespace MODEL
{
    public class ParseUavHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParseUavHelper));


        #region
        /// <summary>
        /// 用户-无人机项目映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapUserUavProject ParseMapUserUavProject(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("用户-无人机项目映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("用户-无人机项目映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapUserUavProject mapUserUavProject = new MapUserUavProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    UserId = Convert.ToInt32(row[1].ToString()),
                    UavProjectId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapUserUavProject;
            }
            catch (Exception ex)
            {
                logger.Error("MapUserUavProject解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 无人机项目-航线映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapProjectRoute ParseMapProjectRoute(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无人机项目-航线映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("无人机项目-航线映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapProjectRoute mapProjectRoute = new MapProjectRoute()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ProjectId = Convert.ToInt32(row[1].ToString()),
                    RouteId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapProjectRoute;
            }
            catch (Exception ex)
            {
                logger.Error("MapProjectRoute解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 无人机项目-测绘数据映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapUavProjectSurvey ParseMapUavProjectSurvey(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无人机项目-测绘映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("无人机项目-测绘映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapUavProjectSurvey mapUavProjectSurvey = new MapUavProjectSurvey()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ProjectId = Convert.ToInt32(row[1].ToString()),
                    ModelId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[4].ToString()
                };
                if (string.IsNullOrEmpty(row[3].ToString()))
                {
                    mapUavProjectSurvey.PointCloudId = null;
                }
                else
                {
                    mapUavProjectSurvey.PointCloudId = Convert.ToInt32(row[3].ToString());
                }

                return mapUavProjectSurvey;
            }
            catch (Exception ex)
            {
                logger.Error("MapUavProjectSurvey解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 无人机-挂载映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapDronePayload ParseMapDronePayload(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无人机-挂载映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("无人机-挂载映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapDronePayload mapDronePayload = new MapDronePayload()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    DroneId = Convert.ToInt32(row[1].ToString()),
                    PayloadId = Convert.ToInt32(row[2].ToString()),
                    PayloadType = Convert.ToInt32(row[3].ToString()),
                    CJSJ = row[4].ToString()
                };

                return mapDronePayload;
            }
            catch (Exception ex)
            {
                logger.Error("MapDronePayload解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 相机-照片比例映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapCameraPhotoRatio ParseMapCameraPhotoRatio(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("相机-照片比例映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("相机-照片比例映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapCameraPhotoRatio mapCameraPhotoRatio = new MapCameraPhotoRatio()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    CameraId = Convert.ToInt32(row[1].ToString()),
                    PhotoRatioId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapCameraPhotoRatio;
            }
            catch (Exception ex)
            {
                logger.Error("MapCameraPhotoRatio解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 航线-无人机映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapRouteDrone ParseMapRouteDrone(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("航线-无人机映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("航线-无人机映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapRouteDrone mapRouteDrone = new MapRouteDrone()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    RouteId = Convert.ToInt32(row[1].ToString()),
                    DroneId = Convert.ToInt16(row[2].ToString()),
                    PayloadType = Convert.ToInt16(row[3].ToString()),
                    PayloadId = Convert.ToInt16(row[4].ToString()),
                    CJSJ = row[6].ToString()
                };
                if (string.IsNullOrEmpty(row[5].ToString()))
                {
                    mapRouteDrone.PhotoRatioId = null;
                }
                else
                {
                    mapRouteDrone.PhotoRatioId = Convert.ToInt16(row[5].ToString());
                }

                return mapRouteDrone;
            }
            catch (Exception ex)
            {
                logger.Error("MapRouteDrone解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 航线-航点映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapRouteWaypoint ParseMapRouteWaypoint(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("航线-航点映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("航线-航点映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapRouteWaypoint mapRouteWaypoint = new MapRouteWaypoint()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    RouteId = Convert.ToInt32(row[1].ToString()),
                    WaypointId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapRouteWaypoint;
            }
            catch (Exception ex)
            {
                logger.Error("MapRouteWaypoint解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 航点-目标图像采集参数映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapWaypointMBTXCJ ParseMapWaypointMBTXCJ(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("航点-目标图像采集参数映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("航点-目标图像采集参数映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapWaypointMBTXCJ mapWaypointMBTXCJ = new MapWaypointMBTXCJ()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    WaypointId = Convert.ToInt32(row[1].ToString()),
                    MBTXCJId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapWaypointMBTXCJ;
            }
            catch (Exception ex)
            {
                logger.Error("MapWaypointMBTXCJ解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 航点-动作映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapWaypointAction ParseMapWaypointAction(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("航点-动作映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("航点-动作映射映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapWaypointAction mapWaypointAction = new MapWaypointAction()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    WaypointId = Convert.ToInt32(row[1].ToString()),
                    ActionId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapWaypointAction;
            }
            catch (Exception ex)
            {
                logger.Error("MapWaypointAction解析失败：" + data, ex);
                return null;
            }
        }





        #endregion

        #region
        /// <summary>
        /// 无人机项目
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static UavProject ParseUavProject(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无人机项目数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("无人机项目不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                UavProject uavProject = new UavProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    XMMC = row[1].ToString(),
                    XMBM = row[2].ToString(),
                    CJSJ = row[3].ToString(),
                    GXSJ = row[4].ToString(),
                    BSM = row[5].ToString(),
                    BZ = row[7].ToString()
                };

                return uavProject;
            }
            catch (Exception ex)
            {
                logger.Error("UavProject解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 无人机航线
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static UavRoute ParseUavRoute(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无人机航线数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("无人机航线不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                UavRoute uavRoute = new UavRoute()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    HXMC = row[1].ToString(),
                    HXLX = Convert.ToInt16(row[2].ToString()),
                    GCLX = Convert.ToInt16(row[3].ToString()),
                    HXSD = Convert.ToDouble(row[4].ToString()),
                    HXCD = Convert.ToDouble(row[5].ToString()),
                    FXSJ = Convert.ToDouble(row[6].ToString()),
                    HDSL = Convert.ToInt16(row[7].ToString()),
                    PZSL = Convert.ToInt16(row[8].ToString()),
                    LINE = row[9].ToString(),
                    MIS = row[10].ToString(),
                    PILOT = row[11].ToString(),
                    TERRA = row[12].ToString(),
                    CJSJ = row[13].ToString(),
                    GXSJ = row[14].ToString(),
                    ZXSJ = row[15].ToString(),
                    BSM = row[16].ToString(),
                    BZ = row[18].ToString()
                };

                return uavRoute;
            }
            catch (Exception ex)
            {
                logger.Error("UavRoute解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 无人机
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static UavDrone ParseUavDrone(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无人机数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("无人机不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                UavDrone uavDrone = new UavDrone()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    WRJMC = row[1].ToString(),
                    WRJJC = row[2].ToString(),
                    CJSJ = row[13].ToString(),
                    BZ = row[15].ToString()
                };

                if (string.IsNullOrEmpty(row[3].ToString()))
                {
                    uavDrone.ZDQFHBGD = null;
                }
                else
                {
                    uavDrone.ZDQFHBGD = Convert.ToInt32(row[3].ToString());
                }
                if (string.IsNullOrEmpty(row[4].ToString()))
                {
                    uavDrone.ZDDMZSGD = null;
                }
                else
                {
                    uavDrone.ZDDMZSGD = Convert.ToInt32(row[4].ToString());
                }
                if (string.IsNullOrEmpty(row[5].ToString()))
                {
                    uavDrone.ZDDMZXGD = null;
                }
                else
                {
                    uavDrone.ZDDMZXGD = Convert.ToInt32(row[5].ToString());
                }
                if (string.IsNullOrEmpty(row[6].ToString()))
                {
                    uavDrone.ZDHLDSPJJ = null;
                }
                else
                {
                    uavDrone.ZDHLDSPJJ = Convert.ToDouble(row[6].ToString());
                }
                if (string.IsNullOrEmpty(row[7].ToString()))
                {
                    uavDrone.ZXHLDSPJJ = null;
                }
                else
                {
                    uavDrone.ZXHLDSPJJ = Convert.ToDouble(row[7].ToString());
                }
                if (string.IsNullOrEmpty(row[8].ToString()))
                {
                    uavDrone.ZDSSSD = null;
                }
                else
                {
                    uavDrone.ZDSSSD = Convert.ToDouble(row[8].ToString());
                }
                if (string.IsNullOrEmpty(row[9].ToString()))
                {
                    uavDrone.ZDXJSD = null;
                }
                else
                {
                    uavDrone.ZDXJSD = Convert.ToDouble(row[9].ToString());
                }
                if (string.IsNullOrEmpty(row[10].ToString()))
                {
                    uavDrone.ZDSPFXSD = null;
                }
                else
                {
                    uavDrone.ZDSPFXSD = Convert.ToDouble(row[10].ToString());
                }
                if (string.IsNullOrEmpty(row[11].ToString()))
                {
                    uavDrone.ZDHLDSL = null;
                }
                else
                {
                    uavDrone.ZDHLDSL = Convert.ToInt32(row[11].ToString());
                }
                if (string.IsNullOrEmpty(row[12].ToString()))
                {
                    uavDrone.ZDFXSJ = null;
                }
                else
                {
                    uavDrone.ZDFXSJ = Convert.ToInt32(row[12].ToString());
                }

                return uavDrone;
            }
            catch (Exception ex)
            {
                logger.Error("UavDrone解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 相机
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static UavCamera ParseUavCamera(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("相机数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("相机不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                UavCamera uavCamera = new UavCamera()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    XJMC = row[1].ToString(),
                    JJ = Convert.ToDouble(row[2].ToString()),
                    DGXSCC = Convert.ToDouble(row[3].ToString()),
                    HG = Convert.ToDouble(row[4].ToString()),
                    CGQKD = Convert.ToDouble(row[5].ToString()),
                    CGQGD = Convert.ToDouble(row[6].ToString()),
                    ZXPZJG = Convert.ToDouble(row[7].ToString()),
                    MRZPBL = Convert.ToInt16(row[8].ToString()),
                    MRHXXS = Convert.ToInt16(row[9].ToString()),
                    MRZXXS = Convert.ToInt16(row[10].ToString()),
                    CJSJ = row[11].ToString(),
                    BZ = row[13].ToString()
                };

                return uavCamera;
            }
            catch (Exception ex)
            {
                logger.Error("UavCamera解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 照片比例
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static CameraPhotoRatio ParseCameraPhotoRatio(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("照片比例数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("照片比例不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                CameraPhotoRatio cameraPhotoRatio = new CameraPhotoRatio()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    MS = row[1].ToString(),
                    ZPBL = Convert.ToInt16(row[2].ToString()),
                    CGQHXXS = Convert.ToInt16(row[3].ToString()),
                    CGQZXXS = Convert.ToInt16(row[4].ToString()),
                    CJSJ = row[5].ToString(),
                    BZ = row[7].ToString()
                };

                return cameraPhotoRatio;
            }
            catch (Exception ex)
            {
                logger.Error("CameraPhotoRatio解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 无人机航点
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static UavWaypoint ParseUavWaypoint(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无人机航点数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("无人机航点不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                UavWaypoint uavWaypoint = new UavWaypoint()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    MC = row[1].ToString(),
                    SX = Convert.ToInt16(row[2].ToString()),
                    LX = Convert.ToInt16(row[3].ToString()),
                    JD = Convert.ToDouble(row[4].ToString()),
                    WD = Convert.ToDouble(row[5].ToString()),
                    GC = Convert.ToDouble(row[6].ToString()),
                    WZ = row[7].ToString(),
                    SD = Convert.ToDouble(row[9].ToString()),
                    CJSJ = row[10].ToString(),
                    BSM = row[11].ToString(),
                    BZ = row[13].ToString()
                };

                if (string.IsNullOrEmpty(row[8].ToString()))
                {
                    uavWaypoint.GD = null;
                }
                else
                {
                    uavWaypoint.GD = Convert.ToDouble(row[8].ToString());
                }

                return uavWaypoint;
            }
            catch (Exception ex)
            {
                logger.Error("UavWaypoint解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 目标图像采集参数
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static UavMBTXCJ ParseUavMBTXCJ(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("目标图像采集参数数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("目标图像采集参数不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                UavMBTXCJ uavMBTXCJ = new UavMBTXCJ()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    PZJL = Convert.ToDouble(row[1].ToString()),
                    TZJL = Convert.ToDouble(row[2].ToString()),
                    TZSD = Convert.ToDouble(row[3].ToString()),
                    EYE = row[4].ToString(),
                    CJSJ = row[5].ToString(),
                    BZ = row[7].ToString()
                };

                return uavMBTXCJ;
            }
            catch (Exception ex)
            {
                logger.Error("UavMBTXCJ解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 动作
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static UavAction ParseUavAction(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无人机动作数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("无人机动作不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                UavAction uavAction = new UavAction()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    GUID = row[1].ToString(),
                    Index = Convert.ToInt16(row[2].ToString()),
                    Title = row[3].ToString(),
                    Type = Convert.ToInt16(row[4].ToString()),
                    Value = Convert.ToDouble(row[5].ToString()),
                    CJSJ = row[6].ToString(),
                    BZ = row[8].ToString()
                };

                return uavAction;
            }
            catch (Exception ex)
            {
                logger.Error("UavAction解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 航区
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static UavWayarea ParseUavWayarea(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("UavWayarea数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("UavWayarea不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                UavWayarea uavWayarea = new UavWayarea()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    MC = row[1].ToString(),
                    SX = Convert.ToInt16(row[2].ToString()),
                    LX = Convert.ToInt16(row[3].ToString()),
                    WZ = row[4].ToString(),
                    GSD = Convert.ToDouble(row[5].ToString()),
                    FO = Convert.ToDouble(row[6].ToString()),
                    SO = Convert.ToDouble(row[7].ToString()),
                    MA = Convert.ToBoolean(row[8].ToString()),
                    DG = Convert.ToBoolean(row[9].ToString()),
                    CJSJ = row[10].ToString(),
                    BSM = row[11].ToString(),
                    BZ = row[13].ToString()
                };

                return uavWayarea;
            }
            catch (Exception ex)
            {
                logger.Error("UavWayarea解析失败：" + data, ex);
                return null;
            }
        }

        #endregion

    }
}

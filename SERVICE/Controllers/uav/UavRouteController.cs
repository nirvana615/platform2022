using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

using g3;

using COM;
using DAL;
using MODEL;

namespace SERVICE.Controllers
{
    public class UavRouteController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(UavRouteController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取用户全部航线任务路径
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserUavRoutes(string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                List<UavRoute> uavRoutes = new List<UavRoute>();

                string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_route WHERE bsm{0} AND ztm={1} ORDER BY id DESC", userbsms, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(datas))
                {
                    string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        UavRoute uavRoute = ParseUavHelper.ParseUavRoute(rows[i]);
                        if (uavRoute != null)
                        {
                            uavRoute.PILOT = string.Empty;
                            uavRoute.TERRA = string.Empty;
                            uavRoutes.Add(uavRoute);
                        }
                    }
                }

                if (uavRoutes.Count > 0)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(uavRoutes)));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "当前用户无航线任务路径！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 计算航线任务
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string ComputeMission()
        {
            #region 参数
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string hxmc = HttpContext.Current.Request.Form["uav-route-add-hxmc"];//航线名称
            string hxlx = HttpContext.Current.Request.Form["uav-route-add-hxlx"];//航线类型
            string gclx = HttpContext.Current.Request.Form["uav-route-add-gclx"];//高程类型
            string hxsd = HttpContext.Current.Request.Form["uav-route-add-hxsd"];//航线速度（包括初始速度）
            string bz = HttpContext.Current.Request.Form["uav-route-add-bz"];

            string drone = HttpContext.Current.Request.Form["uav-route-add-drone"];                 //无人机id
            string payloadtype = HttpContext.Current.Request.Form["uav-route-add-payloadtype"];     //挂载类型枚举值
            string payload = HttpContext.Current.Request.Form["uav-route-add-payload"];             //挂载id
            string photoratio = HttpContext.Current.Request.Form["uav-route-add-photoratio"];       //照片比例id

            string waypoint = HttpContext.Current.Request.Form["waypoint"];
            string pointcloud = HttpContext.Current.Request.Form["pointcloud"];                     //点云数据id
            #endregion

            string info = string.Empty;//消息
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                #region 无人机
                UavDrone uavDrone = ParseUavHelper.ParseUavDrone(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_drone WHERE id={0} AND ztm={1}", drone, (int)MODEL.Enum.State.InUse)));
                if (uavDrone == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "未找到无人机！", string.Empty));
                }

                UavCamera uavCamera = ParseUavHelper.ParseUavCamera(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_payload_camera WHERE id={0} AND ztm={1}", payload, (int)MODEL.Enum.State.InUse)));
                if (uavCamera == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "未找到相机！", string.Empty));
                }

                CameraPhotoRatio cameraPhotoRatio = null;
                if (!string.IsNullOrEmpty(photoratio))
                {
                    cameraPhotoRatio = ParseUavHelper.ParseCameraPhotoRatio(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_payload_photoratio WHERE id={0} AND ztm={1}", photoratio, (int)MODEL.Enum.State.InUse)));
                }
                else
                {
                    cameraPhotoRatio = new CameraPhotoRatio
                    {
                        Id = -1,
                        ZPBL = uavCamera.MRZPBL,
                        CGQHXXS = uavCamera.MRHXXS,
                        CGQZXXS = uavCamera.MRZXXS
                    };
                }
                #endregion

                #region 点云
                bool isHavePointCloud = false;//是否包含独立点云数据
                List<BlockExtent> blockExtents = null;//区块空间范围
                string pointcloudpath = string.Empty;//点云数据目录
                if (string.IsNullOrEmpty(pointcloud))
                {
                    isHavePointCloud = false;
                }
                else
                {
                    SurPointCloud surPointCloud = ParseMonitorHelper.ParseSurPointCloud(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM survey_pointcloud WHERE id={0} AND ztm={1}", pointcloud, (int)MODEL.Enum.State.InUse)));
                    if (surPointCloud == null)
                    {
                        isHavePointCloud = false;
                    }
                    //if (string.IsNullOrEmpty(ptsdir))
                    //{
                    //    isHavePointCloud = false;
                    //}

                    blockExtents = JsonHelper.ToObject<List<BlockExtent>>(surPointCloud.QKFW);
                    //pointcloudpath = ptsdir + surPointCloud.DYLJ;
                    //isHavePointCloud = true;
                }
                #endregion

                if (hxlx == ((int)MODEL.EnumUAV.RouteType.MBTXCJ).ToString())
                {
                    #region 目标图像采集（模型）
                    #region 图形及航点
                    if (string.IsNullOrEmpty(waypoint))
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无航点信息！", string.Empty));
                    }

                    //解析全部航点信息
                    List<WaypointInfo> waypointInfos = COM.JsonHelper.ToObject<List<WaypointInfo>>(waypoint);
                    if (waypointInfos == null || waypointInfos.Count < 1)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无航点信息！", string.Empty));
                    }

                    #region 当高度类型为相对高度模式时，若无设计起飞点则无法计算目标点对应航点航高
                    if ((gclx == ((int)EnumUAV.AltitudeMode.AGL).ToString()) && (waypointInfos[0].type != MODEL.EnumUAV.WaypointType.Takeoff.ToString().ToLower()))
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无法计算目标点相对航高！", string.Empty));
                    }
                    #endregion

                    List<xyz> line = new List<xyz>();//图形
                    List<CustomWaypoint> customWaypoints = new List<CustomWaypoint>();//自定义航点集

                    WaypointInfo takeoff = null;//起飞点
                    WaypointInfo langding = null;//降落点

                    for (int i = 0; i < waypointInfos.Count; i++)
                    {
                        #region 起飞点
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.Takeoff.ToString().ToLower())
                        {
                            takeoff = waypointInfos[i];

                            #region 图形
                            line.Add(waypointInfos[i].xyz);//地面起飞点
                            XYZ pointXYZ = COM.CoordConvert.BLH2XYZ(new BLH(waypointInfos[i].blh.b, waypointInfos[i].blh.l, waypointInfos[i].blh.h + waypointInfos[i].height), EnumCOM.Datum.CGCS2000, ref info);
                            if (!string.IsNullOrEmpty(info))
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                            }
                            xyz xyz = new xyz
                            {
                                x = pointXYZ.X,
                                y = pointXYZ.Y,
                                z = pointXYZ.Z
                            };
                            line.Add(xyz);//空中起飞点
                            #endregion

                            #region 第三方航点
                            CustomWaypoint customWaypoint = new CustomWaypoint
                            {
                                Index = customWaypoints.Count,
                                CaptureMode = EnumUAV.CaptureMode.NoShot,
                                Longitude = waypointInfos[i].blh.l,
                                Latitude = waypointInfos[i].blh.b,
                                Speed = waypointInfos[i].speed,
                                Pitch = 0,
                                Heading = 0
                            };
                            if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height, 3);//绝对高度
                            }
                            else
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].height, 3);//相对高度
                            }
                            customWaypoints.Add(customWaypoint);
                            #endregion
                        }
                        #endregion

                        #region 目标点
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.Target.ToString().ToLower())
                        {
                            /*
                             * 开始航点（开始任务、调整速度、姿态）
                             * 动作航点（执行动作）
                             * 结束航点（离开任务，与开始航点相同）
                             */

                            #region 图形
                            double pitch = 0;
                            //List<XYZ> pointXYZs = COM.Waypoint.GetWaypointGrounp(
                            //    blockExtents,
                            //    pointcloudpath,
                            //    new XYZ(waypointInfos[i].xyz.x, waypointInfos[i].xyz.y, waypointInfos[i].xyz.z),
                            //    new XYZ(waypointInfos[i].eye.x, waypointInfos[i].eye.y, waypointInfos[i].eye.z),
                            //    waypointInfos[i].adjust.photodistance,
                            //    waypointInfos[i].adjust.adjustdistance,
                            //    waypointInfos[i].extent,
                            //    ref pitch,
                            //    ref info);
                            List<XYZ> pointXYZs = null;
                            if (pointXYZs == null)
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                            }
                            for (int j = 0; j < pointXYZs.Count; j++)
                            {
                                xyz xyz = new xyz
                                {
                                    x = pointXYZs[j].X,
                                    y = pointXYZs[j].Y,
                                    z = pointXYZs[j].Z
                                };
                                line.Add(xyz);
                            }
                            #endregion

                            #region 第三方航点
                            for (int j = 0; j < pointXYZs.Count; j++)
                            {
                                BLH pointBLH = COM.CoordConvert.XYZ2BLH(pointXYZs[j], EnumCOM.Datum.CGCS2000, ref info);
                                if (!string.IsNullOrEmpty(info))
                                {
                                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                                }

                                if (j == 0)
                                {
                                    #region 开始航点
                                    CustomWaypoint customWaypoint = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = waypointInfos[i].adjust.adjustspeed,
                                        Pitch = 0,
                                        Heading = 0
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint);
                                    #endregion
                                }
                                else if (j == 1)
                                {
                                    #region 动作航点
                                    CustomWaypoint customWaypoint = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.WaypointHoveringShot,
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = waypointInfos[i].speed,
                                        Pitch = Math.Round(pitch, 2),
                                        Heading = 0
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    #region 动作
                                    if (waypointInfos[i].children != null && waypointInfos[i].children.Count > 0)
                                    {
                                        List<CustomAction> customActions = new List<CustomAction>();
                                        for (int k = 0; k < waypointInfos[i].children.Count; k++)
                                        {
                                            CustomAction customAction = new CustomAction();
                                            customAction.Index = k;
                                            if (waypointInfos[i].children[k].action == "hover")
                                            {
                                                customAction.WaypointAction = EnumUAV.WaypointActionType.Hover;
                                                customAction.HoverTime = waypointInfos[i].children[k].value;
                                            }
                                            else if (waypointInfos[i].children[k].action == "photo")
                                            {
                                                customAction.WaypointAction = EnumUAV.WaypointActionType.Capture;
                                            }
                                            else if (waypointInfos[i].children[k].action == "pitch")
                                            {
                                                customAction.WaypointAction = EnumUAV.WaypointActionType.Pitch;
                                                customAction.Pitch = waypointInfos[i].children[k].value;
                                            }
                                            else if (waypointInfos[i].children[k].action == "yaw")
                                            {
                                                customAction.WaypointAction = EnumUAV.WaypointActionType.Heading;
                                                customAction.Heading = waypointInfos[i].children[k].value;
                                            }
                                            customActions.Add(customAction);
                                        }
                                        customWaypoint.Actions = customActions;
                                    }
                                    #endregion
                                    customWaypoints.Add(customWaypoint);
                                    #endregion
                                }
                                else
                                {
                                    #region 结束航点
                                    CustomWaypoint customWaypoint = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = waypointInfos[i].speed,
                                        Pitch = 0,
                                        Heading = 0
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint);
                                    #endregion
                                }
                            }
                            #endregion
                        }
                        #endregion

                        #region 避障点
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.Avoid.ToString().ToLower())
                        {
                            #region 图形
                            XYZ pointXYZ = COM.CoordConvert.BLH2XYZ(new BLH(waypointInfos[i].blh.b, waypointInfos[i].blh.l, waypointInfos[i].blh.h + waypointInfos[i].height), EnumCOM.Datum.CGCS2000, ref info);
                            if (!string.IsNullOrEmpty(info))
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                            }
                            xyz xyz = new xyz
                            {
                                x = pointXYZ.X,
                                y = pointXYZ.Y,
                                z = pointXYZ.Z
                            };
                            line.Add(xyz);
                            #endregion

                            #region 第三方航点
                            CustomWaypoint customWaypoint = new CustomWaypoint
                            {
                                Index = customWaypoints.Count,
                                CaptureMode = EnumUAV.CaptureMode.NoShot,
                                Longitude = waypointInfos[i].blh.l,
                                Latitude = waypointInfos[i].blh.b,
                                Speed = waypointInfos[i].speed,
                                Pitch = 0,
                                Heading = 0
                            };
                            if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height, 3);//绝对高度
                            }
                            else
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                            }
                            customWaypoints.Add(customWaypoint);
                            #endregion
                        }
                        #endregion

                        #region 降落点
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.Landing.ToString().ToLower())
                        {
                            langding = waypointInfos[i];

                            #region 图形
                            XYZ pointXYZ = COM.CoordConvert.BLH2XYZ(new BLH(waypointInfos[i].blh.b, waypointInfos[i].blh.l, waypointInfos[i].blh.h + waypointInfos[i].height), EnumCOM.Datum.CGCS2000, ref info);
                            if (!string.IsNullOrEmpty(info))
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                            }
                            xyz xyz = new xyz
                            {
                                x = pointXYZ.X,
                                y = pointXYZ.Y,
                                z = pointXYZ.Z
                            };
                            line.Add(xyz);//空中降落点
                            line.Add(waypointInfos[i].xyz);//地面地面点
                            #endregion

                            #region 第三方航点
                            CustomWaypoint customWaypoint = new CustomWaypoint
                            {
                                Index = customWaypoints.Count,
                                CaptureMode = EnumUAV.CaptureMode.NoShot,
                                Longitude = waypointInfos[i].blh.l,
                                Latitude = waypointInfos[i].blh.b,
                                Speed = 0,
                                Pitch = 0,
                                Heading = 0
                            };
                            if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height, 3);//绝对高度
                            }
                            else
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                            }

                            customWaypoints.Add(customWaypoint);
                            #endregion
                        }
                        #endregion
                    }
                    #endregion

                    #region 计算航线信息及更新航点
                    double len = 0;//航线长度
                    double time = 0;//任务时间
                    int num = 0;//拍照数量
                    #region 上升段
                    if (takeoff != null)
                    {
                        len += takeoff.height;
                        if (uavDrone.ZDSSSD != null)
                        {
                            time += takeoff.height / Convert.ToDouble(uavDrone.ZDSSSD);
                        }
                        else
                        {
                            time += takeoff.height / 5;
                        }
                    }
                    #endregion

                    #region 任务段
                    for (int i = 0; i < customWaypoints.Count - 1; i++)
                    {
                        //更新偏航角
                        customWaypoints[i].Heading = Math.Round(COM.Waypoint.DJIHeadingFollowRoute(new BLH(customWaypoints[i].Latitude, customWaypoints[i].Longitude, customWaypoints[i].Altitude), new BLH(customWaypoints[i + 1].Latitude, customWaypoints[i + 1].Longitude, customWaypoints[i + 1].Altitude)), 2);

                        len += COM.Waypoint.Length3D(new BLH(customWaypoints[i].Latitude, customWaypoints[i].Longitude, customWaypoints[i].Altitude), new BLH(customWaypoints[i + 1].Latitude, customWaypoints[i + 1].Longitude, customWaypoints[i + 1].Altitude));
                        time += len / customWaypoints[i].Speed;
                        if (customWaypoints[i].Actions != null && customWaypoints[i].Actions.Count > 0)
                        {
                            for (int j = 0; j < customWaypoints[i].Actions.Count; j++)
                            {
                                if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Capture)
                                {
                                    num++;
                                }
                                else if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Hover)
                                {
                                    time += Convert.ToDouble(customWaypoints[i].Actions[j].HoverTime) / 1000;
                                }
                                else if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Pitch)
                                {
                                    time += 2;//预估
                                }
                                else if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Heading)
                                {
                                    time += 2;//预估
                                }
                            }
                        }
                    }
                    #endregion

                    #region 下降段
                    if (langding != null)
                    {
                        len += langding.height;
                        if (uavDrone.ZDXJSD != null)
                        {
                            time += langding.height / Convert.ToDouble(uavDrone.ZDXJSD);
                        }
                        else
                        {
                            time += langding.height / 3;
                        }
                    }
                    #endregion
                    #endregion

                    #region 第三方任务
                    #region 第三方航线
                    CustomWayline customWayline = new CustomWayline();
                    //相机
                    if (uavCamera.XJMC == "DJI Phantom 4 PRO camera")
                    {
                        customWayline.Camera = EnumUAV.Camera.P4P;
                    }
                    else if (uavCamera.XJMC == "DJI Phantom 4 RTK camera")
                    {
                        customWayline.Camera = EnumUAV.Camera.P4R;
                    }
                    //照片比例
                    if (cameraPhotoRatio.ZPBL == (int)MODEL.EnumUAV.PhotoRatio.ThreeTwo)
                    {
                        customWayline.PhotoRatio = EnumUAV.PhotoRatio.ThreeTwo;
                    }
                    else if (cameraPhotoRatio.ZPBL == (int)MODEL.EnumUAV.PhotoRatio.FourThree)
                    {
                        customWayline.PhotoRatio = EnumUAV.PhotoRatio.FourThree;
                    }
                    else if (cameraPhotoRatio.ZPBL == (int)MODEL.EnumUAV.PhotoRatio.SixteenNine)
                    {
                        customWayline.PhotoRatio = EnumUAV.PhotoRatio.SixteenNine;
                    }
                    //完成动作
                    if (takeoff == null && langding == null)
                    {
                        customWayline.CompletionAction = EnumUAV.CompletionAction.ReturntoHome;
                    }
                    else if (langding != null)
                    {
                        customWayline.CompletionAction = EnumUAV.CompletionAction.LandinPlace;
                    }
                    else
                    {
                        customWayline.CompletionAction = EnumUAV.CompletionAction.Hover;
                    }
                    //偏航角模式
                    customWayline.HeadingMode = EnumUAV.HeadingMode.FollowRoute;
                    customWayline.InitialSpeed = Convert.ToDouble(hxsd);
                    if (takeoff != null)
                    {
                        customWayline.Takeoff = new Takeoff(takeoff.blh.l, takeoff.blh.b, takeoff.blh.h);
                    }
                    customWayline.Waypoints = customWaypoints;
                    #endregion

                    #region 第三方任务
                    CustomMission customMission = new CustomMission();
                    customMission.Name = hxmc;
                    customMission.MissionType = EnumUAV.MissionType.Waypoint;
                    if (gclx == ((int)MODEL.EnumUAV.AltitudeMode.AMSL).ToString())
                    {
                        customMission.AltitudeMode = EnumUAV.AltitudeMode.AMSL;
                    }
                    else
                    {
                        customMission.AltitudeMode = EnumUAV.AltitudeMode.AGL;
                    }
                    customMission.Wayline = customWayline;
                    #endregion
                    #endregion

                    #region DJI Pilot KML & DJI Terra KML（只支持P4R和相对高度）
                    string djipilot_kml = string.Empty;
                    string djiterra_kml = string.Empty;
                    if (uavDrone.WRJJC == "P4R" && gclx == ((int)EnumUAV.AltitudeMode.AGL).ToString())
                    {
                        string djipilot_Folder = string.Empty;
                        string djiterra_Folder = string.Empty;
                        string LineString = string.Empty;

                        for (int i = 0; i < customWaypoints.Count; i++)
                        {
                            string coordinates = customWaypoints[i].Longitude + "," + customWaypoints[i].Latitude + "," + customWaypoints[i].Altitude;
                            LineString += coordinates + " ";

                            if (customWaypoints[i].Actions == null)
                            {
                                #region 非动作航点
                                djipilot_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>0</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>0.0</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{1}</mis:speed><mis:useWaylineHeadingMode>true</mis:useWaylineHeadingMode><mis:useWaylinePointType>true</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>Auto</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius></ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{2}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Speed, coordinates);
                                djiterra_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>0</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>0.0</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{1}</mis:speed><mis:useWaylineHeadingMode>true</mis:useWaylineHeadingMode><mis:useWaylinePointType>true</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>Auto</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius></ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{2}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Speed, coordinates);
                                #endregion
                            }
                            else
                            {
                                #region 非动作航点
                                string djipilot_actions = string.Empty;
                                string djiterra_actions = string.Empty;

                                for (int j = 0; j < customWaypoints[i].Actions.Count; j++)
                                {
                                    if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Hover)
                                    {
                                        djipilot_actions += string.Format("<mis:actions param=\"{0}\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">Hovering</mis:actions>", customWaypoints[i].Actions[j].HoverTime);
                                        djiterra_actions += string.Format("<mis:actions param=\"{0}\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">Hovering</mis:actions>", customWaypoints[i].Actions[j].HoverTime);
                                    }
                                    else if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Capture)
                                    {
                                        djipilot_actions += "<mis:actions param=\"0\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">ShootPhoto</mis:actions>";
                                        djiterra_actions += "<mis:actions param=\"0\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">ShootPhoto</mis:actions>";
                                    }
                                    else if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Heading)
                                    {
                                        djipilot_actions += string.Format("<mis:actions param=\"{0}\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">AircraftYaw</mis:actions>", customWaypoints[i].Actions[j].Heading);
                                        djiterra_actions += string.Format("<mis:actions param=\"{0}\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">AircraftYaw</mis:actions>", customWaypoints[i].Actions[j].Heading);
                                    }
                                    else if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Pitch)
                                    {
                                        djipilot_actions += string.Format("<mis:actions param=\"{0}\" accuracy=\"1\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">GimbalPitch</mis:actions>", customWaypoints[i].Actions[j].Pitch * 10);
                                        djiterra_actions += string.Format("<mis:actions param=\"{0}\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">GimbalPitch</mis:actions>", customWaypoints[i].Actions[j].Pitch);
                                    }
                                }

                                djipilot_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>0</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>{1}</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{2}</mis:speed><mis:useWaylineHeadingMode>true</mis:useWaylineHeadingMode><mis:useWaylinePointType>true</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>Auto</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius>{3}</ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{4}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Pitch, customWaypoints[i].Speed, djipilot_actions, coordinates);
                                djiterra_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>0</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>{1}</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{2}</mis:speed><mis:useWaylineHeadingMode>true</mis:useWaylineHeadingMode><mis:useWaylinePointType>true</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>Auto</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius>{3}</ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{4}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Pitch, customWaypoints[i].Speed, djiterra_actions, coordinates);
                                #endregion
                            }
                        }

                        djipilot_kml = string.Format("<?xml version=\"1.0\" encoding=\"UTF-8\"?><kml xmlns=\"http://www.opengis.net/kml/2.2\"><Document xmlns=\"\"><name>{0}</name><open>1</open><ExtendedData xmlns:mis=\"www.dji.com\"><mis:type>Waypoint</mis:type><mis:stationType>0</mis:stationType></ExtendedData><Style id=\"waylineGreenPoly\"><LineStyle><color>FF0AEE8B</color><width>6</width></LineStyle></Style><Style id=\"waypointStyle\"><IconStyle><Icon><href>https://cdnen.dji-flighthub.com/static/app/images/point.png</href></Icon></IconStyle></Style><Folder><name>Waypoints</name><description>Waypoints in the Mission.</description>{1}</Folder><Placemark><name>Wayline</name><description>Wayline</description><visibility>1</visibility><ExtendedData xmlns:mis=\"www.dji.com\"><mis:altitude>100</mis:altitude><mis:autoFlightSpeed>{2}</mis:autoFlightSpeed><mis:actionOnFinish>GoHome</mis:actionOnFinish><mis:headingMode>Auto</mis:headingMode><mis:gimbalPitchMode>UsePointSetting</mis:gimbalPitchMode><mis:powerSaveMode>false</mis:powerSaveMode><mis:waypointType>LineStop</mis:waypointType><mis:droneInfo><mis:droneType>P4R</mis:droneType><mis:droneCameras/><mis:droneHeight><mis:useAbsolute>false</mis:useAbsolute><mis:hasTakeoffHeight>false</mis:hasTakeoffHeight><mis:takeoffHeight>0.0</mis:takeoffHeight></mis:droneHeight></mis:droneInfo></ExtendedData><styleUrl>#waylineGreenPoly</styleUrl><LineString> <tessellate>1</tessellate><altitudeMode>relativeToGround</altitudeMode><coordinates>{3}</coordinates></LineString></Placemark></Document></kml>", hxmc, djipilot_Folder, hxsd, LineString.TrimEnd(' '));
                        djiterra_kml = string.Format("<?xml version=\"1.0\" encoding=\"UTF-8\"?><kml xmlns=\"http://www.opengis.net/kml/2.2\"><Document xmlns=\"\"><name>{0}</name><open>1</open><ExtendedData xmlns:mis=\"www.dji.com\"><mis:type>Waypoint</mis:type><mis:stationType>0</mis:stationType></ExtendedData><Style id=\"waylineGreenPoly\"><LineStyle><color>FF0AEE8B</color><width>6</width></LineStyle></Style><Style id=\"waypointStyle\"><IconStyle><Icon><href>https://cdnen.dji-flighthub.com/static/app/images/point.png</href></Icon></IconStyle></Style><Folder><name>Waypoints</name><description>Waypoints in the Mission.</description>{1}</Folder><Placemark><name>Wayline</name><description>Wayline</description><visibility>1</visibility><ExtendedData xmlns:mis=\"www.dji.com\"><mis:altitude>100</mis:altitude><mis:autoFlightSpeed>{2}</mis:autoFlightSpeed><mis:actionOnFinish>GoHome</mis:actionOnFinish><mis:headingMode>Auto</mis:headingMode><mis:gimbalPitchMode>UsePointSetting</mis:gimbalPitchMode><mis:powerSaveMode>false</mis:powerSaveMode><mis:waypointType>LineStop</mis:waypointType><mis:droneInfo><mis:droneType>P4R</mis:droneType><mis:droneCameras/><mis:droneHeight><mis:useAbsolute>false</mis:useAbsolute><mis:hasTakeoffHeight>false</mis:hasTakeoffHeight><mis:takeoffHeight>0.0</mis:takeoffHeight></mis:droneHeight></mis:droneInfo></ExtendedData><styleUrl>#waylineGreenPoly</styleUrl><LineString> <tessellate>1</tessellate><altitudeMode>relativeToGround</altitudeMode><coordinates>{3}</coordinates></LineString></Placemark></Document></kml>", hxmc, djiterra_Folder, hxsd, LineString.TrimEnd(' '));
                    }
                    #endregion

                    #region 计算任务结果
                    UavMission uavMission = new UavMission
                    {
                        RouteLength = Math.Round(len, 2),
                        FlyTime = Math.Round(time, 2),
                        WaypointCount = customWaypoints.Count,
                        PhotoCount = num,
                        Line = line,
                        Mission = JsonHelper.ToJson(customMission),
                        TerraKml = djiterra_kml,
                        PilotKml = djipilot_kml
                    };
                    #endregion

                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(uavMission)));
                    #endregion
                }
                else if (hxlx == ((int)MODEL.EnumUAV.RouteType.MBSYCL).ToString())
                {
                    #region TODO目标摄影测量（模型）

                    #endregion
                }
                else if (hxlx == ((int)MODEL.EnumUAV.RouteType.XPSYCL).ToString())
                {
                    #region 斜坡摄影测量（地形）
                    if (string.IsNullOrEmpty(waypoint))
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无航点信息！", string.Empty));
                    }

                    //解析全部航点信息
                    List<WaypointInfo> waypointInfos = COM.JsonHelper.ToObject<List<WaypointInfo>>(waypoint);
                    if (waypointInfos == null || waypointInfos.Count < 1)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无航点信息！", string.Empty));
                    }

                    #region 当高度类型为相对高度模式时，若无设计起飞点则无法计算目标点对应航点航高
                    if ((gclx == ((int)EnumUAV.AltitudeMode.AGL).ToString()) && (waypointInfos[0].type != MODEL.EnumUAV.WaypointType.Takeoff.ToString().ToLower()))
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无法计算目标航点相对航高！", string.Empty));
                    }
                    #endregion

                    List<xyz> line = new List<xyz>();//图形
                    List<CustomWaypoint> customWaypoints = new List<CustomWaypoint>();//自定义航点集

                    WaypointInfo takeoff = null;//起飞点
                    WaypointInfo langding = null;//降落点

                    for (int i = 0; i < waypointInfos.Count; i++)
                    {
                        #region 起飞点
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.Takeoff.ToString().ToLower())
                        {
                            takeoff = waypointInfos[i];

                            #region 图形
                            line.Add(waypointInfos[i].xyz);//地面起飞点
                            XYZ pointXYZ = COM.CoordConvert.BLH2XYZ(new BLH(waypointInfos[i].blh.b, waypointInfos[i].blh.l, waypointInfos[i].blh.h + waypointInfos[i].height), EnumCOM.Datum.CGCS2000, ref info);
                            if (!string.IsNullOrEmpty(info))
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                            }
                            line.Add(new xyz() { x = pointXYZ.X, y = pointXYZ.Y, z = pointXYZ.Z });//空中起飞点
                            #endregion

                            #region 第三方航点
                            CustomWaypoint customWaypoint = new CustomWaypoint
                            {
                                Index = customWaypoints.Count,
                                CaptureMode = EnumUAV.CaptureMode.NoShot,
                                Longitude = waypointInfos[i].blh.l,
                                Latitude = waypointInfos[i].blh.b,
                                Speed = waypointInfos[i].speed,
                                Pitch = 0,
                                Heading = 0
                            };
                            if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height, 3);//绝对高度
                            }
                            else
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].height, 3);//相对高度
                            }
                            customWaypoints.Add(customWaypoint);
                            #endregion
                        }
                        #endregion

                        #region 目标区域
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.TargetArea.ToString().ToLower())
                        {
                            #region 多边形边界点转平面直角坐标
                            List<XYZ> polygon_corners_xyz = new List<XYZ>();
                            List<xyh> polygon_corners_2d = new List<xyh>();
                            for (int j = 0; j < waypointInfos[i].polygon.Count; j++)
                            {
                                XYZ XYZ = new XYZ(waypointInfos[i].polygon[j].xyz.x, waypointInfos[i].polygon[j].xyz.y, waypointInfos[i].polygon[j].xyz.z);
                                polygon_corners_xyz.Add(XYZ);

                                BLH pointBLH = COM.CoordConvert.XYZ2BLH(XYZ, EnumCOM.Datum.CGCS2000, ref info);
                                if (!string.IsNullOrEmpty(info))
                                {
                                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                                }
                                xy pointxy = COM.CoordConvert.BL2xy(pointBLH, EnumCOM.Datum.CGCS2000, 3, 108, false, ref info);
                                if (!string.IsNullOrEmpty(info))
                                {
                                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                                }
                                xyh pointxyh = new xyh(pointxy.x, pointxy.y, pointBLH.H);
                                polygon_corners_2d.Add(pointxyh);
                            }
                            #endregion

                            #region 目标点云
                            List<Vector3d> pointclouds = new List<Vector3d>();
                            if (isHavePointCloud)
                            {
                                #region 筛选目标区块
                                List<string> blocks = new List<string>();
                                for (int j = 0; j < blockExtents.Count; j++)
                                {
                                    bool isIn = false;

                                    foreach (var point in polygon_corners_xyz)
                                    {
                                        if ((point.X > blockExtents[j].MinX) && (point.X < blockExtents[j].MaxX)
                                            && (point.Y > blockExtents[j].MinY) && (point.Y < blockExtents[j].MaxY)
                                            && (point.Z > blockExtents[j].MinZ) && (point.Z < blockExtents[j].MaxZ))
                                        {
                                            isIn = true;
                                        }
                                    }

                                    if (isIn)
                                    {
                                        if (File.Exists(pointcloudpath + blockExtents[j].BloockName))
                                        {
                                            blocks.Add(pointcloudpath + blockExtents[j].BloockName);
                                        }
                                    }
                                }
                                #endregion

                                #region 筛选目标点云
                                foreach (string block in blocks)
                                {
                                    using (StreamReader sr = new StreamReader(block))
                                    {
                                        string row = string.Empty;
                                        while ((row = sr.ReadLine()) != null)
                                        {
                                            if (row != "")
                                            {
                                                try
                                                {
                                                    string[] xyz = row.Split(new char[] { ' ' });
                                                    double X = Convert.ToDouble(xyz[0]);
                                                    double Y = Convert.ToDouble(xyz[1]);
                                                    double Z = Convert.ToDouble(xyz[2]);

                                                    BLH pointBLH = COM.CoordConvert.XYZ2BLH(new XYZ(X, Y, Z), EnumCOM.Datum.CGCS2000, ref info);
                                                    xy pointxy = COM.CoordConvert.BL2xy(pointBLH, EnumCOM.Datum.CGCS2000, 3, 108, false, ref info);
                                                    xyh pointxyh = new xyh(pointxy.x, pointxy.y, pointBLH.H);

                                                    if (COM.Waypoint.IsPointInPolygon(polygon_corners_2d, pointxyh))
                                                    {
                                                        pointclouds.Add(new Vector3d(X, Y, Z));
                                                    }
                                                }
                                                catch
                                                {
                                                }
                                            }
                                        }
                                    }
                                }
                                #endregion
                            }

                            foreach (var point in polygon_corners_xyz)
                            {
                                pointclouds.Add(new Vector3d(point.X, point.Y, point.Z));
                            }
                            #endregion

                            #region 统一视点
                            double sum_X = 0;
                            double sum_Y = 0;
                            double sum_Z = 0;
                            foreach (var corner in waypointInfos[i].polygon)
                            {
                                sum_X += corner.eye.x;
                                sum_Y += corner.eye.y;
                                sum_Z += corner.eye.z;
                            }
                            XYZ oneeye = new XYZ(sum_X / waypointInfos[i].polygon.Count, sum_Y / waypointInfos[i].polygon.Count, sum_Z / waypointInfos[i].polygon.Count);
                            #endregion

                            #region 拟合平面
                            OrthogonalPlaneFit3 plane3d = new OrthogonalPlaneFit3(pointclouds);//拟合平面

                            Vector3d normal = new Vector3d();//拟合平面法向量
                            Vector3d poieye = new Vector3d(oneeye.X - polygon_corners_xyz[0].X, oneeye.Y - polygon_corners_xyz[0].Y, oneeye.Z - polygon_corners_xyz[0].Z);
                            double cos = (plane3d.Normal.x * poieye.x + plane3d.Normal.y * poieye.y + plane3d.Normal.z * poieye.z) / ((Math.Abs(Math.Sqrt(plane3d.Normal.x * plane3d.Normal.x + plane3d.Normal.y * plane3d.Normal.y + plane3d.Normal.z * plane3d.Normal.z))) * (Math.Abs(Math.Sqrt(poieye.x * poieye.x + poieye.y * poieye.y + poieye.z * poieye.z))));//计算法向量与兴趣点视点向量夹角cos
                            if (cos > 0)
                            {
                                //锐角
                                normal.x = plane3d.Normal.x;
                                normal.y = plane3d.Normal.y;
                                normal.z = plane3d.Normal.z;
                            }
                            else
                            {
                                //钝角
                                normal.x = -plane3d.Normal.x;
                                normal.y = -plane3d.Normal.y;
                                normal.z = -plane3d.Normal.z;
                            }
                            Vector3d origin = new Vector3d(plane3d.Origin.x, plane3d.Origin.y, plane3d.Origin.z);//拟合平面原点
                            #endregion

                            #region 拟合平面与水平面夹角确定俯仰角
                            double pitch = 0; //默认为0，即水平
                            Vector3d level = new Vector3d(-0.2576610, 0.8363410, 0.4838850);//水平面法向量
                            double cos_ln = (normal.x * level.x + normal.y * level.y + normal.z * level.z) / ((Math.Abs(Math.Sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z))) * (Math.Abs(Math.Sqrt(level.x * level.x + level.y * level.y + level.z * level.z))));
                            if (cos_ln > 0)
                            {
                                pitch = -(90 - (Math.Acos(cos_ln) * 180 / Math.PI));//俯仰角为负，即向下偏转角度
                            }
                            else if (cos_ln == 0)
                            {
                                pitch = 0;
                            }
                            else
                            {
                                pitch = 0;//默认不向上偏转角度
                            }
                            #endregion

                            #region 将凸多边形边界点投射到拟合平面上
                            List<Vector3d> targetinplane = new List<Vector3d>();//位于拟合平面的对应点
                            for (int j = 0; j < polygon_corners_xyz.Count; j++)
                            {
                                Vector3d pointinplane = COM.Waypoint.PointClosedtoPlane(normal, origin, new Vector3d(polygon_corners_xyz[j].X, polygon_corners_xyz[j].Y, polygon_corners_xyz[j].Z));
                                targetinplane.Add(pointinplane);
                            }
                            #endregion

                            #region 获取最低点和最高点
                            XYZ lowestpoint = new XYZ();//最低点XYZ
                            XYZ highestpoint = new XYZ();//最高点XYZ
                            double minHeight = 0;//最低高度
                            double maxHeight = 0;//最高高度
                            for (int j = 0; j < targetinplane.Count; j++)
                            {
                                BLH pointBLH = COM.CoordConvert.XYZ2BLH(new XYZ(targetinplane[j].x, targetinplane[j].y, targetinplane[j].z), EnumCOM.Datum.CGCS2000, ref info);
                                if (j == 0)
                                {
                                    minHeight = pointBLH.H;
                                    maxHeight = pointBLH.H;
                                    lowestpoint.X = targetinplane[j].x;
                                    lowestpoint.Y = targetinplane[j].y;
                                    lowestpoint.Z = targetinplane[j].z;
                                    highestpoint.X = targetinplane[j].x;
                                    highestpoint.Y = targetinplane[j].y;
                                    highestpoint.Z = targetinplane[j].z;
                                }
                                else
                                {
                                    if (pointBLH.H < minHeight)
                                    {
                                        minHeight = pointBLH.H;
                                        lowestpoint.X = targetinplane[j].x;
                                        lowestpoint.Y = targetinplane[j].y;
                                        lowestpoint.Z = targetinplane[j].z;
                                    }
                                    if (pointBLH.H > maxHeight)
                                    {
                                        maxHeight = pointBLH.H;
                                        highestpoint.X = targetinplane[j].x;
                                        highestpoint.Y = targetinplane[j].y;
                                        highestpoint.Z = targetinplane[j].z;
                                    }
                                }
                            }

                            BLH temppoint = COM.CoordConvert.XYZ2BLH(new XYZ(2 * origin.x - lowestpoint.X, 2 * origin.y - lowestpoint.Y, 2 * origin.z - lowestpoint.Z), EnumCOM.Datum.CGCS2000, ref info);//最低点通过拟合平面原点的镜像点
                            temppoint.H = minHeight;
                            XYZ virtuapoint = COM.CoordConvert.BLH2XYZ(temppoint, EnumCOM.Datum.CGCS2000, ref info);
                            Vector3d virtuapointplane = COM.Waypoint.PointClosedtoPlane(normal, origin, new Vector3d(virtuapoint.X, virtuapoint.Y, virtuapoint.Z));//最低点的原点镜像点高度相同且位于拟合平面点
                            #endregion

                            #region 计算拟合平面到（拟合平面与过最低点水平面的交线）的距离
                            double angle = 90 + pitch;//根据计算的俯仰角换算
                            BLH origin_blh = COM.CoordConvert.XYZ2BLH(new XYZ(origin.x, origin.y, origin.z), EnumCOM.Datum.CGCS2000, ref info);
                            double heightdiff = origin_blh.H - minHeight;
                            double r = heightdiff / (Math.Sin((angle * Math.PI) / 180));
                            #endregion

                            #region 第一次空间转平面
                            Vector3d xAxis0 = new Vector3d(lowestpoint.X, lowestpoint.Y, lowestpoint.Z);//设置X正轴点XYZ
                            Vector3d yAxis0 = COM.Waypoint.GetYAxis(origin, xAxis0, normal);//设置Y正轴点XYZ

                            Vector2d lowestpoint_2d = new Vector2d(Math.Abs(Math.Sqrt((xAxis0.x - origin.x) * (xAxis0.x - origin.x) + (xAxis0.y - origin.y) * (xAxis0.y - origin.y) + (xAxis0.z - origin.z) * (xAxis0.z - origin.z))), 0);
                            Vector2d judgepoint_2d = COM.Waypoint.XYZ2xy(origin, xAxis0, yAxis0, new Vector3d(virtuapoint.X, virtuapoint.Y, virtuapoint.Z));

                            double a = lowestpoint_2d.x;
                            double x = r * r / a;
                            double y = 0;
                            double y1 = Math.Abs(Math.Sqrt((r * r * a * a - r * r * r * r) / (a * a)));
                            double y2 = -y1;
                            double d1 = (judgepoint_2d.x - x) * (judgepoint_2d.x - x) + (judgepoint_2d.y - y1) * (judgepoint_2d.y - y1);
                            double d2 = (judgepoint_2d.x - x) * (judgepoint_2d.x - x) + (judgepoint_2d.y - y2) * (judgepoint_2d.y - y2);

                            if (d1 < d2)
                            {
                                y = y1;
                            }
                            else
                            {
                                y = y2;
                            }

                            Vector3d customorigin = COM.Waypoint.xy2XYZ(origin, xAxis0, yAxis0, new Vector2d(x, y), normal);//与最低点在同一高度，与最低点连线和与拟合平面连线垂直
                            #endregion

                            #region 自定义平面坐标系
                            /*
                             * 与最低点与虚拟最低点连线垂直且床拟合平面原点为X轴
                             * 拟合平面原点所在半轴为X正半轴
                             * 
                             */
                            Vector3d xAxis = new Vector3d(origin.x, origin.y, origin.z);//设置自定义平面坐标系X正轴上点
                            Vector3d yAxis = COM.Waypoint.GetYAxis(customorigin, xAxis, normal);//设置自定义平面坐标系Y正轴上点

                            //上述求出来为负轴点，此处修正（未知原因）
                            if (waypointInfos[i].photogrammetry.dm)
                            {
                                yAxis.x = 2 * customorigin.x - yAxis.x;
                                yAxis.y = 2 * customorigin.y - yAxis.y;
                                yAxis.z = 2 * customorigin.z - yAxis.z;
                            }

                            //多边形角点转自定义平面二维坐标系
                            List<Vector2d> custom2d = new List<Vector2d>();
                            for (int j = 0; j < targetinplane.Count; j++)
                            {
                                custom2d.Add(COM.Waypoint.XYZ2xy(customorigin, xAxis, yAxis, targetinplane[j]));
                            }

                            double custom_x_min = 0;
                            double custom_x_max = 0;
                            double custom_y_min = 0;
                            double custom_y_max = 0;
                            for (int j = 0; j < custom2d.Count; j++)
                            {
                                if (j == 0)
                                {
                                    custom_x_min = custom2d[j].x;
                                    custom_x_max = custom2d[j].x;
                                    custom_y_min = custom2d[j].y;
                                    custom_y_max = custom2d[j].y;
                                }
                                else
                                {
                                    if (custom2d[j].x < custom_x_min)
                                    {
                                        custom_x_min = custom2d[j].x;
                                    }
                                    if (custom2d[j].x > custom_x_max)
                                    {
                                        custom_x_max = custom2d[j].x;
                                    }
                                    if (custom2d[j].y < custom_y_min)
                                    {
                                        custom_y_min = custom2d[j].y;
                                    }
                                    if (custom2d[j].y > custom_y_max)
                                    {
                                        custom_y_max = custom2d[j].y;
                                    }
                                }
                            }

                            Vector2d l_u = new Vector2d(custom_x_max, custom_y_max);//左上角
                            Vector2d l_d = new Vector2d(custom_x_min, custom_y_max);//左下角
                            Vector2d r_u = new Vector2d(custom_x_max, custom_y_min);//右上角
                            Vector2d r_d = new Vector2d(custom_x_min, custom_y_min);//右下角
                            #endregion

                            double flyH = uavCamera.HG * waypointInfos[i].photogrammetry.gsd;//航高
                            double areaH = Math.Abs(Math.Sqrt((l_u.x - l_d.x) * (l_u.x - l_d.x) + (l_u.y - l_d.y) * (l_u.y - l_d.y)));//拍摄区域高度
                            double gap = (1 - (waypointInfos[i].photogrammetry.so / 100)) * flyH * uavCamera.CGQGD / uavCamera.JJ;//航线间距
                            #region 拍照间隔和飞行速度
                            double photoInterval = uavCamera.ZXPZJG;//拍照间隔
                            double flySpeed = Convert.ToDouble(uavDrone.ZDSPFXSD);//飞行速度

                            double tempSpeed = ((1 - (waypointInfos[i].photogrammetry.fo) / 100) * flyH * uavCamera.CGQKD / uavCamera.JJ) / uavCamera.ZXPZJG;
                            if (tempSpeed >= flySpeed)
                            {
                                //飞行速度超过最大飞行速度
                                photoInterval = ((1 - (waypointInfos[i].photogrammetry.fo) / 100) * flyH * uavCamera.CGQKD / uavCamera.JJ) / flySpeed;
                            }
                            else
                            {
                                //飞行速度未超过最大飞行速度
                                flySpeed = tempSpeed;
                            }
                            #endregion
                            double rows = Convert.ToInt32(Math.Ceiling(areaH / gap));//航线数量


                            bool l2r = true;//航线从左到右开始
                            if (line.Count > 0)
                            {
                                l2r = COM.Waypoint.IsLeft2Right(new Vector3d(line[line.Count - 1].x, line[line.Count - 1].y, line[line.Count - 1].z),
                                    COM.Waypoint.xy2XYZ(customorigin, xAxis, yAxis, l_d, normal),
                                    COM.Waypoint.xy2XYZ(customorigin, xAxis, yAxis, r_d, normal));
                            }

                            List<Vector2d> target = new List<Vector2d>();
                            if (l2r)
                            {
                                target.Add(l_d);//左下角
                                target.Add(r_d);//右下角
                            }
                            else
                            {
                                target.Add(r_d);//右下角
                                target.Add(l_d);//左下角
                            }

                            for (int j = 1; j < rows; j++)
                            {
                                Vector2d left = COM.Waypoint.GetWaypoint(l_d, l_u, j * gap);
                                Vector2d right = COM.Waypoint.GetWaypoint(r_d, r_u, j * gap);

                                if (l2r)
                                {
                                    //由左至右
                                    if ((j % 2) == 0)
                                    {
                                        target.Add(left);
                                        target.Add(right);
                                    }
                                    else
                                    {
                                        target.Add(right);
                                        target.Add(left);
                                    }
                                }
                                else
                                {
                                    //由右至至
                                    if ((j % 2) == 0)
                                    {
                                        target.Add(right);
                                        target.Add(left);
                                    }
                                    else
                                    {
                                        target.Add(left);
                                        target.Add(right);
                                    }
                                }
                            }

                            #region 解决大疆两相邻航点距离不能小于0.5米（默认两航点在拟合平面上距离大于1米）
                            List<Vector2d> new_target = new List<Vector2d>();
                            new_target.Add(target[0]);
                            new_target.Add(target[1]);

                            for (int j = 2; j < target.Count - 1; j++)
                            {
                                new_target.Add(COM.Waypoint.GetNewTarget(target[j - 1], target[j], target[j + 1]));
                            }
                            new_target.Add(target[target.Count - 1]);
                            #endregion

                            #region 将自定义平面坐标转换为空间三维坐标并沿法向量平移
                            List<XYZ> vertexs = new List<XYZ>();
                            for (int j = 0; j < new_target.Count; j++)
                            {
                                Vector3d XYZ = COM.Waypoint.xy2XYZ(customorigin, xAxis, yAxis, new_target[j], normal);
                                vertexs.Add(COM.Waypoint.PanDisalongNormal(new XYZ(XYZ.x, XYZ.y, XYZ.z), normal, flyH));//沿拟合平面法向量平移指定距离
                            }
                            #endregion

                            double heading = COM.Waypoint.GetHeading(vertexs[0], vertexs[1]);//偏航角  
                            //heading = heading + 180;

                            for (int j = 0; j < vertexs.Count; j++)
                            {
                                BLH pointBLH = COM.CoordConvert.XYZ2BLH(vertexs[j], COM.EnumCOM.Datum.CGCS2000, ref info);

                                if ((waypointInfos[i].photogrammetry.ma) && (j == 0))
                                {
                                    //添加首航线多角度
                                    #region 第一个点
                                    CustomWaypoint customWaypoint1 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.TimedShot,
                                        Interval = Convert.ToInt16(Math.Floor(photoInterval)),//向下取整
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch - 10,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint1.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint1.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint1);
                                    line.Add(new xyz() { x = vertexs[j].X, y = vertexs[j].Y, z = vertexs[j].Z });
                                    #endregion

                                    #region 第二个点
                                    BLH nextpointBLH = COM.CoordConvert.XYZ2BLH(vertexs[j + 1], COM.EnumCOM.Datum.CGCS2000, ref info);
                                    CustomWaypoint customWaypoint2 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = nextpointBLH.L,
                                        Latitude = nextpointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch - 10,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint2.Altitude = Math.Round(nextpointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint2.Altitude = Math.Round(nextpointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint2);
                                    line.Add(new xyz() { x = vertexs[j + 1].X, y = vertexs[j + 1].Y, z = vertexs[j + 1].Z });
                                    #endregion

                                    #region 第三个点
                                    BLH cppBLH1 = COM.Waypoint.ChangePitchPoint(vertexs[j], vertexs[j + 1], oneeye);
                                    CustomWaypoint customWaypoint3 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = cppBLH1.L,
                                        Latitude = cppBLH1.B,
                                        Speed = flySpeed,
                                        Pitch = pitch - 5,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint3.Altitude = Math.Round(cppBLH1.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint3.Altitude = Math.Round(cppBLH1.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint3);

                                    XYZ cppXYZ1 = COM.CoordConvert.BLH2XYZ(cppBLH1, COM.EnumCOM.Datum.CGCS2000, ref info);
                                    line.Add(new xyz() { x = cppXYZ1.X, y = cppXYZ1.Y, z = cppXYZ1.Z });
                                    #endregion

                                    #region 第四个点
                                    CustomWaypoint customWaypoint4 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.TimedShot,
                                        Interval = Convert.ToInt16(Math.Floor(photoInterval)),//向下取整
                                        Longitude = nextpointBLH.L,
                                        Latitude = nextpointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch - 5,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint4.Altitude = Math.Round(nextpointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint4.Altitude = Math.Round(nextpointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint4);
                                    line.Add(new xyz() { x = vertexs[j + 1].X, y = vertexs[j + 1].Y, z = vertexs[j + 1].Z });
                                    #endregion

                                    #region 第五个点
                                    CustomWaypoint customWaypoint5 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch - 5,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint5.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint5.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint5);
                                    line.Add(new xyz() { x = vertexs[j].X, y = vertexs[j].Y, z = vertexs[j].Z });
                                    #endregion

                                    #region 第六个点
                                    BLH cppBLH2 = COM.Waypoint.ChangePitchPoint(vertexs[j + 1], vertexs[j], oneeye);
                                    CustomWaypoint customWaypoint6 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = cppBLH2.L,
                                        Latitude = cppBLH2.B,
                                        Speed = flySpeed,
                                        Pitch = pitch,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint6.Altitude = Math.Round(cppBLH2.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint6.Altitude = Math.Round(cppBLH2.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint6);

                                    XYZ cppXYZ2 = COM.CoordConvert.BLH2XYZ(cppBLH2, COM.EnumCOM.Datum.CGCS2000, ref info);
                                    line.Add(new xyz() { x = cppXYZ2.X, y = cppXYZ2.Y, z = cppXYZ2.Z });
                                    #endregion
                                }

                                if (j % 2 == 0)
                                {
                                    #region 平飞段，执行拍照
                                    CustomWaypoint customWaypoint = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.TimedShot,
                                        Interval = Convert.ToInt16(Math.Floor(photoInterval)),//向下取整
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint);
                                    #endregion
                                }
                                else
                                {
                                    #region 爬升段，不执行拍照
                                    CustomWaypoint customWaypoint = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint);
                                    #endregion
                                }
                                line.Add(new xyz() { x = vertexs[j].X, y = vertexs[j].Y, z = vertexs[j].Z });

                                if ((waypointInfos[i].photogrammetry.ma) && (j == (vertexs.Count - 1)))
                                {
                                    //添加末航线多角度
                                    #region 第一个点
                                    BLH cppBLH1 = COM.Waypoint.ChangePitchPoint(vertexs[j - 1], vertexs[j], oneeye);
                                    CustomWaypoint customWaypoint1 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = cppBLH1.L,
                                        Latitude = cppBLH1.B,
                                        Speed = flySpeed,
                                        Pitch = pitch + 5,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint1.Altitude = Math.Round(cppBLH1.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint1.Altitude = Math.Round(cppBLH1.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint1);

                                    XYZ cppXYZ1 = COM.CoordConvert.BLH2XYZ(cppBLH1, COM.EnumCOM.Datum.CGCS2000, ref info);
                                    line.Add(new xyz() { x = cppXYZ1.X, y = cppXYZ1.Y, z = cppXYZ1.Z });
                                    #endregion

                                    #region 第二个点
                                    CustomWaypoint customWaypoint2 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.TimedShot,
                                        Interval = Convert.ToInt16(Math.Floor(photoInterval)),//向下取整
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch + 5,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint2.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint2.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint2);
                                    line.Add(new xyz() { x = vertexs[j].X, y = vertexs[j].Y, z = vertexs[j].Z });
                                    #endregion

                                    #region 第三个点
                                    BLH prepointBLH = COM.CoordConvert.XYZ2BLH(vertexs[j - 1], COM.EnumCOM.Datum.CGCS2000, ref info);
                                    CustomWaypoint customWaypoint3 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = prepointBLH.L,
                                        Latitude = prepointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch + 5,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint3.Altitude = Math.Round(prepointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint3.Altitude = Math.Round(prepointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint3);
                                    line.Add(new xyz() { x = vertexs[j - 1].X, y = vertexs[j - 1].Y, z = vertexs[j - 1].Z });
                                    #endregion

                                    #region 第四个点
                                    BLH cppBLH2 = COM.Waypoint.ChangePitchPoint(vertexs[j], vertexs[j - 1], oneeye);
                                    CustomWaypoint customWaypoint4 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = cppBLH2.L,
                                        Latitude = cppBLH2.B,
                                        Speed = flySpeed,
                                        Pitch = pitch + 10,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint4.Altitude = Math.Round(cppBLH2.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint4.Altitude = Math.Round(cppBLH2.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint4);

                                    XYZ cppXYZ2 = COM.CoordConvert.BLH2XYZ(cppBLH2, COM.EnumCOM.Datum.CGCS2000, ref info);
                                    line.Add(new xyz() { x = cppXYZ2.X, y = cppXYZ2.Y, z = cppXYZ2.Z });

                                    #endregion

                                    #region 第五个点
                                    CustomWaypoint customWaypoint5 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.TimedShot,
                                        Interval = Convert.ToInt16(Math.Floor(photoInterval)),//向下取整
                                        Longitude = prepointBLH.L,
                                        Latitude = prepointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch + 10,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint5.Altitude = Math.Round(prepointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint5.Altitude = Math.Round(prepointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint5);
                                    line.Add(new xyz() { x = vertexs[j - 1].X, y = vertexs[j - 1].Y, z = vertexs[j - 1].Z });

                                    #endregion

                                    #region 第六个点
                                    CustomWaypoint customWaypoint6 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch + 10,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint6.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint6.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint6);
                                    line.Add(new xyz() { x = vertexs[j].X, y = vertexs[j].Y, z = vertexs[j].Z });
                                    #endregion
                                }
                            }
                        }
                        #endregion

                        #region 避障点
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.Avoid.ToString().ToLower())
                        {
                            #region 图形
                            XYZ pointXYZ = COM.CoordConvert.BLH2XYZ(new BLH(waypointInfos[i].blh.b, waypointInfos[i].blh.l, waypointInfos[i].blh.h + waypointInfos[i].height), EnumCOM.Datum.CGCS2000, ref info);
                            if (!string.IsNullOrEmpty(info))
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                            }
                            line.Add(new xyz() { x = pointXYZ.X, y = pointXYZ.Y, z = pointXYZ.Z });
                            #endregion

                            #region 第三方航点
                            CustomWaypoint customWaypoint = new CustomWaypoint
                            {
                                Index = customWaypoints.Count,
                                CaptureMode = EnumUAV.CaptureMode.NoShot,
                                Longitude = waypointInfos[i].blh.l,
                                Latitude = waypointInfos[i].blh.b,
                                Speed = waypointInfos[i].speed,
                                Pitch = 0,
                                Heading = 0
                            };
                            if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height, 3);//绝对高度
                            }
                            else
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                            }
                            customWaypoints.Add(customWaypoint);
                            #endregion
                        }
                        #endregion

                        #region 降落点
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.Landing.ToString().ToLower())
                        {
                            langding = waypointInfos[i];

                            #region 图形
                            XYZ pointXYZ = COM.CoordConvert.BLH2XYZ(new BLH(waypointInfos[i].blh.b, waypointInfos[i].blh.l, waypointInfos[i].blh.h + waypointInfos[i].height), EnumCOM.Datum.CGCS2000, ref info);
                            if (!string.IsNullOrEmpty(info))
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                            }
                            line.Add(new xyz() { x = pointXYZ.X, y = pointXYZ.Y, z = pointXYZ.Z });//空中降落点
                            line.Add(waypointInfos[i].xyz);//地面降落点
                            #endregion

                            #region 第三方航点
                            CustomWaypoint customWaypoint = new CustomWaypoint
                            {
                                Index = customWaypoints.Count,
                                CaptureMode = EnumUAV.CaptureMode.NoShot,
                                Longitude = waypointInfos[i].blh.l,
                                Latitude = waypointInfos[i].blh.b,
                                Speed = 0,
                                Pitch = 0,
                                Heading = 0
                            };
                            if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height, 3);//绝对高度
                            }
                            else
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                            }

                            customWaypoints.Add(customWaypoint);
                            #endregion
                        }
                        #endregion
                    }

                    #region 计算航线信息及更新航点
                    double len = 0;//航线长度
                    double time = 0;//任务时间
                    int num = 0;//拍照数量
                    #region 上升段
                    if (takeoff != null)
                    {
                        len += takeoff.height;
                        if (uavDrone.ZDSSSD != null)
                        {
                            time += takeoff.height / Convert.ToDouble(uavDrone.ZDSSSD);
                        }
                        else
                        {
                            time += takeoff.height / 5;
                        }
                    }
                    #endregion

                    #region 任务段
                    for (int i = 0; i < customWaypoints.Count - 1; i++)
                    {
                        //更新部分偏航角
                        if (customWaypoints[i].Heading == 0)
                        {
                            customWaypoints[i].Heading = Math.Round(COM.Waypoint.DJIHeadingFollowRoute(new BLH(customWaypoints[i].Latitude, customWaypoints[i].Longitude, customWaypoints[i].Altitude), new BLH(customWaypoints[i + 1].Latitude, customWaypoints[i + 1].Longitude, customWaypoints[i + 1].Altitude)), 2);
                        }

                        len += COM.Waypoint.Length3D(new BLH(customWaypoints[i].Latitude, customWaypoints[i].Longitude, customWaypoints[i].Altitude), new BLH(customWaypoints[i + 1].Latitude, customWaypoints[i + 1].Longitude, customWaypoints[i + 1].Altitude));
                        time += len / customWaypoints[i].Speed;
                    }
                    #endregion

                    #region 下降段
                    if (langding != null)
                    {
                        len += langding.height;
                        if (uavDrone.ZDXJSD != null)
                        {
                            time += langding.height / Convert.ToDouble(uavDrone.ZDXJSD);
                        }
                        else
                        {
                            time += langding.height / 3;
                        }
                    }
                    #endregion
                    #endregion

                    #region 第三方任务
                    #region 第三方航线
                    CustomWayline customWayline = new CustomWayline();
                    //相机
                    if (uavCamera.XJMC == "DJI Phantom 4 PRO camera")
                    {
                        customWayline.Camera = EnumUAV.Camera.P4P;
                    }
                    else if (uavCamera.XJMC == "DJI Phantom 4 RTK camera")
                    {
                        customWayline.Camera = EnumUAV.Camera.P4R;
                    }
                    //照片比例
                    if (cameraPhotoRatio.ZPBL == (int)MODEL.EnumUAV.PhotoRatio.ThreeTwo)
                    {
                        customWayline.PhotoRatio = EnumUAV.PhotoRatio.ThreeTwo;
                    }
                    else if (cameraPhotoRatio.ZPBL == (int)MODEL.EnumUAV.PhotoRatio.FourThree)
                    {
                        customWayline.PhotoRatio = EnumUAV.PhotoRatio.FourThree;
                    }
                    else if (cameraPhotoRatio.ZPBL == (int)MODEL.EnumUAV.PhotoRatio.SixteenNine)
                    {
                        customWayline.PhotoRatio = EnumUAV.PhotoRatio.SixteenNine;
                    }
                    //完成动作
                    if (takeoff == null && langding == null)
                    {
                        customWayline.CompletionAction = EnumUAV.CompletionAction.ReturntoHome;
                    }
                    else if (langding != null)
                    {
                        customWayline.CompletionAction = EnumUAV.CompletionAction.LandinPlace;
                    }
                    else
                    {
                        customWayline.CompletionAction = EnumUAV.CompletionAction.Hover;
                    }
                    //偏航角模式
                    customWayline.HeadingMode = EnumUAV.HeadingMode.FollowRoute;
                    customWayline.InitialSpeed = Convert.ToDouble(hxsd);
                    if (takeoff != null)
                    {
                        customWayline.Takeoff = new Takeoff(takeoff.blh.l, takeoff.blh.b, takeoff.blh.h);
                    }
                    customWayline.Waypoints = customWaypoints;
                    #endregion

                    #region 第三方任务
                    CustomMission customMission = new CustomMission();
                    customMission.Name = hxmc;
                    customMission.MissionType = EnumUAV.MissionType.Waypoint;
                    if (gclx == ((int)MODEL.EnumUAV.AltitudeMode.AMSL).ToString())
                    {
                        customMission.AltitudeMode = EnumUAV.AltitudeMode.AMSL;
                    }
                    else
                    {
                        customMission.AltitudeMode = EnumUAV.AltitudeMode.AGL;
                    }
                    customMission.Wayline = customWayline;
                    #endregion
                    #endregion

                    #region DJI Pilot KML & DJI Terra KML（只支持P4R和相对高度）
                    string djipilot_kml = string.Empty;
                    string djiterra_kml = string.Empty;
                    if (uavDrone.WRJJC == "P4R" && gclx == ((int)EnumUAV.AltitudeMode.AGL).ToString())
                    {
                        string djipilot_Folder = string.Empty;
                        string djiterra_Folder = string.Empty;
                        string LineString = string.Empty;

                        for (int i = 0; i < customWaypoints.Count; i++)
                        {
                            string coordinates = customWaypoints[i].Longitude + "," + customWaypoints[i].Latitude + "," + customWaypoints[i].Altitude;
                            LineString += coordinates + " ";

                            if (customWaypoints[i].Actions == null)
                            {
                                #region 非动作航点
                                djipilot_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>{1}</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>{2}</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{3}</mis:speed><mis:useWaylineHeadingMode>false</mis:useWaylineHeadingMode><mis:useWaylinePointType>false</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>UsePointSetting</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius></ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{4}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Heading, customWaypoints[i].Pitch, customWaypoints[i].Speed, coordinates);
                                djiterra_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>{1}</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>{2}</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{3}</mis:speed><mis:useWaylineHeadingMode>false</mis:useWaylineHeadingMode><mis:useWaylinePointType>false</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>UsePointSetting</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius></ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{4}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Heading, customWaypoints[i].Pitch, customWaypoints[i].Speed, coordinates);
                                #endregion
                            }
                        }

                        djipilot_kml = string.Format("<?xml version=\"1.0\" encoding=\"UTF-8\"?><kml xmlns=\"http://www.opengis.net/kml/2.2\"><Document xmlns=\"\"><name>{0}</name><open>1</open><ExtendedData xmlns:mis=\"www.dji.com\"><mis:type>Waypoint</mis:type><mis:stationType>0</mis:stationType></ExtendedData><Style id=\"waylineGreenPoly\"><LineStyle><color>FF0AEE8B</color><width>6</width></LineStyle></Style><Style id=\"waypointStyle\"><IconStyle><Icon><href>https://cdnen.dji-flighthub.com/static/app/images/point.png</href></Icon></IconStyle></Style><Folder><name>Waypoints</name><description>Waypoints in the Mission.</description>{1}</Folder><Placemark><name>Wayline</name><description>Wayline</description><visibility>1</visibility><ExtendedData xmlns:mis=\"www.dji.com\"><mis:altitude>100</mis:altitude><mis:autoFlightSpeed>{2}</mis:autoFlightSpeed><mis:actionOnFinish>GoHome</mis:actionOnFinish><mis:headingMode>UsePointSetting</mis:headingMode><mis:gimbalPitchMode>UsePointSetting</mis:gimbalPitchMode><mis:powerSaveMode>false</mis:powerSaveMode><mis:waypointType>LineStop</mis:waypointType><mis:droneInfo><mis:droneType>P4R</mis:droneType><mis:droneCameras/><mis:droneHeight><mis:useAbsolute>false</mis:useAbsolute><mis:hasTakeoffHeight>false</mis:hasTakeoffHeight><mis:takeoffHeight>0.0</mis:takeoffHeight></mis:droneHeight></mis:droneInfo></ExtendedData><styleUrl>#waylineGreenPoly</styleUrl><LineString><tessellate>1</tessellate><altitudeMode>relativeToGround</altitudeMode><coordinates>{3}</coordinates></LineString></Placemark></Document></kml>", hxmc, djipilot_Folder, hxsd, LineString.TrimEnd(' '));
                        djiterra_kml = string.Format("<?xml version=\"1.0\" encoding=\"UTF-8\"?><kml xmlns=\"http://www.opengis.net/kml/2.2\"><Document xmlns=\"\"><name>{0}</name><open>1</open><ExtendedData xmlns:mis=\"www.dji.com\"><mis:type>Waypoint</mis:type><mis:stationType>0</mis:stationType></ExtendedData><Style id=\"waylineGreenPoly\"><LineStyle><color>FF0AEE8B</color><width>6</width></LineStyle></Style><Style id=\"waypointStyle\"><IconStyle><Icon><href>https://cdnen.dji-flighthub.com/static/app/images/point.png</href></Icon></IconStyle></Style><Folder><name>Waypoints</name><description>Waypoints in the Mission.</description>{1}</Folder><Placemark><name>Wayline</name><description>Wayline</description><visibility>1</visibility><ExtendedData xmlns:mis=\"www.dji.com\"><mis:altitude>100</mis:altitude><mis:autoFlightSpeed>{2}</mis:autoFlightSpeed><mis:actionOnFinish>GoHome</mis:actionOnFinish><mis:headingMode>UsePointSetting</mis:headingMode><mis:gimbalPitchMode>UsePointSetting</mis:gimbalPitchMode><mis:powerSaveMode>false</mis:powerSaveMode><mis:waypointType>LineStop</mis:waypointType><mis:droneInfo><mis:droneType>P4R</mis:droneType><mis:droneCameras/><mis:droneHeight><mis:useAbsolute>false</mis:useAbsolute><mis:hasTakeoffHeight>false</mis:hasTakeoffHeight><mis:takeoffHeight>0.0</mis:takeoffHeight></mis:droneHeight></mis:droneInfo></ExtendedData><styleUrl>#waylineGreenPoly</styleUrl><LineString><tessellate>1</tessellate><altitudeMode>relativeToGround</altitudeMode><coordinates>{3}</coordinates></LineString></Placemark></Document></kml>", hxmc, djiterra_Folder, hxsd, LineString.TrimEnd(' '));
                    }
                    else if (uavDrone.WRJJC == "M300R" && gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                    {
                        string djipilot_Folder = string.Empty;
                        string LineString = string.Empty;

                        for (int i = 0; i < customWaypoints.Count; i++)
                        {
                            string coordinates = customWaypoints[i].Longitude + "," + customWaypoints[i].Latitude + "," + customWaypoints[i].Altitude;
                            LineString += coordinates + " ";

                            if (i == 0)
                            {
                                djipilot_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>{1}</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>{2}</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{3}</mis:speed><mis:useWaylineHeadingMode>false</mis:useWaylineHeadingMode><mis:useWaylinePointType>false</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>UsePointSetting</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius></ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{4}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Heading, customWaypoints[i].Pitch, customWaypoints[i].Speed, coordinates);
                            }
                            else
                            {
                                if (i % 2 == 0)
                                {
                                    djipilot_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>{1}</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>{2}</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{3}</mis:speed><mis:useWaylineHeadingMode>false</mis:useWaylineHeadingMode><mis:useWaylinePointType>false</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>UsePointSetting</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius><mis:actions param=\"0\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">StopIntervalShot</mis:actions></ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{4}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Heading, customWaypoints[i].Pitch, customWaypoints[i].Speed, coordinates);
                                }
                                else
                                {
                                    djipilot_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>{1}</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>{2}</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{3}</mis:speed><mis:useWaylineHeadingMode>false</mis:useWaylineHeadingMode><mis:useWaylinePointType>false</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>UsePointSetting</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius><mis:actions param=\"{4}\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">TimeIntervalShot</mis:actions></ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{5}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Heading, customWaypoints[i].Pitch, customWaypoints[i].Speed, customWaypoints[i].Interval, coordinates);
                                }
                            }
                        }

                        djipilot_kml = string.Format("<?xml version=\"1.0\" encoding=\"UTF-8\"?><kml xmlns=\"http://www.opengis.net/kml/2.2\"><Document xmlns=\"\"><name>{0}</name><open>1</open><ExtendedData xmlns:mis=\"www.dji.com\"><mis:type>Waypoint</mis:type><mis:stationType>0</mis:stationType></ExtendedData><Style id=\"waylineGreenPoly\"><LineStyle><color>FF0AEE8B</color><width>6</width></LineStyle></Style><Style id=\"waypointStyle\"><IconStyle><Icon><href>https://cdnen.dji-flighthub.com/static/app/images/point.png</href></Icon></IconStyle></Style><Folder><name>Waypoints</name><description>Waypoints in the Mission.</description>{1}</Folder><Placemark><name>Wayline</name><description>Wayline</description><visibility>1</visibility><ExtendedData xmlns:mis=\"www.dji.com\"><mis:altitude>1000</mis:altitude><mis:autoFlightSpeed>15.0</mis:autoFlightSpeed><mis:actionOnFinish>GoHome</mis:actionOnFinish><mis:headingMode>Auto</mis:headingMode><mis:gimbalPitchMode>UsePointSetting</mis:gimbalPitchMode><mis:powerSaveMode>false</mis:powerSaveMode><mis:waypointType>LineStop</mis:waypointType><mis:droneInfo><mis:droneType>PM430</mis:droneType><mis:droneCameras><mis:camera><mis:cameraIndex>0</mis:cameraIndex><mis:cameraName>Zenmuse P1</mis:cameraName><mis:cameraType>31</mis:cameraType><mis:payloadCameraType>2</mis:payloadCameraType><mis:payloadCameraConfigInfo><mis:dewarping>false</mis:dewarping><mis:meteringMode>0</mis:meteringMode><mis:lidarEchoMode>0</mis:lidarEchoMode><mis:lidarSampleRateMode>0</mis:lidarSampleRateMode><mis:lidarScanMode>1</mis:lidarScanMode><mis:LidarNeedVariegationMode>false</mis:LidarNeedVariegationMode></mis:payloadCameraConfigInfo></mis:camera></mis:droneCameras><mis:droneHeight><mis:useAbsolute>true</mis:useAbsolute><mis:hasTakeoffHeight>false</mis:hasTakeoffHeight><mis:takeoffHeight>0.0</mis:takeoffHeight></mis:droneHeight></mis:droneInfo></ExtendedData><styleUrl>#waylineGreenPoly</styleUrl><LineString><tessellate>1</tessellate><altitudeMode>relativeToGround</altitudeMode><coordinates>{2}</coordinates></LineString></Placemark></Document></kml>", hxmc, djipilot_Folder, LineString.TrimEnd(' '));
                    }
                    #endregion

                    #region 计算任务结果
                    UavMission uavMission = new UavMission
                    {
                        RouteLength = Math.Round(len, 2),
                        FlyTime = Math.Round(time, 2),
                        WaypointCount = customWaypoints.Count,
                        PhotoCount = num,
                        Line = line,
                        Mission = JsonHelper.ToJson(customMission),
                        TerraKml = djiterra_kml,
                        PilotKml = djipilot_kml
                    };
                    #endregion

                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(uavMission)));
                    #endregion
                }
                else if (hxlx == ((int)MODEL.EnumUAV.RouteType.XPSYCLM).ToString())
                {
                    #region 斜坡摄影测量（模型）
                    if (string.IsNullOrEmpty(waypoint)) { return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无航点信息！", string.Empty)); }

                    //解析全部航点信息
                    List<WaypointInfo> waypointInfos = COM.JsonHelper.ToObject<List<WaypointInfo>>(waypoint);
                    if (waypointInfos == null || waypointInfos.Count < 1) { return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无航点信息！", string.Empty)); }

                    #region 当高度类型为相对高度模式时，若无设计起飞点则无法计算目标点对应航点航高
                    if ((gclx == ((int)EnumUAV.AltitudeMode.AGL).ToString()) && (waypointInfos[0].type != MODEL.EnumUAV.WaypointType.Takeoff.ToString().ToLower())) { return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无法计算目标航点相对航高！", string.Empty)); }
                    #endregion

                    List<xyz> line = new List<xyz>();//图形
                    List<CustomWaypoint> customWaypoints = new List<CustomWaypoint>();//自定义航点集

                    WaypointInfo takeoff = null;//起飞点
                    WaypointInfo langding = null;//降落点

                    for (int i = 0; i < waypointInfos.Count; i++)
                    {
                        #region 起飞点
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.Takeoff.ToString().ToLower())
                        {
                            takeoff = waypointInfos[i];

                            #region 图形
                            line.Add(waypointInfos[i].xyz);//地面起飞点
                            XYZ pointXYZ = COM.CoordConvert.BLH2XYZ(new BLH(waypointInfos[i].blh.b, waypointInfos[i].blh.l, waypointInfos[i].blh.h + waypointInfos[i].height), EnumCOM.Datum.CGCS2000, ref info);
                            if (!string.IsNullOrEmpty(info)) { return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty)); }
                            line.Add(new xyz() { x = pointXYZ.X, y = pointXYZ.Y, z = pointXYZ.Z });//空中起飞点
                            #endregion

                            #region 第三方航点
                            CustomWaypoint customWaypoint = new CustomWaypoint
                            {
                                Index = customWaypoints.Count,
                                CaptureMode = EnumUAV.CaptureMode.NoShot,
                                Longitude = waypointInfos[i].blh.l,
                                Latitude = waypointInfos[i].blh.b,
                                Speed = waypointInfos[i].speed,
                                Pitch = 0,
                                Heading = 0
                            };
                            if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + takeoff.height, 3);//绝对高度
                            }
                            else
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].height, 3);//相对高度
                            }
                            customWaypoints.Add(customWaypoint);
                            #endregion
                        }
                        #endregion

                        #region 目标区域
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.TargetArea.ToString().ToLower())
                        {
                            #region 多边形边界点转平面直角坐标
                            List<XYZ> polygon_corners_xyz = new List<XYZ>();
                            List<xyh> polygon_corners_2d = new List<xyh>();
                            for (int j = 0; j < waypointInfos[i].polygon.Count; j++)
                            {
                                XYZ XYZ = new XYZ(waypointInfos[i].polygon[j].xyz.x, waypointInfos[i].polygon[j].xyz.y, waypointInfos[i].polygon[j].xyz.z);
                                polygon_corners_xyz.Add(XYZ);

                                BLH pointBLH = COM.CoordConvert.XYZ2BLH(XYZ, EnumCOM.Datum.CGCS2000, ref info);
                                if (!string.IsNullOrEmpty(info))
                                {
                                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                                }
                                xy pointxy = COM.CoordConvert.BL2xy(pointBLH, EnumCOM.Datum.CGCS2000, 3, 108, false, ref info);
                                if (!string.IsNullOrEmpty(info))
                                {
                                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                                }
                                xyh pointxyh = new xyh(pointxy.x, pointxy.y, pointBLH.H);
                                polygon_corners_2d.Add(pointxyh);
                            }
                            #endregion

                            //////////////////////////////////////////////////////
                            //string conrner_string = string.Empty;
                            //for (int j = 0; j < polygon_corners_xyz.Count; j++)
                            //{
                            //    conrner_string += polygon_corners_xyz[j].X + " " + polygon_corners_xyz[j].Y + " " + polygon_corners_xyz[j].Z + "\n";
                            //}
                            //////////////////////////////////////////////////////

                            #region 目标点云
                            List<Vector3d> pointclouds = new List<Vector3d>();
                            if (isHavePointCloud)
                            {
                                #region 筛选目标区块
                                List<string> blocks = new List<string>();
                                for (int j = 0; j < blockExtents.Count; j++)
                                {
                                    bool isIn = false;

                                    foreach (var point in polygon_corners_xyz)
                                    {
                                        if ((point.X > blockExtents[j].MinX) && (point.X < blockExtents[j].MaxX)
                                            && (point.Y > blockExtents[j].MinY) && (point.Y < blockExtents[j].MaxY)
                                            && (point.Z > blockExtents[j].MinZ) && (point.Z < blockExtents[j].MaxZ))
                                        {
                                            isIn = true;
                                        }
                                    }

                                    if (isIn)
                                    {
                                        if (File.Exists(pointcloudpath + blockExtents[j].BloockName))
                                        {
                                            blocks.Add(pointcloudpath + blockExtents[j].BloockName);
                                        }
                                    }
                                }
                                #endregion

                                #region 筛选目标点云
                                foreach (string block in blocks)
                                {
                                    using (StreamReader sr = new StreamReader(block))
                                    {
                                        string row = string.Empty;
                                        while ((row = sr.ReadLine()) != null)
                                        {
                                            if (row != "")
                                            {
                                                try
                                                {
                                                    string[] xyz = row.Split(new char[] { ' ' });
                                                    double X = Convert.ToDouble(xyz[0]);
                                                    double Y = Convert.ToDouble(xyz[1]);
                                                    double Z = Convert.ToDouble(xyz[2]);

                                                    BLH pointBLH = COM.CoordConvert.XYZ2BLH(new XYZ(X, Y, Z), EnumCOM.Datum.CGCS2000, ref info);
                                                    xy pointxy = COM.CoordConvert.BL2xy(pointBLH, EnumCOM.Datum.CGCS2000, 3, 108, false, ref info);
                                                    xyh pointxyh = new xyh(pointxy.x, pointxy.y, pointBLH.H);

                                                    if (COM.Waypoint.IsPointInPolygon(polygon_corners_2d, pointxyh))
                                                    {
                                                        pointclouds.Add(new Vector3d(X, Y, Z));
                                                    }
                                                }
                                                catch
                                                {
                                                }
                                            }
                                        }
                                    }
                                }
                                #endregion
                            }

                            foreach (var point in polygon_corners_xyz)
                            {
                                pointclouds.Add(new Vector3d(point.X, point.Y, point.Z));
                            }
                            #endregion

                            #region 统一视点
                            double sum_X = 0;
                            double sum_Y = 0;
                            double sum_Z = 0;
                            foreach (var corner in waypointInfos[i].polygon)
                            {
                                sum_X += corner.eye.x;
                                sum_Y += corner.eye.y;
                                sum_Z += corner.eye.z;
                            }
                            XYZ oneeye = new XYZ(sum_X / waypointInfos[i].polygon.Count, sum_Y / waypointInfos[i].polygon.Count, sum_Z / waypointInfos[i].polygon.Count);
                            #endregion

                            #region 拟合平面
                            OrthogonalPlaneFit3 plane3d = new OrthogonalPlaneFit3(pointclouds);//拟合平面

                            //////////////////////////////////////////////////////
                            //string pointclouds_string = string.Empty;
                            //for (int j = 0; j < pointclouds.Count; j++)
                            //{
                            //    pointclouds_string += pointclouds[j].x + " " + pointclouds[j].y + " " + pointclouds[j].z + "\n";
                            //}
                            //////////////////////////////////////////////////////

                            Vector3d normal = new Vector3d();//拟合平面法向量
                            Vector3d poieye = new Vector3d(oneeye.X - polygon_corners_xyz[0].X, oneeye.Y - polygon_corners_xyz[0].Y, oneeye.Z - polygon_corners_xyz[0].Z);
                            double cos = (plane3d.Normal.x * poieye.x + plane3d.Normal.y * poieye.y + plane3d.Normal.z * poieye.z) / ((Math.Abs(Math.Sqrt(plane3d.Normal.x * plane3d.Normal.x + plane3d.Normal.y * plane3d.Normal.y + plane3d.Normal.z * plane3d.Normal.z))) * (Math.Abs(Math.Sqrt(poieye.x * poieye.x + poieye.y * poieye.y + poieye.z * poieye.z))));//计算法向量与兴趣点视点向量夹角cos
                            if (cos > 0)
                            {
                                //锐角
                                normal.x = plane3d.Normal.x;
                                normal.y = plane3d.Normal.y;
                                normal.z = plane3d.Normal.z;
                            }
                            else
                            {
                                //钝角
                                normal.x = -plane3d.Normal.x;
                                normal.y = -plane3d.Normal.y;
                                normal.z = -plane3d.Normal.z;
                            }
                            Vector3d origin = new Vector3d(plane3d.Origin.x, plane3d.Origin.y, plane3d.Origin.z);//拟合平面原点
                            #endregion

                            #region 拟合平面与水平面夹角确定俯仰角
                            double pitch = 0; //默认为0，即水平
                            Vector3d level = new Vector3d(-0.2576610, 0.8363410, 0.4838850);//水平面法向量
                            double cos_ln = (normal.x * level.x + normal.y * level.y + normal.z * level.z) / ((Math.Abs(Math.Sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z))) * (Math.Abs(Math.Sqrt(level.x * level.x + level.y * level.y + level.z * level.z))));
                            if (cos_ln > 0)
                            {
                                pitch = -(90 - (Math.Acos(cos_ln) * 180 / Math.PI));//俯仰角为负，即向下偏转角度
                            }
                            else if (cos_ln == 0)
                            {
                                pitch = 0;
                            }
                            else
                            {
                                pitch = 0;//默认不向上偏转角度
                            }
                            #endregion

                            #region 将凸多边形边界点投射到拟合平面上
                            List<Vector3d> targetinplane = new List<Vector3d>();//位于拟合平面的对应点
                            for (int j = 0; j < polygon_corners_xyz.Count; j++)
                            {
                                Vector3d pointinplane = COM.Waypoint.PointClosedtoPlane(normal, origin, new Vector3d(polygon_corners_xyz[j].X, polygon_corners_xyz[j].Y, polygon_corners_xyz[j].Z));
                                targetinplane.Add(pointinplane);
                            }

                            ////////////////////////////////////////////////////
                            //string targetinplane_string = string.Empty;
                            //for (int j = 0; j < targetinplane.Count; j++)
                            //{
                            //    targetinplane_string += targetinplane[j].x + " " + targetinplane[j].y + " " + targetinplane[j].z + "\n";
                            //}
                            ////////////////////////////////////////////////////
                            #endregion

                            #region 获取最低点和最高点
                            XYZ lowestpoint = new XYZ();//最低点XYZ
                            XYZ highestpoint = new XYZ();//最高点XYZ
                            double minHeight = 0;//最低高度
                            double maxHeight = 0;//最高高度
                            for (int j = 0; j < targetinplane.Count; j++)
                            {
                                BLH pointBLH = COM.CoordConvert.XYZ2BLH(new XYZ(targetinplane[j].x, targetinplane[j].y, targetinplane[j].z), EnumCOM.Datum.CGCS2000, ref info);
                                if (j == 0)
                                {
                                    minHeight = pointBLH.H;
                                    maxHeight = pointBLH.H;
                                    lowestpoint.X = targetinplane[j].x;
                                    lowestpoint.Y = targetinplane[j].y;
                                    lowestpoint.Z = targetinplane[j].z;
                                    highestpoint.X = targetinplane[j].x;
                                    highestpoint.Y = targetinplane[j].y;
                                    highestpoint.Z = targetinplane[j].z;
                                }
                                else
                                {
                                    if (pointBLH.H < minHeight)
                                    {
                                        minHeight = pointBLH.H;
                                        lowestpoint.X = targetinplane[j].x;
                                        lowestpoint.Y = targetinplane[j].y;
                                        lowestpoint.Z = targetinplane[j].z;
                                    }
                                    if (pointBLH.H > maxHeight)
                                    {
                                        maxHeight = pointBLH.H;
                                        highestpoint.X = targetinplane[j].x;
                                        highestpoint.Y = targetinplane[j].y;
                                        highestpoint.Z = targetinplane[j].z;
                                    }
                                }
                            }

                            BLH temppoint = COM.CoordConvert.XYZ2BLH(new XYZ(2 * origin.x - lowestpoint.X, 2 * origin.y - lowestpoint.Y, 2 * origin.z - lowestpoint.Z), EnumCOM.Datum.CGCS2000, ref info);//最低点通过拟合平面原点的镜像点
                            temppoint.H = minHeight;
                            XYZ virtuapoint = COM.CoordConvert.BLH2XYZ(temppoint, EnumCOM.Datum.CGCS2000, ref info);
                            Vector3d virtuapointplane = COM.Waypoint.PointClosedtoPlane(normal, origin, new Vector3d(virtuapoint.X, virtuapoint.Y, virtuapoint.Z));//最低点的原点镜像点高度相同且位于拟合平面点
                            #endregion

                            #region 计算拟合平面到（拟合平面与过最低点水平面的交线）的距离
                            double angle = 90 + pitch;//根据计算的俯仰角换算
                            BLH origin_blh = COM.CoordConvert.XYZ2BLH(new XYZ(origin.x, origin.y, origin.z), EnumCOM.Datum.CGCS2000, ref info);
                            double heightdiff = origin_blh.H - minHeight;
                            double r = heightdiff / (Math.Sin((angle * Math.PI) / 180));
                            #endregion

                            #region 第一次空间转平面
                            Vector3d xAxis0 = new Vector3d(lowestpoint.X, lowestpoint.Y, lowestpoint.Z);//设置X正轴点XYZ
                            Vector3d yAxis0 = COM.Waypoint.GetYAxis(origin, xAxis0, normal);//设置Y正轴点XYZ

                            Vector2d lowestpoint_2d = new Vector2d(Math.Abs(Math.Sqrt((xAxis0.x - origin.x) * (xAxis0.x - origin.x) + (xAxis0.y - origin.y) * (xAxis0.y - origin.y) + (xAxis0.z - origin.z) * (xAxis0.z - origin.z))), 0);
                            Vector2d judgepoint_2d = COM.Waypoint.XYZ2xy(origin, xAxis0, yAxis0, new Vector3d(virtuapoint.X, virtuapoint.Y, virtuapoint.Z));

                            double a = lowestpoint_2d.x;
                            double x = r * r / a;
                            double y = 0;
                            double y1 = Math.Abs(Math.Sqrt((r * r * a * a - r * r * r * r) / (a * a)));
                            double y2 = -y1;
                            double d1 = (judgepoint_2d.x - x) * (judgepoint_2d.x - x) + (judgepoint_2d.y - y1) * (judgepoint_2d.y - y1);
                            double d2 = (judgepoint_2d.x - x) * (judgepoint_2d.x - x) + (judgepoint_2d.y - y2) * (judgepoint_2d.y - y2);

                            if (d1 < d2)
                            {
                                y = y1;
                            }
                            else
                            {
                                y = y2;
                            }

                            Vector3d customorigin = COM.Waypoint.xy2XYZ(origin, xAxis0, yAxis0, new Vector2d(x, y), normal);//与最低点在同一高度，与最低点连线和与拟合平面连线垂直
                            #endregion

                            #region 自定义平面坐标系
                            /*
                             * 与最低点与虚拟最低点连线垂直且床拟合平面原点为X轴
                             * 拟合平面原点所在半轴为X正半轴
                             * 
                             */
                            Vector3d xAxis = new Vector3d(origin.x, origin.y, origin.z);//设置自定义平面坐标系X正轴上点
                            Vector3d yAxis = COM.Waypoint.GetYAxis(customorigin, xAxis, normal);//设置自定义平面坐标系Y正轴上点

                            //上述求出来为负轴点，此处修正（未知原因）
                            if (waypointInfos[i].photogrammetry.dm)
                            {
                                yAxis.x = 2 * customorigin.x - yAxis.x;
                                yAxis.y = 2 * customorigin.y - yAxis.y;
                                yAxis.z = 2 * customorigin.z - yAxis.z;
                            }

                            //多边形角点转自定义平面二维坐标系
                            List<Vector2d> custom2d = new List<Vector2d>();
                            for (int j = 0; j < targetinplane.Count; j++)
                            {
                                custom2d.Add(COM.Waypoint.XYZ2xy(customorigin, xAxis, yAxis, targetinplane[j]));
                            }

                            //////////////////////////////////////////////////////////////
                            //string custom2d_string = string.Empty;
                            //for (int j = 0; j < custom2d.Count; j++)
                            //{
                            //    custom2d_string += custom2d[j].x + " " + custom2d[j].y + "\n";
                            //}
                            //////////////////////////////////////////////////////////////

                            double custom_x_min = 0;
                            double custom_x_max = 0;
                            double custom_y_min = 0;
                            double custom_y_max = 0;
                            for (int j = 0; j < custom2d.Count; j++)
                            {
                                if (j == 0)
                                {
                                    custom_x_min = custom2d[j].x;
                                    custom_x_max = custom2d[j].x;
                                    custom_y_min = custom2d[j].y;
                                    custom_y_max = custom2d[j].y;
                                }
                                else
                                {
                                    if (custom2d[j].x < custom_x_min)
                                    {
                                        custom_x_min = custom2d[j].x;
                                    }
                                    if (custom2d[j].x > custom_x_max)
                                    {
                                        custom_x_max = custom2d[j].x;
                                    }
                                    if (custom2d[j].y < custom_y_min)
                                    {
                                        custom_y_min = custom2d[j].y;
                                    }
                                    if (custom2d[j].y > custom_y_max)
                                    {
                                        custom_y_max = custom2d[j].y;
                                    }
                                }
                            }

                            Vector2d l_u = new Vector2d(custom_x_max, custom_y_max);//左上角
                            Vector2d l_d = new Vector2d(custom_x_min, custom_y_max);//左下角
                            Vector2d r_u = new Vector2d(custom_x_max, custom_y_min);//右上角
                            Vector2d r_d = new Vector2d(custom_x_min, custom_y_min);//右下角

                            //string custom2d_minmax_string = l_u.x + " " + l_u.y + "\n" + l_d.x + " " + l_d.y + "\n" + r_u.x + " " + r_u.y + "\n" + r_d.x + " " + r_d.y + "\n";

                            #endregion

                            double flyH = uavCamera.HG * waypointInfos[i].photogrammetry.gsd;//航高
                            double areaH = Math.Abs(Math.Sqrt((l_u.x - l_d.x) * (l_u.x - l_d.x) + (l_u.y - l_d.y) * (l_u.y - l_d.y)));//拍摄区域高度
                            double gap = (1 - (waypointInfos[i].photogrammetry.so / 100)) * flyH * uavCamera.CGQGD / uavCamera.JJ;//航线间距
                            #region 拍照间隔和飞行速度
                            double photoInterval = uavCamera.ZXPZJG;//拍照间隔
                            //double flySpeed = Convert.ToDouble(uavDrone.ZDSPFXSD);//飞行速度
                            double flySpeed = 8;//飞行速度

                            double tempSpeed = ((1 - (waypointInfos[i].photogrammetry.fo) / 100) * flyH * uavCamera.CGQKD / uavCamera.JJ) / photoInterval;


                            if (tempSpeed >= flySpeed)
                            {
                                //飞行速度超过最大飞行速度
                                photoInterval = ((1 - (waypointInfos[i].photogrammetry.fo) / 100) * flyH * uavCamera.CGQKD / uavCamera.JJ) / flySpeed;
                            }
                            else
                            {
                                //飞行速度未超过最大飞行速度
                                flySpeed = tempSpeed;
                            }

                            #endregion
                            double rows = Convert.ToInt32(Math.Ceiling(areaH / gap));

                            bool l2r = true;//航线从左到右开始
                            if (line.Count > 0)
                            {
                                l2r = COM.Waypoint.IsLeft2Right(new Vector3d(line[line.Count - 1].x, line[line.Count - 1].y, line[line.Count - 1].z),
                                    COM.Waypoint.xy2XYZ(customorigin, xAxis, yAxis, l_d, normal),
                                    COM.Waypoint.xy2XYZ(customorigin, xAxis, yAxis, r_d, normal));
                            }

                            List<Vector2d> target = new List<Vector2d>();
                            if (l2r)
                            {
                                target.Add(l_d);//左下角
                                target.Add(r_d);//右下角
                            }
                            else
                            {
                                target.Add(r_d);//右下角
                                target.Add(l_d);//左下角
                            }

                            for (int j = 1; j < rows; j++)
                            {
                                Vector2d left = COM.Waypoint.GetWaypoint(l_d, l_u, j * gap);
                                Vector2d right = COM.Waypoint.GetWaypoint(r_d, r_u, j * gap);

                                if (l2r)
                                {
                                    //由左至右
                                    if ((j % 2) == 0)
                                    {
                                        target.Add(left);
                                        target.Add(right);
                                    }
                                    else
                                    {
                                        target.Add(right);
                                        target.Add(left);
                                    }
                                }
                                else
                                {
                                    //由右至至
                                    if ((j % 2) == 0)
                                    {
                                        target.Add(right);
                                        target.Add(left);
                                    }
                                    else
                                    {
                                        target.Add(left);
                                        target.Add(right);
                                    }
                                }
                            }

                            #region 解决大疆两相邻航点距离不能小于0.5米（默认两航点在拟合平面上距离大于1米）
                            List<Vector2d> new_target = new List<Vector2d>();
                            new_target.Add(target[0]);
                            new_target.Add(target[1]);

                            for (int j = 2; j < target.Count - 1; j++)
                            {
                                new_target.Add(COM.Waypoint.GetNewTarget(target[j - 1], target[j], target[j + 1]));
                            }
                            new_target.Add(target[target.Count - 1]);
                            #endregion

                            #region 将自定义平面坐标转换为空间三维坐标并沿法向量平移
                            List<XYZ> vertexs = new List<XYZ>();
                            for (int j = 0; j < new_target.Count; j++)
                            {
                                Vector3d XYZ = COM.Waypoint.xy2XYZ(customorigin, xAxis, yAxis, new_target[j], normal);
                                vertexs.Add(COM.Waypoint.PanDisalongNormal(new XYZ(XYZ.x, XYZ.y, XYZ.z), normal, flyH));//沿拟合平面法向量平移指定距离
                            }
                            #endregion

                            double heading = COM.Waypoint.GetHeading(vertexs[0], vertexs[1]);//偏航角  

                            for (int j = 0; j < vertexs.Count; j++)
                            {
                                BLH pointBLH = COM.CoordConvert.XYZ2BLH(vertexs[j], COM.EnumCOM.Datum.CGCS2000, ref info);

                                if ((waypointInfos[i].photogrammetry.ma) && (j == 0))
                                {
                                    //添加首航线多角度
                                    #region 第一个点
                                    CustomWaypoint customWaypoint1 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.TimedShot,
                                        Interval = Convert.ToInt16(Math.Floor(photoInterval)),//向下取整
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch - 10,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint1.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint1.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint1);
                                    line.Add(new xyz() { x = vertexs[j].X, y = vertexs[j].Y, z = vertexs[j].Z });
                                    #endregion

                                    #region 第二个点
                                    BLH nextpointBLH = COM.CoordConvert.XYZ2BLH(vertexs[j + 1], COM.EnumCOM.Datum.CGCS2000, ref info);
                                    CustomWaypoint customWaypoint2 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = nextpointBLH.L,
                                        Latitude = nextpointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch - 10,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint2.Altitude = Math.Round(nextpointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint2.Altitude = Math.Round(nextpointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint2);
                                    line.Add(new xyz() { x = vertexs[j + 1].X, y = vertexs[j + 1].Y, z = vertexs[j + 1].Z });
                                    #endregion

                                    #region 第三个点
                                    BLH cppBLH1 = COM.Waypoint.ChangePitchPoint(vertexs[j], vertexs[j + 1], oneeye);
                                    CustomWaypoint customWaypoint3 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = cppBLH1.L,
                                        Latitude = cppBLH1.B,
                                        Speed = flySpeed,
                                        Pitch = pitch - 5,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint3.Altitude = Math.Round(cppBLH1.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint3.Altitude = Math.Round(cppBLH1.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint3);

                                    XYZ cppXYZ1 = COM.CoordConvert.BLH2XYZ(cppBLH1, COM.EnumCOM.Datum.CGCS2000, ref info);
                                    line.Add(new xyz() { x = cppXYZ1.X, y = cppXYZ1.Y, z = cppXYZ1.Z });
                                    #endregion

                                    #region 第四个点
                                    CustomWaypoint customWaypoint4 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.TimedShot,
                                        Interval = Convert.ToInt16(Math.Floor(photoInterval)),//向下取整
                                        Longitude = nextpointBLH.L,
                                        Latitude = nextpointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch - 5,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint4.Altitude = Math.Round(nextpointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint4.Altitude = Math.Round(nextpointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint4);
                                    line.Add(new xyz() { x = vertexs[j + 1].X, y = vertexs[j + 1].Y, z = vertexs[j + 1].Z });
                                    #endregion

                                    #region 第五个点
                                    CustomWaypoint customWaypoint5 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch - 5,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint5.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint5.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint5);
                                    line.Add(new xyz() { x = vertexs[j].X, y = vertexs[j].Y, z = vertexs[j].Z });
                                    #endregion

                                    #region 第六个点
                                    BLH cppBLH2 = COM.Waypoint.ChangePitchPoint(vertexs[j + 1], vertexs[j], oneeye);
                                    CustomWaypoint customWaypoint6 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = cppBLH2.L,
                                        Latitude = cppBLH2.B,
                                        Speed = flySpeed,
                                        Pitch = pitch,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint6.Altitude = Math.Round(cppBLH2.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint6.Altitude = Math.Round(cppBLH2.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint6);

                                    XYZ cppXYZ2 = COM.CoordConvert.BLH2XYZ(cppBLH2, COM.EnumCOM.Datum.CGCS2000, ref info);
                                    line.Add(new xyz() { x = cppXYZ2.X, y = cppXYZ2.Y, z = cppXYZ2.Z });
                                    #endregion
                                }

                                if (j % 2 == 0)
                                {
                                    #region 平飞段，执行拍照
                                    CustomWaypoint customWaypoint = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.TimedShot,
                                        Interval = Convert.ToInt16(Math.Floor(photoInterval)),//向下取整
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint);
                                    #endregion
                                }
                                else
                                {
                                    #region 爬升段，不执行拍照
                                    CustomWaypoint customWaypoint = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint);
                                    #endregion
                                }
                                line.Add(new xyz() { x = vertexs[j].X, y = vertexs[j].Y, z = vertexs[j].Z });

                                if ((waypointInfos[i].photogrammetry.ma) && (j == (vertexs.Count - 1)))
                                {
                                    //添加末航线多角度
                                    #region 第一个点
                                    BLH cppBLH1 = COM.Waypoint.ChangePitchPoint(vertexs[j - 1], vertexs[j], oneeye);
                                    CustomWaypoint customWaypoint1 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = cppBLH1.L,
                                        Latitude = cppBLH1.B,
                                        Speed = flySpeed,
                                        Pitch = pitch + 5,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint1.Altitude = Math.Round(cppBLH1.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint1.Altitude = Math.Round(cppBLH1.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint1);

                                    XYZ cppXYZ1 = COM.CoordConvert.BLH2XYZ(cppBLH1, COM.EnumCOM.Datum.CGCS2000, ref info);
                                    line.Add(new xyz() { x = cppXYZ1.X, y = cppXYZ1.Y, z = cppXYZ1.Z });
                                    #endregion

                                    #region 第二个点
                                    CustomWaypoint customWaypoint2 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.TimedShot,
                                        Interval = Convert.ToInt16(Math.Floor(photoInterval)),//向下取整
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch + 5,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint2.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint2.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint2);
                                    line.Add(new xyz() { x = vertexs[j].X, y = vertexs[j].Y, z = vertexs[j].Z });
                                    #endregion

                                    #region 第三个点
                                    BLH prepointBLH = COM.CoordConvert.XYZ2BLH(vertexs[j - 1], COM.EnumCOM.Datum.CGCS2000, ref info);
                                    CustomWaypoint customWaypoint3 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = prepointBLH.L,
                                        Latitude = prepointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch + 5,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint3.Altitude = Math.Round(prepointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint3.Altitude = Math.Round(prepointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint3);
                                    line.Add(new xyz() { x = vertexs[j - 1].X, y = vertexs[j - 1].Y, z = vertexs[j - 1].Z });
                                    #endregion

                                    #region 第四个点
                                    BLH cppBLH2 = COM.Waypoint.ChangePitchPoint(vertexs[j], vertexs[j - 1], oneeye);
                                    CustomWaypoint customWaypoint4 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = cppBLH2.L,
                                        Latitude = cppBLH2.B,
                                        Speed = flySpeed,
                                        Pitch = pitch + 10,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint4.Altitude = Math.Round(cppBLH2.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint4.Altitude = Math.Round(cppBLH2.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint4);

                                    XYZ cppXYZ2 = COM.CoordConvert.BLH2XYZ(cppBLH2, COM.EnumCOM.Datum.CGCS2000, ref info);
                                    line.Add(new xyz() { x = cppXYZ2.X, y = cppXYZ2.Y, z = cppXYZ2.Z });

                                    #endregion

                                    #region 第五个点
                                    CustomWaypoint customWaypoint5 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.TimedShot,
                                        Interval = Convert.ToInt16(Math.Floor(photoInterval)),//向下取整
                                        Longitude = prepointBLH.L,
                                        Latitude = prepointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch + 10,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint5.Altitude = Math.Round(prepointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint5.Altitude = Math.Round(prepointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint5);
                                    line.Add(new xyz() { x = vertexs[j - 1].X, y = vertexs[j - 1].Y, z = vertexs[j - 1].Z });

                                    #endregion

                                    #region 第六个点
                                    CustomWaypoint customWaypoint6 = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = flySpeed,
                                        Pitch = pitch + 10,
                                        Heading = Convert.ToInt16(Math.Round(heading))
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint6.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint6.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint6);
                                    line.Add(new xyz() { x = vertexs[j].X, y = vertexs[j].Y, z = vertexs[j].Z });
                                    #endregion
                                }
                            }
                        }
                        #endregion

                        #region 避障点
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.Avoid.ToString().ToLower())
                        {
                            #region 图形
                            XYZ pointXYZ = COM.CoordConvert.BLH2XYZ(new BLH(waypointInfos[i].blh.b, waypointInfos[i].blh.l, waypointInfos[i].blh.h + waypointInfos[i].height), EnumCOM.Datum.CGCS2000, ref info);
                            if (!string.IsNullOrEmpty(info))
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                            }
                            line.Add(new xyz() { x = pointXYZ.X, y = pointXYZ.Y, z = pointXYZ.Z });
                            #endregion

                            #region 第三方航点
                            CustomWaypoint customWaypoint = new CustomWaypoint
                            {
                                Index = customWaypoints.Count,
                                CaptureMode = EnumUAV.CaptureMode.NoShot,
                                Longitude = waypointInfos[i].blh.l,
                                Latitude = waypointInfos[i].blh.b,
                                Speed = waypointInfos[i].speed,
                                Pitch = 0,
                                Heading = 0
                            };
                            if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height, 3);//绝对高度
                            }
                            else
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                            }
                            customWaypoints.Add(customWaypoint);
                            #endregion
                        }
                        #endregion

                        #region 降落点
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.Landing.ToString().ToLower())
                        {
                            langding = waypointInfos[i];

                            #region 图形
                            XYZ pointXYZ = COM.CoordConvert.BLH2XYZ(new BLH(waypointInfos[i].blh.b, waypointInfos[i].blh.l, waypointInfos[i].blh.h + waypointInfos[i].height), EnumCOM.Datum.CGCS2000, ref info);
                            if (!string.IsNullOrEmpty(info))
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                            }
                            line.Add(new xyz() { x = pointXYZ.X, y = pointXYZ.Y, z = pointXYZ.Z });//空中降落点
                            line.Add(waypointInfos[i].xyz);//地面降落点
                            #endregion

                            #region 第三方航点
                            CustomWaypoint customWaypoint = new CustomWaypoint
                            {
                                Index = customWaypoints.Count,
                                CaptureMode = EnumUAV.CaptureMode.NoShot,
                                Longitude = waypointInfos[i].blh.l,
                                Latitude = waypointInfos[i].blh.b,
                                Speed = 0,
                                Pitch = 0,
                                Heading = 0
                            };
                            if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height, 3);//绝对高度
                            }
                            else
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                            }

                            customWaypoints.Add(customWaypoint);
                            #endregion
                        }
                        #endregion
                    }

                    #region 计算航线信息及更新航点
                    double len = 0;//航线长度
                    double time = 0;//任务时间
                    int num = 0;//拍照数量
                    #region 上升段
                    if (takeoff != null)
                    {
                        len += takeoff.height;
                        if (uavDrone.ZDSSSD != null)
                        {
                            time += takeoff.height / Convert.ToDouble(uavDrone.ZDSSSD);
                        }
                        else
                        {
                            time += takeoff.height / 5;
                        }
                    }
                    #endregion

                    #region 任务段
                    for (int i = 0; i < customWaypoints.Count - 1; i++)
                    {
                        //更新部分偏航角
                        if (customWaypoints[i].Heading == 0)
                        {
                            customWaypoints[i].Heading = Math.Round(COM.Waypoint.DJIHeadingFollowRoute(new BLH(customWaypoints[i].Latitude, customWaypoints[i].Longitude, customWaypoints[i].Altitude), new BLH(customWaypoints[i + 1].Latitude, customWaypoints[i + 1].Longitude, customWaypoints[i + 1].Altitude)), 2);
                        }

                        if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                        {
                            //绝对海拔
                            len += COM.Waypoint.Length3D(new BLH(customWaypoints[i].Latitude, customWaypoints[i].Longitude, customWaypoints[i].Altitude), new BLH(customWaypoints[i + 1].Latitude, customWaypoints[i + 1].Longitude, customWaypoints[i + 1].Altitude));
                        }
                        else
                        {
                            //相对高度
                            len += COM.Waypoint.Length3D(new BLH(customWaypoints[i].Latitude, customWaypoints[i].Longitude, customWaypoints[i].Altitude + takeoff.height), new BLH(customWaypoints[i + 1].Latitude, customWaypoints[i + 1].Longitude, customWaypoints[i + 1].Altitude + takeoff.height));
                        }

                        time += len / customWaypoints[i].Speed;
                    }
                    #endregion

                    #region 下降段
                    if (langding != null)
                    {
                        len += langding.height;
                        if (uavDrone.ZDXJSD != null)
                        {
                            time += langding.height / Convert.ToDouble(uavDrone.ZDXJSD);
                        }
                        else
                        {
                            time += langding.height / 3;
                        }
                    }
                    #endregion
                    #endregion

                    #region 第三方任务
                    #region 第三方航线
                    CustomWayline customWayline = new CustomWayline();
                    //相机
                    if (uavCamera.XJMC == "DJI Phantom 4 PRO camera")
                    {
                        customWayline.Camera = EnumUAV.Camera.P4P;
                    }
                    else if (uavCamera.XJMC == "DJI Phantom 4 RTK camera")
                    {
                        customWayline.Camera = EnumUAV.Camera.P4R;
                    }
                    //照片比例
                    if (cameraPhotoRatio.ZPBL == (int)MODEL.EnumUAV.PhotoRatio.ThreeTwo)
                    {
                        customWayline.PhotoRatio = EnumUAV.PhotoRatio.ThreeTwo;
                    }
                    else if (cameraPhotoRatio.ZPBL == (int)MODEL.EnumUAV.PhotoRatio.FourThree)
                    {
                        customWayline.PhotoRatio = EnumUAV.PhotoRatio.FourThree;
                    }
                    else if (cameraPhotoRatio.ZPBL == (int)MODEL.EnumUAV.PhotoRatio.SixteenNine)
                    {
                        customWayline.PhotoRatio = EnumUAV.PhotoRatio.SixteenNine;
                    }
                    //完成动作
                    if (takeoff == null && langding == null)
                    {
                        customWayline.CompletionAction = EnumUAV.CompletionAction.ReturntoHome;
                    }
                    else if (langding != null)
                    {
                        customWayline.CompletionAction = EnumUAV.CompletionAction.LandinPlace;
                    }
                    else
                    {
                        customWayline.CompletionAction = EnumUAV.CompletionAction.Hover;
                    }
                    //偏航角模式
                    customWayline.HeadingMode = EnumUAV.HeadingMode.FollowRoute;
                    customWayline.InitialSpeed = Convert.ToDouble(hxsd);
                    if (takeoff != null)
                    {
                        customWayline.Takeoff = new Takeoff(takeoff.blh.l, takeoff.blh.b, takeoff.blh.h);
                    }
                    customWayline.Waypoints = customWaypoints;
                    #endregion

                    #region 第三方任务
                    CustomMission customMission = new CustomMission();
                    customMission.Name = hxmc;
                    customMission.MissionType = EnumUAV.MissionType.Waypoint;
                    if (gclx == ((int)MODEL.EnumUAV.AltitudeMode.AMSL).ToString())
                    {
                        customMission.AltitudeMode = EnumUAV.AltitudeMode.AMSL;
                    }
                    else
                    {
                        customMission.AltitudeMode = EnumUAV.AltitudeMode.AGL;
                    }
                    customMission.Wayline = customWayline;
                    #endregion
                    #endregion

                    #region DJI Pilot KML & DJI Terra KML（只支持P4R和相对高度）
                    string djipilot_kml = string.Empty;
                    string djiterra_kml = string.Empty;

                    if (uavDrone.WRJJC == "P4R" && gclx == ((int)EnumUAV.AltitudeMode.AGL).ToString())
                    {
                        string djiterra_Folder = string.Empty;
                        string LineString = string.Empty;

                        for (int i = 0; i < customWaypoints.Count; i++)
                        {
                            string coordinates = customWaypoints[i].Longitude + "," + customWaypoints[i].Latitude + "," + customWaypoints[i].Altitude;
                            LineString += coordinates + " ";

                            if (customWaypoints[i].Actions == null)
                            {
                                djiterra_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>{1}</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>{2}</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{3}</mis:speed><mis:useWaylineHeadingMode>false</mis:useWaylineHeadingMode><mis:useWaylinePointType>false</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>UsePointSetting</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius></ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{4}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Heading, customWaypoints[i].Pitch, customWaypoints[i].Speed, coordinates);
                            }
                        }
                        djiterra_kml = string.Format("<?xml version=\"1.0\" encoding=\"UTF-8\"?><kml xmlns=\"http://www.opengis.net/kml/2.2\"><Document xmlns=\"\"><name>{0}</name><open>1</open><ExtendedData xmlns:mis=\"www.dji.com\"><mis:type>Waypoint</mis:type><mis:stationType>0</mis:stationType></ExtendedData><Style id=\"waylineGreenPoly\"><LineStyle><color>FF0AEE8B</color><width>6</width></LineStyle></Style><Style id=\"waypointStyle\"><IconStyle><Icon><href>https://cdnen.dji-flighthub.com/static/app/images/point.png</href></Icon></IconStyle></Style><Folder><name>Waypoints</name><description>Waypoints in the Mission.</description>{1}</Folder><Placemark><name>Wayline</name><description>Wayline</description><visibility>1</visibility><ExtendedData xmlns:mis=\"www.dji.com\"><mis:altitude>100</mis:altitude><mis:autoFlightSpeed>{2}</mis:autoFlightSpeed><mis:actionOnFinish>GoHome</mis:actionOnFinish><mis:headingMode>UsePointSetting</mis:headingMode><mis:gimbalPitchMode>UsePointSetting</mis:gimbalPitchMode><mis:powerSaveMode>false</mis:powerSaveMode><mis:waypointType>LineStop</mis:waypointType><mis:droneInfo><mis:droneType>P4R</mis:droneType><mis:droneCameras/><mis:droneHeight><mis:useAbsolute>false</mis:useAbsolute><mis:hasTakeoffHeight>false</mis:hasTakeoffHeight><mis:takeoffHeight>0.0</mis:takeoffHeight></mis:droneHeight></mis:droneInfo></ExtendedData><styleUrl>#waylineGreenPoly</styleUrl><LineString><tessellate>1</tessellate><altitudeMode>relativeToGround</altitudeMode><coordinates>{3}</coordinates></LineString></Placemark></Document></kml>", hxmc, djiterra_Folder, hxsd, LineString.TrimEnd(' '));
                    }
                    else if (uavDrone.WRJJC == "M300R" && gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                    {
                        string djipilot_Folder = string.Empty;
                        string LineString = string.Empty;

                        for (int i = 0; i < customWaypoints.Count; i++)
                        {
                            string coordinates = customWaypoints[i].Longitude + "," + customWaypoints[i].Latitude + "," + customWaypoints[i].Altitude;
                            LineString += coordinates + " ";

                            if (i == 0)
                            {
                                djipilot_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>{1}</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>{2}</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{3}</mis:speed><mis:useWaylineHeadingMode>false</mis:useWaylineHeadingMode><mis:useWaylinePointType>false</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>UsePointSetting</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius></ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{4}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Heading, customWaypoints[i].Pitch, customWaypoints[i].Speed, coordinates);
                            }
                            else
                            {
                                if (i % 2 == 0)
                                {
                                    djipilot_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>{1}</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>{2}</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{3}</mis:speed><mis:useWaylineHeadingMode>false</mis:useWaylineHeadingMode><mis:useWaylinePointType>false</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>UsePointSetting</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius><mis:actions param=\"0\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">StopIntervalShot</mis:actions></ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{4}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Heading, customWaypoints[i].Pitch, customWaypoints[i].Speed, coordinates);
                                }
                                else
                                {
                                    djipilot_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>{1}</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>{2}</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{3}</mis:speed><mis:useWaylineHeadingMode>false</mis:useWaylineHeadingMode><mis:useWaylinePointType>false</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>UsePointSetting</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius><mis:actions param=\"{4}\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">TimeIntervalShot</mis:actions></ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{5}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Heading, customWaypoints[i].Pitch, customWaypoints[i].Speed, customWaypoints[i].Interval, coordinates);
                                }
                            }
                        }

                        djipilot_kml = string.Format("<?xml version=\"1.0\" encoding=\"UTF-8\"?><kml xmlns=\"http://www.opengis.net/kml/2.2\"><Document xmlns=\"\"><name>{0}</name><open>1</open><ExtendedData xmlns:mis=\"www.dji.com\"><mis:type>Waypoint</mis:type><mis:stationType>0</mis:stationType></ExtendedData><Style id=\"waylineGreenPoly\"><LineStyle><color>FF0AEE8B</color><width>6</width></LineStyle></Style><Style id=\"waypointStyle\"><IconStyle><Icon><href>https://cdnen.dji-flighthub.com/static/app/images/point.png</href></Icon></IconStyle></Style><Folder><name>Waypoints</name><description>Waypoints in the Mission.</description>{1}</Folder><Placemark><name>Wayline</name><description>Wayline</description><visibility>1</visibility><ExtendedData xmlns:mis=\"www.dji.com\"><mis:altitude>1000</mis:altitude><mis:autoFlightSpeed>15.0</mis:autoFlightSpeed><mis:actionOnFinish>GoHome</mis:actionOnFinish><mis:headingMode>Auto</mis:headingMode><mis:gimbalPitchMode>UsePointSetting</mis:gimbalPitchMode><mis:powerSaveMode>false</mis:powerSaveMode><mis:waypointType>LineStop</mis:waypointType><mis:droneInfo><mis:droneType>PM430</mis:droneType><mis:droneCameras><mis:camera><mis:cameraIndex>0</mis:cameraIndex><mis:cameraName>Zenmuse P1</mis:cameraName><mis:cameraType>31</mis:cameraType><mis:payloadCameraType>2</mis:payloadCameraType><mis:payloadCameraConfigInfo><mis:dewarping>false</mis:dewarping><mis:meteringMode>0</mis:meteringMode><mis:lidarEchoMode>0</mis:lidarEchoMode><mis:lidarSampleRateMode>0</mis:lidarSampleRateMode><mis:lidarScanMode>1</mis:lidarScanMode><mis:LidarNeedVariegationMode>false</mis:LidarNeedVariegationMode></mis:payloadCameraConfigInfo></mis:camera></mis:droneCameras><mis:droneHeight><mis:useAbsolute>true</mis:useAbsolute><mis:hasTakeoffHeight>false</mis:hasTakeoffHeight><mis:takeoffHeight>0.0</mis:takeoffHeight></mis:droneHeight></mis:droneInfo></ExtendedData><styleUrl>#waylineGreenPoly</styleUrl><LineString><tessellate>1</tessellate><altitudeMode>relativeToGround</altitudeMode><coordinates>{2}</coordinates></LineString></Placemark></Document></kml>", hxmc, djipilot_Folder, LineString.TrimEnd(' '));
                    }
                    #endregion

                    #region 计算任务结果
                    UavMission uavMission = new UavMission
                    {
                        RouteLength = Math.Round(len, 2),
                        FlyTime = Math.Round(time, 2),
                        WaypointCount = customWaypoints.Count,
                        PhotoCount = num,
                        Line = line,
                        Mission = JsonHelper.ToJson(customMission),
                        TerraKml = djiterra_kml,
                        PilotKml = djipilot_kml
                    };
                    #endregion

                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(uavMission)));
                    #endregion
                }
                else if (hxlx == ((int)MODEL.EnumUAV.RouteType.LMSYCL).ToString())
                {
                    #region TODO立面摄影测量（地形）

                    #endregion
                }
                else if (hxlx == ((int)MODEL.EnumUAV.RouteType.LMSYCLM).ToString())
                {
                    #region TODO立面摄影测量（模型）

                    #endregion
                }
                else if (hxlx == ((int)MODEL.EnumUAV.RouteType.MBSPCJ).ToString())
                {
                    #region TODO目标视频采集

                    #endregion
                }
                else if (hxlx == ((int)MODEL.EnumUAV.RouteType.MBTXCJE).ToString())
                {
                    #region 目标图像采集（视线）
                    #region 图形及航点
                    if (string.IsNullOrEmpty(waypoint)) { return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无航点信息！", string.Empty)); }

                    //解析全部航点信息
                    List<WaypointInfo> waypointInfos = COM.JsonHelper.ToObject<List<WaypointInfo>>(waypoint);
                    if (waypointInfos == null || waypointInfos.Count < 1) { return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无航点信息！", string.Empty)); }

                    #region 当高度类型为相对高度模式时，若无设计起飞点则无法计算目标点对应航点航高
                    if ((gclx == ((int)EnumUAV.AltitudeMode.AGL).ToString()) && (waypointInfos[0].type != MODEL.EnumUAV.WaypointType.Takeoff.ToString().ToLower()))
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无法计算目标点相对航高！", string.Empty));
                    }
                    #endregion

                    List<xyz> line = new List<xyz>();//图形
                    List<CustomWaypoint> customWaypoints = new List<CustomWaypoint>();//自定义航点集

                    WaypointInfo takeoff = null;//起飞点
                    WaypointInfo langding = null;//降落点

                    for (int i = 0; i < waypointInfos.Count; i++)
                    {
                        #region 起飞点
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.Takeoff.ToString().ToLower())
                        {
                            takeoff = waypointInfos[i];

                            #region 图形
                            line.Add(waypointInfos[i].xyz);//地面起飞点
                            XYZ pointXYZ = COM.CoordConvert.BLH2XYZ(new BLH(waypointInfos[i].blh.b, waypointInfos[i].blh.l, waypointInfos[i].blh.h + waypointInfos[i].height), EnumCOM.Datum.CGCS2000, ref info);
                            if (!string.IsNullOrEmpty(info))
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                            }
                            xyz xyz = new xyz
                            {
                                x = pointXYZ.X,
                                y = pointXYZ.Y,
                                z = pointXYZ.Z
                            };
                            line.Add(xyz);//空中起飞点
                            #endregion

                            #region 第三方航点
                            CustomWaypoint customWaypoint = new CustomWaypoint
                            {
                                Index = customWaypoints.Count,
                                CaptureMode = EnumUAV.CaptureMode.NoShot,
                                Longitude = waypointInfos[i].blh.l,
                                Latitude = waypointInfos[i].blh.b,
                                Speed = waypointInfos[i].speed,
                                Pitch = 0,
                                Heading = 0
                            };
                            if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height, 3);//绝对高度
                            }
                            else
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].height, 3);//相对高度
                            }
                            customWaypoints.Add(customWaypoint);
                            #endregion
                        }
                        #endregion

                        #region 目标点
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.Target.ToString().ToLower())
                        {
                            /*
                             * 开始航点（开始任务、调整速度、姿态）
                             * 动作航点（执行动作）
                             * 结束航点（离开任务，与开始航点相同）
                             */

                            #region 图形
                            double pitch = 0;
                            List<XYZ> pointXYZs = COM.Waypoint.GetWaypointGrounpEye(
                                new XYZ(waypointInfos[i].xyz.x, waypointInfos[i].xyz.y, waypointInfos[i].xyz.z),
                                new XYZ(waypointInfos[i].eye.x, waypointInfos[i].eye.y, waypointInfos[i].eye.z),
                                waypointInfos[i].adjust.photodistance,
                                waypointInfos[i].adjust.adjustdistance,
                                waypointInfos[i].adjust.level,
                                ref pitch,
                                ref info);

                            if (pointXYZs == null) { return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty)); }

                            for (int j = 0; j < pointXYZs.Count; j++)
                            {
                                xyz xyz = new xyz
                                {
                                    x = pointXYZs[j].X,
                                    y = pointXYZs[j].Y,
                                    z = pointXYZs[j].Z
                                };
                                line.Add(xyz);
                            }
                            #endregion

                            #region 第三方航点
                            for (int j = 0; j < pointXYZs.Count; j++)
                            {
                                BLH pointBLH = COM.CoordConvert.XYZ2BLH(pointXYZs[j], EnumCOM.Datum.CGCS2000, ref info);

                                if (!string.IsNullOrEmpty(info)) { return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty)); }

                                if (j == 0)
                                {
                                    #region 开始航点
                                    CustomWaypoint customWaypoint = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = waypointInfos[i].adjust.adjustspeed,
                                        Pitch = Math.Round(pitch, 2),
                                        Heading = 0
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint);
                                    #endregion
                                }
                                else if (j == 1)
                                {
                                    #region 动作航点
                                    CustomWaypoint customWaypoint = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.WaypointHoveringShot,
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = waypointInfos[i].speed,
                                        Pitch = Math.Round(pitch, 2),
                                        Heading = 0
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }

                                    #region 动作
                                    if (waypointInfos[i].children != null && waypointInfos[i].children.Count > 0)
                                    {
                                        List<CustomAction> customActions = new List<CustomAction>();
                                        for (int k = 0; k < waypointInfos[i].children.Count; k++)
                                        {
                                            CustomAction customAction = new CustomAction();
                                            customAction.Index = k;
                                            if (waypointInfos[i].children[k].action == "hover")
                                            {
                                                customAction.WaypointAction = EnumUAV.WaypointActionType.Hover;
                                                customAction.HoverTime = waypointInfos[i].children[k].value;
                                            }
                                            else if (waypointInfos[i].children[k].action == "photo")
                                            {
                                                customAction.WaypointAction = EnumUAV.WaypointActionType.Capture;
                                            }
                                            else if (waypointInfos[i].children[k].action == "pitch")
                                            {
                                                customAction.WaypointAction = EnumUAV.WaypointActionType.Pitch;
                                                customAction.Pitch = waypointInfos[i].children[k].value;
                                            }
                                            else if (waypointInfos[i].children[k].action == "yaw")
                                            {
                                                customAction.WaypointAction = EnumUAV.WaypointActionType.Heading;
                                                customAction.Heading = waypointInfos[i].children[k].value;
                                            }
                                            customActions.Add(customAction);
                                        }
                                        customWaypoint.Actions = customActions;
                                    }
                                    #endregion
                                    customWaypoints.Add(customWaypoint);
                                    #endregion
                                }
                                else
                                {
                                    #region 结束航点
                                    CustomWaypoint customWaypoint = new CustomWaypoint
                                    {
                                        Index = customWaypoints.Count,
                                        CaptureMode = EnumUAV.CaptureMode.NoShot,
                                        Longitude = pointBLH.L,
                                        Latitude = pointBLH.B,
                                        Speed = waypointInfos[i].speed,
                                        Pitch = 0,
                                        Heading = 0
                                    };
                                    if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H, 3);//绝对高度
                                    }
                                    else
                                    {
                                        customWaypoint.Altitude = Math.Round(pointBLH.H - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                                    }
                                    customWaypoints.Add(customWaypoint);
                                    #endregion
                                }
                            }
                            #endregion
                        }
                        #endregion

                        #region 避障点
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.Avoid.ToString().ToLower())
                        {
                            #region 图形
                            XYZ pointXYZ = COM.CoordConvert.BLH2XYZ(new BLH(waypointInfos[i].blh.b, waypointInfos[i].blh.l, waypointInfos[i].blh.h + waypointInfos[i].height), EnumCOM.Datum.CGCS2000, ref info);
                            if (!string.IsNullOrEmpty(info))
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                            }
                            xyz xyz = new xyz
                            {
                                x = pointXYZ.X,
                                y = pointXYZ.Y,
                                z = pointXYZ.Z
                            };
                            line.Add(xyz);
                            #endregion

                            #region 第三方航点
                            CustomWaypoint customWaypoint = new CustomWaypoint
                            {
                                Index = customWaypoints.Count,
                                CaptureMode = EnumUAV.CaptureMode.NoShot,
                                Longitude = waypointInfos[i].blh.l,
                                Latitude = waypointInfos[i].blh.b,
                                Speed = waypointInfos[i].speed,
                                Pitch = 0,
                                Heading = 0
                            };
                            if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height, 3);//绝对高度
                            }
                            else
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                            }
                            customWaypoints.Add(customWaypoint);
                            #endregion
                        }
                        #endregion

                        #region 降落点
                        if (waypointInfos[i].type == MODEL.EnumUAV.WaypointType.Landing.ToString().ToLower())
                        {
                            langding = waypointInfos[i];

                            #region 图形
                            XYZ pointXYZ = COM.CoordConvert.BLH2XYZ(new BLH(waypointInfos[i].blh.b, waypointInfos[i].blh.l, waypointInfos[i].blh.h + waypointInfos[i].height), EnumCOM.Datum.CGCS2000, ref info);
                            if (!string.IsNullOrEmpty(info))
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, info, string.Empty));
                            }
                            xyz xyz = new xyz
                            {
                                x = pointXYZ.X,
                                y = pointXYZ.Y,
                                z = pointXYZ.Z
                            };
                            line.Add(xyz);//空中降落点
                            line.Add(waypointInfos[i].xyz);//地面地面点
                            #endregion

                            #region 第三方航点
                            CustomWaypoint customWaypoint = new CustomWaypoint
                            {
                                Index = customWaypoints.Count,
                                CaptureMode = EnumUAV.CaptureMode.NoShot,
                                Longitude = waypointInfos[i].blh.l,
                                Latitude = waypointInfos[i].blh.b,
                                Speed = 0,
                                Pitch = 0,
                                Heading = 0
                            };
                            if (gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height, 3);//绝对高度
                            }
                            else
                            {
                                customWaypoint.Altitude = Math.Round(waypointInfos[i].blh.h + waypointInfos[i].height - takeoff.blh.h, 3);//相对高度(必须具有起飞点)
                            }

                            customWaypoints.Add(customWaypoint);
                            #endregion
                        }
                        #endregion
                    }
                    #endregion

                    #region 计算航线信息及更新航点
                    double len = 0;//航线长度
                    double time = 0;//任务时间
                    int num = 0;//拍照数量
                    #region 上升段
                    if (takeoff != null)
                    {
                        len += takeoff.height;
                        if (uavDrone.ZDSSSD != null)
                        {
                            time += takeoff.height / Convert.ToDouble(uavDrone.ZDSSSD);
                        }
                        else
                        {
                            time += takeoff.height / 5;
                        }
                    }
                    #endregion

                    #region 任务段
                    for (int i = 0; i < customWaypoints.Count - 1; i++)
                    {
                        //更新偏航角
                        customWaypoints[i].Heading = Math.Round(COM.Waypoint.DJIHeadingFollowRoute(new BLH(customWaypoints[i].Latitude, customWaypoints[i].Longitude, customWaypoints[i].Altitude), new BLH(customWaypoints[i + 1].Latitude, customWaypoints[i + 1].Longitude, customWaypoints[i + 1].Altitude)), 2);

                        //len += COM.Waypoint.Length3D(new BLH(customWaypoints[i].Latitude, customWaypoints[i].Longitude, customWaypoints[i].Altitude), new BLH(customWaypoints[i + 1].Latitude, customWaypoints[i + 1].Longitude, customWaypoints[i + 1].Altitude));

                        COM.XYZ p1 = COM.CoordConvert.BLH2XYZ(new BLH(customWaypoints[i].Latitude, customWaypoints[i].Longitude, customWaypoints[i].Altitude), EnumCOM.Datum.CGCS2000, ref info);
                        COM.XYZ p2 = COM.CoordConvert.BLH2XYZ(new BLH(customWaypoints[i + 1].Latitude, customWaypoints[i + 1].Longitude, customWaypoints[i + 1].Altitude), EnumCOM.Datum.CGCS2000, ref info);

                        double l = Math.Sqrt((p1.X - p2.X) * (p1.X - p2.X) + (p1.Y - p2.Y) * (p1.Y - p2.Y) + (p1.Z - p2.Z) * (p1.Z - p2.Z));

                        len += l;


                        time += len / customWaypoints[i].Speed;
                        if (customWaypoints[i].Actions != null && customWaypoints[i].Actions.Count > 0)
                        {
                            for (int j = 0; j < customWaypoints[i].Actions.Count; j++)
                            {
                                if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Capture)
                                {
                                    num++;
                                }
                                else if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Hover)
                                {
                                    time += Convert.ToDouble(customWaypoints[i].Actions[j].HoverTime) / 1000;
                                }
                                else if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Pitch)
                                {
                                    time += 2;//预估
                                }
                                else if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Heading)
                                {
                                    time += 2;//预估
                                }
                            }
                        }
                    }
                    #endregion

                    #region 下降段
                    if (langding != null)
                    {
                        len += langding.height;
                        if (uavDrone.ZDXJSD != null)
                        {
                            time += langding.height / Convert.ToDouble(uavDrone.ZDXJSD);
                        }
                        else
                        {
                            time += langding.height / 3;
                        }
                    }
                    #endregion
                    #endregion

                    #region 第三方任务
                    #region 第三方航线
                    CustomWayline customWayline = new CustomWayline();
                    //相机
                    if (uavCamera.XJMC == "DJI Phantom 4 PRO camera")
                    {
                        customWayline.Camera = EnumUAV.Camera.P4P;
                    }
                    else if (uavCamera.XJMC == "DJI Phantom 4 RTK camera")
                    {
                        customWayline.Camera = EnumUAV.Camera.P4R;
                    }
                    //照片比例
                    if (cameraPhotoRatio.ZPBL == (int)MODEL.EnumUAV.PhotoRatio.ThreeTwo)
                    {
                        customWayline.PhotoRatio = EnumUAV.PhotoRatio.ThreeTwo;
                    }
                    else if (cameraPhotoRatio.ZPBL == (int)MODEL.EnumUAV.PhotoRatio.FourThree)
                    {
                        customWayline.PhotoRatio = EnumUAV.PhotoRatio.FourThree;
                    }
                    else if (cameraPhotoRatio.ZPBL == (int)MODEL.EnumUAV.PhotoRatio.SixteenNine)
                    {
                        customWayline.PhotoRatio = EnumUAV.PhotoRatio.SixteenNine;
                    }
                    //完成动作
                    if (takeoff == null && langding == null)
                    {
                        customWayline.CompletionAction = EnumUAV.CompletionAction.ReturntoHome;
                    }
                    else if (langding != null)
                    {
                        customWayline.CompletionAction = EnumUAV.CompletionAction.LandinPlace;
                    }
                    else
                    {
                        customWayline.CompletionAction = EnumUAV.CompletionAction.Hover;
                    }
                    //偏航角模式
                    customWayline.HeadingMode = EnumUAV.HeadingMode.FollowRoute;
                    customWayline.InitialSpeed = Convert.ToDouble(hxsd);
                    if (takeoff != null)
                    {
                        customWayline.Takeoff = new Takeoff(takeoff.blh.l, takeoff.blh.b, takeoff.blh.h);
                    }
                    customWayline.Waypoints = customWaypoints;
                    #endregion

                    #region 第三方任务
                    CustomMission customMission = new CustomMission();
                    customMission.Name = hxmc;
                    customMission.MissionType = EnumUAV.MissionType.Waypoint;
                    if (gclx == ((int)MODEL.EnumUAV.AltitudeMode.AMSL).ToString())
                    {
                        customMission.AltitudeMode = EnumUAV.AltitudeMode.AMSL;
                    }
                    else
                    {
                        customMission.AltitudeMode = EnumUAV.AltitudeMode.AGL;
                    }
                    customMission.Wayline = customWayline;
                    #endregion
                    #endregion

                    #region DJI Pilot KML & DJI Terra KML（只支持P4R和相对高度）
                    string djipilot_kml = string.Empty;
                    string djiterra_kml = string.Empty;
                    if (uavDrone.WRJJC == "P4R" && gclx == ((int)EnumUAV.AltitudeMode.AGL).ToString())
                    {
                        string djipilot_Folder = string.Empty;
                        string djiterra_Folder = string.Empty;
                        string LineString = string.Empty;

                        for (int i = 0; i < customWaypoints.Count; i++)
                        {
                            string coordinates = customWaypoints[i].Longitude + "," + customWaypoints[i].Latitude + "," + customWaypoints[i].Altitude;
                            LineString += coordinates + " ";

                            if (customWaypoints[i].Actions == null)
                            {
                                #region 非动作航点
                                djipilot_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>0</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>0.0</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{1}</mis:speed><mis:useWaylineHeadingMode>true</mis:useWaylineHeadingMode><mis:useWaylinePointType>true</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>Auto</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius></ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{2}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Speed, coordinates);
                                djiterra_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>0</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>0.0</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{1}</mis:speed><mis:useWaylineHeadingMode>true</mis:useWaylineHeadingMode><mis:useWaylinePointType>true</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>Auto</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius></ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{2}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Speed, coordinates);
                                #endregion
                            }
                            else
                            {
                                #region 非动作航点
                                string djipilot_actions = string.Empty;
                                string djiterra_actions = string.Empty;

                                for (int j = 0; j < customWaypoints[i].Actions.Count; j++)
                                {
                                    if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Hover)
                                    {
                                        djipilot_actions += string.Format("<mis:actions param=\"{0}\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">Hovering</mis:actions>", customWaypoints[i].Actions[j].HoverTime);
                                        djiterra_actions += string.Format("<mis:actions param=\"{0}\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">Hovering</mis:actions>", customWaypoints[i].Actions[j].HoverTime);
                                    }
                                    else if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Capture)
                                    {
                                        djipilot_actions += "<mis:actions param=\"0\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">ShootPhoto</mis:actions>";
                                        djiterra_actions += "<mis:actions param=\"0\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">ShootPhoto</mis:actions>";
                                    }
                                    else if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Heading)
                                    {
                                        djipilot_actions += string.Format("<mis:actions param=\"{0}\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">AircraftYaw</mis:actions>", customWaypoints[i].Actions[j].Heading);
                                        djiterra_actions += string.Format("<mis:actions param=\"{0}\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">AircraftYaw</mis:actions>", customWaypoints[i].Actions[j].Heading);
                                    }
                                    else if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Pitch)
                                    {
                                        djipilot_actions += string.Format("<mis:actions param=\"{0}\" accuracy=\"1\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">GimbalPitch</mis:actions>", customWaypoints[i].Actions[j].Pitch * 10);
                                        djiterra_actions += string.Format("<mis:actions param=\"{0}\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">GimbalPitch</mis:actions>", customWaypoints[i].Actions[j].Pitch);
                                    }
                                }

                                djipilot_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>0</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>{1}</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{2}</mis:speed><mis:useWaylineHeadingMode>true</mis:useWaylineHeadingMode><mis:useWaylinePointType>true</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>Auto</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius>{3}</ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{4}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Pitch, customWaypoints[i].Speed, djipilot_actions, coordinates);
                                djiterra_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>0</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>{1}</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{2}</mis:speed><mis:useWaylineHeadingMode>true</mis:useWaylineHeadingMode><mis:useWaylinePointType>true</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>Auto</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius>{3}</ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{4}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Pitch, customWaypoints[i].Speed, djiterra_actions, coordinates);
                                #endregion
                            }
                        }

                        djipilot_kml = string.Format("<?xml version=\"1.0\" encoding=\"UTF-8\"?><kml xmlns=\"http://www.opengis.net/kml/2.2\"><Document xmlns=\"\"><name>{0}</name><open>1</open><ExtendedData xmlns:mis=\"www.dji.com\"><mis:type>Waypoint</mis:type><mis:stationType>0</mis:stationType></ExtendedData><Style id=\"waylineGreenPoly\"><LineStyle><color>FF0AEE8B</color><width>6</width></LineStyle></Style><Style id=\"waypointStyle\"><IconStyle><Icon><href>https://cdnen.dji-flighthub.com/static/app/images/point.png</href></Icon></IconStyle></Style><Folder><name>Waypoints</name><description>Waypoints in the Mission.</description>{1}</Folder><Placemark><name>Wayline</name><description>Wayline</description><visibility>1</visibility><ExtendedData xmlns:mis=\"www.dji.com\"><mis:altitude>100</mis:altitude><mis:autoFlightSpeed>{2}</mis:autoFlightSpeed><mis:actionOnFinish>GoHome</mis:actionOnFinish><mis:headingMode>Auto</mis:headingMode><mis:gimbalPitchMode>UsePointSetting</mis:gimbalPitchMode><mis:powerSaveMode>false</mis:powerSaveMode><mis:waypointType>LineStop</mis:waypointType><mis:droneInfo><mis:droneType>P4R</mis:droneType><mis:droneCameras/><mis:droneHeight><mis:useAbsolute>false</mis:useAbsolute><mis:hasTakeoffHeight>false</mis:hasTakeoffHeight><mis:takeoffHeight>0.0</mis:takeoffHeight></mis:droneHeight></mis:droneInfo></ExtendedData><styleUrl>#waylineGreenPoly</styleUrl><LineString> <tessellate>1</tessellate><altitudeMode>relativeToGround</altitudeMode><coordinates>{3}</coordinates></LineString></Placemark></Document></kml>", hxmc, djipilot_Folder, hxsd, LineString.TrimEnd(' '));
                        djiterra_kml = string.Format("<?xml version=\"1.0\" encoding=\"UTF-8\"?><kml xmlns=\"http://www.opengis.net/kml/2.2\"><Document xmlns=\"\"><name>{0}</name><open>1</open><ExtendedData xmlns:mis=\"www.dji.com\"><mis:type>Waypoint</mis:type><mis:stationType>0</mis:stationType></ExtendedData><Style id=\"waylineGreenPoly\"><LineStyle><color>FF0AEE8B</color><width>6</width></LineStyle></Style><Style id=\"waypointStyle\"><IconStyle><Icon><href>https://cdnen.dji-flighthub.com/static/app/images/point.png</href></Icon></IconStyle></Style><Folder><name>Waypoints</name><description>Waypoints in the Mission.</description>{1}</Folder><Placemark><name>Wayline</name><description>Wayline</description><visibility>1</visibility><ExtendedData xmlns:mis=\"www.dji.com\"><mis:altitude>100</mis:altitude><mis:autoFlightSpeed>{2}</mis:autoFlightSpeed><mis:actionOnFinish>GoHome</mis:actionOnFinish><mis:headingMode>Auto</mis:headingMode><mis:gimbalPitchMode>UsePointSetting</mis:gimbalPitchMode><mis:powerSaveMode>false</mis:powerSaveMode><mis:waypointType>LineStop</mis:waypointType><mis:droneInfo><mis:droneType>P4R</mis:droneType><mis:droneCameras/><mis:droneHeight><mis:useAbsolute>false</mis:useAbsolute><mis:hasTakeoffHeight>false</mis:hasTakeoffHeight><mis:takeoffHeight>0.0</mis:takeoffHeight></mis:droneHeight></mis:droneInfo></ExtendedData><styleUrl>#waylineGreenPoly</styleUrl><LineString> <tessellate>1</tessellate><altitudeMode>relativeToGround</altitudeMode><coordinates>{3}</coordinates></LineString></Placemark></Document></kml>", hxmc, djiterra_Folder, hxsd, LineString.TrimEnd(' '));
                    }
                    else if (uavDrone.WRJJC == "M300R" && gclx == ((int)EnumUAV.AltitudeMode.AMSL).ToString())
                    {
                        string djipilot_Folder = string.Empty;
                        string LineString = string.Empty;

                        for (int i = 0; i < customWaypoints.Count; i++)
                        {
                            string coordinates = customWaypoints[i].Longitude + "," + customWaypoints[i].Latitude + "," + customWaypoints[i].Altitude;
                            LineString += coordinates + " ";

                            if (customWaypoints[i].Actions == null)
                            {
                                #region 非动作航点
                                djipilot_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>0</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>{1}</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{2}</mis:speed><mis:useWaylineHeadingMode>false</mis:useWaylineHeadingMode><mis:useWaylinePointType>false</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>Auto</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius></ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{3}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Pitch, customWaypoints[i].Speed, coordinates);
                                #endregion
                            }
                            else
                            {
                                #region 动作航点
                                string djipilot_actions = string.Empty;

                                for (int j = 0; j < customWaypoints[i].Actions.Count; j++)
                                {
                                    if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Hover)
                                    {
                                        djipilot_actions += string.Format("<mis:actions param=\"{0}\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">Hovering</mis:actions>", customWaypoints[i].Actions[j].HoverTime);
                                    }
                                    else if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Capture)
                                    {
                                        djipilot_actions += "<mis:actions param=\"0\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">ShootPhoto</mis:actions>";
                                    }
                                    else if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Heading)
                                    {
                                        djipilot_actions += string.Format("<mis:actions param=\"{0}\" accuracy=\"0\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">AircraftYaw</mis:actions>", customWaypoints[i].Actions[j].Heading);
                                    }
                                    else if (customWaypoints[i].Actions[j].WaypointAction == EnumUAV.WaypointActionType.Pitch)
                                    {
                                        djipilot_actions += string.Format("<mis:actions param=\"{0}\" accuracy=\"1\" cameraIndex=\"0\" payloadType=\"0\" payloadIndex=\"0\">GimbalPitch</mis:actions>", customWaypoints[i].Actions[j].Pitch * 10);
                                    }
                                }

                                djipilot_Folder += string.Format("<Placemark><name>Waypoint{0}</name><visibility>1</visibility><description>Waypoint</description><styleUrl>#waypointStyle</styleUrl><ExtendedData xmlns:mis=\"www.dji.com\"><mis:useWaylineAltitude>false</mis:useWaylineAltitude><mis:heading>0</mis:heading><mis:turnMode>Auto</mis:turnMode><mis:gimbalPitch>{1}</mis:gimbalPitch><mis:useWaylineSpeed>false</mis:useWaylineSpeed><mis:speed>{2}</mis:speed><mis:useWaylineHeadingMode>false</mis:useWaylineHeadingMode><mis:useWaylinePointType>false</mis:useWaylinePointType><mis:pointType>LineStop</mis:pointType><mis:headingMode>Auto</mis:headingMode><mis:cornerRadius>0.2</mis:cornerRadius>{3}</ExtendedData><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>{4}</coordinates></Point></Placemark>", i + 1, customWaypoints[i].Pitch, customWaypoints[i].Speed, djipilot_actions, coordinates);
                                #endregion
                            }
                        }

                        djipilot_kml = string.Format("<?xml version=\"1.0\" encoding=\"UTF-8\"?><kml xmlns=\"http://www.opengis.net/kml/2.2\"><Document xmlns=\"\"><name>{0}</name><open>1</open><ExtendedData xmlns:mis=\"www.dji.com\"><mis:type>Waypoint</mis:type><mis:stationType>0</mis:stationType></ExtendedData><Style id=\"waylineGreenPoly\"><LineStyle><color>FF0AEE8B</color><width>6</width></LineStyle></Style><Style id=\"waypointStyle\"><IconStyle><Icon><href>https://cdnen.dji-flighthub.com/static/app/images/point.png</href></Icon></IconStyle></Style><Folder><name>Waypoints</name><description>Waypoints in the Mission.</description>{1}</Folder><Placemark><name>Wayline</name><description>Wayline</description><visibility>1</visibility><ExtendedData xmlns:mis=\"www.dji.com\"><mis:altitude>1000.0</mis:altitude><mis:autoFlightSpeed>{2}</mis:autoFlightSpeed><mis:actionOnFinish>GoHome</mis:actionOnFinish><mis:headingMode>Auto</mis:headingMode><mis:gimbalPitchMode>UsePointSetting</mis:gimbalPitchMode><mis:powerSaveMode>false</mis:powerSaveMode><mis:waypointType>LineStop</mis:waypointType><mis:droneInfo><mis:droneType>PM430</mis:droneType><mis:droneCameras><mis:camera><mis:cameraIndex>0</mis:cameraIndex><mis:cameraName>Zenmuse P1</mis:cameraName><mis:cameraType>31</mis:cameraType><mis:payloadCameraType>2</mis:payloadCameraType></mis:camera></mis:droneCameras><mis:droneHeight><mis:useAbsolute>true</mis:useAbsolute><mis:hasTakeoffHeight>false</mis:hasTakeoffHeight><mis:takeoffHeight>0.0</mis:takeoffHeight></mis:droneHeight></mis:droneInfo></ExtendedData><styleUrl>#waylineGreenPoly</styleUrl><LineString><tessellate>1</tessellate><altitudeMode>relativeToGround</altitudeMode><coordinates>{3}</coordinates></LineString></Placemark></Document></kml>", hxmc, djipilot_Folder, hxsd, LineString.TrimEnd(' '));
                    }
                    #endregion

                    #region 计算任务结果
                    UavMission uavMission = new UavMission
                    {
                        RouteLength = Math.Round(len, 2),
                        FlyTime = Math.Round(time, 2),
                        WaypointCount = customWaypoints.Count,
                        PhotoCount = num,
                        Line = line,
                        Mission = JsonHelper.ToJson(customMission),
                        TerraKml = djiterra_kml,
                        PilotKml = djipilot_kml
                    };
                    #endregion

                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功", JsonHelper.ToJson(uavMission)));
                    #endregion
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无此无人机航线类型！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }

            return string.Empty;
        }

        /// <summary>
        /// 保存航线路径
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string SaveRoute()
        {
            string uavprojectid = HttpContext.Current.Request.Form["uavprojectid"];                 //当前无人机项目id
            string cookie = HttpContext.Current.Request.Form["cookie"];
            string line = HttpContext.Current.Request.Form["line"];                                 //路径图形
            string mis = HttpContext.Current.Request.Form["mis"];                                   //路径json任务
            string terra = HttpUtility.UrlDecode(HttpContext.Current.Request.Form["terra"]);
            string pilot = HttpUtility.UrlDecode(HttpContext.Current.Request.Form["pilot"]);
            string waypoints = HttpContext.Current.Request.Form["waypoints"];                       //路径航点/航区

            string hxmc = HttpContext.Current.Request.Form["uav-route-add-hxmc"];                   //航线名称
            string hxlx = HttpContext.Current.Request.Form["uav-route-add-hxlx"];                   //航线类型
            string gclx = HttpContext.Current.Request.Form["uav-route-add-gclx"];                   //高程类型
            string hxsd = HttpContext.Current.Request.Form["uav-route-add-hxsd"];                   //航线速度
            string hxcd = HttpContext.Current.Request.Form["uav-route-add-hxcd"];                   //航线长度
            string fxsj = HttpContext.Current.Request.Form["uav-route-add-fxsj"];                   //飞行时间
            string hlds = HttpContext.Current.Request.Form["uav-route-add-hlds"];                   //航点数量
            string pzsl = HttpContext.Current.Request.Form["uav-route-add-pzsl"];                   //拍照数量
            string bz = HttpContext.Current.Request.Form["uav-route-add-bz"];

            string drone = HttpContext.Current.Request.Form["uav-route-add-drone"];                 //无人机
            string payloadtype = HttpContext.Current.Request.Form["uav-route-add-payloadtype"];     //挂载类型
            string payload = HttpContext.Current.Request.Form["uav-route-add-payload"];             //挂载
            string photoratio = HttpContext.Current.Request.Form["uav-route-add-photoratio"];       //照片比例


            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                #region 路径
                UavProject uavProject = ParseUavHelper.ParseUavProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_project WHERE id={0} AND bsm{1} AND ztm={2}", uavprojectid, userbsms, (int)MODEL.Enum.State.InUse)));
                if (uavProject == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "未找到该项目！", string.Empty));
                }

                int uavrouteid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_route (hxmc,hxlx,gclx,hxsd,hxcd,fxsj,hdsl,pzsl,line,mis,pilot,terra,cjsj,bsm,ztm,bz) VALUES({0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15})",
                    SQLHelper.UpdateString(hxmc),
                    hxlx,
                    gclx,
                    hxsd,
                    hxcd,
                    fxsj,
                    hlds,
                    pzsl,
                    SQLHelper.UpdateString(line),
                    SQLHelper.UpdateString(mis),
                    SQLHelper.UpdateString(""),//SQLHelper.UpdateString(pilot),
                    SQLHelper.UpdateString(""),//SQLHelper.UpdateString(terra),
                    SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")),
                    SQLHelper.UpdateString(uavProject.BSM),
                    (int)MODEL.Enum.State.InUse,
                    SQLHelper.UpdateString(bz)));

                if (uavrouteid == -1)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建路径失败！", string.Empty));
                }
                #endregion

                #region 项目-路径映射
                int map_project_route = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_map_project_route (projectid,routeid,cjsj,ztm) VALUES({0},{1},{2},{3})", uavProject.Id, uavrouteid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                if (map_project_route == -1)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建项目-路径映射失败！", string.Empty));
                }
                #endregion

                #region 路径-无人机映射
                int map_route_drone = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_map_route_drone (routeid,droneid,payloadtype,payloadid,cjsj,ztm) VALUES({0},{1},{2},{3},{4},{5})", uavrouteid, drone, payloadtype, payload, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                if (map_route_drone == -1)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建路径-无人机映射失败！", string.Empty));
                }
                else
                {
                    if (!string.IsNullOrEmpty(photoratio))
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE uav_map_route_drone SET photoratioid={0} WHERE id={1} AND ztm={2}", photoratio, map_route_drone, (int)MODEL.Enum.State.InUse));
                        if (updatecount != 1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "更新路径-无人机映射失败！", string.Empty));
                        }
                    }
                }
                #endregion

                #region 路径-航点/航区
                if (string.IsNullOrEmpty(waypoints))
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "航点/航区为空！", string.Empty));
                }

                List<WaypointInfo> waypointInfos = JsonHelper.ToObject<List<WaypointInfo>>(waypoints);
                if (waypointInfos == null || waypointInfos.Count == 0)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "解析航点出错！", string.Empty));
                }

                for (int i = 0; i < waypointInfos.Count; i++)
                {
                    if (waypointInfos[i].type == "targetarea")
                    {
                        #region 航区
                        int wayareaid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_wayarea (mc,sx,lx,wz,gsd,fo,so,ma,dg,cjsj,bsm,ztm) VALUES({0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11})",
                            SQLHelper.UpdateString(waypointInfos[i].title),
                            i,
                            GetHDLX(waypointInfos[i].type),
                            SQLHelper.UpdateString(JsonHelper.ToJson(waypointInfos[i].polygon)),
                            waypointInfos[i].photogrammetry.gsd,
                            waypointInfos[i].photogrammetry.fo,
                            waypointInfos[i].photogrammetry.so,
                            waypointInfos[i].photogrammetry.ma,
                            waypointInfos[i].photogrammetry.dg,
                            SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")),
                            SQLHelper.UpdateString(uavProject.BSM),
                            (int)MODEL.Enum.State.InUse));
                        if (wayareaid == -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "新增航区失败！", string.Empty));
                        }
                        #endregion

                        #region 路径-航区映射
                        int maproutewayareaid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_map_route_wayarea (routeid,wayareaid,cjsj,ztm) VALUES({0},{1},{2},{3})", uavrouteid, wayareaid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        if (maproutewayareaid == -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建航点失败！", string.Empty));
                        }
                        #endregion
                    }
                    else
                    {
                        #region 航点（起飞点、降落点、避障点、目标点）
                        int waypointid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_waypoint (mc,sx,lx,jd,wd,gc,wz,gd,sd,cjsj,bsm,ztm) VALUES({0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11})",
                            SQLHelper.UpdateString(waypointInfos[i].title),
                            i,
                            GetHDLX(waypointInfos[i].type),
                            waypointInfos[i].blh.l,
                            waypointInfos[i].blh.b,
                            waypointInfos[i].blh.h,
                            SQLHelper.UpdateString(JsonHelper.ToJson(waypointInfos[i].xyz)),
                            waypointInfos[i].height,
                            waypointInfos[i].speed,
                            SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")),
                            SQLHelper.UpdateString(uavProject.BSM),
                            (int)MODEL.Enum.State.InUse));
                        if (waypointid == -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "新增航点失败！", string.Empty));
                        }
                        #endregion

                        #region 路径-航点映射
                        int maproutewaypointid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_map_route_waypoint (routeid,waypointid,cjsj,ztm) VALUES({0},{1},{2},{3})", uavrouteid, waypointid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        if (maproutewaypointid == -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建路径-航点映射失败！", string.Empty));
                        }
                        #endregion

                        if (waypointInfos[i].children != null && waypointInfos[i].children.Count > 0 && waypointInfos[i].adjust != null && waypointInfos[i].eye != null)
                        {
                            for (int j = 0; j < waypointInfos[i].children.Count; j++)
                            {
                                #region 动作
                                int actionid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_action (guid,index,title,type,value,cjsj,ztm) VALUES({0},{1},{2},{3},{4},{5},{6})", SQLHelper.UpdateString(waypointInfos[i].children[j].id), j, SQLHelper.UpdateString(waypointInfos[i].children[j].title), GetDZLX(waypointInfos[i].children[j].action), waypointInfos[i].children[j].value, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                if (actionid == -1)
                                {
                                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建航点动作失败！", string.Empty));
                                }
                                #endregion

                                #region 航点-动作映射
                                int mapwaypointactionid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_map_waypoint_action (waypointid,actionid,cjsj,ztm) VALUES({0},{1},{2},{3})", waypointid, actionid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                                if (mapwaypointactionid == -1)
                                {
                                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建航点-动作映射失败！", string.Empty));
                                }
                                #endregion
                            }

                            #region 目标图像采集参数
                            int paraid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_para_mbtxcj (pzjl,tzjl,tzsd,eye,cjsj,ztm) VALUES({0},{1},{2},{3},{4},{5})", waypointInfos[i].adjust.photodistance, waypointInfos[i].adjust.adjustdistance, waypointInfos[i].adjust.adjustspeed, SQLHelper.UpdateString(JsonHelper.ToJson(waypointInfos[i].eye)), SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                            if (paraid == -1)
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建航点目标图像采集参数失败！", string.Empty));
                            }
                            #endregion

                            #region 航点-目标图像采集参数映射
                            int mapwaypointparaid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uav_map_waypoint_mbtxcj (waypointid,mbtxcjid,cjsj,ztm) VALUES({0},{1},{2},{3})", waypointid, paraid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                            if (mapwaypointparaid == -1)
                            {
                                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建航点-目标图像采集参数映射失败！", string.Empty));
                            }
                            #endregion
                        }
                    }
                }
                #endregion

                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", uavrouteid.ToString()));//返回路径id
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 删除航线路径
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteUavRoute()
        {
            string id = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE uav_route SET ztm={0} WHERE id={1}", (int)MODEL.Enum.State.NoUse, id));
                if (updatecount == 1)
                {
                    int updatemapcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE uav_map_project_route SET ztm={0} WHERE routeid={1}", (int)MODEL.Enum.State.NoUse, id));
                    if (updatemapcount == 1)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "删除成功！", string.Empty));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除项目-路径映射失败！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除路径失败！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 航点类型反翻译
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        private int GetHDLX(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return -1;
            }
            else
            {
                if (name.ToUpper() == MODEL.EnumUAV.WaypointType.Takeoff.ToString().ToUpper())
                {
                    return (int)MODEL.EnumUAV.WaypointType.Takeoff;
                }
                else if (name.ToUpper() == MODEL.EnumUAV.WaypointType.Landing.ToString().ToUpper())
                {
                    return (int)MODEL.EnumUAV.WaypointType.Landing;
                }
                else if (name.ToUpper() == MODEL.EnumUAV.WaypointType.Target.ToString().ToUpper())
                {
                    return (int)MODEL.EnumUAV.WaypointType.Target;
                }
                else if (name.ToUpper() == MODEL.EnumUAV.WaypointType.Avoid.ToString().ToUpper())
                {
                    return (int)MODEL.EnumUAV.WaypointType.Avoid;
                }
                else if (name.ToUpper() == MODEL.EnumUAV.WaypointType.TargetArea.ToString().ToUpper())
                {
                    return (int)MODEL.EnumUAV.WaypointType.TargetArea;
                }
                else
                {
                    return -1;
                }
            }
        }
        /// <summary>
        /// 动作类型反翻译
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        private int GetDZLX(string action)
        {
            if (string.IsNullOrEmpty(action))
            {
                return -1;
            }
            else
            {
                if (action.ToUpper() == MODEL.EnumUAV.WaypointActionType.Hover.ToString().ToUpper())
                {
                    return (int)MODEL.EnumUAV.WaypointActionType.Hover;
                }
                else if (action.ToUpper() == "PHOTO")
                {
                    return (int)MODEL.EnumUAV.WaypointActionType.Capture;
                }
                else if (action.ToUpper() == MODEL.EnumUAV.WaypointActionType.StartREC.ToString().ToUpper())
                {
                    return (int)MODEL.EnumUAV.WaypointActionType.StartREC;
                }
                else if (action.ToUpper() == MODEL.EnumUAV.WaypointActionType.StopREC.ToString().ToUpper())
                {
                    return (int)MODEL.EnumUAV.WaypointActionType.StopREC;
                }
                else if (action.ToUpper() == "YAW")
                {
                    return (int)MODEL.EnumUAV.WaypointActionType.Heading;
                }
                else if (action.ToUpper() == MODEL.EnumUAV.WaypointActionType.Pitch.ToString().ToUpper())
                {
                    return (int)MODEL.EnumUAV.WaypointActionType.Pitch;
                }
                else
                {
                    return -1;
                }
            }
        }

    }
}

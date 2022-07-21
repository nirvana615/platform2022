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
    public class UavDroneController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(UavDroneController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString() == "" ? COM.ConstHelper.dbConn : ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 全部无人机信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetDroneList()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_drone WHERE ztm={0}", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(data))
            {
                List<DroneInfo> droneInfos = new List<DroneInfo>();

                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    UavDrone uavDrone = ParseUavHelper.ParseUavDrone(rows[i]);
                    if (uavDrone != null)
                    {
                        DroneInfo droneInfo = new DroneInfo();
                        droneInfo.UavDrone = uavDrone;

                        #region 挂载
                        string payloadmaps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_map_drone_payload WHERE droneid={0} AND ztm={1}", uavDrone.Id, (int)MODEL.Enum.State.InUse));
                        if (!string.IsNullOrEmpty(payloadmaps))
                        {
                            List<Payload> payloads = new List<Payload>();

                            string[] payloadrows = payloadmaps.Split(new char[] { COM.ConstHelper.rowSplit });
                            for (int j = 0; j < payloadrows.Length; j++)
                            {
                                MapDronePayload mapDronePayload = ParseUavHelper.ParseMapDronePayload(payloadrows[j]);
                                if (mapDronePayload != null)
                                {
                                    if (mapDronePayload.PayloadType == (int)MODEL.EnumUAV.PayloadType.CAMERA)
                                    {
                                        #region 相机
                                        Payload payload = new Payload();
                                        payload.Type = (int)MODEL.EnumUAV.PayloadType.CAMERA;

                                        UavCamera uavCamera = ParseUavHelper.ParseUavCamera(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_payload_camera WHERE id={0} AND ztm={1}", mapDronePayload.PayloadId, (int)MODEL.Enum.State.InUse)));
                                        if (uavCamera != null)
                                        {
                                            Camera camera = new Camera();
                                            camera.UavCamera = uavCamera;

                                            string photoratiomaps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_map_camera_photoratio WHERE cameraid={0} AND ztm={1}", uavCamera.Id, (int)MODEL.Enum.State.InUse));
                                            if (!string.IsNullOrEmpty(photoratiomaps))
                                            {
                                                List<CameraPhotoRatio> cameraPhotoRatios = new List<CameraPhotoRatio>();

                                                string[] photorationrows = photoratiomaps.Split(new char[] { COM.ConstHelper.rowSplit });
                                                for (int k = 0; k < photorationrows.Length; k++)
                                                {
                                                    MapCameraPhotoRatio mapCameraPhotoRatio = ParseUavHelper.ParseMapCameraPhotoRatio(photorationrows[k]);
                                                    if (mapCameraPhotoRatio != null)
                                                    {
                                                        CameraPhotoRatio cameraPhotoRatio = ParseUavHelper.ParseCameraPhotoRatio(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_payload_photoratio WHERE id={0} AND ztm={1}", mapCameraPhotoRatio.PhotoRatioId, (int)MODEL.Enum.State.InUse)));
                                                        if (cameraPhotoRatio != null)
                                                        {
                                                            cameraPhotoRatios.Add(cameraPhotoRatio);
                                                        }
                                                    }
                                                }

                                                if (cameraPhotoRatios.Count > 0)
                                                {
                                                    camera.CameraPhotoRatios = cameraPhotoRatios;
                                                }
                                            }

                                            payload.Camera = camera;
                                            payloads.Add(payload);
                                        }
                                        #endregion
                                    }
                                    else if (mapDronePayload.PayloadType == (int)MODEL.EnumUAV.PayloadType.LIDAR)
                                    {
                                        #region 激光雷达
                                        Payload payload = new Payload();
                                        payload.Type = (int)MODEL.EnumUAV.PayloadType.LIDAR;

                                        /*
                                         * TODO
                                         */
                                        #endregion
                                    }
                                }
                            }

                            if (payloads.Count > 0)
                            {
                                droneInfo.Payloads = payloads;
                            }
                        }
                        #endregion

                        droneInfos.Add(droneInfo);
                    }
                }

                if (droneInfos.Count > 0)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(droneInfos)));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无任何无人机信息！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无任何无人机信息！", string.Empty));
            }
        }

    }
}

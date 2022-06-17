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
    public class FindRouteController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(UavRouteController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 保存巡查航线路径
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string SaveFindRoute()
        {
            string findprojectid = HttpContext.Current.Request.Form["findprojectid"];                 //当前无人机项目id
            string line = HttpContext.Current.Request.Form["line"];                                 //路径图形
            string mis = HttpContext.Current.Request.Form["mis"];                                   //路径json任务
            //string terra = HttpUtility.UrlDecode(HttpContext.Current.Request.Form["terra"]);
            //string pilot = HttpUtility.UrlDecode(HttpContext.Current.Request.Form["pilot"]);
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
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref userbsms);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                #region 航线路径
                FindProject findProject = ParseUavFindHelper.ParseFindProject(PostgresqlHelper.QueryData(pgsqlConnection,string.Format("SELECT *FROM uavfind_project WHERE id={0} AND bsm{1} AND ztm={2}", findprojectid, userbsms, (int)MODEL.Enum.State.InUse)));
            
                if (findProject == null)
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
                    SQLHelper.UpdateString(findProject.BSM),
                    (int)MODEL.Enum.State.InUse,
                    SQLHelper.UpdateString(bz)));

                if (uavrouteid == -1)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建航线失败！", string.Empty));
                }
                #endregion

                #region 项目-路径映射
                int map_project_route = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO uavfind_map_project_route (projectid,routeid,cjsj,ztm) VALUES({0},{1},{2},{3})", findProject.Id, uavrouteid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
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
                            SQLHelper.UpdateString(findProject.BSM),
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
                            SQLHelper.UpdateString(findProject.BSM),
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

                UavRoute uavRoute = ParseUavHelper.ParseUavRoute(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_route WHERE id={0} AND ztm={1}", uavrouteid, (int)MODEL.Enum.State.InUse)));
                if (uavRoute == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "返回航线信息失败！", string.Empty));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(uavRoute)));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }




        #region 方法
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
        #endregion
    }
}

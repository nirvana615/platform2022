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
    public class UavMissionController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(UavMissionController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 远程app查询任务
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string QueryMission()
        {
            string username = HttpContext.Current.Request.Form["username"];//用户
            string password = HttpContext.Current.Request.Form["password"];//密码

            if (username == "uav" && password == "uav")
            {
                List<RemoteMission> remoteMissions = new List<RemoteMission>();
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_route WHERE id IN (10,40,50,53,56)"));
                if (!string.IsNullOrEmpty(data))
                {
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        UavRoute route = ParseUavHelper.ParseUavRoute(rows[i]);
                        if (route != null)
                        {
                            route.LINE = string.Empty;
                            route.PILOT = string.Empty;
                            route.TERRA = string.Empty;

                            CustomMission customMission = JsonHelper.ToObject<CustomMission>(route.MIS);
                            route.MIS = string.Empty;

                            RemoteMission remoteMission = new RemoteMission();
                            remoteMission.route = route;
                            remoteMission.mission = customMission;
                            remoteMissions.Add(remoteMission);
                        }
                    }
                }

                if (remoteMissions.Count > 0)
                {
                    //string result = JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(uavRoutes)));
                    //string resultjson = result.Replace("\\", "").Replace("\"[", "[").Replace("]\"", "]").Replace("\"{", "{").Replace("}\"", "}");
                    return JsonHelper.ToJson(remoteMissions);
                }
                else
                {
                    //return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无航线任务！", string.Empty));
                    return string.Empty;
                }
            }
            else
            {
                //return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户信息错误！", string.Empty));
                return string.Empty;
            }
        }

        [HttpGet]
        public string QueryMission1()
        {
            List<RemoteMission> remoteMissions = new List<RemoteMission>();
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM uav_route WHERE id IN (10,40,50,53,56)"));
            if (!string.IsNullOrEmpty(data))
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    UavRoute route = ParseUavHelper.ParseUavRoute(rows[i]);
                    if (route != null)
                    {
                        route.LINE = string.Empty;
                        route.PILOT = string.Empty;
                        route.TERRA = string.Empty;

                        CustomMission customMission = JsonHelper.ToObject<CustomMission>(route.MIS);
                        route.MIS = string.Empty;

                        RemoteMission remoteMission = new RemoteMission();
                        remoteMission.route = route;
                        remoteMission.mission = customMission;
                        remoteMissions.Add(remoteMission);
                    }
                }
            }

            if (remoteMissions.Count > 0)
            {
                string result = JsonHelper.ToJson(remoteMissions);
                return JsonHelper.ToJson(remoteMissions);
            }
            else
            {
                //return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无航线任务！", string.Empty));
                return string.Empty;
            }

        }
    }
}

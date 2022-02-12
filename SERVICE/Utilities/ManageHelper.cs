using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using COM;
using DAL;
using MODEL;


namespace SERVICE
{
    public class ManageHelper
    {
        /// <summary>
        /// 验证cookie并返回用户项目标识码
        /// </summary>
        /// <param name="connect"></param>
        /// <param name="cookie"></param>
        /// <param name="bsms"></param>
        /// <returns></returns>
        public static COM.CookieHelper.CookieResult ValidateCookie(string connect, string cookie, ref string bsms)
        {
            #region 参数检查
            if (string.IsNullOrEmpty(connect))
            {
                return CookieHelper.CookieResult.FailureCookkie;//无连接信息
            }

            if (string.IsNullOrEmpty(cookie))
            {
                return CookieHelper.CookieResult.NoCookie;//无cookie信息
            }
            #endregion

            try
            {
                string encryptUser = string.Empty;//加密用户信息
                string encryptRole = string.Empty;//加密角色信息

                string[] items = cookie.Split(new char[] { ';' });
                if (items.Length != 2)
                {
                    return CookieHelper.CookieResult.ErrorCookie;//cookie错误
                }

                for (int i = 0; i < items.Length; i++)
                {
                    if (items[i].Contains("User"))
                    {
                        encryptUser = items[i].Replace("User=\"", "").Replace("\"", "").Trim(' ');
                    }
                    if (items[i].Contains("Role"))
                    {
                        encryptRole = items[i].Replace("Role=\"", "").Replace("\"", "").Trim(' ');
                    }
                }

                if (string.IsNullOrEmpty(encryptUser) || string.IsNullOrEmpty(encryptRole))
                {
                    return CookieHelper.CookieResult.ErrorCookie;//cookie错误
                }

                List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(encryptUser);//解密用户信息
                string roleinfo = COM.CookieHelper.GetRoleInfoFromCookie(encryptRole);//解密角色信息

                #region 验证时效性
                if (DateTime.Now.CompareTo(Convert.ToDateTime(userinfo[3])) > 0)
                {
                    return CookieHelper.CookieResult.ExpireCookie;//时效过期
                }
                #endregion

                User user = ParseManageHelper.ParseUser(PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM manage_user WHERE username={0} AND password={1} AND ztm={2}", SQLHelper.UpdateString(userinfo[0]), SQLHelper.UpdateString(userinfo[2]), (int)MODEL.Enum.State.InUse)));
                if (user == null)
                {
                    return CookieHelper.CookieResult.FailureCookkie;//验证用户失败
                }
                else
                {
                    #region 用户项目标识码
                    string bsminfo = string.Empty;

                    #region 监测项目
                    string monitormaps = PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM monitor_map_user_project WHERE userid={0} AND ztm={1}", user.Id, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(monitormaps))
                    {
                        string[] rows = monitormaps.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int i = 0; i < rows.Length; i++)
                        {
                            MapUserMonitorProject mapUserMonitorProject = ParseMonitorHelper.ParseMapUserMonitorProject(rows[i]);
                            if (mapUserMonitorProject != null)
                            {
                                MonitorProject project = ParseMonitorHelper.ParseMonitorProject(PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM monitor_project WHERE id={0} AND ztm={1}", mapUserMonitorProject.MonitorProjectId, (int)MODEL.Enum.State.InUse)));
                                if (project != null)
                                {
                                    bsminfo += project.BSM + ",";
                                }
                            }
                        }
                    }
                    #endregion

                    #region 无人机项目
                    string uavmaps = PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM uav_map_user_project WHERE userid={0} AND ztm={1}", user.Id, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(uavmaps))
                    {
                        string[] rows = uavmaps.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int i = 0; i < rows.Length; i++)
                        {
                            MapUserUavProject mapUserUavProject = ParseUavHelper.ParseMapUserUavProject(rows[i]);
                            if (mapUserUavProject != null)
                            {
                                UavProject uavProject = ParseUavHelper.ParseUavProject(PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM uav_project WHERE id={0} AND ztm={1}", mapUserUavProject.UavProjectId, (int)MODEL.Enum.State.InUse)));
                                if (uavProject != null)
                                {
                                    bsminfo += uavProject.BSM + ",";
                                }
                            }
                        }
                    }
                    #endregion

                    #region 无人机影像项目
                    string imagemaps = PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM image_map_user_project WHERE userid={0} AND ztm={1}", user.Id, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(imagemaps))
                    {
                        string[] rows = imagemaps.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int i = 0; i < rows.Length; i++)
                        {
                            MapUserImageProject mapUserImageProject = ParseImageHelper.ParseMapUserImageProject(rows[i]);
                            if (mapUserImageProject != null)
                            {
                                ImageProject imageProject = ParseImageHelper.ParseImageProject(PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM image_project WHERE id={0} AND ztm={1}", mapUserImageProject.ImageProjectId, (int)MODEL.Enum.State.InUse)));
                                if (imageProject != null)
                                {
                                    bsminfo += imageProject.BSM + ",";
                                }
                            }
                        }
                    }
                    #endregion

                    #region 点云项目
                    string pointcloudmaps = PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM pointcloud_map_user_project WHERE userid={0} AND ztm={1}", user.Id, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(pointcloudmaps))
                    {
                        string[] rows = pointcloudmaps.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int i = 0; i < rows.Length; i++)
                        {
                            MapUserPointCloudProject MapUserPointCloudProject = ParsePointCloudHelper.ParseMapUserPointCloudProject(rows[i]);
                            if (MapUserPointCloudProject != null)
                            {
                                PCloudProject pointcloudProject = ParsePointCloudHelper.ParsePCloudProject(PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM pointcloud_project WHERE id={0} AND ztm={1}", MapUserPointCloudProject.PointCloudProjectId, (int)MODEL.Enum.State.InUse)));
                                if (pointcloudProject != null)
                                {
                                    bsminfo += pointcloudProject.BSM + ",";
                                }
                            }
                        }
                    }
                    #endregion

                    #region 实景模型项目
                    string modelmaps = PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM model_map_user_project WHERE userid={0} AND ztm={1}", user.Id, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(modelmaps))
                    {
                        string[] rows = modelmaps.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int i = 0; i < rows.Length; i++)
                        {
                            MapUserModelProject mapUserModelProject = ParseModelHelper.ParseMapUserModelProject(rows[i]);
                            if (mapUserModelProject != null)
                            {
                                ModelProject modelProject = ParseModelHelper.ParseModelProject(PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM model_project WHERE id={0} AND ztm={1}", mapUserModelProject.ModelProjectId, (int)MODEL.Enum.State.InUse)));
                                if (modelProject != null)
                                {
                                    bsminfo += modelProject.BSM + ",";
                                }
                            }
                        }
                    }
                    #endregion

                    if (!string.IsNullOrEmpty(bsminfo))
                    {
                        bsminfo = bsminfo.TrimEnd(',');
                    }

                    bsms = string.Empty;
                    if (string.IsNullOrEmpty(bsminfo))
                    {
                        bsms = "=''";
                    }
                    else
                    {
                        string[] rows = bsminfo.Split(new char[] { ',' });
                        if (rows.Length == 1)
                        {
                            bsms = "='" + rows[0] + "'";
                        }
                        else
                        {
                            for (int i = 0; i < rows.Length - 1; i++)
                            {
                                bsms += "'" + rows[i] + "',";
                            }

                            bsms = " IN (" + bsms + "'" + rows[rows.Length - 1] + "'" + ")";
                        }
                    }
                    #endregion

                    return CookieHelper.CookieResult.SuccessCookkie;
                }
            }
            catch
            {
                return CookieHelper.CookieResult.FailureCookkie;//验证cookie出错
            }
        }

        /// <summary>
        /// 验证cookie并返回用户
        /// </summary>
        /// <param name="connect"></param>
        /// <param name="cookie"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static COM.CookieHelper.CookieResult ValidateCookie(string connect, string cookie, ref User user)
        {
            #region 参数检查
            if (string.IsNullOrEmpty(connect))
            {
                return CookieHelper.CookieResult.FailureCookkie;//无连接信息
            }

            if (string.IsNullOrEmpty(cookie))
            {
                return CookieHelper.CookieResult.NoCookie;//无cookie信息
            }
            #endregion

            try
            {
                string encryptUser = string.Empty;//加密用户信息
                string encryptRole = string.Empty;//加密角色信息

                string[] items = cookie.Split(new char[] { ';' });
                if (items.Length != 2)
                {
                    return CookieHelper.CookieResult.ErrorCookie;//cookie错误
                }

                for (int i = 0; i < items.Length; i++)
                {
                    if (items[i].Contains("User"))
                    {
                        encryptUser = items[i].Replace("User=\"", "").Replace("\"", "").Trim(' ');
                    }
                    if (items[i].Contains("Role"))
                    {
                        encryptRole = items[i].Replace("Role=\"", "").Replace("\"", "").Trim(' ');
                    }
                }

                if (string.IsNullOrEmpty(encryptUser) || string.IsNullOrEmpty(encryptRole))
                {
                    return CookieHelper.CookieResult.ErrorCookie;//cookie错误
                }

                List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(encryptUser);//解密用户信息
                string roleinfo = COM.CookieHelper.GetRoleInfoFromCookie(encryptRole);//解密角色信息

                #region 验证时效性
                if (DateTime.Now.CompareTo(Convert.ToDateTime(userinfo[3])) > 0)
                {
                    return CookieHelper.CookieResult.ExpireCookie;//时效过期
                }
                #endregion

                user = ParseManageHelper.ParseUser(PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM manage_user WHERE username={0} AND password={1} AND ztm={2}", SQLHelper.UpdateString(userinfo[0]), SQLHelper.UpdateString(userinfo[2]), (int)MODEL.Enum.State.InUse)));
                if (user == null)
                {
                    return CookieHelper.CookieResult.FailureCookkie;//验证用户失败
                }
                else
                {
                    return CookieHelper.CookieResult.SuccessCookkie;
                }
            }
            catch
            {
                return CookieHelper.CookieResult.FailureCookkie;//验证cookie出错
            }
        }

        /// <summary>
        /// 验证cookie并返回用户及系统编码
        /// </summary>
        /// <param name="connect"></param>
        /// <param name="cookie"></param>
        /// <param name="user"></param>
        /// <param name="syscode"></param>
        /// <returns></returns>
        public static COM.CookieHelper.CookieResult ValidateCookie(string connect, string cookie, ref User user, ref int syscode)
        {
            #region 参数检查
            if (string.IsNullOrEmpty(connect))
            {
                return CookieHelper.CookieResult.FailureCookkie;//无连接信息
            }

            if (string.IsNullOrEmpty(cookie))
            {
                return CookieHelper.CookieResult.NoCookie;//无cookie信息
            }
            #endregion

            try
            {
                string encryptUser = string.Empty;//加密用户信息
                string encryptRole = string.Empty;//加密角色信息

                string[] items = cookie.Split(new char[] { ';' });
                if (items.Length != 2)
                {
                    return CookieHelper.CookieResult.ErrorCookie;//cookie错误
                }

                for (int i = 0; i < items.Length; i++)
                {
                    if (items[i].Contains("User"))
                    {
                        encryptUser = items[i].Replace("User=\"", "").Replace("\"", "").Trim(' ');
                    }
                    if (items[i].Contains("Role"))
                    {
                        encryptRole = items[i].Replace("Role=\"", "").Replace("\"", "").Trim(' ');
                    }
                }

                if (string.IsNullOrEmpty(encryptUser) || string.IsNullOrEmpty(encryptRole))
                {
                    return CookieHelper.CookieResult.ErrorCookie;//cookie错误
                }

                List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(encryptUser);//解密用户信息
                string roleinfo = COM.CookieHelper.GetRoleInfoFromCookie(encryptRole);//解密角色信息
                #region 验证时效性
                if (DateTime.Now.CompareTo(Convert.ToDateTime(userinfo[3])) > 0)
                {
                    return CookieHelper.CookieResult.ExpireCookie;//时效过期
                }
                #endregion

                user = ParseManageHelper.ParseUser(PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM manage_user WHERE username={0} AND password={1} AND ztm={2}", SQLHelper.UpdateString(userinfo[0]), SQLHelper.UpdateString(userinfo[2]), (int)MODEL.Enum.State.InUse)));
                if (user == null)
                {
                    return CookieHelper.CookieResult.FailureCookkie;//验证用户失败
                }
                else
                {
                    Systems sys = ParseManageHelper.ParseSystems(PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM manage_system WHERE sysalias={0}", SQLHelper.UpdateString(roleinfo))));
                    if (sys == null)
                    {
                        return CookieHelper.CookieResult.FailureCookkie;
                    }

                    syscode = sys.SysCode;

                    return CookieHelper.CookieResult.SuccessCookkie;
                }
            }
            catch
            {
                return CookieHelper.CookieResult.FailureCookkie;//验证cookie出错
            }
        }
    }
}
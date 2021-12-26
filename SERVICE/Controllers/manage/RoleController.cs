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
    public class RoleController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(RoleController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 系统
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetSystems()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, "SELECT *FROM manage_systems ORDER BY id ASC");

            if (!string.IsNullOrEmpty(data))
            {
                List<Systems> systems = new List<Systems>();
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    Systems system = ParseManageHelper.ParseSystems(rows[i]);
                    if (system != null)
                    {
                        systems.Add(system);
                    }
                }

                if (systems.Count > 0)
                {
                    return JsonHelper.ToJson(systems);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 角色
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetRoles()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, "SELECT *FROM manage_roles ORDER BY id ASC");

            if (!string.IsNullOrEmpty(data))
            {
                List<Role> roles = new List<Role>();
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    Role role = ParseManageHelper.ParseRole(rows[i]);
                    if (role != null)
                    {
                        roles.Add(role);
                    }
                }

                if (roles.Count > 0)
                {
                    return JsonHelper.ToJson(roles);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 用户-角色关系
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetUserRole()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_map_user_sysrole WHERE ztm={0} ORDER BY id ASC", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(data))
            {
                List<MapUserRole> mapUserRoles = new List<MapUserRole>();
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    MapUserRole mapUserRole = ParseManageHelper.ParseMapUserRole(rows[i]);
                    if (mapUserRole != null)
                    {
                        mapUserRoles.Add(mapUserRole);
                    }
                }

                if (mapUserRoles.Count > 0)
                {
                    return JsonHelper.ToJson(mapUserRoles);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 添加用户角色
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddUserRole()
        {
            string userid = HttpContext.Current.Request.Form["userid"];
            string sysid = HttpContext.Current.Request.Form["sysid"];
            string roleid = HttpContext.Current.Request.Form["roleid"];

            #region 参数检查
            if (string.IsNullOrEmpty(userid) || string.IsNullOrEmpty(sysid) || string.IsNullOrEmpty(roleid))
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "参数不全，无法创建！", string.Empty));
            }
            #endregion

            #region 存在性检查
            int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_map_user_sysrole WHERE userid={0} AND roleid={1} AND ztm={2}", userid, roleid, (int)MODEL.Enum.State.InUse));
            if (count > 0)
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "该用户已存在此角色，无法创建！", string.Empty));
            }
            #endregion

            #region 系统-角色一致性检验
            Systems system = ParseManageHelper.ParseSystems(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_systems WHERE id={0}", sysid)));
            if (system == null)
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "未能找到此系统，无法创建！", string.Empty));
            }

            Role role = ParseManageHelper.ParseRole(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_roles WHERE id={0}", roleid)));
            if (role == null)
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "未能找到此角色，无法创建！", string.Empty));
            }

            if (role.SysCode != system.SysCode)
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "系统与角色一致性不符，无法创建！", string.Empty));
            }
            #endregion

            #region 系统唯一性检验
            int syscount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_map_user_sysrole WHERE userid={0} AND roleid IN (SELECT id FROM manage_roles WHERE syscode = (SELECT syscode FROM manage_systems WHERE id={1})) AND ztm={2}", userid, sysid, (int)MODEL.Enum.State.InUse));
            if (syscount > 0)
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, string.Format("规定用户在一个系统中只能有一种角色，该用户已在{0}中存在一种角色，无法在{0}中创建另一种角色", system.SysName), string.Empty));
            }
            #endregion

            int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO manage_map_user_sysrole(userid,roleid,cjsj,ztm) VALUES({0},{1},{2},{3})", userid, roleid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
            if (id == -1)
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建用户角色失败！", string.Empty));
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "创建用成功！", string.Empty));
            }
        }

        /// <summary>
        /// 删除用户角色
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteUserRole()
        {
            string id = HttpContext.Current.Request.Form["id"];
            int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_map_user_sysrole WHERE id={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
            if (count > 0)
            {
                count = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE manage_map_user_sysrole SET ztm={0} WHERE id={1}", (int)MODEL.Enum.State.NoUse, id));
                if (count > 0)
                {
                    return "删除成功！";
                }
                else
                {
                    return "删除失败！";
                }
            }
            else
            {
                return "删除失败，该用户无此角色！";
            }
        }

    }
}

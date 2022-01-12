using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace MODEL
{
    /// <summary>
    /// 解析管理类
    /// </summary>
    public class ParseManageHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParseManageHelper));


        #region 管理类
        /// <summary>
        /// 用户
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static User ParseUser(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析用户数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("用户不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                User user = new User()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    UserName = row[1].ToString(),
                    AliasName = row[10].ToString(),
                    PassWord = row[2].ToString(),
                    BSM = row[3].ToString(),
                    CJSJ = row[4].ToString(),
                    DLSJ = row[5].ToString(),
                    SSDW = row[6].ToString(),
                    SSQY = row[7].ToString(),
                    BZ = row[9].ToString()
                };

                return user;
            }
            catch (Exception ex)
            {
                logger.Error("User解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 系统
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static Systems ParseSystems(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("系统数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("系统不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Systems system = new Systems()
                {
                    Id = Convert.ToInt16(row[0].ToString()),
                    SysName = row[1].ToString(),
                    SysAlias = row[2].ToString(),
                    SysCode = Convert.ToInt16(row[3].ToString()),
                    CJSJ = row[4].ToString(),
                    BZ = row[5].ToString()
                };

                return system;
            }
            catch (Exception ex)
            {
                logger.Error("Systems解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 角色
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static Role ParseRole(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("角色数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("角色不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Role role = new Role()
                {
                    Id = Convert.ToInt16(row[0].ToString()),
                    RoleName = row[1].ToString(),
                    RoleAlias = row[2].ToString(),
                    SysCode = Convert.ToInt16(row[3].ToString()),
                    RoleCode = Convert.ToInt16(row[4].ToString()),
                    CJSJ = row[5].ToString(),
                    BZ = row[6].ToString()
                };

                return role;
            }
            catch (Exception ex)
            {
                logger.Error("Role解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 行政区
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static XZQ ParseXZQ(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析行政区数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("行政区不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                XZQ xzq = new XZQ()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Name = row[1].ToString(),
                    Code = row[2].ToString()
                };

                return xzq;
            }
            catch (Exception ex)
            {
                logger.Error("XZQ解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 坐标系
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static Coordinate ParseCoordinate(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析坐标系统数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("坐标系统不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Coordinate coord = new Coordinate()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    SRID = Convert.ToInt16(row[1].ToString()),
                    NAME = row[2].ToString(),
                    WKT = row[3].ToString()
                };

                return coord;
            }
            catch (Exception ex)
            {
                logger.Error("Coordinate解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 消息推送
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Message ParseMessage(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析消息推送数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("消息推送不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Message message = new Message()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Way = Convert.ToInt16(row[1].ToString()),
                    Webhook = row[2].ToString(),
                    Phone = row[3].ToString(),
                    CJSJ = row[4].ToString(),
                    BZ = row[6].ToString()
                };

                return message;
            }
            catch (Exception ex)
            {
                logger.Error("Message解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 用户登录信息(年分组)
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static LoginUser ParseLoginYearUser(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析用户数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("用户不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                LoginUser loginuser = new LoginUser()
                {
                    UserId = Convert.ToInt32(row[0].ToString()),
                    TIMES = row[1].ToString(),
                    COUNT = Convert.ToInt32(row[2].ToString())
                };

                return loginuser;
            }
            catch (Exception ex)
            {
                logger.Error("loginuser解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 用户登录信息(年月分组)
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static LoginUser ParseLoginMonthUser(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析用户数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("用户不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                LoginUser loginuser = new LoginUser()
                {
                    TIMES = row[0].ToString(),
                    COUNT = Convert.ToInt32(row[1].ToString())
                };

                return loginuser;
            }
            catch (Exception ex)
            {
                logger.Error("loginuser解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 用户登录信息(分系统和年月分组)
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static LoginUser ParseLoginSysMonthUser(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析用户数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("用户不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                LoginUser loginuser = new LoginUser()
                {
                    TIMES = row[0].ToString(),
                    COUNT = Convert.ToInt32(row[1].ToString()),
                    SYSCODE=  Convert.ToInt32(row[2].ToString())
                };

                return loginuser;
            }
            catch (Exception ex)
            {
                logger.Error("loginuser解析失败：" + data, ex);
                return null;
            }
        }
        #endregion


        #region 映射类
        /// <summary>
        /// 用户-角色映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapUserRole ParseMapUserRole(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("用户角色映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("用户角色映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapUserRole mapUserRole = new MapUserRole()
                {
                    Id = Convert.ToInt16(row[0].ToString()),
                    UserId = Convert.ToInt16(row[1].ToString()),
                    RoleId = Convert.ToInt16(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapUserRole;
            }
            catch (Exception ex)
            {
                logger.Error("MapUserRole解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 用户-消息推送映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapUserMessage ParseMapUserMessage(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("用户-消息推送映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("用户-消息推送映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapUserMessage mapUserMessage = new MapUserMessage()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    UserId = Convert.ToInt32(row[1].ToString()),
                    MessageId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapUserMessage;
            }
            catch (Exception ex)
            {
                logger.Error("MapUserMessage解析失败：" + data, ex);
                return null;
            }
        }
        #endregion
    }
}

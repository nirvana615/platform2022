using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using COM;

namespace MODEL
{
    public class ParseUavFindHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParseUavFindHelper));
        #region 映射类
        /// <summary>
        /// 用户-巡查项目映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapUserFindProject ParseMapUserFindProject(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("用户-巡查项目映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("用户-巡查项目映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapUserFindProject mapUserFindlProject = new MapUserFindProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    UserId = Convert.ToInt32(row[1].ToString()),
                    FindProjectId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapUserFindlProject;
            }
            catch (Exception ex)
            {
                logger.Error("MapUserFindProject解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 巡查项目-航线映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapFindProjectRoute ParseMapFindProjectRoute(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("巡查项目-航线映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("巡查项目-航线映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapFindProjectRoute mapFindProjectRoute = new MapFindProjectRoute()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    FindProjectId = Convert.ToInt32(row[1].ToString()),
                    RouteId= Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapFindProjectRoute;
            }
            catch (Exception ex)
            {
                logger.Error("MapFindProjectRoute解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 巡查项目-目标映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapFindProjectTarget ParseMapFindProjectTarget(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("巡查项目-目标映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("巡查项目-目标映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapFindProjectTarget mapFindProjectTarget = new MapFindProjectTarget()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    FindProjectId = Convert.ToInt32(row[1].ToString()),
                    TargetId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapFindProjectTarget;
            }
            catch (Exception ex)
            {
                logger.Error("MapFindProjectTarget解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 巡查目标-航点映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapFindTargetWaypoint ParseMapFindTargetWaypoint(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("巡查目标-航点映射映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("巡查目标-航点映射映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapFindTargetWaypoint mapFindTargetWaypoint = new MapFindTargetWaypoint()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    TargetId = Convert.ToInt32(row[1].ToString()),
                    WaypointId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapFindTargetWaypoint;
            }
            catch (Exception ex)
            {
                logger.Error("MapFindTargetWaypoint解析失败：" + data, ex);
                return null;
            }
        }




        #endregion



        #region 业务类
        /// <summary>
        /// 巡查项目
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static FindProject ParseFindProject(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析巡查项目数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("巡查项目不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                FindProject findProject = new FindProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    XMMC = row[1].ToString(),
                    XMBM = row[2].ToString(),
                    XMJC = row[3].ToString(),
                    XZQBM = row[4].ToString(),
                    ZXJD = Convert.ToDouble(row[5].ToString()),
                    ZXWD = Convert.ToDouble(row[6].ToString()),
                    XMSJ = row[7].ToString(),
                    XMWZ = row[8].ToString(),
                    CJSJ = row[9].ToString(),
                    BSM = row[10].ToString(),
                    BZ = row[12].ToString()
                };

                return findProject;
            }
            catch (Exception ex)
            {
                logger.Error("FindProject解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 巡查目标
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static FindTarget ParseFindTarget(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析巡查目标数据为空！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("巡查目标不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                FindTarget findTarget = new FindTarget()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    MBMC = row[1].ToString(),
                    MBBH = row[2].ToString(),
                    MBLX = Convert.ToInt16(row[3].ToString()),
                    JD = Convert.ToDouble(row[4].ToString()),
                    WD = Convert.ToDouble(row[5].ToString()),
                    GC = Convert.ToDouble(row[6].ToString()),
                    CJSJ = row[7].ToString(),
                    BSM = row[8].ToString(),
                    BZ = row[10].ToString()
                };

                return findTarget;
            }
            catch (Exception ex)
            {
                logger.Error("FindProject解析失败：" + data, ex);
                return null;
            }
        }






        #endregion


    }
}

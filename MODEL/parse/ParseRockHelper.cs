using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace MODEL
{
    /// <summary>
    /// 解析监测类
    /// </summary>
    public class ParseRockHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParseRockHelper));

        /// <summary>
        /// 消落带项目信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static RockProject ParseProject(string data)
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
                RockProject project = new RockProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    XMMC = row[1].ToString(),
                    XMBM = row[2].ToString(),
                    XZQBM = row[13].ToString(),
                    XMWZ = row[12].ToString(),
                    CJSJ = row[3].ToString(),
                    BSM = row[5].ToString(),
                    ZTM = Convert.ToInt16(row[6].ToString()),
                    BZ = row[7].ToString(),
                    ZXJD = Convert.ToDouble(row[10].ToString()),
                    ZXWD = Convert.ToDouble(row[11].ToString()),
                    FZR = row[8].ToString(),
                    modelId = row[9].ToString(),
                    XMKSSJ = row[14].ToString(),
                    mianJi = row[15].ToString(),
                    zhongChang = row[16].ToString(),
                    tiJi = row[17].ToString(),
                    puoXiang = row[18].ToString(),

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
        /// 消落带点的存储信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static RockData ParseRockData(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析Rock_Data_point数据为空！");
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
                RockData flzDataPoint = new RockData()
                {
                    id = Convert.ToInt32(row[0].ToString()),
                    projectId = Convert.ToInt32(row[1].ToString()),
                    postion = row[2].ToString(),
                    type = row[3].ToString(),
                    name = row[4].ToString(),
                    remarks = row[5].ToString(),
                    src = row[6].ToString(),
                    inclination = row[7].ToString(),
                    dipAngle = row[8].ToString(),
                    trend = row[9].ToString(),
                    traceLength = row[10].ToString(),
                    avgOpening = row[11].ToString(),
                    creatTime = row[12].ToString(),
                    modleTime = row[13].ToString(),
                    windowId = row[14].ToString(),
                    measure = row[15].ToString(),
                    modleId = row[16].ToString(),
                    collector = row[17].ToString(),
                    colour = row[18].ToString(),
                    lineType = row[19].ToString(),
                    lineSize = row[20].ToString(),



                };
                return flzDataPoint;
            }
            catch (Exception ex)
            {
                logger.Error("Project解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 侧窗信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static RockWindowInfo ParseRockWindowInfo(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析flz_Window_Info数据为空！");
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
                RockWindowInfo flzWindowInfo = new RockWindowInfo()
                {
                    id = Convert.ToInt32(row[0].ToString()),
                    projectId = Convert.ToInt32(row[4].ToString()),
                    points = row[2].ToString(),
                    name = row[1].ToString(),
                    remarks = row[5].ToString(),
                    sideLength = row[6].ToString(),
                    creatTime = row[3].ToString(),
                    sidebLength = row[7].ToString(),
                    axisx = row[8].ToString(),
                    axisy = row[9].ToString(),
                    normal = row[10].ToString(),
                    origin = row[11].ToString(),
                    vertices2d = row[12].ToString(),
                    vertices3d = row[13].ToString(),
                    vertices3dlbh = row[14].ToString(),
                    level = row[15].ToString(),
                    vertical = row[16].ToString(),
                    height = row[17].ToString(),

                };
                return flzWindowInfo;
            }
            catch (Exception ex)
            {
                logger.Error("Project解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 链接表
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static RockMapUserMonitorProject ParseRockUserProject(string data)
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
                RockMapUserMonitorProject project = new RockMapUserMonitorProject()
                {
                    id = Convert.ToInt32(row[0].ToString()),
                    userId = row[1].ToString(),
                    projectId = row[2].ToString(),
                 

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
        /// 侧窗信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static RockDesignData ParseRockDesignData(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析rock_design_data数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("设计值不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                RockDesignData rockDesignData = new RockDesignData()
                {
                    id = Convert.ToInt32(row[0].ToString()),
                    projectId = Convert.ToInt32(row[1].ToString()),
                    profilePostion = row[2].ToString(),
                    measurWindowPostion = row[3].ToString(),
                    drillHolePostion = row[4].ToString(),
                    probeSlotPostion = row[5].ToString(),
                    name = row[6].ToString(),
                    remark = row[7].ToString(),
                    lastModifiedPro = row[8].ToString(),
                    lastModifiedTime = row[9].ToString(),
                };
                return rockDesignData;
            }
            catch (Exception ex)
            {
                logger.Error("Project解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 剖面信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static RockSelectLine ParseRockSelectLine(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析rock_select_line数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("设计值不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                RockSelectLine rockSelectLine = new RockSelectLine()
                {
                    id = Convert.ToInt32(row[0].ToString()),
                    pmmc = row[1].ToString(),
                    pmid = Convert.ToInt32(row[2].ToString()),
                    xmid = Convert.ToInt32(row[3].ToString()),
                    ysline = row[4].ToString(),
                    xgline = row[5].ToString(),
                    gcline = row[6].ToString(),
                    startpoint = row[7].ToString(),
                    endpoint = row[8].ToString(),
                };
                return rockSelectLine;
            }
            catch (Exception ex)
            {
                logger.Error("Project解析失败：" + data, ex);
                return null;
            }
        }
    }
}

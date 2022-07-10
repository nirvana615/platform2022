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
    public class ParseFlzoneHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParseFlzoneHelper));

        /// <summary>
        /// 消落带项目信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static FlzProject ParseProject(string data)
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
                FlzProject project = new FlzProject()
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
                    hygc = row[19].ToString(),
                    gshd = row[20].ToString(),
                    dcyx = row[21].ToString(),
                    ytjg = row[22].ToString(),
                    yccz = row[23].ToString(),
                    apjg = row[24].ToString(),
                    qglx = row[25].ToString(),
                    dmbj = row[26].ToString(),
                    bxjx = row[27].ToString(),
                    ytlh = row[28].ToString(),
                    zbfg = row[29].ToString(),
                    dcyxScore = row[30].ToString(),
                    ytjgScore = row[31].ToString(),
                    ycczScore = row[32].ToString(),
                    apjgScore = row[33].ToString(),
                    qglxScore = row[34].ToString(),
                    dmbjScore = row[35].ToString(),
                    bxjxScore = row[36].ToString(),
                    ytlhScore = row[37].ToString(),
                    zbfgScore = row[38].ToString(),
                    dcyxWeight = row[39].ToString(),
                    ytjgWeight = row[40].ToString(),
                    ycczWeight = row[41].ToString(),
                    apjgWeight = row[42].ToString(),
                    qglxWeight = row[43].ToString(),
                    dmbjWeight = row[44].ToString(),
                    bxjxWeight = row[45].ToString(),
                    ytlhWeight = row[46].ToString(),
                    zbfgWeight = row[47].ToString(),
                    flzRange = row[48].ToString(),
                    projectScore = row[49].ToString()


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
        public static FlzData ParseFlzData(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析Flz_Data_point数据为空！");
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
                FlzData flzDataPoint = new FlzData()
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
        public static FlzWindowInfo ParseFlzWindowInfo(string data)
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
                FlzWindowInfo flzWindowInfo = new FlzWindowInfo()
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
        /// 斜坡信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static FlzSteepHillInfo ParseFlzSteepHillInfo(string data)
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
                FlzSteepHillInfo flzWindowInfo = new FlzSteepHillInfo()
                {
                    id = Convert.ToInt32(row[0].ToString()),
                    projectId = Convert.ToInt32(row[4].ToString()),
                    points = row[2].ToString(),
                    name = row[1].ToString(),
                    remarks = row[5].ToString(),
                    creatTime = row[3].ToString(),
                    level = row[6].ToString(),
                    vertical = row[7].ToString(),
                    status = row[8].ToString(),
                    appd = row[9].ToString(),
                    appdrest = row[10].ToString(),
                    apjg = row[11].ToString(),
                    apjgrest = row[12].ToString(),
                    xpbj = row[13].ToString(),
                    xpbjrest = row[14].ToString(),
                    yxyz = row[15].ToString(),
                    yxyzrest = row[16].ToString(),
                    ruc = row[17].ToString(),
                    rucrest = row[18].ToString(),
                    ytjg = row[19].ToString(),
                    ytjgrest = row[20].ToString(),
                    ytfh = row[21].ToString(),
                    ytfhrest = row[22].ToString(),
                    ytlh = row[23].ToString(),
                    ytlhrest = row[24].ToString(),
                    dxdm = row[25].ToString(),
                    dzgz = row[26].ToString(),
                    gcdz = row[27].ToString(),
                    score = row[28].ToString(),
                    appdSrc = row[29].ToString(),
                    apjgSrc = row[30].ToString(),
                    xpbjSrc = row[31].ToString(),
                    yxyzSrc = row[32].ToString(),
                    rucSrc = row[33].ToString(),
                    ytjgSrc = row[34].ToString(),
                    ytfhSrc = row[35].ToString(),
                    ytlhSrc = row[36].ToString(),
                    jieLun = row[37].ToString(),
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
        /// 斜坡信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static FlzShiBieModelInfo ParseFlzShiBieModelInfo(string data)
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
                FlzShiBieModelInfo flzWindowInfo = new FlzShiBieModelInfo()
                {
                    id = Convert.ToInt32(row[0].ToString()),
                    projectId = Convert.ToInt32(row[1].ToString()),
                    indicatorType = row[2].ToString(),
                    identificatIndex = row[3].ToString(),
                    indexFactor = row[4].ToString(),
                    factorValue = row[5].ToString(),
                    evaluationCriteria = row[6].ToString(),
                };
                return flzWindowInfo;
            }
            catch (Exception ex)
            {
                logger.Error("识别模型解析失败：" + data, ex);
                return null;
            }
        }

    }
}

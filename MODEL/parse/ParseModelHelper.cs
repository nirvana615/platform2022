using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

using COM;

namespace MODEL
{
    /// <summary>
    /// 解析实景模型类
    /// </summary>
    public class ParseModelHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParseModelHelper));


        /// <summary>
        /// 用户-模型项目映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapUserModelProject ParseMapUserModelProject(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("用户-实景模型项目映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("用户-实景模型项目映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapUserModelProject mapUserModelProject = new MapUserModelProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    UserId = Convert.ToInt32(row[1].ToString()),
                    ModelProjectId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapUserModelProject;
            }
            catch (Exception ex)
            {
                logger.Error("MapUserModelProject解析失败：" + data, ex);
                return null;
            }
        }

        #region 业务类
        /// <summary>
        /// 模型项目
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static ModelProject ParseModelProject(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析实景模型项目数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("实景模型项目不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                ModelProject modelProject = new ModelProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    XMMC = row[1].ToString(),
                    XMJC = row[12].ToString(),
                    XMBM = row[2].ToString(),
                    XZQBM = row[3].ToString(),
                    ZXJD = Convert.ToDouble(row[4].ToString()),
                    ZXWD = Convert.ToDouble(row[5].ToString()),
                    XMSJ = row[6].ToString(),
                    XMWZ = row[7].ToString(),
                    CJSJ = row[8].ToString(),
                    BSM = row[9].ToString(),
                    BZ = row[11].ToString()
                };

                return modelProject;
            }
            catch (Exception ex)
            {
                logger.Error("ModelProject解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 航测任务
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static ModelTask ParseModelTask(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析任务数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("任务不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                ModelTask modelTask = new ModelTask()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    RWMC = row[1].ToString(),
                    RWBM = row[2].ToString(),
                    YXCJRY = row[3].ToString(),
                    YXCJSJ = row[4].ToString(),
                    YXCJSB = Convert.ToInt32(row[5].ToString()),
                    YXSL = Convert.ToInt32(row[6].ToString()),
                    YXKZD = row[7].ToString(),
                    YXFW = row[8].ToString(),
                    YXCFLJ = row[9].ToString(),
                    SRID = Convert.ToInt32(row[10].ToString()),
                    SXCG = row[11].ToString(),
                    RWMS = row[12].ToString(),
                    RWCJSJ = row[13].ToString(),
                    BSM = row[14].ToString(),
                    BZ = row[16].ToString(),
                    MXSJ = row[17].ToString(),
                    RWZT = Convert.ToInt32(row[18].ToString()),
                    MXLJ = row[19].ToString(),
                    YXPOS = row[20].ToString()
                };

                if (string.IsNullOrEmpty(row[21].ToString()))
                {
                    modelTask.MXDJ = null;
                }
                else
                {
                    modelTask.MXDJ = Convert.ToInt16(row[21].ToString());
                }
                if (string.IsNullOrEmpty(row[22].ToString()))
                {
                    modelTask.GCYC = null;
                }
                else
                {
                    modelTask.GCYC = Convert.ToDouble(row[22].ToString()); ;
                }

                return modelTask;
            }
            catch (Exception ex)
            {
                logger.Error("ModelData解析失败：" + data, ex);
                return null;
            }
        }
        #endregion

        #region 映射类
        /// <summary>
        /// 项目-任务映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapModelProjecTask ParseMapModelProjecTask(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("项目-任务射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("项目-任务映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapModelProjecTask mapModelProjecTask = new MapModelProjecTask()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ModelProjectId = Convert.ToInt32(row[1].ToString()),
                    TaskId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapModelProjecTask;
            }
            catch (Exception ex)
            {
                logger.Error("MapModelProjecTask解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 业务项目-模型项目映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapProjectUse ParseMapProjectUse(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("业务项目-模型项目映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("业务项目-模型项目映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapProjectUse mapProjectUse = new MapProjectUse()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Syscode = Convert.ToInt16(row[1].ToString()),
                    UseProjectId = Convert.ToInt32(row[2].ToString()),
                    ModelProjectId = Convert.ToInt32(row[3].ToString()),
                    ModelTaskId = Convert.ToInt32(row[4].ToString()),
                    CJSJ = row[5].ToString()
                };

                return mapProjectUse;
            }
            catch (Exception ex)
            {
                logger.Error("MapProjectUse解析失败：" + data, ex);
                return null;
            }
        }
        #endregion
    }
}

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

        #region 一、业务

        /// <summary>
        /// 1---项目
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
                    XMBM = row[2].ToString(),
                    XZQBM = row[3].ToString(),
                    XMSJ = row[6].ToString(),
                    XMWZ = row[7].ToString(),
                    CJSJ = row[8].ToString(),
                    BSM = row[9].ToString(),
                    BZ = row[11].ToString()
                };
                if (string.IsNullOrEmpty(row[4].ToString()))
                {
                    modelProject.ZXJD = null;
                }
                else
                {
                    modelProject.ZXJD = Convert.ToDouble(row[4].ToString());
                }
                if (string.IsNullOrEmpty(row[5].ToString()))
                {
                    modelProject.ZXWD = null;
                }
                else
                {
                    modelProject.ZXWD = Convert.ToDouble(row[5].ToString());
                }

                return modelProject;
            }
            catch (Exception ex)
            {
                logger.Error("ModelProject解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 2---任务
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
                    YXCJSJ = row[4].ToString(),
                    YXSL = Convert.ToInt32(row[6].ToString()),
                    YXKZD = row[7].ToString(),
                    YXFW =row[8].ToString(),
                    YXCFLJ = row[9].ToString(),
                    SRID = Convert.ToInt32(row[10].ToString()),
                    SXCG = row[11].ToString(),
                    RWCJSJ = row[13].ToString(),
                    BSM = row[14].ToString(),
                    RWZT= Convert.ToInt32(row[18].ToString()),
                };
                if (string.IsNullOrEmpty(row[3].ToString()))
                {
                    modelTask.YXCJRY = null;
                }
                else
                {
                    modelTask.YXCJRY = row[3].ToString();
                }
                if (string.IsNullOrEmpty(row[5].ToString()))
                {
                    modelTask.YXCJSB = null;
                }
                else
                {
                    modelTask.YXCJSB = Convert.ToInt32(row[5].ToString());
                }
                if (string.IsNullOrEmpty(row[12].ToString()))
                {
                    modelTask.RWMS = null;
                }
                else
                {
                    modelTask.RWMS = row[12].ToString();
                }
                if (string.IsNullOrEmpty(row[16].ToString()))
                {
                    modelTask.BZ = null;
                }
                else
                {
                    modelTask.BZ = row[16].ToString();
                }
                if (string.IsNullOrEmpty(row[17].ToString()))
                {
                    modelTask.MXSJ = null;
                }
                else
                {
                    modelTask.MXSJ = row[17].ToString();
                }
                if (string.IsNullOrEmpty(row[19].ToString()))
                {
                    modelTask.MXLJ = null;
                }
                else
                {
                    modelTask.MXLJ = row[19].ToString();
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

        #region 二、映射
        /// <summary>
        /// 1---用户-模型项目映射
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
        /// <summary>
        /// 数据用户项目映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapDataUserModelProject ParseMapDataUserModelProject(string data)
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
                MapDataUserModelProject mapDataUserModelProject = new MapDataUserModelProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    UserId = Convert.ToInt32(row[1].ToString()),
                    ModelProjectId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapDataUserModelProject;
            }
            catch (Exception ex)
            {
                logger.Error("MapDataUserModelProject解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 模型项目-任务映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapModelProjecTask ParseMapModelProjecTask(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("模型项目-任务射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("模型项目-任务映射不唯一！");
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

        #endregion
    }
}

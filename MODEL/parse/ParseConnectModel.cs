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
    /// 解析实景模型关联
    /// </summary>
    public class ParseConnectModelHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParseModelHelper));
     
        /// <summary>
        /// 项目与模型项目映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapProjectModelProject ParseMapProjectModelProject(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("项目-实景模型项目映射数据为空！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("项目-实景模型项目映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapProjectModelProject mapProjectModelProject = new MapProjectModelProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ProjectId= Convert.ToInt32(row[1].ToString()),
                    Syscode = Convert.ToInt32(row[2].ToString()),
                    ModelProjectId = Convert.ToInt32(row[3].ToString()),
                    CJSJ = row[4].ToString()
                };
                return mapProjectModelProject;
            }
            catch (Exception ex)
            {
                logger.Error("MapProjectModelProject解析失败：" + data, ex);
                return null;
            }
        }
        
    }
}

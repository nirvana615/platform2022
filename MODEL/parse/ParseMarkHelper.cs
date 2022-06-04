using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace MODEL
{
    public class ParseMarkHelper
    {
        /// <summary>
        /// 解析标注类
        /// </summary>
        private static Logger logger = Logger.CreateLogger(typeof(ParseMarkHelper));

       
        /// <summary>
        ///标注
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MarkData ParseMark(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析标注数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("标注不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MarkData MarkData = new MarkData()
                {
                    id = row[0].ToString(),
                    title = row[1].ToString(),
                    projetid = row[2].ToString(),
                    marktype = row[3].ToString(),
                    style = row[4].ToString(),
                    color = row[5].ToString(),
                    position = row[6].ToString(),
                    info = row[7].ToString(),
                };
                return MarkData;
            }
            catch (Exception ex)
            {
                logger.Error("MarkData解析失败：" + data, ex);
                return null;
            }
        }
    }
}

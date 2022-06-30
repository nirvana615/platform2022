using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using COM;

namespace MODEL
{
     public class ParseContruction
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParseFlzoneHelper));


        public static ConstructionInfo ParseConstructionInfo(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析ConstructionInfo数据为空！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("ConstructionInfo不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                ConstructionInfo constructionInfo = new ConstructionInfo()
                {
                    id = Convert.ToInt32(row[0].ToString()),
                    project_id = Convert.ToInt32(row[1].ToString()),
                    ht_name = row[2].ToString(),
                    start_time = row[3].ToString(),
                    end_time = row[4].ToString(),
                    participants = row[5].ToString(),
                    project_leader = row[6].ToString(),
                    technical_director = row[7].ToString(),
                    scene_leader = row[8].ToString(),
                    cjsj = row[9].ToString(),
                    size = row[10].ToString(),
                    bz = row[11].ToString(),
                    ztm = Convert.ToInt32(row[12].ToString()),

                };
                return constructionInfo;
            }
            catch (Exception ex)
            {
                logger.Error("ConstructionInfo解析失败：" + data, ex);
                return null;
            }

        }





    }
}

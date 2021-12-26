using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class ETL
    {
        /// <summary>
        /// 设备信息
        /// </summary>
        public Device Device { get; set; }
        /// <summary>
        /// 源数据库
        /// </summary>
        public Database Database { get; set; }
        /// <summary>
        /// 读取SQL
        /// </summary>
        public SQL ReadSQL { get; set; }
        /// <summary>
        /// 写入SQL
        /// </summary>
        public SQL WriteSQL { get; set; }
    }
}

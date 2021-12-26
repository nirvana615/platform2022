using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 航点-目标图像采集参数映射
    /// </summary>
    public class MapWaypointMBTXCJ
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 航点id
        /// </summary>
        public int WaypointId { get; set; }
        /// <summary>
        /// 目标图像采集参数id
        /// </summary>
        public int MBTXCJId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

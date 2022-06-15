using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 灾害体-监测点映射
    /// </summary>
    public class MapDisasterMonitor
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 灾害体id
        /// </summary>
        public int DisasterId { get; set; }
        /// <summary>
        /// 监测点id
        /// </summary>
        public int MonitorId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 监测点-阈值映射
    /// </summary>
    public class MapMonitorThreshold
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 监测点id
        /// </summary>
        public int MonitorId { get; set; }
        /// <summary>
        /// 阈值id
        /// </summary>
        public int ThresholdId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 监测信息
    /// </summary>
    public class MonitorInfo
    {
        /// <summary>
        /// 灾害体信息
        /// </summary>
        public DisasterString DisasterString { get; set; }
        /// <summary>
        /// 监测剖面信息
        /// </summary>
        public SectionString SectionString { get; set; }
        /// <summary>
        /// 监测点信息
        /// </summary>
        public MonitorString MonitorString { get; set; }
    }
}

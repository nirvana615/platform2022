using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 设备-采集间隔映射
    /// </summary>
    public class MapDeviceInterval
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 设备id
        /// </summary>
        public int DeviceId { get; set; }
        /// <summary>
        /// 采集间隔id
        /// </summary>
        public int IntervalId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

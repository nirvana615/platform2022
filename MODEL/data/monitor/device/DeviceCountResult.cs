using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class DeviceCountResult
    {
        /// <summary>
        /// 设备采集数量（每天）
        /// </summary>
        public List<DeviceCountDay> DeviceCounts { get; set; }
        /// <summary>
        /// 采集率
        /// </summary>
        public double Rate { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class DeviceOnlineResult
    {
        /// <summary>
        /// 预选日期范围
        /// </summary>
        public List<string> DateTimes { get; set; }
        /// <summary>
        /// Monitor与Device映射
        /// </summary>
        public List<MonitorDeviceMap> MonitorDeviceMaps { get; set; }
        /// <summary>
        /// GNSS数据
        /// </summary>
        public List<GNSS> GNSSDatas { get; set; }
        /// <summary>
        /// 裂缝数据
        /// </summary>
        public List<LF> LFDatas { get; set; }
        /// <summary>
        /// 倾角数据
        /// </summary>
        public List<QJ> QJDatas { get; set; }
        /// <summary>
        /// 应力数据
        /// </summary>
        public List<YL> YLDatas { get; set; }
        /// <summary>
        /// 雨量数据
        /// </summary>
        public List<RAIN> RAINDatas { get; set; }
        /// <summary>
        /// 深部位移数据
        /// </summary>
        public List<SBWY> SBWYDatas { get; set; }
        /// <summary>
        /// 水位数据
        /// </summary>
        public List<WATER> WATERDatas { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// Device-Check-Result
    /// 设备检查结果
    /// </summary>
    public class DCR
    {
        /// <summary>
        /// 设备编码
        /// </summary>
        public string DeviceCode { get; set; }
        /// <summary>
        /// 设备标识码
        /// </summary>
        public string BSM { get; set; }
        /// <summary>
        /// 项目简称
        /// </summary>
        public string ProjectName { get; set; }
        /// <summary>
        /// 监测类型
        /// </summary>
        public string MonitorType { get; set; }
        /// <summary>
        /// 检查结果
        /// </summary>
        public int CheckResult { get; set; }
        /// <summary>
        /// 按照采集频率一天应采集的数量
        /// </summary>
        public int Count { get; set; }
        /// <summary>
        /// 缺失数量
        /// </summary>
        public int? LostNum { get; set; }
        /// <summary>
        /// 缺失天数
        /// </summary>
        public int? LostDay { get; set; }
    }
}

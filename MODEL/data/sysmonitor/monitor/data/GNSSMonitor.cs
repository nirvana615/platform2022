using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// x y xy h变形量及各统计量（最小值、最大值、平均值、标准差）
    /// </summary>
    public class GNSSMonitor
    {
        /// <summary>
        /// 监测数据
        /// </summary>
        public List<GNSSDelta> Datas { get; set; }

        /// <summary>
        /// 数据统计
        /// </summary>
        public List<DataStatistics> Statistics { get; set; }
    }
}

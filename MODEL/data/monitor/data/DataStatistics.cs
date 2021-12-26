using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class DataStatistics
    {
        /// <summary>
        /// 统计项
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 最小值
        /// </summary>
        public double Min { get; set; }
        /// <summary>
        /// 最大值
        /// </summary>
        public double Max { get; set; }
        /// <summary>
        /// 平均值
        /// </summary>
        public double Avg { get; set; }
        /// <summary>
        /// 标准差
        /// </summary>
        public double Sd { get; set; }
    }
}

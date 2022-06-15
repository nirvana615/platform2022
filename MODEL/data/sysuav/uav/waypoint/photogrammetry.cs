using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 斜坡摄影测量参数
    /// </summary>
    public class photogrammetry
    {
        /// <summary>
        /// 地面分辨率（cm）
        /// </summary>
        public double gsd { get; set; }
        /// <summary>
        /// 航向重叠度（百分比）
        /// </summary>
        public double fo { get; set; }
        /// <summary>
        /// 旁向重叠度（百分比）
        /// </summary>
        public double so { get; set; }
        /// <summary>
        /// 首末航线多角度
        /// </summary>
        public bool ma { get; set; }
        /// <summary>
        /// 井字形
        /// </summary>
        public bool dg { get; set; }
        /// <summary>
        /// 方向修正
        /// </summary>
        public bool dm { get; set; }
    }
}

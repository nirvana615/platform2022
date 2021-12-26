using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 灾害体-临界条件映射
    /// </summary>
    public class MapDisasterThreshold
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
        /// 阈值id
        /// </summary>
        public int ThresholdId { get; set; }
        /// <summary>
        /// 类型（危岩崩坍、滑坡）
        /// </summary>
        public int Type { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

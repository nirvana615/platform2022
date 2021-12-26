using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 灾害体-预警模型参数映射
    /// </summary>
    public class MapDisasterWarning
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
        /// 预警模型参数id
        /// </summary>
        public int WarningId { get; set; }
        /// <summary>
        /// 灾害类型（危岩崩塌、滑坡、泥石流）
        /// </summary>
        public int Type { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

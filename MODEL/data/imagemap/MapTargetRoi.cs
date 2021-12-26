using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 拍摄目标点-靶区映射
    /// </summary>
    public class MapTargetRoi
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }        
        /// <summary>
        /// 目标点id
        /// </summary>
        public int TargetId { get; set; }
        /// <summary>
        /// 靶区id
        /// </summary>
        public int RoiId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; } 
    }
}

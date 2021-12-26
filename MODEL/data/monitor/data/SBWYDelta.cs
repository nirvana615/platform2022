using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class SBWYDelta
    {
        /// <summary>
        /// id（与SBWY数据一致）
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 观测时间转UNIX时间戳
        /// </summary>
        public int Unix { get; set; }
        /// <summary>
        /// X方向位移
        /// </summary>
        public double X { get; set; }
        /// <summary>
        /// Y方向位移
        /// </summary>
        public double Y { get; set; }
        /// <summary>
        /// Z方向位移
        /// </summary>
        public double? Z { get; set; }
        /// <summary>
        /// 时间
        /// </summary>
        public string Time { get; set; }
        /// <summary>
        /// 数据标识（原始/新增、删除、保留）
        /// </summary>
        public string Flag { get; set; }
    }
}

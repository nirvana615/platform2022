using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// GNSS变形量
    /// </summary>
    public class GNSSDelta
    {
        /// <summary>
        /// id（与GNSS数据一致）
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 观测时间转UNIX时间戳
        /// </summary>
        public int Unix { get; set; }
        /// <summary>
        /// 平面坐标x变化量（当前值-初始值）
        /// </summary>
        public double Dx { get; set; }
        /// <summary>
        /// 平面坐标y变化量（当前值-初始值）
        /// </summary>
        public double Dy { get; set; }
        /// <summary>
        /// 平面位移量（当前值-初始值）
        /// </summary>
        public double Dxy { get; set; }
        /// <summary>
        /// 高程位移量（当前值-初始值）
        /// </summary>
        public double Dh { get; set; }
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

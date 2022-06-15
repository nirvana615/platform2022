using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 倾角角度变形量
    /// </summary>
    public class QJDelta
    {
        /// <summary>
        /// id（与QJ数据一致）
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 观测时间转UNIX时间戳
        /// </summary>
        public int Unix { get; set; }
        /// <summary>
        /// X方向角度变化量（当前值-初始值）
        /// </summary>
        public double Dx { get; set; }
        /// <summary>
        /// Y方向角度变化量（当前值-初始值）
        /// </summary>
        public double Dy { get; set; }
        /// <summary>
        /// Z方向角度变化量（当前值-初始值）
        /// </summary>
        public double? Dz { get; set; }
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

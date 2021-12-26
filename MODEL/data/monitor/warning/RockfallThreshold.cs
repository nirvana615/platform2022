using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 危岩崩塌临界条件
    /// </summary>
    public class RockfallThreshold
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 判据公式
        /// </summary>
        public int GS { get; set; }
        /// <summary>
        /// 调整系数
        /// </summary>
        public double XS { get; set; }
        /// <summary>
        /// 阈值
        /// </summary>
        public double YZ { get; set; }
        /// <summary>
        /// 单位
        /// </summary>
        public string DW { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// 标识码
        /// </summary>
        public string BSM { get; set; }
        /// <summary>
        /// 状态码
        /// </summary>
        public int ZTM { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }
    }
}

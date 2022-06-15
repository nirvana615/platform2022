using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 监测阈值
    /// </summary>
    public class MonitorThreshold
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 类型
        /// </summary>
        public int LX { get; set; }
        /// <summary>
        /// 系数
        /// </summary>
        public double XS { get; set; }
        /// <summary>
        /// 阈值
        /// </summary>
        public string YZ { get; set; }
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

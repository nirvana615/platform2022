using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 降雨量
    /// </summary>
    public class RAIN
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 唯一编码
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 源数据唯一索引
        /// </summary>
        public string Index { get; set; }
        /// <summary>
        /// 设备编号
        /// </summary>
        public string SBBH { get; set; }
        /// <summary>
        /// 雨量值
        /// </summary>
        public double Value { get; set; }
        /// <summary>
        /// 雨量单位（默认mm）
        /// </summary>
        public string DW { get; set; }
        /// <summary>
        /// 类别
        /// </summary>
        public string LB { get; set; }
        /// <summary>
        /// 观测时间
        /// </summary>
        public string GCSJ { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// 标识码
        /// </summary>
        public string BSM { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }
    }
}

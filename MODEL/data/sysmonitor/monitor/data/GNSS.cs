using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// GNSS
    /// </summary>
    public class GNSS
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
        /// 平面x坐标（非测绘）
        /// </summary>
        public double X { get; set; }
        /// <summary>
        /// 平面y坐标（非测绘）
        /// </summary>
        public double Y { get; set; }
        /// <summary>
        /// 高程（默认85高程）
        /// </summary>
        public double H { get; set; }
        /// <summary>
        /// 坐标单位
        /// </summary>
        public string ZBDW { get; set; }
        /// <summary>
        /// 空间参考（SRID）
        /// </summary>
        public int KJCK { get; set; }
        /// <summary>
        /// 解算类型
        /// </summary>
        public int JSLX { get; set; }
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

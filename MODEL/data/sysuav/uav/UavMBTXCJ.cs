using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 目标图像采集参数
    /// </summary>
    public class UavMBTXCJ
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 拍照距离
        /// </summary>
        public double PZJL { get; set; }
        /// <summary>
        /// 调整距离
        /// </summary>
        public double TZJL { get; set; }
        /// <summary>
        /// 调整速度
        /// </summary>
        public double TZSD { get; set; }
        /// <summary>
        /// 视点
        /// </summary>
        public string EYE { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }
    }
}

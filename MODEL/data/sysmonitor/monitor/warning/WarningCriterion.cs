using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 预警判据
    /// </summary>
    public class WarningCriterion
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 判据名称
        /// </summary>
        public string PJMC { get; set; }
        /// <summary>
        /// 预警级别
        /// </summary>
        public int YJJB { get; set; }
        /// <summary>
        /// 灾害体
        /// </summary>
        public int ZHT { get; set; }
        /// <summary>
        /// 监测点
        /// </summary>
        public int JCD { get; set; }
        /// <summary>
        /// 判据公式
        /// </summary>
        public string PJGS { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string MS { get; set; }
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

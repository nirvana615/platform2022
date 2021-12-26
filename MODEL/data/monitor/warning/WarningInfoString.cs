using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 预警消息（文本）
    /// </summary>
    public class WarningInfoString
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 预警级别
        /// </summary>
        public string YJJB { get; set; }
        /// <summary>
        /// 灾害体
        /// </summary>
        public string ZHT { get; set; }
        /// <summary>
        /// 预警时间
        /// </summary>
        public string YJSJ { get; set; }
        /// <summary>
        /// 预警内容
        /// </summary>
        public string YJNR { get; set; }
        /// <summary>
        /// 预警状态
        /// </summary>
        public string YJZT { get; set; }
        /// <summary>
        /// 处理内容
        /// </summary>
        public string CLNR { get; set; }
        /// <summary>
        /// 处理时间
        /// </summary>
        public string CLSJ { get; set; }
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

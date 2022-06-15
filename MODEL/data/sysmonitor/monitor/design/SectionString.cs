using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 监测剖面（文本）
    /// </summary>
    public class SectionString
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 剖面名称
        /// </summary>
        public string PMMC { get; set; }
        /// <summary>
        /// 剖面编号
        /// </summary>
        public string PMBH { get; set; }
        /// <summary>
        /// 剖面类型
        /// </summary>
        public string PMLX { get; set; }
        /// <summary>
        /// 剖面等级
        /// </summary>
        public string PMDJ { get; set; }
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

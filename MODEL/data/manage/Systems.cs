using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 系统
    /// </summary>
    public class Systems
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 系统名称（中文）
        /// </summary>
        public string SysName { get; set; }
        /// <summary>
        /// 系统名称（英文）
        /// </summary>
        public string SysAlias { get; set; }
        /// <summary>
        /// 系统
        /// </summary>
        public int SysCode { get; set; }
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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// SQL
    /// </summary>
    public class SQL
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// SQL
        /// </summary>
        public string Sql { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        ///// <summary>
        ///// 状态码
        ///// </summary>
        //public int ZTM { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }
        /// <summary>
        /// SQL类型（读取、写入）
        /// </summary>
        public int Type { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 经销商
    /// </summary>
    public class Sale
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 经销商名称
        /// </summary>
        public string JXSMC { get; set; }
        /// <summary>
        /// 经销商简称
        /// </summary>
        public string JXSJC { get; set; }
        /// <summary>
        /// 经销商编码
        /// </summary>
        public string JXSBM { get; set; }
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
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 设备厂家
    /// </summary>
    public class Factory
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 厂家名称
        /// </summary>
        public string CJMC { get; set; }
        /// <summary>
        /// 厂家简称
        /// </summary>
        public string CJJC { get; set; }
        /// <summary>
        /// 厂家编码
        /// </summary>
        public string CJBM { get; set; }
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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 实景模型项目信息
    /// </summary>
    public class ModelProject
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 项目名称
        /// </summary>
        public string XMMC { get; set; }
        /// <summary>
        /// 项目编码
        /// </summary>
        public string XMBM { get; set; }
        /// <summary>
        /// 行政区编码
        /// </summary>
        public string XZQBM { get; set; }
        
        /// <summary>
        /// 中心经度
        /// </summary>
        public double? ZXJD { get; set; }
        /// <summary>
        /// 中心纬度
        /// </summary>
        public double? ZXWD { get; set; }

        /// <summary>
        /// 项目时间
        /// </summary>
        public string XMSJ { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        
        /// <summary>
        /// 项目用途
        /// </summary>
        public string XMYT { get; set; }
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

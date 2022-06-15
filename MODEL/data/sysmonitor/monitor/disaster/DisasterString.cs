using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 灾害体（文本）
    /// </summary>
    public class DisasterString
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 灾害体名称
        /// </summary>
        public string ZHTMC { get; set; }
        /// <summary>
        /// 灾害体编号
        /// </summary>
        public string ZHTBH { get; set; }
        /// <summary>
        /// 灾害体类型
        /// </summary>
        public string ZHTLX { get; set; }
        /// <summary>
        /// 中心经度
        /// </summary>
        public string ZXJD { get; set; }
        /// <summary>
        /// 中心纬度
        /// </summary>
        public string ZXWD { get; set; }
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

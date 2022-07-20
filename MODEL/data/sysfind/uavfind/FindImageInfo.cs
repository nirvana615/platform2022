using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 巡查影像信息
    /// </summary>
   public class FindImageInfo
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 影像名称
        /// </summary>
        public string YXMC { get; set; }
        /// <summary>
        /// 影像采集时间
        /// </summary>
        public string YXCJSJ { get; set; }
        /// <summary>
        /// 影像路径
        /// </summary>
        public string YXLJ { get; set; }
        /// <summary>
        /// 影像XMP信息
        /// </summary>
        public FindImageXmp XMP { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
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

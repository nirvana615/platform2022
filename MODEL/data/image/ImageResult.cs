using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 存储在数据库中的影像表字段--属性信息
    /// </summary>
   public class ImageResult
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 影像采集时间
        /// </summary>
        public string YXCJSJ { get; set; }
        /// <summary>
        /// RoiX
        /// </summary>
        public double RoiX { get; set; }
        /// <summary>
        /// RoiY
        /// </summary>
        public double RoiY { get; set; }
        /// <summary>
        /// Roiid
        /// </summary>
        public int RoiId { get; set; }
        /// <summary>
        /// Scale
        /// </summary>
        public double Scale { get; set; }
        /// <summary>
        /// 匹配算法
        /// </summary>
        public int PPSF { get; set; }
        /// <summary>
        /// 匹配时长
        /// </summary>
        public int PPSC { get; set; }
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

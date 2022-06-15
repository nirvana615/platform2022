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
   public class ImageInfo
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
        /// 影像编号
        /// </summary>
        public string YXBH { get; set; }
        /// <summary>
        /// 影像路径
        /// </summary>
        public string YXLJ { get; set; }
        /// <summary>
        /// 影像XMP信息
        /// </summary>
        public ImageXMP XMP { get; set; }
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
        /// <summary>
        /// 巡视状态
        /// </summary>
        public string xszt { get; set; }
        /// <summary>
        /// 巡视结果
        /// </summary>
        public string xsjg { get; set; }

        /// <summary>
        /// 目标id
        /// </summary>
        public string targetid { get; set; }
        /// <summary>
        /// 影像宽度
        /// </summary>
        public int Width { get; set; }
        /// <summary>
        /// 影像高度
        /// </summary>
        public int Height { get; set; }
    }
}

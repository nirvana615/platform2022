using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// Image-Match-Process
    /// 影像匹配处理
    /// </summary>
    public class IMP
    {
        /// <summary>
        /// 目标
        /// </summary>
        public Target Target { get; set; }

        /// <summary>
        /// 全部靶标列表
        /// </summary>
        public List<Roi> Rois { get; set; }

        /// <summary>
        /// 待匹配图像
        /// </summary>
        public List<ImageInfo> ImageInfos { get; set; }
    }
}

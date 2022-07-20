using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class FindImageExif
    {
        /// <summary>
        /// 相机
        /// </summary>
        public string Model { get; set; }
        /// <summary>
        /// 影像时间
        /// </summary>
        public string DateTime { get; set; }
        /// <summary>
        /// f
        /// </summary>
        public string FocalLength { get; set; }
        /// <summary>
        /// 影像宽度
        /// </summary>
        public int ExifImageWidth { get; set; }
        /// <summary>
        /// 影像高度
        /// </summary>
        public int ExifImageHeight { get; set; }

    }
}
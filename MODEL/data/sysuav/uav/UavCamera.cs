using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class UavCamera
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 相机名称
        /// </summary>
        public string XJMC { get; set; }
        /// <summary>
        /// 焦距
        /// </summary>
        public double JJ { get; set; }
        /// <summary>
        /// 单个像素尺寸(微米)
        /// </summary>
        public double DGXSCC { get; set; }
        /// <summary>
        /// 1cm分辨率航高（m）
        /// </summary>
        public double HG { get; set; }
        /// <summary>
        /// 传感器宽度
        /// </summary>
        public double CGQKD { get; set; }
        /// <summary>
        /// 传感器高度
        /// </summary>
        public double CGQGD { get; set; }
        /// <summary>
        /// 最小拍照间隔
        /// </summary>
        public double ZXPZJG { get; set; }
        /// <summary>
        /// 默认照片比例
        /// </summary>
        public int MRZPBL { get; set; }
        /// <summary>
        /// 默认横向像素
        /// </summary>
        public int MRHXXS { get; set; }
        /// <summary>
        /// 默认纵向像素
        /// </summary>
        public int MRZXXS { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }
    }
}

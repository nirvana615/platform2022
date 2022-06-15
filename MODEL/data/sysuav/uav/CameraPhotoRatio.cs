using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 照片比例
    /// </summary>
    public class CameraPhotoRatio
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string MS { get; set; }
        /// <summary>
        /// 照片比例
        /// </summary>
        public int ZPBL { get; set; }
        /// <summary>
        /// 传感器横向像素
        /// </summary>
        public int CGQHXXS { get; set; }
        /// <summary>
        /// 传感器纵向像素
        /// </summary>
        public int CGQZXXS { get; set; }
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

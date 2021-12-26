using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 相机-照片比例映射
    /// </summary>
    public class MapCameraPhotoRatio
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 相机id
        /// </summary>
        public int CameraId { get; set; }
        /// <summary>
        /// 照片比例id
        /// </summary>
        public int PhotoRatioId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

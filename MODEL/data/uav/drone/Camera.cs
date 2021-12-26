using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class Camera
    {
        /// <summary>
        /// 相机
        /// </summary>
        public UavCamera UavCamera { get; set; }
        /// <summary>
        /// 照片比例
        /// </summary>
        public List<CameraPhotoRatio> CameraPhotoRatios { get; set; }
    }
}

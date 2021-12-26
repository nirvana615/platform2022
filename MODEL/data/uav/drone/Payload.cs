using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class Payload
    {
        /// <summary>
        /// 挂载类型
        /// </summary>
        public int Type { get; set; }
        /// <summary>
        /// 相机
        /// </summary>
        public Camera Camera { get; set; }
        /// <summary>
        /// 激光雷达
        /// </summary>
        public Lidar Lidar { get; set; }
    }
}

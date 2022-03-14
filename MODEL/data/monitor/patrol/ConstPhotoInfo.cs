using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 设备结果表
    /// </summary>
    public class ConstPhotoInfo
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 照片地址
        /// </summary>
        public string photoUrl { get; set; }
        /// <summary>
        /// 项目id
        /// </summary>
        public string projectId { get; set; }
        /// <summary>
        ///监测点id
        /// </summary>
        public string monitorId { get; set; }
        /// <summary>
        /// 照片类型
        /// </summary>
        public string type { get; set; }
        /// <summary>
        /// 照片时间
        /// </summary>
        public string constTime { get; set; }

        /// <summary>
        /// 仪器编号
        /// </summary>
        public string insetNo { get; set; }

        /// <summary>
        /// 卡号
        /// </summary>
        public string cardNo { get; set; }


        /// <summary>
        /// 设备id
        /// </summary>
        public string deviceId { get; set; }

        /// <summary>
        /// x轴方向角度
        /// </summary>
        public string InitialAngle { get; set; }

        /// <summary>
        ///网卡编码
        /// </summary>
        public string snNo { get; set; }

    }
}

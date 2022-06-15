﻿using System;
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
        /// <summary>
        ///是否用于报告
        /// </summary>
        public string flagReport { get; set; }
        /// <summary>
        ///安装人员
        /// </summary>
        public string Installer { get; set; }
        /// <summary>
        ///跳表人
        /// </summary>
        public string preparer { get; set; }
        /// <summary>
        ///安装时间
        /// </summary>
        public string InstallTime { get; set; }
        /// <summary>
        ///填表时间
        /// </summary>
        public string preparlTime { get; set; }
        /// <summary>
        ///小图路由
        /// </summary>
        public string smallPhoto { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 监测点阈值信息表
    /// </summary>
    public class MonitorAlarmThreshold
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }
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
        public string monitorType { get; set; }

        /// <summary>
        /// 回溯时长
        /// </summary>
        public string backTrack { get; set; }

        /// <summary>
        /// 阈值1
        /// </summary>
        public string yueZhiOne { get; set; }


        /// <summary>
        /// 阈值2
        /// </summary>
        public string yueZhiTwo { get; set; }

        /// <summary>
        /// 最后修改时间
        /// </summary>
        public string lastUpdateTime { get; set; }
    }
}

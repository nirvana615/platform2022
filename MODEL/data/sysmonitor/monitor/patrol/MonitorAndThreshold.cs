using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 监测点联合阈值信息表
    /// </summary>
    public class MonitorAndThreshold
    {
        /// <summary>
        /// 监测点id
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 监测点编号
        /// </summary>
        public string jcdbh { get; set; }
        /// <summary>
        ///监测方法
        /// </summary>
        public string jcff { get; set; }
        /// <summary>
        /// 阈值id
        /// </summary>
        public string yueZhiId { get; set; }

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
        /// 阈值3
        /// </summary>
        public string yueZhiThree { get; set; }

        /// <summary>
        /// 最后修改时间
        /// </summary>
        public string lastUpdateTime { get; set; }
    }
}

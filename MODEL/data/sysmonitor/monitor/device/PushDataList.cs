﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 推送失败数据
    /// </summary>
    public class PushDataList
    {
        /// <summary>
        /// 阈值id,修改阈值
        /// </summary>
        public int thresholdId { get; set; }
        /// <summary>
        /// 阈值
        /// </summary>
        public string threshold { get; set; }
        /// <summary>
        /// 失败数据
        /// </summary>
        public List<PushFailureData> pushFailureList { get; set; }
        /// <summary>
        /// 最新推送数据的时间
        /// </summary>
        public string pushNowTime { get; set; }
        /// <summary>
        /// 推送设备的id
        /// </summary>
        public int deviceId { get; set; }
        /// <summary>
        /// 推送设备的状态
        /// </summary>
        public string deviceStatus { get; set; }
        /// <summary>
        /// 初始值id
        /// </summary>
        public int initialValueId { get; set; }
        /// <summary>
        /// 初始值
        /// </summary>
        public string initialValue { get; set; }
    }
}

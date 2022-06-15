using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 第三方任务
    /// </summary>
    public class CustomMission
    {
        /// <summary>
        /// 任务名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 任务类型
        /// </summary>
        public EnumUAV.MissionType MissionType { get; set; }
        /// <summary>
        /// 高度类型
        /// </summary>
        public EnumUAV.AltitudeMode AltitudeMode { get; set; }
        /// <summary>
        /// 任务航线
        /// </summary>
        public CustomWayline Wayline { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class UavMission
    {
        /// <summary>
        /// 航线长度
        /// </summary>
        public double RouteLength { get; set; }
        /// <summary>
        /// 飞行时间
        /// </summary>
        public double FlyTime { get; set; }
        /// <summary>
        /// 航点数量
        /// </summary>
        public int WaypointCount { get; set; }
        /// <summary>
        /// 拍照数量
        /// </summary>
        public int PhotoCount { get; set; }
        /// <summary>
        /// 图形
        /// </summary>
        public List<xyz> Line { get; set; }
        /// <summary>
        /// 第三方任务
        /// </summary>
        public string Mission { get; set; }
        /// <summary>
        /// DJI Terra KML
        /// </summary>
        public string TerraKml { get; set; }
        /// <summary>
        /// DJI Pilot KML
        /// </summary>
        public string PilotKml { get; set; }
    }
}
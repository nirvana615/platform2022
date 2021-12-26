using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 航线
    /// </summary>
    public class CustomWayline
    {
        /// <summary>
        /// 相机
        /// </summary>
        public EnumUAV.Camera Camera { get; set; }
        /// <summary>
        /// 照片比例
        /// </summary>
        public EnumUAV.PhotoRatio PhotoRatio { get; set; }
        /// <summary>
        /// 完成动作
        /// </summary>
        public EnumUAV.CompletionAction CompletionAction { get; set; }
        /// <summary>
        /// 偏航角模式
        /// </summary>
        public EnumUAV.HeadingMode HeadingMode { get; set; }
        /// <summary>
        /// 初始速度（从起飞点/返航点飞至航线起始航路点的速度，单位m/s）
        /// </summary>
        public double InitialSpeed { get; set; }
        /// <summary>
        /// 起飞点
        /// </summary>
        public Takeoff Takeoff { get; set; }
        /// <summary>
        /// 航点集合
        /// </summary>
        public List<CustomWaypoint> Waypoints { get; set; }
    }
}

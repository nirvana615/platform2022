using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 航点
    /// </summary>
    public class CustomWaypoint
    {
        /// <summary>
        /// 顺序号
        /// </summary>
        public int Index { get; set; }
        /// <summary>
        /// 转向模式
        /// </summary>
        public EnumUAV.TurningingMode? TurningingMode { get; set; }
        /// <summary>
        /// 拍照模式
        /// </summary>
        public EnumUAV.CaptureMode CaptureMode { get; set; }
        /// <summary>
        /// 拍照间隔（单位s）
        /// </summary>
        public double? Interval { get; set; }
        /// <summary>
        /// 经度（单位°）
        /// </summary>
        public double Longitude { get; set; }
        /// <summary>
        /// 纬度（单位°）
        /// </summary>
        public double Latitude { get; set; }
        /// <summary>
        /// 航高（绝对高度模式下为椭球高，相对高度模式下为相对于起飞点【返航点】的高度，单位m）
        /// </summary>
        public double Altitude { get; set; }
        /// <summary>
        /// 速度（单位m/s）
        /// </summary>
        public double Speed { get; set; }
        /// <summary>
        /// 俯仰角
        /// </summary>
        public double Pitch { get; set; }
        /// <summary>
        /// 偏航角
        /// </summary>
        public double Heading { get; set; }
        /// <summary>
        /// 航路点动作
        /// </summary>
        public List<CustomAction> Actions { get; set; }
    }
}

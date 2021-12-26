using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 动作（悬停、拍照、开始录像、结束录像、偏航角、俯仰角）
    /// Action(Hover、Capture、StartREC、StopREC、Heading、Pitch)
    /// </summary>
    public class CustomAction
    {
        /// <summary>
        /// 动作序号
        /// </summary>
        public int Index { get; set; }
        /// <summary>
        /// 动作类型
        /// </summary>
        public EnumUAV.WaypointActionType WaypointAction { get; set; }
        /// <summary>
        /// 悬停时间（单位ms）
        /// </summary>
        public double? HoverTime { get; set; }
        /// <summary>
        /// 偏航角（单位°）
        /// </summary>
        public double? Heading { get; set; }
        /// <summary>
        /// 俯仰角（单位°）
        /// </summary>
        public double? Pitch { get; set; }
    }
}

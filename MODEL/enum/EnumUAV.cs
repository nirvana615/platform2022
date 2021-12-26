using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace MODEL
{
    /// <summary>
    /// 无人机枚举类
    /// </summary>
    public static class EnumUAV
    {
        /// <summary>
        /// 航线类型（持续更新）
        /// </summary>
        public enum RouteType
        {
            [RemarkAttribute("目标图像采集（模型）")]
            MBTXCJ = 0,

            [RemarkAttribute("目标摄影测量（模型）")]
            MBSYCL = 1,

            [RemarkAttribute("斜坡摄影测量（地形）")]
            XPSYCL = 2,

            [RemarkAttribute("斜坡摄影测量（模型）")]
            XPSYCLM = 3,

            [RemarkAttribute("立面摄影测量（地形）")]
            LMSYCL = 4,

            [RemarkAttribute("立面摄影测量（模型）")]
            LMSYCLM = 5,

            [RemarkAttribute("目标视频采集")]
            MBSPCJ = 6,

            [RemarkAttribute("目标图像采集（视线）")]
            MBTXCJE = 7
        }

        /// <summary>
        /// 挂载类型
        /// </summary>
        public enum PayloadType
        {
            [RemarkAttribute("相机")]
            CAMERA = 0,

            [RemarkAttribute("激光雷达")]
            LIDAR = 1
        }

        /// <summary>
        /// 任务类型
        /// </summary>
        public enum MissionType
        {
            [RemarkAttribute("航点任务")]
            Waypoint = 0
        }

        /// <summary>
        /// 高程类型
        /// </summary>
        public enum AltitudeMode
        {
            [RemarkAttribute("海拔高度（椭球高）")]
            AMSL = 0,

            [RemarkAttribute("相对高度（地面之上）")]
            AGL = 1
        }

        /// <summary>
        /// 航点类型
        /// </summary>
        public enum WaypointType
        {
            [RemarkAttribute("起飞点")]
            Takeoff = 0,

            [RemarkAttribute("目标点")]
            Target = 1,

            [RemarkAttribute("避障点")]
            Avoid = 2,

            [RemarkAttribute("降落点")]
            Landing = 3,

            [RemarkAttribute("目标区域")]
            TargetArea = 4
        }


        #region DJI
        /// <summary>
        /// 无人机相机
        /// </summary>
        public enum Camera
        {
            [RemarkAttribute("Phantom 4 RTK")]
            P4R = 0,

            [RemarkAttribute("Phantom 4 Pro")]
            P4P = 1
        }
        /// <summary>
        /// 照片比例
        /// </summary>
        public enum PhotoRatio
        {
            [RemarkAttribute("3:2")]
            ThreeTwo = 0,

            [RemarkAttribute("4:3")]
            FourThree = 1,

            [RemarkAttribute("16:9")]
            SixteenNine = 2
        }
        /// <summary>
        /// 完成动作
        /// </summary>
        public enum CompletionAction
        {
            [RemarkAttribute("悬停")]
            Hover = 0,

            [RemarkAttribute("自动返航")]
            ReturntoHome = 1,

            [RemarkAttribute("原地降落")]
            LandinPlace = 2,

            [RemarkAttribute("返回起始点悬停")]
            ReturntoHover = 3
        }
        /// <summary>
        /// 偏航角模式
        /// </summary>
        public enum HeadingMode
        {
            [RemarkAttribute("沿航线方向")]
            FollowRoute = 0,

            [RemarkAttribute("单独设置航点")]
            SetWaypointSeparately = 1
        }
        /// <summary>
        /// 拍照模式
        /// </summary>
        public enum CaptureMode
        {
            [RemarkAttribute("航点悬停拍照")]
            WaypointHoveringShot = 0,

            [RemarkAttribute("定时拍照")]
            TimedShot = 1,

            [RemarkAttribute("不拍照")]
            NoShot = 2
        }
        /// <summary>
        /// 转向模式
        /// </summary>
        public enum TurningingMode
        {
            [RemarkAttribute("最小角度")]
            MinAngle = 0,

            [RemarkAttribute("最大角度")]
            MaxAngle = 1
        }

        /// <summary>
        /// 航路点动作
        /// </summary>
        public enum WaypointActionType
        {
            [RemarkAttribute("悬停")]
            Hover = 0,

            [RemarkAttribute("拍照")]
            Capture = 1,

            [RemarkAttribute("开始录像")]
            StartREC = 2,

            [RemarkAttribute("结束录像")]
            StopREC = 3,

            [RemarkAttribute("偏航角")]
            Heading = 4,

            [RemarkAttribute("俯仰角")]
            Pitch = 5
        }
        #endregion



    }
}

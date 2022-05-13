using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace MODEL
{
    /// <summary>
    /// 实景模型枚举
    /// </summary>
    public static class EnumModel
    {
        /// <summary>
        /// 任务相机
        /// </summary>
        public enum TaskCamera
        {
            [RemarkAttribute("精灵 PHANTOM 4 RTK")]
            P4R = 0,

            [RemarkAttribute("精灵 PHANTOM 4 PRO")]
            P4P = 1,

            [RemarkAttribute("经纬 M300 RTK P1(35mm)")]
            P135mm = 2
        }

        /// <summary>
        /// 任务产品
        /// </summary>
        public enum TaskProduct
        {
            [RemarkAttribute("3DTiles")]
            Tiles = 0,

            [RemarkAttribute("DOM&DSM")]
            DOMDSM = 1,

            [RemarkAttribute("OSGB")]
            OSGB = 2,

            [RemarkAttribute("PNTS")]
            PNTS = 3,

            [RemarkAttribute("LAS")]
            LAS = 4
        }
        /// <summary>
        /// 任务状态
        /// </summary>
        public enum TaskStatus
        {
            [RemarkAttribute("待处理")]
            Pending = 0,

            [RemarkAttribute("处理中")]
            Processing = 1,

            [RemarkAttribute("已完成")]
            Finished = 2
        }
        /// <summary>
        /// 模型等级
        /// </summary>
        public enum ModelLevel
        {
            [RemarkAttribute("无")]
            No = -1,

            [RemarkAttribute("整体")]
            Whole = 0,

            [RemarkAttribute("局部")]
            Part = 1
        }

        /// <summary>
        /// 高程系统
        /// </summary>
        public enum ElevationSystem
        {
            [RemarkAttribute("椭球高")]
            TQG = 0,

            [RemarkAttribute("1985国家高程基准")]
            GJGC1985 = 1
        }






    }
}

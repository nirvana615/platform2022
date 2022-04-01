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
        /// 采集设备
        /// </summary>
        public enum AircrafType
        {

            [RemarkAttribute("精灵 PHANTOM 4 RTK Camera")]
            P4R = 0,

            [RemarkAttribute("精灵 PHANTOM 4 PRO camera")]
            P4P = 1,

            [RemarkAttribute("经纬 M300 RTK P1 35mm")]
            JMR = 2
        }

        /// <summary>
        /// 成果
        /// </summary>
        public enum ResultType
        {
            [RemarkAttribute("3D Tiles")]
            SystemModel = 0,

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
        /// 模型系统角色
        /// </summary>
        public enum ModelRole
        {
            [RemarkAttribute("模型采集员")]
            Modelc = 1,

            [RemarkAttribute("模型处理员")]
            Modelp = 2,

            [RemarkAttribute("模型用户")]
            Modelv = 3
        }

    }
}

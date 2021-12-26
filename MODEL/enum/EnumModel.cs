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
        /// 项目用途
        /// </summary>
        public enum ProjectPurpose
        {
            [RemarkAttribute("内部科研项目")]
            NBDYPrj = 0,

            [RemarkAttribute("内部生产项目")]
            NBSCPrj = 1,

            [RemarkAttribute("外部生产项目")]
            WBSCPrj = 2,

            [RemarkAttribute("其他")]
            OtherPrj = 3
        }

        /// <summary>
        /// 采集设备
        /// </summary>
        public enum AircrafType
        {
            
            [RemarkAttribute("精灵 PHANTOM 4 RTK")]
            P4R = 0,

            [RemarkAttribute("精灵 PHANTOM 4 PRO")]
            P4P = 1,

            [RemarkAttribute("经纬 M300 RTK")]
            JMR = 2
        }

        /// <summary>
        /// 所需成果
        /// </summary>
        public enum ResultType
        {
            [RemarkAttribute("系统模型")]
            SystemModel = 0,

            [RemarkAttribute("DOM/DSM")]
            DOMDSM = 1,

            [RemarkAttribute("OSGB(特殊)")]
            OSGB = 2,

            [RemarkAttribute("点云PNTS")]
            PNTS = 3,

            [RemarkAttribute("点云LAS)")]
            LAS = 4
        }
       

    }
}

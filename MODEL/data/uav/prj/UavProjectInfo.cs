using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class UavProjectInfo
    {
        /// <summary>
        /// 项目信息
        /// </summary>
        public UavProject Project { get; set; }

        /// <summary>
        /// 项目数据
        /// </summary>
        public UavProjectData ProjectData { get; set; }

        /// <summary>
        /// 任务航线
        /// </summary>
        public UavRouteInfos RouteInfos { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class MonitorLayer
    {
        public string Title { get; set; } = "监测";
        /// <summary>
        /// 监测点
        /// </summary>
        public MonitorPointLayers MonitorPointLayers { get; set; }
        /// <summary>
        /// 监测剖面
        /// </summary>
        public MonitorSectoinLayers MonitorSectoinLayers { get; set; }

    }
}

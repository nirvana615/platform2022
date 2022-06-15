using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class MonitorPointLayers
    {
        public string Title { get; set; } = "监测点";
        public List<MonitorPointLayer> MonitorPointLayerList { get; set; }
    }
}

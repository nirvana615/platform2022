using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class UavRouteInfos
    {
        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; } = "任务航线";
        /// <summary>
        /// 航线
        /// </summary>
        public List<UavRoute> Routes { get; set; }
    }
}

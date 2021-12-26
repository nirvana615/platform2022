using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 航线-航点映射
    /// </summary>
    public class MapRouteWaypoint
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 航线id
        /// </summary>
        public int RouteId { get; set; }
        /// <summary>
        /// 航点id
        /// </summary>
        public int WaypointId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

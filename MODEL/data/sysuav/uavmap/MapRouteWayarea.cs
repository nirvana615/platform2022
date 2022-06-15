using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 路径-航区映射
    /// </summary>
    public class MapRouteWayarea
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
        /// 航区id
        /// </summary>
        public int WayareaId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

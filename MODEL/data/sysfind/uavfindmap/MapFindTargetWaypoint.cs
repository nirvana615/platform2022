using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 巡查目标-航点映射
    /// </summary>
    public class MapFindTargetWaypoint
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }     
        /// <summary>
        /// 巡查目标id
        /// </summary>
        public int TargetId { get; set; }
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

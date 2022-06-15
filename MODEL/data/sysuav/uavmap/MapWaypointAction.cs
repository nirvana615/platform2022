using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 航点-动作映射
    /// </summary>
    public class MapWaypointAction
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 航点id
        /// </summary>
        public int WaypointId { get; set; }
        /// <summary>
        /// 动作id
        /// </summary>
        public int ActionId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

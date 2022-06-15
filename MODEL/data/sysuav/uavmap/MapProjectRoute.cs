using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 项目-航线映射
    /// </summary>
    public class MapProjectRoute
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 无人机项目id
        /// </summary>
        public int ProjectId { get; set; }
        /// <summary>
        /// 航线id
        /// </summary>
        public int RouteId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

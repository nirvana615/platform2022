using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    //项目图层列表
    public class LayerList
    {
        /// <summary>
        /// 项目id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 项目图层
        /// </summary>
        public ProjectLayer ProjectLayer { get; set; }

        /// <summary>
        /// 灾害体图层
        /// </summary>
        public DisasterLayers DisasterLayers { get; set; }

        /// <summary>
        /// 监测图层
        /// </summary>
        public MonitorLayer MonitorLayer { get; set; }

        /// <summary>
        /// 消落带图层
        /// </summary>
        public FlzDataLayer FlzDataLayer { get; set; }

        /*
         * TODO 扩展
         */

    }
}

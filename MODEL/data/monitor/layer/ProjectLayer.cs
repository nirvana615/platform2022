using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 项目图层
    /// </summary>
    public class ProjectLayer
    {
        public string Title { get; set; } = "项目";
        /// <summary>
        /// 项目中心
        /// </summary>
        public CenterPoint CenterPoint { get; set; }
        /// <summary>
        /// 项目空间范围
        /// </summary>
        public Extent KJFW { get; set; }
        /// <summary>
        /// 项目影响范围
        /// </summary>
        public Extent YXFW { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public SurModels SurModels { get; set; }


        /*
         * TODO 扩展
         */

    }
}

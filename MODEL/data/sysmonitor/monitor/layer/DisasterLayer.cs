using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 灾害体图层
    /// </summary>
    public class DisasterLayer
    {
        /// <summary>
        /// 灾害体名称/编号
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// 灾害体id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 灾害体中心
        /// </summary>
        public CenterPoint CenterPoint { get; set; }
        /// <summary>
        /// 灾害体空间范围
        /// </summary>
        public Extent KJFW { get; set; }
        /// <summary>
        /// 灾害体影响范围
        /// </summary>
        public Extent YXFW { get; set; }
        /// <summary>
        /// 灾害体三维实景模型
        /// </summary>
        public SurModels SurModels { get; set; }


        /*
         * TODO 扩展
         */


    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 预警模型-预警判据映射
    /// </summary>
    public class MapModelCriterion
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 预警模型id
        /// </summary>
        public int ModelId { get; set; }
        /// <summary>
        /// 预警判据id
        /// </summary>
        public int CriterionId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

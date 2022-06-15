using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 灾害体-预警判据映射
    /// </summary>
    public class MapDisasterCriterion
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 灾害体id
        /// </summary>
        public int DisasterId { get; set; }
        /// <summary>
        /// 判据id
        /// </summary>
        public int CriterionId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

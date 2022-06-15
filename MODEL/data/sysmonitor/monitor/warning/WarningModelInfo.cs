using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 预警模型信息（预警模型+预警判据）
    /// </summary>
    public class WarningModelInfo
    {
        /// <summary>
        /// 预警模型
        /// </summary>
        public WarningModel Model { get; set; }

        /// <summary>
        /// 预警判据
        /// </summary>
        public List<WarningCriterion> Criterions { get; set; }
    }
}

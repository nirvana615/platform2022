using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 地质识别模型
    /// </summary>
    public class FlzShiBieModelInfo
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 项目id
        /// </summary>
        public int projectId { get; set; }
        /// <summary>
        /// 指标类型
        /// </summary>
        public string indicatorType { get; set; }
        /// <summary>
        /// 识别指标
        /// </summary>
        public string identificatIndex { get; set; }
        /// <summary>
        /// 识别因子
        /// </summary>
        public string indexFactor { get; set; }
        /// <summary>
        /// 因子值
        /// </summary>
        public string factorValue { get; set; }

        /// <summary>
        /// 评判标准
        /// </summary>
        public string evaluationCriteria { get; set; }


    }
}

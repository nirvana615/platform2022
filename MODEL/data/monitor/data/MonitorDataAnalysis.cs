using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 
    /// </summary>
    public class MonitorDataAnalysis
    {
       
        /// <summary>
        /// GNSS监测数据
        /// </summary>
        public List<GNSSAnalysis> GNSSAnalysisArr { get; set; }
        /// <summary>
        /// 裂缝监测数据
        /// </summary>
        public List<LFAnalysis> LFAnalysisArr { get; set; }
        /// <summary>
        /// 倾角监测数据
        /// </summary>
        public List<QJAnalysis> QJAnalysisArr { get; set; }
        /// <summary>
        /// 应力监测数据
        /// </summary>
        public List<YLAnalysis> YLAnalysisArr { get; set; }
        /// <summary>
        /// 地下水位监测数据
        /// </summary>
        public List<WATERAnalysis> WATERAnalysisArr { get; set; }
        /// <summary>
        /// 深部位移监测数据
        /// </summary>
        public List<SBWYAnalysis> SBWYAnalysisArr { get; set; }
    }
}

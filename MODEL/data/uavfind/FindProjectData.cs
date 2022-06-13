using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class FindProjectData
    {
        /// <summary>
        /// 项目信息
        /// </summary>
        public FindProject Project { get; set; }

        /// <summary>
        /// 三维实景模型信息
        /// </summary>
        public List<ModelTask> Models { get; set; }

        /// <summary>
        /// 巡查航线信息
        /// </summary>
        public List<FindRoute> Routes { get; set; }

        /// <summary>
        /// 巡查目标信息
        /// </summary>
        public List<FindTask> Tasks { get; set; }
    }
}
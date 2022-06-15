using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 航线任务项目信息（含项目信息、模型信息及路径信息）
    /// </summary>
    public class UavProjectInfo
    {
        /// <summary>
        /// 项目信息
        /// </summary>
        public UavProject Project { get; set; }

        /// <summary>
        /// 模型信息
        /// </summary>
        public List<ModelTask> Models { get; set; }

        /// <summary>
        /// 路径信息
        /// </summary>
        public List<UavRoute> Routes { get; set; }
    }
}

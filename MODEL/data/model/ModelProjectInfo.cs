using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class ModelProjectInfo
    {
        /// <summary>
        /// 模型项目信息
        /// </summary>
        public ModelProject ModelProjects { get; set; }

        /// <summary>
        /// 模型任务信息
        /// </summary>
        public ModelTaskInfos ModelTasks { get; set; }
    }
}

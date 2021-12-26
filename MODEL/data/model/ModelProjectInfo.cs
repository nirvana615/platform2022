using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    //项目列表：用户对应所有项目，及各项目下实景模型+目标集合
    public class ModelProjectInfo
    {
        /// <summary>
        /// 影像项目
        /// </summary>
        public ModelProject ModelProjects { get; set; }

        /// <summary>
        /// 实景模型任务
        /// </summary>
        public ModelTaskInfos ModelTasks { get; set; }
        
    }
}

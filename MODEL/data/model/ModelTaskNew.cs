using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class ModelTaskStatus
    {
        
        /// <summary>
        /// 待处理任务
        /// </summary>
        public List<ModelTask> newModelTaskPending { get; set; }
        /// <summary>
        /// 已完成任务
        /// </summary>
        public List<ModelTask> newModelTaskFinished { get; set; }
        /// <summary>
        /// 处理中任务
        /// </summary>
        public List<ModelTask> newModelTaskProcess { get; set; }
    }
}

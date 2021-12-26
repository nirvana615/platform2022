using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class ModelTaskInfos
    {
        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; } = "任务";

        /// <summary>
        /// 模型集
        /// </summary>
        public List<ModelTask> TaskList { get; set; }
    }
}

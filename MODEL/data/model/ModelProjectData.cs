using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class ModelProjectData
    {
        /// <summary>
        /// 项目
        /// </summary>
        public ModelProject Project { get; set; }

        /// <summary>
        /// 模型
        /// </summary>
        public List<ModelTask> Tasks { get; set; }
    }
}
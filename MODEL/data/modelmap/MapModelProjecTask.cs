using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 模型项目-航测任务映射
    /// </summary>
    public class MapModelProjecTask
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 模型项目id
        /// </summary>
        public int ModelProjectId { get; set; }
        /// <summary>
        /// 航测任务id
        /// </summary>
        public int TaskId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

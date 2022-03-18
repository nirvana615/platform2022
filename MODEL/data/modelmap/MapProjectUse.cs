using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 模型项目-业务项目映射
    /// </summary>
    public class MapProjectUse
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 系统
        /// </summary>
        public int Syscode { get; set; }
        /// <summary>
        /// 业务项目id
        /// </summary>
        public int UseProjectId { get; set; }
        /// <summary>
        /// 模型项目id
        /// </summary>
        public int ModelProjectId { get; set; }
        /// <summary>
        /// 模型任务id
        /// </summary>
        public int ModelTaskId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

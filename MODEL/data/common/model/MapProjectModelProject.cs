using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 项目-模型项目映射
    /// </summary>
    public class MapProjectModelProject
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 项目id
        /// </summary>
        public int ProjectId { get; set; }
        /// <summary>
        /// 系统code
        /// </summary>
        public int Syscode { get; set; }
        /// <summary>
        /// 实景模型项目id
        /// </summary>
        public int ModelProjectId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

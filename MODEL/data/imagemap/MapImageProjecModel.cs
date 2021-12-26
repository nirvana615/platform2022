using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 影像项目-拍摄目标点映射
    /// </summary>
    public class MapImageProjecModel
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 影像项目id
        /// </summary>
        public int ImageProjectId { get; set; }
        /// <summary>
        /// 目标点id
        /// </summary>
        public int ModelId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; } 
    }
}

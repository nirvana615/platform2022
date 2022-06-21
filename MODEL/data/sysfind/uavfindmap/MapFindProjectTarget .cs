using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 巡查项目-目标映射
    /// </summary>
    public class MapFindProjectTarget
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }     
        /// <summary>
        /// 巡查项目id
        /// </summary>
        public int FindProjectId { get; set; }
        /// <summary>
        /// 目标id
        /// </summary>
        public int TargetId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

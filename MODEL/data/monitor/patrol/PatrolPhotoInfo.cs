using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 设备结果表
    /// </summary>
    public class PatrolPhotoInfo
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 照片地址
        /// </summary>
        public string photoUrl { get; set; }
        /// <summary>
        /// 项目id
        /// </summary>
        public string projectId { get; set; }
        /// <summary>
        /// 巡视期数
        /// </summary>
        public string patrolNum { get; set; }
        /// <summary>
        /// 巡视时间
        /// </summary>
        public string patrolTime { get; set; }

    }
}

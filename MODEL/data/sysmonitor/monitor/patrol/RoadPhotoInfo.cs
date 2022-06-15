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
    public class RoadPhotoInfo
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
        ///监测点id
        /// </summary>
        public string monitorId { get; set; }
        /// <summary>
        /// 照片类型
        /// </summary>
        public string type { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// 道路距离
        /// </summary>
        public string roadLength { get; set; }

        /// <summary>
        /// 项目名称
        /// </summary>
        public string projectName { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string roadRec { get; set; }
        /// <summary>
        /// 上传时间
        /// </summary>
        public string patrolTime { get; set; }
    }
}

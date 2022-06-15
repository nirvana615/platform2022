using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 无人机-挂载映射
    /// </summary>
    public class MapDronePayload
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 无人机id
        /// </summary>
        public int DroneId { get; set; }
        /// <summary>
        /// 挂载id
        /// </summary>
        public int PayloadId { get; set; }
        /// <summary>
        /// 挂载类型
        /// </summary>
        public int PayloadType { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

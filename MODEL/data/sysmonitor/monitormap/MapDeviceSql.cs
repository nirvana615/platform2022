using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 设备-SQL映射
    /// </summary>
    public class MapDeviceSql
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 设备id
        /// </summary>
        public int DeviceId { get; set; }
        /// <summary>
        /// SQLid
        /// </summary>
        public int SqlId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 推送失败数据
    /// </summary>
    public class PushFailureData
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 监测点号
        /// </summary>
        public string zbh { get; set; }
        /// <summary>
        /// 失败时间
        /// </summary>
        public string pushTime { get; set; }
        /// <summary>
        /// 失败数据
        /// </summary>
        public string failureData { get; set; }
    }
}

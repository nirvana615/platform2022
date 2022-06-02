using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 监测点告警信息表
    /// </summary>
    public class MonitorGaoJIngInfo
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 项目名称
        /// </summary>
        public string projectId { get; set; }
        /// <summary>
        ///监测点id
        /// </summary>
        public string monitorId { get; set; }
        /// <summary>
        /// 监测类型
        /// </summary>
        public string monitorType { get; set; }
       
        /// <summary>
        /// 监测点编号
        /// </summary>
        public string jcdbh { get; set; }

        /// <summary>
        /// 监测点名称
        /// </summary>
        public string zhdmc { get; set; }
        /// <summary>
        /// 告警内容
        /// </summary>
        public string gaojinContext { get; set; }
        
        /// <summary>
        /// 告警状态
        /// </summary>
        public string gaojinStatus { get; set; }
        /// <summary>
        /// 告警时间
        /// </summary>
        public string gaojinTime { get; set; }
        /// <summary>
        /// 处理时间
        /// </summary>
        public string updateTime { get; set; }
        /// <summary>
        /// 告警状态
        /// </summary>
        public string gaojinResult { get; set; }
    }
}

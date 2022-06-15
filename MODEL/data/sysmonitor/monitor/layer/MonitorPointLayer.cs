using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace MODEL
{
    /// <summary>
    /// 监测点图层
    /// </summary>
    public class MonitorPointLayer
    {
        /// <summary>
        /// 监测点id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 监测点名称
        /// </summary>
        public string JCDMC { get; set; }
        /// <summary>
        /// 监测点编号
        /// </summary>
        public string JCDBH { get; set; }
        /// <summary>
        /// 监测方法
        /// </summary>
        public string JCFF { get; set; }
        /// <summary>
        /// 监测点类型
        /// </summary>
        public string JCZLX { get; set; }
        /// <summary>
        /// 监测点位置
        /// </summary>
        public XYZ Center { get; set; }

    }
}

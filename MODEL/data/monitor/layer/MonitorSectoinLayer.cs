using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace MODEL
{
    /// <summary>
    /// 监测剖面
    /// </summary>
    public class MonitorSectoinLayer
    {
        /// <summary>
        /// 剖面id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 剖面名称
        /// </summary>
        public string PMMC { get; set; }
        /// <summary>
        /// 剖面编号
        /// </summary>
        public string PMBH { get; set; }
        /// <summary>
        /// 剖面类型
        /// </summary>
        public string PMLX { get; set; }
        /// <summary>
        /// 剖面等级
        /// </summary>
        public string PMDJ { get; set; }
        /// <summary>
        /// 剖面线
        /// </summary>
        public List<XYZ> Line { get; set; }

    }
}

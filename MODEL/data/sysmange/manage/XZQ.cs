using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 行政区（省/市/县）
    /// </summary>
    public class XZQ
    {
        public int Id { get; set; }
        /// <summary>
        /// 行政区划名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 省级（2位）、市级（4位）、县级（6位）
        /// </summary>
        public string Code { get; set; }
    }
}

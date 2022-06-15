using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// GNSS初始值
    /// </summary>
    public class GNSSValue
    {
        /// <summary>
        /// 平面x坐标初始值
        /// </summary>
        public Double X { get; set; }
        /// <summary>
        /// 平面y坐标初始值
        /// </summary>
        public Double Y { get; set; }
        /// <summary>
        /// 高程初始值
        /// </summary>
        public Double H { get; set; }
    }
}

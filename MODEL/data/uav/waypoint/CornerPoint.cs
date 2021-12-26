using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 凸多变形角点
    /// </summary>
    public class CornerPoint
    {
        public int id { get; set; }
        public blh blh { get; set; }
        public xyz xyz { get; set; }
        public xyz eye { get; set; }
    }
}

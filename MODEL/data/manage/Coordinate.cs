using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 坐标系
    /// </summary>
    public class Coordinate
    {
        public int Id { get; set; }
        public int SRID { get; set; }
        public string NAME { get; set; }
        public string WKT { get; set; }
    }
}

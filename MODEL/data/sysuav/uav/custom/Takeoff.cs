using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 起飞点
    /// </summary>
    public class Takeoff
    {
        /// <summary>
        /// 经度（单位°）
        /// </summary>
        public double Longitude { get; set; }

        /// <summary>
        /// 纬度（单位°）
        /// </summary>
        public double Latitude { get; set; }

        /// <summary>
        /// 海拔/绝对高程（单位m）
        /// </summary>
        public double Altitude { get; set; }

        public Takeoff(double l, double b, double h)
        {
            Longitude = l;
            Latitude = b;
            Altitude = h;
        }
    }
}

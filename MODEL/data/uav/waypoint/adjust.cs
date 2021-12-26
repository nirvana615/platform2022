using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class adjust
    {
        /// <summary>
        /// 拍照距离
        /// </summary>
        public double photodistance { get; set; }
        /// <summary>
        /// 调整距离
        /// </summary>
        public double adjustdistance { get; set; }
        /// <summary>
        /// 调整速度
        /// </summary>
        public double adjustspeed { get; set; }
        /// <summary>
        /// 是否水平
        /// </summary>
        public bool level { get; set; }
    }
}

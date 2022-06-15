using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class ShapePara
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// bjff 提取边界方法
        /// </summary>
        public double BJFF { get; set; }

        /// <summary>
        /// CJSJ 统计滤波参数创建时间
        /// </summary>
        public string CJSJ { get; set; }

        /// <summary>
        /// BSM 
        /// </summary>
        public string BSM { get; set; }

        /// <summary>
        /// ZTM 
        /// </summary>
        public int ZTM { get; set; }
    }
}

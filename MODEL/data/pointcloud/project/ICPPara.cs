using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class ICPPara
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// cjsj 配准参数创建时间
        /// </summary>
        public string CJSJ { get; set; }

        /// <summary>
        /// LeafSize 下采样滤波体素大小
        /// </summary>
        public double LeafSize { get; set; }

        /// <summary>
        /// MaxIteration 配准参数创建时间
        /// </summary>
        public int MaxIteration { get; set; }

        /// <summary>
        /// cjsj 配准参数创建时间
        /// </summary>
        public double RadiusSearch { get; set; }

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

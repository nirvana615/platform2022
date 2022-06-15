using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class StatisticoutlierPara
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Meank
        /// </summary>
        public int Meank { get; set; }

        /// <summary>
        /// StddevMulThresh
        /// </summary>
        public int StddevMulThresh { get; set; }

        /// <summary>
        /// szsj 统计滤波参数创建时间
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

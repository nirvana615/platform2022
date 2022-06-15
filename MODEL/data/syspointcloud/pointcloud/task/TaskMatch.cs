using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    //配准点
    class TaskMatch
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// taskid
        /// </summary>
        public int Taskid { get; set; }

        ///<summary>
        ///match配准点对
        /// </summary>
        public string Match { get; set; }

        ///<summary>
        ///num
        /// </summary>
        public int num { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// 标识码
        /// </summary>
        public string BSM { get; set; }
        /// <summary>
        /// 状态码
        /// </summary>
        public int ZTM { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }

    }
}

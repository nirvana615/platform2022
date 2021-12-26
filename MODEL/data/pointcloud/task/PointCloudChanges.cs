using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class PointCloudChanges
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// sourceid
        /// </summary>
        public int Sourceid { get; set; }

        /// <summary>
        /// targetid
        /// </summary>
        public int Targetid { get; set; }

        /// <summary>
        /// icpid
        /// </summary>
        public int ICPid { get; set; }

        /// <summary>
        /// 路径
        /// </summary>
        public string LJ { get; set; }

        /// <summary>
        ///变化
        /// </summary>
        public string Changes { get; set; }

        /// <summary>
        /// 创建时间
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

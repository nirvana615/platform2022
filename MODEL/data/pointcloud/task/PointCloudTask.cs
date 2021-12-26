using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
   public class PointCloudTask
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
        /// name
        /// </summary>
        public string name { get; set; }


        /// <summary>
        /// projectid
        /// </summary>
        public int Projectid { get; set; }

        /// <summary>
        /// regionid
        /// </summary>
        public int Regionid { get; set; }

        /// <summary>
        /// Taskprocess项目进程 1:正在进行中 2：已完成
        /// </summary>
        public int Taskprocess { get; set; }


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

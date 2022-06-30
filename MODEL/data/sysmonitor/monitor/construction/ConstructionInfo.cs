using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class ConstructionInfo
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// project_id
        /// </summary>
        public int project_id { get; set; }
        /// <summary>
        /// ht_name
        /// </summary>
        public string ht_name { get; set; }
        /// <summary>
        /// start_time
        /// </summary>
        public string start_time { get; set; }


        /// <summary>
        /// end_time
        /// </summary>
        public string end_time { get; set; }

        /// <summary>
        /// 现场执行负责人
        /// </summary>
        public string scene_leader { get; set; }

        /// <summary>
        /// 项目组成员
        /// </summary>
        public string participants { get; set; }

        /// <summary>
        /// 项目负责人
        /// </summary>
        public string project_leader { get; set; }

        /// <summary>
        /// 技术负责人
        /// </summary>
        public string technical_director { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public string cjsj { get; set; }
        /// <summary>
        /// 监测墩尺寸
        /// </summary>
        public string size { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string bz { get; set; }

        /// <summary>
        /// ztm
        /// </summary>
        public int ztm { get; set; }
    }
}

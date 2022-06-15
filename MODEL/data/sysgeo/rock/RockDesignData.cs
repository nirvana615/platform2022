using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 设计信息表
    /// </summary>
    public class RockDesignData
    {
        /// <summary>
        /// id 
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 点名称
        /// </summary>
        public string name { get; set; }


        /// <summary>
        /// 项目id
        /// </summary>
        public int projectId { get; set; }
        /// <summary>
        /// 剖面位置
        /// </summary>
        public string profilePostion { get; set; }
        /// <summary>
        /// 测窗
        /// </summary>
        public string measurWindowPostion { get; set; }
     


        /// <summary>
        /// 探槽
        /// </summary>
        public string probeSlotPostion { get; set; }

        /// <summary>
        /// 钻孔
        /// </summary>
        public string drillHolePostion { get; set; }
   
        /// <summary>
        /// 最后维护时间
        /// </summary>
        public string lastModifiedTime { get; set; }

        /// <summary>
        /// 最后维护人
        /// </summary>
        public string lastModifiedPro { get; set; }

        
        /// <summary>
        /// 备注
        /// </summary>
        public string remark { get; set; }


    }
}

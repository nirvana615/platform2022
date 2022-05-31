using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class DataBianXinLiang
    {
        /// <summary>
        /// 统计项
        /// </summary>
        public string code { get; set; }
        /// <summary>
        /// 裂缝应力的第一个值，GNSS，倾角的x方向
        /// </summary>
        public string bianXinLingOne { get; set; }
        /// <summary>
        /// ，GNSS，倾角的Y方向
        /// </summary>
        public string bianXinLingTwo { get; set; }
        /// <summary>
        /// ，GNSS，倾角的z方向
        /// </summary>
        public string bianXinLingThree { get; set; }
        /// <summary>
        /// 单位
        /// </summary>
        public string danWei { get; set; }
        /// <summary>
        /// 备注,
        /// </summary>
        public string remark { get; set; }
        
    }
}

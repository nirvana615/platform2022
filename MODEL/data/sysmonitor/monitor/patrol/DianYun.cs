using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 点云结果Model
    /// </summary>
    public class DianYun
    {
        
        /// <summary>
        /// 边界范围
        /// </summary>
        public string regionalboundary { get; set; }
        
        /// <summary>
        /// 区域名称
        /// </summary>
        public string regionname { get; set; }


        /// <summary>
        /// 项目id
        /// </summary>
        public string projectid { get; set; }
        /// <summary>
        /// 项目名称
        /// </summary>
        public string xmmc { get; set; }
        /// <summary>
        /// 巡视时间
        /// </summary>
        public string xssj { get; set; }
        /// <summary>
        /// 巡视单位id
        /// </summary>
        public string pointdataid { get; set; }
        /// <summary>
        /// 区域范围id
        /// </summary>
        public string regionid { get; set; }
        /// <summary>
        /// 巡视状态
        /// </summary>
        public string xszt { get; set; }
        /// <summary>
        /// 巡视结果
        /// </summary>
        public string xsjg { get; set; }
        /// <summary>
        /// 模型路径
        /// </summary>
        public string mxlj { get; set; }
        /// <summary>
        /// 倾向
        /// </summary>
        public string level { get; set; }
        /// <summary>
        /// 倾角
        /// </summary>
        public string vertical { get; set; }

    }
}

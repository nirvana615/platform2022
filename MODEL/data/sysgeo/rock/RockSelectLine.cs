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
    public class RockSelectLine
    {
        /// <summary>
        /// id 
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 剖面名称
        /// </summary>
        public string pmmc { get; set; }
        
     
        /// <summary>
        /// 剖面id
        /// </summary>
        public int pmid { get; set; }
        /// <summary>
        /// 项目id
        /// </summary>
        public int xmid { get; set; }
        /// <summary>
        /// 修改前
        /// </summary>
        public string ysline { get; set; }
     


        /// <summary>
        /// 修改后
        /// </summary>
        public string xgline { get; set; }

        /// <summary>
        /// 平距，高差格式
        /// </summary>
        public string gcline { get; set; }
   
        /// <summary>
        /// 起点
        /// </summary>
        public string startpoint { get; set; }

        /// <summary>
        /// 终点
        /// </summary>
        public string endpoint { get; set; }

   


    }
}

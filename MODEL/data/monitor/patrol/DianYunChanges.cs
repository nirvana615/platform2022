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
    public class DianYunChanges
    {
        
        /// <summary>
        /// 改变量 
        /// </summary>
        public string changes { get; set; }
        
        /// <summary>
        /// 模型生成时间，数据
        /// </summary>
        public string cjsj { get; set; }


        /// <summary>
        /// 目标期数
        /// </summary>
        public string targetXssj { get; set; }
        /// <summary>
        /// 对比期数
        /// </summary>
        public string sourceXssj { get; set; }
        

    }
}

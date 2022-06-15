using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class TargetInfos
    {
        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; } = "目标";

        /// <summary>
        /// 目标集
        /// </summary>
        public List<Target> TargetList { get; set; }
    }
}

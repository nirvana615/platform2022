using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class SurModelInfos
    {
        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; } = "实景模型";

        /// <summary>
        /// 模型集
        /// </summary>
        public List<SurModel> ModelList { get; set; }
    }
}

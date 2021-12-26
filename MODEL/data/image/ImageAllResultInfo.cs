using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    //当前目标下的所有左靶区集合、右靶区集合、匹配算法集合、计算结果集合
    public class ImageAllResultInfo
    {
        /// <summary>
        /// 左靶区列表
        /// </summary>    
        public List<Roi> Lefts { get; set; }
        /// <summary>
        /// 右靶区列表
        /// </summary>  
        public List<Roi> Rights { get; set; }
        /// <summary>
        /// 匹配算法
        /// </summary>
        public List<int> MatchWays { get; set; }
        /// <summary>
        /// 靶区匹配结果
        /// </summary>
        public List<ImageResult> Results { get; set; }
    }
}

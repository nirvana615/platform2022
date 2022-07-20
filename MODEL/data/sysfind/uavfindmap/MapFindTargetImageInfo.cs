using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 巡查目标-影像信息映射
    /// </summary>
    public class MapFindTargetImageInfo
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }     
        /// <summary>
        /// 巡查目标id
        /// </summary>
        public int TargetId { get; set; }
        /// <summary>
        /// 巡查影像id
        /// </summary>
        public int ImageInfoId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

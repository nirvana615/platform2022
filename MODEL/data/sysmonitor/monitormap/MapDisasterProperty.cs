using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class MapDisasterProperty
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 灾害体ID
        /// </summary>
        public int DisasterId { get; set; }
        /// <summary>
        /// 属性ID
        /// </summary>
        public int PropertyId { get; set; }
        /// <summary>
        /// 灾害体类型
        /// </summary>
        public int Type { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class UavAction
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// GUID
        /// </summary>
        public string GUID { get; set; }
        /// <summary>
        /// 索引
        /// </summary>
        public int Index { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// 类型
        /// </summary>
        public int Type { get; set; }
        /// <summary>
        /// 数值
        /// </summary>
        public double Value { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }
    }
}

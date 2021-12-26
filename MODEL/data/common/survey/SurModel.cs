using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 三维实景模型
    /// </summary>
    public class SurModel
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 模型名称
        /// </summary>
        public string MXMC { get; set; }
        /// <summary>
        /// 模型路径
        /// </summary>
        public string MXLJ { get; set; }
        /// <summary>
        /// 模型时间
        /// </summary>
        public string MXSJ { get; set; }
        /// <summary>
        /// 模型类型
        /// </summary>
        public int MXJB { get; set; }
        /// <summary>
        /// 模型视图
        /// </summary>
        public string MXST { get; set; }
        /// <summary>
        /// 模型范围
        /// </summary>
        public string MXFW { get; set; }
        /// <summary>
        /// SRID
        /// </summary>
        public int? SRID { get; set; }
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

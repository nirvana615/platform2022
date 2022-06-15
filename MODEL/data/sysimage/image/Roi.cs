using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 靶区信息
    /// </summary>
    public class Roi
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 靶区名称
        /// </summary>
        public string BQMC { get; set; }
        /// <summary>
        /// 靶区编号
        /// </summary>
        public string BQBH { get; set; }
        /// <summary>
        /// 靶区类型
        /// </summary>
        public int BQLX { get; set; }
        /// <summary>
        /// 靶区文件
        /// </summary>
        public string BQWJ { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// 标识码
        /// </summary>
        public string BSM { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }
    }
}

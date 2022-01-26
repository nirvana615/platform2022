using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    class Mark
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 名字
        /// </summary>
        public string Text { get; set; }
        /// <summary>
        /// id
        /// </summary>
        public int Marktype { get; set; }
        /// <summary>
        /// 位置信息
        /// </summary>
        public string Pos { get; set; }
        /// <summary>
        /// 标注相关信息
        /// </summary>
        public string Info { get; set; }
        /// <summary>
        /// 样式信息
        /// </summary>
        public string Style { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

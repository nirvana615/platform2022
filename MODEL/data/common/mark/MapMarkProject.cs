using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    class MapMarkProject
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 标注id
        /// </summary>
        public int MarkId { get; set; }
        /// <summary>
        /// 项目id
        /// </summary>
        public int Projectid { get; set; }
        /// <summary>
        /// 用户id
        /// </summary>
        public int Userid { get; set; }
        /// <summary>
        /// 系统编码
        /// </summary>
        public int Syscode { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

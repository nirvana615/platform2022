using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 侧窗
    /// </summary>
    public class FlzSteepHillInfo
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 侧窗名称
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string creatTime { get; set; }

        /// <summary>
        /// 项目id
        /// </summary>
        public int projectId { get; set; }
        /// <summary>
        /// 点数据，用|分割
        /// </summary>
        public string points { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string remarks { get; set; }
        /// <summary>
        /// 倾向
        /// </summary>
        public string level { get; set; }
        /// <summary>
        /// 倾角
        /// </summary>
        public string vertical { get; set; }

        /// <summary>
        /// 状态
        /// </summary>
        public string status { get; set; }

        public string appd { get; set; }
        public string appdrest { get; set; }
        public string apjg { get; set; }
        public string apjgrest { get; set; }
        public string xpbj { get; set; }
        public string xpbjrest { get; set; }
        public string yxyz { get; set; }
        public string yxyzrest { get; set; }
        public string ruc { get; set; }
        public string rucrest { get; set; }
        public string ytjg { get; set; }
        public string ytjgrest { get; set; }
        public string ytfh { get; set; }
        public string ytfhrest { get; set; }
        public string ytlh { get; set; }
        public string ytlhrest { get; set; }
        public string dxdm { get; set; }
        public string dzgz { get; set; }
        public string gcdz { get; set; }
        public string score { get; set; }
        public string appdSrc { get; set; }
        public string apjgSrc { get; set; }
        public string xpbjSrc { get; set; }
        public string yxyzSrc { get; set; }
        public string rucSrc { get; set; }
        public string ytjgSrc { get; set; }
        public string ytfhSrc { get; set; }
        public string ytlhSrc { get; set; }
        public string jieLun { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 项目-测绘数据映射
    /// </summary>
    public class MapProjectSurvey
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 项目id
        /// </summary>
        public int ProjectId { get; set; }
        /// <summary>
        /// 测绘id
        /// </summary>
        public int SurveyId { get; set; }
        /// <summary>
        /// 类型（模型、点云、数字正射影像、数字表面模型、制图图件）
        /// </summary>
        public int Type { get; set; }
        /// <summary>
        /// 系统角色（因模型是多系统共用）
        /// </summary>
        public int Role { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

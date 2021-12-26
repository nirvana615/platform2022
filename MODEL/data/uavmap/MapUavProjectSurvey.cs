using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 无人机项目-测绘数据
    /// </summary>
    public class MapUavProjectSurvey
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 无人机项目id
        /// </summary>
        public int ProjectId { get; set; }
        /// <summary>
        /// 三维实景模型id
        /// </summary>
        public int ModelId { get; set; }
        /// <summary>
        /// 点云id
        /// </summary>
        public int? PointCloudId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class ModelPointClouds
    {
        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; } = "实景模型";

        /// <summary>
        /// 三维实景模型与点云集合
        /// </summary>
        public List<ModelPointCloud> ModelPointCloudList { get; set; }
    }
}

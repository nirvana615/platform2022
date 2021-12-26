using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
	/// <summary>
    /// 三维实景模型与点云组
    /// </summary>
    public class ModelPointCloud
    {
		/// <summary>
        /// 三维实景模型
        /// </summary>
		public SurModel SurModel { get; set; }

		/// <summary>
        /// 点云
        /// </summary>
        public SurPointCloud SurPointCloud { get; set; }
    }
}

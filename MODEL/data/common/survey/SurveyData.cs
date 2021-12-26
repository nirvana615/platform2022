using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class SurveyData
    {
        /// <summary>
        /// 三维实景模型集
        /// </summary>
        public List<SurModel> Models { get; set; }

        /// <summary>
        /// 点云集
        /// </summary>
        public List<SurPointCloud> PointClouds { get; set; }

        /// <summary>
        /// 数字正射影像集
        /// </summary>
        public List<SurDOM> DOMs { get; set; }

        /// <summary>
        /// 数字表面模型集
        /// </summary>
        public List<SurDSM> DSMs { get; set; }

        /// <summary>
        /// 制图集
        /// </summary>
        public List<SurMap> Maps { get; set; }

    }
}

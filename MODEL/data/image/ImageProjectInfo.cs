using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    //项目列表：用户对应所有项目，及各项目下实景模型+目标集合
    public class ImageProjectInfo
    {
        /// <summary>
        /// 影像项目
        /// </summary>
        public ImageProject ImageProject { get; set; }
        /// <summary>
        /// 影像目标
        /// </summary>
        public TargetInfos Targets { get; set; }
        /// <summary>
        /// 实景模型
        /// </summary>
        public SurModelInfos SurModels { get; set; }

        //TODO
    }
}

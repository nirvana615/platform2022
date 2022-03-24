using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class FlzDataLayer
    {
        public string Title { get; set; } = "采集";

        /// <summary>
        /// 测窗
        /// </summary>
        public List<FlzWindowInfo> FlzWindowInfoList { get; set; }
        /// <summary>
        /// 监测点
        /// </summary>
        public List<FlzData> FlzDataList { get; set; }


        
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class RockDataLayer
    {
        public string Title { get; set; } = "采集";

        /// <summary>
        /// 测窗
        /// </summary>
        public List<RockWindowInfo> RockWindowInfoList { get; set; }
        /// <summary>
        /// 监测点
        /// </summary>
        public List<RockData> RockDataList { get; set; }


        
    }
}

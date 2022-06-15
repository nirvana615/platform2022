using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// x y xy h变形量及各统计量（最小值、最大值、平均值、标准差）
    /// </summary>
    public class WATERAnalysis
    {
        /// <summary>
        /// 监测设备名称
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 监测设备名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 监测设备类型
        /// </summary>
        //public string Type { get; set; }
        /// <summary>
        /// 监测数据
        /// </summary>
        public List<WATERDelta> Datas { get; set; }
    }
}

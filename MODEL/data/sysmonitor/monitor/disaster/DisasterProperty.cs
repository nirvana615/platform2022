using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 灾害体属性
    /// </summary>
    public class DisasterProperty
    {
        /// <summary>
        /// 崩塌（危岩体）属性
        /// </summary>
        public RockfallPropertyString RockfallProperty { get; set; }

        /// <summary>
        /// 崩塌（危岩体）预警模型参数
        /// </summary>
        public RockfallWarningString RockfallWarning { get; set; }



        //TODO其他灾害属性
    }
}

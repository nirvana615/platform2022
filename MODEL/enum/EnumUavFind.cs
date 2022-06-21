using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace MODEL
{
    /// <summary>
    /// 巡查目标类型
    /// </summary>
    public static class EnumUavFind
    {
        public enum TargetType
        {
            [RemarkAttribute("目视判读")]
            View = 0,

            [RemarkAttribute("时序对比")]
            Moitor = 1
        }







    }
}

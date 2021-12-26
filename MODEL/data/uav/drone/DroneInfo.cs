using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class DroneInfo
    {
        /// <summary>
        /// 无人机
        /// </summary>
        public UavDrone UavDrone { get; set; }
        /// <summary>
        /// 挂载
        /// </summary>
        public List<Payload> Payloads { get; set; }
    }
}

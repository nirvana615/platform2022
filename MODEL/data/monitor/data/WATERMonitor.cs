using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class WATERMonitor
    {
        public double Height { get; set; }

        public double Deep { get; set; }

        public List<WATERDelta> Datas { get; set; }
    }
}

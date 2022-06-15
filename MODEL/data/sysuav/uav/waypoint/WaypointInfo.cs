using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class WaypointInfo
    {
        public int id { get; set; }
        public string title { get; set; }
        public string icon { get; set; }
        public string type { get; set; }

        //public bool spread { get; set; }
        public blh blh { get; set; }
        public xyz xyz { get; set; }
        public xyz eye { get; set; }

        public double height { get; set; }
        public double speed { get; set; }
        public adjust adjust { get; set; }
        public extent extent { get; set; }
        public List<ActionInfo> children { get; set; }


        public photogrammetry photogrammetry { get; set; }
        public List<CornerPoint> polygon { get; set; }



    }
}

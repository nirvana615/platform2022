using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class ConstructionPhoto
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }

        /// <summary>
        /// photo_url
        /// </summary>
        public string photo_url { get; set; }

        /// <summary>
        /// sphoto_url
        /// </summary>
        public string sphoto_url { get; set; }

        /// <summary>
        /// project_id
        /// </summary>
        public int project_id { get; set; }

        /// <summary>
        /// draster_id
        /// </summary>
        public int draster_id { get; set; }

        /// <summary>
        /// monitor_id
        /// </summary>
        public int monitor_id { get; set; }

        /// <summary>
        /// type_id
        /// </summary>
        public int type_id { get; set; }

        /// <summary>
        /// upload_time
        /// </summary>
        public string upload_time { get; set; }

        /// <summary>
        /// is_report
        /// </summary>
        public int is_report { get; set; }

        /// <summary>
        /// ztm
        /// </summary>
        public int ztm { get; set; }

        /// <summary>
        /// bz
        /// </summary>
        public string bz { get; set; }
    }
}

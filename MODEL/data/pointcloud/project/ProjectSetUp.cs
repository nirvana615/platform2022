using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class ProjectSetUp
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }


        /// <summary>
        /// StatisticoutlierPara
        /// </summary>
        public StatisticoutlierPara StatisticoutlierPara { get; set; }


        /// <summary>
        /// Shape
        /// </summary>
        public ShapePara ShapePara { get; set; }

        /// <summary>
        /// Overlap
        /// </summary>
        public OverlapPara OverlapPara { get; set; }

        /// <summary>
        /// ICPPara
        /// </summary>
        public ICPPara ICPPara { get; set; }



    }
}

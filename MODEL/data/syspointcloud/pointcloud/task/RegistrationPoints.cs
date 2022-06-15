using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    //配准点
   public  class RegistrationPoints
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }

        ///<summary>
        ///Source_x
        /// </summary>
        public string Source_x { get; set; }

        ///<summary>
        ///Source_y
        /// </summary>
        public string Source_y { get; set; }

        ///<summary>
        ///Source_z
        /// </summary>
        public string Source_z { get; set; }

        ///<summary>
        ///Align_x
        /// </summary>
        public string Align_x { get; set; }

        ///<summary>
        ///Align_y
        /// </summary>
        public string Align_y { get; set; }

        ///<summary>
        ///Align_z
        /// </summary>
        public string Align_z{ get; set; }
    }
}

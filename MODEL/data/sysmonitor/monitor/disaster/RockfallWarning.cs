using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 崩塌（危岩）预警模型参数
    /// </summary>
    public class RockfallWarning
    {
        public int Id { get; set; }
        public int? CType1 { get; set; }
        public int? CType2 { get; set; }
        public double? Alt_up { get; set; }
        public double? Alt_down { get; set; }
        public double? Rock_vol { get; set; }
        public double? Frame_H { get; set; }
        public double? Frame_W { get; set; }
        public double? Frame_Th { get; set; }
        public int? Rock_char { get; set; }
        public double? Coll_Dir { get; set; }
        public double? OcofRS { get; set; }
        public double? IAofRS { get; set; }
        public double? UW { get; set; }
        public double? SA { get; set; }
        public double? OW { get; set; }
        public double? IASS { get; set; }
        public double? LSS { get; set; }
        public double? FASS { get; set; }
        public double? CSS { get; set; }
        public double? HDPC { get; set; }
        public double? PRR { get; set; }
        public double? EMR { get; set; }
        public double? IAPC { get; set; }
        public double? IAI { get; set; }
        public double? HDCD { get; set; }
        public double? VDCD { get; set; }
        public double? SCP_H { get; set; }
        public double? VDPC { get; set; }
        public double? MRC { get; set; }
        public double? SCP_HD { get; set; }
        public double? SCP_AO { get; set; }
        public double? SCP_BO { get; set; }
        public double? SCP_C { get; set; }
        public double? SCP_FA { get; set; }
        public double? FLk { get; set; }
        public double? HDCR { get; set; }
        public double? VDCR { get; set; }
        public double? SCP_DS { get; set; }
        public double? SCP_Ba { get; set; }
        public double? SCP_Mk { get; set; }
        public double? SCP_e { get; set; }
        public double? Rt { get; set; }
        public string CJSJ { get; set; }
        public string BSM { get; set; }
        public int ZTM { get; set; }
        public string BZ { get; set; }
    }
}

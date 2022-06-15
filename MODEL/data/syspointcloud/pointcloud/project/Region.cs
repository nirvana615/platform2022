using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class Region
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// ProjectId
        /// </summary>
        public int ProjectId { get; set; }
        /// <summary>
        /// 数据列表
        /// </summary>
        public List<PCloudData> PCloudDataList { get; set; }

        public SurPointClouds SurPointClouds { get; set; }

        

        /// <summary>
        /// 变化热力图层
        /// </summary>
        public List<PointCloudChanges> PointCloudChangeslist { get; set; }
        //变形定位
        public ChangePositions changePositions { get; set; }
        /// <summary>
        /// 项目区域名称
        /// </summary>
        public string RegionName { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// 标识码
        /// </summary>
        public string BSM { get; set; }
        /// <summary>
        /// 状态码
        /// </summary>
        public int ZTM { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }

        /// <summary>
        /// 边界范围
        /// </summary>
        public string RegionlBoundary { get; set; }
    }
}

using System;
using System.Collections.Generic;

#nullable disable

namespace Company_WebApi.Models
{
    public partial class Grnmaster
    {
        public string GrnpovnamePnum { get; set; }
        public DateTime? Grndate { get; set; }
        public string PoorMonumber { get; set; }
        public string Vendorname { get; set; }
        public string Partnumber { get; set; }
        public string Partdesc { get; set; }
        public int? RecvQty { get; set; }
        public string Location { get; set; }

    }
}

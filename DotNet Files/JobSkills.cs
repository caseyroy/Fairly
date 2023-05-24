using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.JobSkills
{
    public class JobSkills
    {
        public int JobId { get; set; }
        public LookUp Skill { get; set; }

        public LookUp Experience { get; set; }

        public int YearsStart { get; set; }

        public int YearsEnd { get; set; }

    }
}

using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Domain.JobSkills;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class ExperienceService : IExperienceService
    {
        private ILookUpService _lookUpService;
        private IDataProvider _dataProvider;

        public ExperienceService(ILookUpService lookUpService, IDataProvider dataProvider)
        {
            _lookUpService = lookUpService;
            _dataProvider = dataProvider;
        }
        public List<LookUp3Col> GetAllExperience()
        {
            List<LookUp3Col> skillsets = null;
            string procName = "[dbo].[ExperienceLevels_SelectAll]";

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
            }, delegate (IDataReader reader, short set)
            {
                int index = 0;
                LookUp3Col singleset = MapExperience(reader, ref index);

                if (skillsets == null)
                {
                    skillsets = new List<LookUp3Col>();
                }
                skillsets.Add(singleset);
            });

            return skillsets;

        }

        private LookUp3Col MapExperience(IDataReader reader, ref int startingIndex)
        {
            LookUp3Col skillset = new LookUp3Col();

            skillset.Id = reader.GetSafeInt32(startingIndex++);
            skillset.Name = reader.GetSafeString(startingIndex++);
            skillset.Col3 = reader.GetSafeString(startingIndex++);

            return skillset;
        }
    }
}

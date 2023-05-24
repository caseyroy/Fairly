using Sabio.Data.Providers;
using System;
using System.Data;
using System.Data.SqlClient;
using Sabio.Models.Requests;
using Sabio.Models.Domain;
using Sabio.Data;
using System.Collections.Generic;
using Sabio.Services.Interfaces;
using Sabio.Models.Domain.JobSkills;

namespace Sabio.Services
{
    public class JobSkillService : IJobSkillsService
    {
        private ILookUpService _lookUpService;
        private IDataProvider _dataProvider;

        public JobSkillService(ILookUpService lookUpService, IDataProvider dataProvider)
        {
            _lookUpService = lookUpService;
            _dataProvider = dataProvider;
        }

        public void Create(JobSkillsAddRequest request)
        {
            string procName = "[dbo].[JobSkills_Insert]";
            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {

                AddCommonParams(request, col);


            }, returnParameters: null);
        }

        public void Update(JobSkillsAddRequest request) 
        {
            string procName = "[dbo].[JobSkills_Update]";
            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(request, col);

            }, returnParameters: null);
        
        }

        public void Delete(int jobId, int skillId)
        {
            string procName = "[dbo].[JobSkills_Delete]";

            _dataProvider.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@JobId", jobId);
                col.AddWithValue("@SkillId", skillId);

            });

        }

        public List<JobSkills> GetByJobId(int jobId)
        {
            List<JobSkills> skillsets = null;
            string procName = "[dbo].[JobSkills_Select_ByJobId]";

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@JobId", jobId);
            }, delegate (IDataReader reader, short set)
            {
                int index = 0;
                JobSkills singleset = MapSingleJobSkillsSet(reader, ref index);

                if (skillsets == null)
                {
                    skillsets = new List<JobSkills>();
                }
                skillsets.Add(singleset);
            });

            return skillsets;

        }

    private  JobSkills MapSingleJobSkillsSet(IDataReader reader, ref int startingIndex)
        {
            JobSkills skillset = new JobSkills();

            skillset.JobId = reader.GetSafeInt32(startingIndex++);
            skillset.Skill = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            skillset.Experience = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            skillset.YearsStart = reader.GetSafeInt32(startingIndex++);
            skillset.YearsEnd = reader.GetSafeInt32(startingIndex++);

            return skillset;
        }

        private static void AddCommonParams(JobSkillsAddRequest request, SqlParameterCollection col)
        {
            col.AddWithValue("@JobId", request.JobId);
            col.AddWithValue("@SkillId", request.SkillId);
            col.AddWithValue("@ExperienceLevelId", request.ExperienceLevelId);
            col.AddWithValue("@YearsRangeStart", request.YearsRangeStart);
            col.AddWithValue("@YearsRangeEnd", request.YearsRangeEnd);
        }


    }
}

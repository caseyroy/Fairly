using Sabio.Models.Domain.JobSkills;
using Sabio.Models.Requests;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IJobSkillsService
    {
        void Create(JobSkillsAddRequest request);

        void Update(JobSkillsAddRequest request);

        void Delete(int jobId, int skillId);

        List<JobSkills> GetByJobId(int jobId);
    }
}
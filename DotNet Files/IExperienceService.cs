using Sabio.Models.Domain;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IExperienceService
    {
        List<LookUp3Col> GetAllExperience();
    }
}
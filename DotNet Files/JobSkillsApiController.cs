using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Domain.JobSkills;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/jobskills")]
    [ApiController]
    public class JobSkillsApiController : BaseApiController
    {
        private IJobSkillsService _service;
        private IAuthenticationService<int> _authService;
        public JobSkillsApiController(IJobSkillsService service,
            ILogger<JobSkillsApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<SuccessResponse> Create(JobSkillsAddRequest model)
        {
            int code = 201;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Create(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPut("{jobid:int}/{skillid:int}")]
        public ActionResult<SuccessResponse> Update(JobSkillsAddRequest model) 
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model);

                response = new SuccessResponse();
            }
            catch(Exception ex) 
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);

        }

        [HttpDelete("{jobid:int}/{skillid:int}")]
        public ActionResult<SuccessResponse> Delete(int jobId, int skillId) 
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(jobId, skillId);

                response = new SuccessResponse();
            }
            catch(Exception ex) 
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("{jobid:int}")]
        public ActionResult<ItemsResponse<JobSkills>> GetByJobId(int jobId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<JobSkills> skillset = _service.GetByJobId(jobId);

                if(skillset == null)
                {
                    code = 404;
                    response = new ErrorResponse("skillset not found.");
                }
                else
                {
                    response = new ItemsResponse<JobSkills> { Items = skillset };
                }
            }
            catch(Exception ex) 
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("V2/{jobid:int}")]

        public ActionResult<ItemsResponse<JobSkills>> GetByJobIdV2(int jobId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<JobSkills> skillset = _service.GetByJobId(jobId);

                if (skillset == null)
                {
                    code = 404;
                    response = new ErrorResponse("skillset not found.");
                }
                else
                {
                    response = new ItemsResponse<JobSkills> { Items = skillset };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

    } 
}

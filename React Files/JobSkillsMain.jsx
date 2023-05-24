import { React, useState, useEffect } from "react";
import debug from "sabio-debug";
import {
  getJobsByOrg,
  getJobSkillsByJobId,
  getFormExperience,
  addToJobSkills,
  updateJobSkills,
  deleteSkillRelationship,
} from "../../services/jobSkillsService";
import { selectAll } from "../../services/skillService";
import { Button, Card, Table } from "react-bootstrap";
import { Edit2, Trash } from "react-feather";
import toastr from "toastr";
import { Formik, Form, Field } from "formik";
import "./jobskills.css";
import Swal from "sweetalert2";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";

const _logger = debug.extend("JobSkillsSelector");

_logger("testLog");

function JobSkillsMain() {
  const [experienceLevels, setExpLevels] = useState({
    originalList: [],
    experienceLevelOptions: [],
  });

  const [skills, setSkills] = useState({
    skillslList: [],
    skillOptions: [],
  });

  const [jobs, setJobs] = useState({
    jobsList: [],
    mappedJobs: [],
  });

  const [jobSkills, setJobSkillList] = useState({
    referenceJobId: null,
    listOfSkills: [],
    editedListOfSkills: [],
  });

  const [formData, setFormData] = useState({
    jobId: 0,
    skillId: 0,
    experienceLevelId: 0,
    yearsRangeStart: 0,
    yearsRangeEnd: 0,
  });

  const [currentPage, setCurrentPage] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
    placeholderOrgId: 1,
    idPlaceholder: 0,
    buttonName: "Add",
  });

  useEffect(() => {
    getJobsByOrg(
      currentPage.pageIndex,
      currentPage.pageSize,
      currentPage.placeholderOrgId
    )
      .then(onGetJobsSuccess)
      .catch(onGetJobsError);
  }, [currentPage.pageIndex, currentPage.pageSize]);

  useEffect(() => {
    getFormExperience().then(onGetFormExpSuccess).catch(onGetFormExpError);

    selectAll().then(onGetSkillsSuccess).catch(onGetSkillsError);
  }, []);

  const onPageChange = (e) => {
    setCurrentPage((prevState) => {
      const newPage = { ...prevState };
      newPage.pageIndex = e - 1;
      return newPage;
    });
  };

  const onGetJobsSuccess = (response) => {
    _logger(response);
    let jobArray = response.item.pagedItems;

    setJobs((prevState) => {
      const jl = { ...prevState };
      jl.jobsList = jobArray;
      jl.mappedJobs = jobArray.map(mapJobs);
      return jl;
    });

    setCurrentPage((prevState) => {
      const cp = { ...prevState, totalCount: response.item.totalCount };
      return cp;
    });
  };

  const onGetJobsError = (error) => {
    _logger(error.message);
    toastr.error("Error Retrieving Job List");
  };

  const onGetJobSkillsSuccess = (response) => {
    let jobSkillArray = response.items;

    setJobSkillList((prevState) => {
      const jsl = { ...prevState };
      jsl.listOfSkills = jobSkillArray;
      jsl.editedListOfSkills = jobSkillArray.map(mapJobSkills);
      return jsl;
    });
  };

  const onGetJobSkillsError = (error) => {
    if (error.message !== "Request failed with status code 404") {
      toastr.error("Error Retrieving Skills");
    }

    setJobSkillList({
      listOfSkills: [],
      editedListOfSkills: [],
    });
  };

  const onGetFormExpSuccess = (response) => {
    let expArray = response.items;

    setExpLevels((prevState) => {
      const el = { ...prevState };
      el.originalList = expArray;
      el.experienceLevelOptions = expArray.map(mapExpData);
      return el;
    });
  };

  const onGetFormExpError = (error) => {
    _logger(error.message);
    toastr.error("Error Retrieving Experience Levels");
  };

  const onGetSkillsSuccess = (response) => {
    let skillArray = response.items;

    setSkills((prevState) => {
      const sl = { ...prevState };
      sl.skillslList = skillArray;
      sl.skillOptions = skillArray.map(mapSkills);
      return sl;
    });
  };

  const onGetSkillsError = (error) => {
    _logger(error.message);
    toastr.error("Error Retrieving Skills Listing");
  };

  const onDeleteSuccess = (response) => {
    _logger(response);
    toastr.success("Job Skill Relationship Deleted Successfully");

    getJobSkillsByJobId(currentPage.idPlaceholder)
      .then(onGetJobSkillsSuccess)
      .catch(onGetJobSkillsError);
  };

  const onDeleteError = (error) => {
    _logger(error.message);
    toastr.error("Error Deleting Job Skill Relationship");
  };

  const onUpdateJobSkillsSuccess = (response) => {
    _logger(response);
    toastr.success("Job Skill Relationship Successfully Updated");

    getJobSkillsByJobId(currentPage.idPlaceholder)
      .then(onGetJobSkillsSuccess)
      .catch(onGetJobSkillsError);

    setFormData((prevState) => {
      const fd = {
        ...prevState,
        skillId: 0,
        experienceLevelId: 0,
        yearsRangeStart: 0,
        yearsRangeEnd: 0,
      };
      return fd;
    });
  };

  const onUpdateJobSkillsError = (error) => {
    _logger(error.message);
    toastr.error("Error Updating Job Skill Relationship");
  };

  const onAddToJobSkillsSuccess = (response) => {
    _logger(response);
    toastr.success("Job Skill Relationship Successfully Added");

    getJobSkillsByJobId(currentPage.idPlaceholder)
      .then(onGetJobSkillsSuccess)
      .catch(onGetJobSkillsError);
  };

  const onAddToJobSkillsError = (error) => {
    _logger(error.message);
    toastr.error("Error Adding Job Skill Relationship");
  };

  const onJobClicked = (e, id) => {
    e.preventDefault();

    setFormData((prevState) => {
      const fd = { ...prevState, jobId: id };
      return fd;
    });

    getJobSkillsByJobId(id)
      .then(onGetJobSkillsSuccess)
      .catch(onGetJobSkillsError);

    setCurrentPage((prevState) => {
      const cp = { ...prevState, idPlaceholder: id };
      return cp;
    });
  };

  const onEditClicked = (e, skill) => {
    e.preventDefault();
    _logger("skill from onEditClicked", skill);

    setFormData((prevState) => {
      const fd = {
        ...prevState,
        jobId: skill.jobId,
        skillId: skill.skill.id,
        experienceLevelId: skill.experience.id,
        yearsRangeStart: skill.yearsStart,
        yearsRangeEnd: skill.yearsEnd,
      };
      return fd;
    });

    setCurrentPage((prevState) => {
      const cp = { ...prevState, buttonName: "Update" };
      return cp;
    });
  };

  const onDeleteClicked = (e, skillRow) => {
    e.preventDefault();
    _logger(skillRow);

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${skillRow.skill.name}" from this job.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSkillRelationship(skillRow.jobId, skillRow.skill.id)
          .then(onDeleteSuccess)
          .catch(onDeleteError);
      }
    });
  };

  const mapJobs = (job) => {
    return (
      <tr key={job.id} onClick={(e) => onJobClicked(e, job.id)}>
        <td className="jobTitle">{job.title}</td>
      </tr>
    );
  };

  const mapJobSkills = (skillRow) => {
    let usecase = `${skillRow.yearsStart}   to   ${skillRow.yearsEnd} years`;
    if (skillRow.yearsEnd === 0) {
      usecase = `At least ${skillRow.yearsStart} year(s)`;
    }
    if (skillRow.yearsStart === 0) {
      usecase = `Maximum of ${skillRow.yearsEnd} year(s)`;
    }
    return (
      <tr key={skillRow.skill.id}>
        <td className="skillText">{skillRow.skill.name}</td>
        <td className="skillText">{skillRow.experience.name}</td>
        <td className="skillText">{usecase}</td>
        <td className="table-action">
          <Edit2
            className="align-middle me-1 jobTitle"
            onClick={(e) => onEditClicked(e, skillRow)}
            size={18}
          />
          <Trash
            onClick={(e) => onDeleteClicked(e, skillRow)}
            className="align-middle jobTitle"
            size={18}
          />
        </td>
      </tr>
    );
  };

  const mapExpData = (expLevel) => {
    return (
      <option
        data-container="body"
        data-toggle="tooltip"
        data-placement="right"
        title={expLevel.col3}
        value={expLevel.id}
        key={`expLevel_${expLevel.id}`}
      >
        {expLevel.name}
      </option>
    );
  };

  const mapSkills = (skill) => {
    return (
      <option
        data-container="body"
        data-toggle="tooltip"
        data-placement="right"
        title="Skill Description"
        type="number"
        value={skill.id}
        key={`skill_${skill.id}`}
      >
        {skill.name}
      </option>
    );
  };

  const handleSubmit = (values) => {
    _logger("form values", values);
    if (currentPage.buttonName === "Update") {
      updateJobSkills(values)
        .then(onUpdateJobSkillsSuccess)
        .catch(onUpdateJobSkillsError);

      setCurrentPage((prevState) => {
        const cp = { ...prevState, buttonName: "Add" };
        return cp;
      });
    } else {
      addToJobSkills(values)
        .then(onAddToJobSkillsSuccess)
        .then(onAddToJobSkillsError);
    }
  };

  const JobsTable = () => (
    <div className="col-md-3 text-center">
      <Card className="border">
        <Card.Header>
          <Card.Title>
            <h6>Select a Job to Edit</h6>
          </Card.Title>
        </Card.Header>
        <Table bordered>
          <tbody>{jobs.mappedJobs}</tbody>
        </Table>
      </Card>
      <Pagination
        className="ant-pagination"
        onChange={onPageChange}
        current={currentPage.pageIndex + 1}
        total={currentPage.totalCount}
        locale={locale}
        pageSize={currentPage.pageSize}
      />
    </div>
  );

  const SkillsTable = () => (
    <Card className="col-md-12 h-500 border">
      <Card.Header>
        <Card.Title className="text-center">
          <h3>Skills for Selected Job</h3>
        </Card.Title>
        <h6 className="card-subtitle text-muted text-center">
          Please Indicate Required Skills For Currently Selected Job
        </h6>
      </Card.Header>
      <Table striped className="job-skills-table table-fixed">
        <thead>
          <tr>
            <th className="skillsTableHeader">Skill</th>
            <th className="skillsTableHeader">Experience Level</th>
            <th className="skillsTableHeader d-none d-md-table-cell">
              Years of Experience
            </th>
            <th className="job-skillsTableHeader">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!jobSkills.editedListOfSkills.length ? (
            <div>
              <p>No Skills to Display</p>
            </div>
          ) : (
            jobSkills.editedListOfSkills
          )}
        </tbody>
      </Table>
    </Card>
  );

  const SkillForm = () => {
    return (
      <Formik
        enableReinitialize={true}
        onSubmit={handleSubmit}
        initialValues={formData}
      >
        <Form className="form-control">
          <div className="row">
            <div className="col-md-3">
              <label htmlFor="skillId">Skill</label>
              <Field
                className="form-control"
                component="select"
                type="number"
                name="skillId"
              >
                <option value={0}>Select Skill</option>
                {skills.skillOptions}
              </Field>
            </div>
            <div className="col-md-3">
              <label htmlFor="experienceLevelId">Exp. Level</label>
              <Field
                className="form-control"
                component="select"
                type="number"
                name="experienceLevelId"
              >
                <option value={0}>Select Exp. Level</option>
                {experienceLevels.experienceLevelOptions}
              </Field>
            </div>
            <div className="col-md-2">
              <label htmlFor="yearsRangeStart">Years Min</label>
              <Field
                className="form-control"
                type="number"
                name="yearsRangeStart"
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="yearsRangeEnd">Years Max</label>
              <Field
                className="form-control"
                type="number"
                name="yearsRangeEnd"
              />
            </div>
            <div className="col-md-2 text-center d-flex justify-content-center align-items-end">
              <Button className="btn btn-ouline-primary" type="submit">
                {currentPage.buttonName}
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    );
  };

  return (
    <>
      <h1 className="text-center">Required Job Skills</h1>
      <div className="container-fluid">
        <div className="row">
          <JobsTable />
          <div className="col-md-9 ">
            <SkillsTable />
            <SkillForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default JobSkillsMain;

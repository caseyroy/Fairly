import { React, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import debug from "sabio-debug";
import { getJobsByOrg } from "../../services/jobSkillsService";

const _logger = debug.extend("JobSkillsJobList");

_logger("test log");

const JobsTable = () => {
  const placeholderOrgId = 1;

  const [jobs, setJobs] = useState({
    jobsList: [],
    mappedJobs: [],
  });

  const [currentPage, setCurrentPage] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
  });

  useEffect(() => {
    getJobsByOrg(currentPage.pageIndex, currentPage.pageSize, placeholderOrgId)
      .then(onGetJobsSuccess)
      .catch(onGetJobsError);
  }, [currentPage.pageIndex, currentPage.pageSize]);

  const onGetJobsSuccess = (response) => {
    _logger("ongetjobssuccess", response);
    let jobArray = response.item.pagedItems;

    setJobs((prevState) => {
      const jl = { ...prevState };
      jl.jobsList = jobArray;
      jl.mappedJobs = jobArray.map(mapJobs);
      return jl;
    });

    setCurrentPage((prevState) => {
      const cp = { ...prevState };
      cp.totalCount = response.item.totalCount;
      return cp;
    });
  };

  const onGetJobsError = (error) => {
    _logger(error.message);
    toastr.error("Error Retrieving Job List");
  };

  const onPageChange = (e) => {
    setCurrentPage((prevState) => {
      const newPage = { ...prevState };
      newPage.pageIndex = e - 1;
      return newPage;
    });
  };

  const mapJobs = (job) => {
    return (
      <tr key={job.id} onClick={(e) => onJobClicked(e, job.id)}>
        <td>{job.title}</td>
      </tr>
    );
  };

  return (
    <div className="col-md-2">
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
};

export default JobsTable;

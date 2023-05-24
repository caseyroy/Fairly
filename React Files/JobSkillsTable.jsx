import React, { useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import debug from "sabio-debug";
import { Edit2, Trash } from "react-feather";
import { getJobSkillsByJobId } from "../../services/jobSkillsService";

const _logger = debug.extend("JobSkillsForm");

const JobSkillsTable = () => {
  _logger("test logger", setJobSkillList, mapJobSkills);

  const [jobSkills, setJobSkillList] = useState({
    referenceJobId: null,
    listOfSkills: [],
    editedListOfSkills: [],
  });

  useEffect(() => {
    getJobSkillsByJobId().then(onGetJobSkills);
  }, []);

  const mapJobSkills = (skillRow) => {
    let usecase = `${skillRow.yearsStart} to ${skillRow.yearsEnd} years`;
    if (skillRow.yearsEnd === 0) {
      usecase = `At least ${skillRow.yearsStart} year(s)`;
    }
    if (skillRow.yearsStart === 0) {
      usecase = `Maximum of ${skillRow.yearsEnd} year(s)`;
    }
    return (
      <tr key={skillRow.skill.id}>
        <td>{skillRow.skill.name}</td>
        <td>{skillRow.experience.name}</td>
        <td>{usecase}</td>
        <td className="table-action">
          <Edit2
            className="align-middle me-1"
            onClick={(e) => onEditClicked(e, skillRow)}
            size={18}
          />
          <Trash
            onClick={(e) => onDeleteClicked(e, skillRow)}
            className="align-middle"
            size={18}
          />
        </td>
      </tr>
    );
  };

  return (
    <Card className="col-md-12">
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
};

export default JobSkillsTable;

import React from "react";
import { Formik, Field, Form } from "formik";
import { Button } from "react-bootstrap";

const JobSkillsForm = () => {
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
          <div className="col-md-2 text-center my-auto">
            <Button className="btn btn-ouline-primary" type="submit">
              {buttonName}
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default JobSkillsForm;

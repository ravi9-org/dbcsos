import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Table, Form, Accordion, Button, FloatingLabel } from "react-bootstrap";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";

const AddTemplate = () => {
  const navigate = useNavigate();
  let { userData, badgesCtxData } = useContext(ContextComponent);
  let [canRender, setCanRnder] = useState(false);

  useEffect(() => {
    if (userData?.id && !Utils.isObjectEmpty(badgesCtxData)) {
      console.log(badgesCtxData);
      setCanRnder(true);
    }
  }, [userData, badgesCtxData]);

  const updateSelectedBadgeInfo = (e) => {};
  const updateSelectedUserInfo = (e) => {};
  const updateUserFirstName = (e) => {};
  const updateUserLastName = (e) => {};
  const updateUserEmail = (e) => {};
  const updateUserOrganization = (e) => {};
  const updateUserDepartment = (e) => {};
  const updateUserTitle = (e) => {};
  const templateNameHandler = (e) => {};

  return (
    <>
      {canRender && (
        <form className="indi-add-template-form">
          <div>
            <div>Add template</div>
            <div className="">
              <FloatingLabel label="Badge name">
                <Form.Control
                  type="text"
                  className="indi-input-field"
                  id="name"
                  placeholder="Enter badge name"
                  autoComplete="off"
                  onChange={templateNameHandler}
                />
              </FloatingLabel>
            </div>
            <div className="">
              <Button>Save</Button>
              <Button>Cancel</Button>
            </div>
          </div>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Badges selection</Accordion.Header>
              <Accordion.Body>
                <Table responsive="sm">
                  <thead className="indi-data-table-header">
                    <tr>
                      <th>Select </th>
                      <th>Badge name </th>
                      <th>Badge icon </th>
                      <th>Constant </th>
                      <th>isDefault? </th>
                      <th>Multiple </th>
                      <th>Required </th>
                      <th>Default value </th>
                    </tr>
                  </thead>
                  <tbody>
                    {badgesCtxData?.map((badge, index) => (
                      <tr key={index} className="indi-data-table-tr">
                        <td className="indi-data-table-td-badge-id">
                          <Form.Check
                            type="checkbox"
                            onChange={updateSelectedBadgeInfo}
                            id={badge?.id}
                          />
                        </td>

                        <td className="indi-data-table-td-badge-name">
                          {badge?.name}
                        </td>

                        <td className="indi-data-table-td-badge-logo text-center">
                          <img
                            src={badge.iconImage}
                            className="indi-add-template-badge-icon-image"
                            alt="icon"
                          />
                        </td>

                        <td className="indi-data-table-td-badge-constant text-center">
                          <Form.Check
                            type="checkbox"
                            id={`badge-constant-${badge?.id}`}
                          />
                        </td>

                        <td className="indi-data-table-td-badge-isdefault text-center">
                          <Form.Check
                            type="checkbox"
                            id={`badge-isdefault-${badge?.id}`}
                          />
                        </td>

                        <td className="indi-data-table-td-badge-multiple text-center">
                          <Form.Check
                            type="checkbox"
                            id={`badge-multiple-${badge?.id}`}
                          />
                        </td>

                        <td className="indi-data-table-td-badge-required text-center">
                          <Form.Check
                            type="checkbox"
                            id={`badge-required-${badge?.id}`}
                          />
                        </td>

                        <td className="indi-data-table-td-badge-defaultvalue">
                          <Form.Control
                            type="text"
                            id={`badge-defaultvalue-${badge?.id}`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>User fields selection</Accordion.Header>
              <Accordion.Body>
                <Table responsive="sm">
                  <thead className="indi-data-table-header">
                    <tr>
                      <th>Select </th>
                      <th>Field name </th>
                      <th>Shuffle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="indi-data-table-tr">
                      <td className="indi-data-table-td-badge-first-name">
                        <Form.Check
                          type="checkbox"
                          onChange={updateUserFirstName}
                          id="firstName"
                        />
                      </td>

                      <td className="indi-data-table-td-badge-name">
                        First name
                      </td>

                      <td className="indi-data-table-td-badge-logo">Shuffle</td>
                    </tr>

                    <tr className="indi-data-table-tr">
                      <td className="indi-data-table-td-badge-last-name">
                        <Form.Check
                          type="checkbox"
                          onChange={updateUserLastName}
                          id="lastName"
                        />
                      </td>

                      <td className="indi-data-table-td-badge-name">
                        Last name
                      </td>

                      <td className="indi-data-table-td-badge-logo">Shuffle</td>
                    </tr>

                    <tr className="indi-data-table-tr">
                      <td className="indi-data-table-td-user-email">
                        <Form.Check
                          type="checkbox"
                          onChange={updateUserEmail}
                          id="email"
                        />
                      </td>

                      <td className="indi-data-table-td-badge-name">Email</td>

                      <td className="indi-data-table-td-badge-logo">Shuffle</td>
                    </tr>

                    <tr className="indi-data-table-tr">
                      <td className="indi-data-table-td-badge-department">
                        <Form.Check
                          type="checkbox"
                          onChange={updateUserDepartment}
                          id="department"
                        />
                      </td>

                      <td className="indi-data-table-td-badge-name">
                        Department
                      </td>

                      <td className="indi-data-table-td-badge-logo">Shuffle</td>
                    </tr>

                    <tr className="indi-data-table-tr">
                      <td className="indi-data-table-td-badge-organization">
                        <Form.Check
                          type="checkbox"
                          onChange={updateUserOrganization}
                          id="organization"
                        />
                      </td>

                      <td className="indi-data-table-td-badge-name">
                        Organization
                      </td>

                      <td className="indi-data-table-td-badge-logo">Shuffle</td>
                    </tr>

                    <tr className="indi-data-table-tr">
                      <td className="indi-data-table-td-badge-title">
                        <Form.Check
                          type="checkbox"
                          onChange={updateUserTitle}
                          id="title"
                        />
                      </td>

                      <td className="indi-data-table-td-badge-name">Title</td>

                      <td className="indi-data-table-td-badge-logo">Shuffle</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </form>
      )}
    </>
  );
};

export default AddTemplate;

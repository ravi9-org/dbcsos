import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Table, Form, Accordion, Button, Modal } from "react-bootstrap";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";
import AddCardItem from "./AddEditCardItem";
import BadgesRibbon from "../badges/BadgesRibbon";
import TemplateItem from "../templates/TemplateItem";
import AddCardPage from "./AddCardPage";

import CardContext from "./CardContext";

const AddCard = () => {
  let [canRender, setCanRender] = useState(false);
  let [templates, setTemplates] = useState([]);

  const navigate = useNavigate();

  const success = (res) => {
    setTemplates([...res.data]);
    setCanRender(true);
  };

  const fail = (res) => {};

  useEffect(() => {
    Utils.getTemplates().then(success, fail);
  }, []);

  let [selectedTemplate, setSelectedTemplate] = useState(templates[0]);


  const goBack = (e) => {
    navigate(Utils.APP_URLS.CARDS_PAGE);
  };

  let [openModal, setOpenModal] = useState(false);

  const hideModal = (e) => {
    setOpenModal(false);
  };

  let [previewTemplate, setPreviewTemplate] = useState({});

  const openTemplateModalDialog = (e) => {
    setPreviewTemplate(templates[parseInt(e.currentTarget.id, 10)]);
    setOpenModal(true);
  };

  let [canShowAddCardPage, setCanShowAddCardPage] = useState(false);

  const showAddCardPage = (e) => {
    setCanShowAddCardPage(true);
  };

  const changeSelectedTemplate = e => {
    let radioEle = e.currentTarget;
    if (radioEle.checked) {
      setSelectedTemplate(radioEle.selected);
    }
  }

  return (
    <>
      {canRender && (
        <>
          {canShowAddCardPage && (
            <AddCardPage template={{ selectedTemplate }} />
          )}
          {!canShowAddCardPage && (
            <form className="indi-add-template-form">
              <div className="d-flex d-flex-column indi-add-card-title indi-body-title">
                <div>Choose template</div>
                <div className="indi-right-button-wrapper">
                  <Button onClick={showAddCardPage}>Next</Button>
                </div>
              </div>
              <div className="indi-data-table-wrapper">
                <Table responsive="sm">
                  <thead className="indi-data-table-header">
                    <tr>
                      <th className="text-center">Choose template</th>
                      <th>Template name </th>
                      <th className="text-center">Template preview </th>
                    </tr>
                  </thead>
                  <tbody>
                    {templates?.map((template, index) => (
                      <tr key={index} className="indi-data-table-tr">
                        <td className="indi-data-table-td-badge-id indi-add-card-template-cell indi-add-card-template-preview-wrapper">
                          <Form.Check
                            type="radio"
                            name="templateSelection"
                            className={`text-center indi-template-badge-select-${template.id}`}
                            templateid={template?.id}
                            id={template?.id}
                            checked={index === 0}
                            selected={template}
                            onChange={changeSelectedTemplate}
                          />
                        </td>

                        <td className="indi-data-table-td-badge-name indi-add-card-template-name-cell indi-add-card-template-cell">
                          <div className="d-flex1">
                            {template?.templateName}
                          </div>
                        </td>

                        <td className="indi-data-table-td-badge-logo text-center indi-add-card-template-cell indi-add-card-template-preview-wrapper d-flex">
                          <div
                            role="button"
                            id={index}
                            onClick={openTemplateModalDialog}
                            className="indi-add-card-template-preview"
                          ></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              {openModal && (
                <Modal centered show={openModal} onHide={hideModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Card template preview</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="indi-card-template-preview-wrapper">
                      <TemplateItem
                        template={previewTemplate}
                        applyActions={true}
                      />
                    </div>
                    <div className="indi-add-footer">
                      <div className="indi-add-page-footer-btn-wrapper float-right">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={hideModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              )}
            </form>
          )}
        </>
      )}
    </>
  );
};

export default AddCard;

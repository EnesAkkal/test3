import React, { useState } from 'react';
import "../../styles/customtemplate.css";
import HeaderComponent from '../HeaderComponent.js';
import FooterComponent from '../FooterComponent.js';
import axios from "api/axios.js";
import { set } from 'date-fns';
import useAuth from 'hooks/useAuth.js';
import { useNavigate, useParams } from 'react-router-dom';

function CustomTemplateComponent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fieldTypes] = useState(["Text", "Number", "Date", "Image", "Geolocation"]);
  const { auth } = useAuth();
  const [template, setTemplate] = useState({
    "userId": auth._id,
    "templateName": "Default",
    "fieldsNames": [
      "name",
      "description"
    ],
    "fieldsTypes": [
      "text",
      "text"
    ],
    "fieldsValues": [
      "Post Name",
      "Post Description"
    ],
    "createdAt": 1640995200000,
    "lastModifiedDate": 1640995200000
  },
  );


  const addField = () => {
    setTemplate({
      ...template,
      fieldsNames: [...template.fieldsNames, "new field"],
      fieldsTypes: [...template.fieldsTypes, "text"],
      fieldsValues: [...template.fieldsValues, "new field"]
    });
  }

  const removeField = (index) => {

    setTemplate({
      ...template,
      fieldsNames: template.fieldsNames.filter((_, i) => i !== index),
      fieldsTypes: template.fieldsTypes.filter((_, i) => i !== index),
      fieldsValues: template.fieldsValues.filter((_, i) => i !== index)
    });
  }

  const handleFieldChange = (index, event) => {
    const newFieldsValues = [...template.fieldsValues];
    newFieldsValues[index] = event.target.value;
    setTemplate({
      ...template,
      fieldsValues: newFieldsValues
    });
  }

  const handleFieldNameChange = (index, event) => {
    const newFieldsNames = [...template.fieldsNames];
    newFieldsNames[index] = event.target.value;
    setTemplate({
      ...template,
      fieldsNames: newFieldsNames
    });
  }

  const handleFieldTypeChange = (index, event) => {
    const newFieldsTypes = [...template.fieldsTypes];
    newFieldsTypes[index] = event.target.value;
    setTemplate({
      ...template,
      fieldsTypes: newFieldsTypes
    });
  }

  const saveTemplate = async () => {
    try {
      await axios.post("/community/" + id + "/template", template);
      alert("Template saved successfully.");
      navigate("/community/" + id);
    } catch (error) {
      console.error(error);
      alert("Failed to save template.");
    }
  }

  return (
    <div>
      <HeaderComponent />
      <div className="custom-template-container">
        <h1>Custom Template</h1>
        <div className="template-name">
          <label htmlFor="template-name">Template Name</label>
          <input type="text" id="template-name" value={template.templateName} onChange={(event) => setTemplate({ ...template, templateName: event.target.value })} />
        </div>
        <div className="fields-container">
          {template.fieldsNames.map((fieldName, index) => (
            <div key={index} className="template-field">
              <input type="text" value={fieldName} onChange={(event) => handleFieldNameChange(index, event)} />
              <select value={template.fieldsTypes[index]} onChange={(event) => handleFieldTypeChange(index, event)}>
                {fieldTypes.map((fieldType, index) => (
                  <option key={index} value={fieldType}>{fieldType}</option>
                ))}
              </select>
              <button onClick={() => removeField(index)} className='btn btn-red'>Remove</button>
            </div>
          ))}
        </div>
        <button onClick={addField} className="btn btn-lightblack">Add Field</button>
        <button onClick={saveTemplate} className='btn btn-red' >Save Template</button>
      </div>
      <FooterComponent />
    </div>
  );
}


export default CustomTemplateComponent;

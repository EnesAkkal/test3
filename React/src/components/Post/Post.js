import "../../styles/post.css";
import HeaderComponent from "../HeaderComponent.js";
import FooterComponent from "../FooterComponent.js";
import { useEffect, useState } from "react";
import axios from "api/axios.js";
import { useParams } from "react-router-dom";
import useAuth from "hooks/useAuth.js";

function Post() {
  const { id } = useParams();
  const { auth } = useAuth();

  if (!auth) {
    window.location.href = "/login";
  }
  const [post, setPost] = useState({
    username: auth.username,
    userId: auth._id,
    template: {
      templateName: "Default",
      fieldsNames: [
        "name"
      ],
      fieldsTypes: [
        "text"
      ],
      fieldsValues: [],
    }
  });
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState({
    templateName: "Default",
    fieldsNames: [
      "Text"
    ],
    fieldsTypes: [
      "text"
    ],
    fieldsValues: [],
  });

  const [fieldValues, setFieldValues] = useState([]);


  useEffect(() => {
    axios.get("/community/" + id + "/templates").then((response) => {
      console.log("response", response.data);
      setTemplates(response.data);
    }).catch(error => {
      console.error('Failed to get templates:', error);
      alert('Failed to get templates.');
    })
  }, []);


  const handleTemplateChange = (event) => {
    const templateName = event.target.value;
    const template = templates.find(template => template.templateName === templateName);
    setTemplate(template);
  }

  const changeFieldValues = (event, index) => {
    const newFieldValues = [...fieldValues];
    newFieldValues[index] = event.target.value;
    console.log("newFieldValues", newFieldValues);
    setFieldValues(newFieldValues);
    setTemplate({
      ...template,
      fieldsValues: newFieldValues
    });
    setPost({
      ...post,
      template: template
    });
    console.log("template", template);
    console.log("post", post);
  }

  const createPost = () => {
    console.log("createpost", post);
    console.log("createpost", template);

    setPost({
      ...post,
      template: template
    });

    console.log("createpost", post);
    axios.post("/community/" + id + "/posts", post).then((response) => {
      console.log("response", response.data);
      alert("Post created successfully");
    }).catch(error => {
      console.error('Failed to create post:', error);
      alert('Failed to create post.');
    })
  }

  return (
    <>
      <HeaderComponent />
      <div className="root">
        <div className="post-container">
          <div className="column">
            <div className="template">
              Choose a template
            </div>
            <select name="templates" id="template" onChange={handleTemplateChange} value={template}>
              {templates && templates.map((template, index) => (
                <option key={index} value={template.templateName}>{template.templateName}</option>
              ))
              }
            </select>
            <div className="template-content">
              {template.fieldsNames && template.fieldsNames.map((fieldName, index) => (
                <div key={index} className="field">
                  <label htmlFor={fieldName}>{fieldName}</label>
                  <input type={template.fieldsTypes[index]} id={fieldName} name={fieldName} onChange={(e) => changeFieldValues(e, index)
                  } />
                </div>
              ))}
              <button className="btn btn-red" onClick={() => createPost()}>Create Post</button>


            </div>
            <div className="post-content">

              {template.fieldsValues && template.fieldsValues.map((fieldValue, index) => (
                <div key={index}>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}

export default Post;

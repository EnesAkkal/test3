import React, { useEffect, useState } from "react";
import "../../styles/post.css";
import FooterComponent from "../../components/FooterComponent.js";
import HeaderComponent from "../../components/HeaderComponent.js";
import useAuth from "../../hooks/useAuth.js";
import axios from "../../api/axios.js";
import { useNavigate } from "react-router-dom";

const CREATE_URL = "/community/create";

function CreateCommunityComponent() {
  const { auth } = useAuth(); 
  const [community, setCommunity] = useState({
    ownerId: auth._id,
    description: "",
    name: "",
    tags: [],
    isPrivate: false,
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "isPrivate") {
      setCommunity(prev => ({ ...prev, [name]: !prev.isPrivate }));
    } else {
      setCommunity(prev => ({ ...prev, [name]: value }));
    }
    setErrors(prev => ({ ...prev, [name]: "" })); // Clear errors on change
  };

  const handleTags = (e) => {
    const { name, value } = e.target;
    setCommunity(prev => ({ ...prev, [name]: value.split(",").map(tag => tag.trim()) }));
    setErrors(prev => ({ ...prev, [name]: "" })); // Clear errors on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      createCommunity();
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!community.name.trim()) newErrors.name = "Community name is required.";
    if (!community.tags.length) newErrors.tags = "At least one tag is required.";
    if (!community.description.trim()) newErrors.description = "Description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createCommunity = async () => {
    try {
      const response = await axios.post(CREATE_URL,
        JSON.stringify(community),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      alert("Community created successfully: " + JSON.stringify(response?.data));
      navigate(`/community/${response?.data._id}`);
    } catch (err) {
      if (!err?.response) {
        alert('No Server Response');
      } else if (err.response?.status === 400) {
        alert('Missing Community Name');
      } else {
        console.error('Error creating community:', err);
        alert('Failed to create community.');
      }
    }
  };

  return (
    <div>
      <HeaderComponent />
      <div className="root">
        <div className="post-container">
          <div className="column">
            <div className="title">
              <h2>Create New Community</h2>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <textarea id="name" name="name" rows="1" onChange={handleChange}></textarea>
              {errors.name && <div className="error">{errors.name}</div>}

              <label htmlFor="tags">Tags</label>
              <textarea id="tags" name="tags" rows="1" onChange={handleTags}></textarea>
              {errors.tags && <div className="error">{errors.tags}</div>}

              <label>
                <input type="checkbox" name="isPrivate" onChange={handleChange} checked={community.isPrivate} />
                <span>Private</span>
              </label>

              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" rows="6" onChange={handleChange}></textarea>
              {errors.description && <div className="error">{errors.description}</div>}

              <input type="submit" value="Create Community" />
            </form>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default CreateCommunityComponent;

import { Component, useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import "../../styles/homepage.css";
import "../../styles/community.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faGear,
  faSliders,
  faArrowRightFromBracket,
  faSquarePlus
} from "@fortawesome/free-solid-svg-icons";
import pp1 from "../../assets/pp1.jpg";
import FooterComponent from "../../components/FooterComponent.js";
import HeaderComponent from "../../components/HeaderComponent.js";
import axios from "../../api/axios.js";
import PostTableElement from "components/Post/PostTableElement.js";
import useAuth from "../../hooks/useAuth.js"; 

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function CommunityComponent() {
  const { id } = useParams();
  const { auth } = useAuth(); 
  const [community, setCommunity] = useState({
    _id: id,
    name: "Community Name",
    description: "Community Description",
    isPrivate: false,
    owner: {
      "_id": "user1",
      "username": "user1",
      "email": "user1@example.com"
      // other User fields
    },
    memberCount: 1,
    postCount: 0,
    createdAt: "2022-01-01T00:00:00.000+00:00",
    lastModifiedDate: "2022-01-01T00:00:00.000+00:00",
    moderators: [],
    members: [
      {
        "_id": "user1",
        "username": "user1",
        "email": "user1@example.com"
        // other User fields
      }
    ],
    bannedUsers: [],
    posts: [],
    tags: ["tag1", "tag2"],
    templates: [
      {
        "_id": "template1",
        "userId": "user1",
        "templateName": "Default",
        "fieldsNames": ["name", "description"],
        "fieldsTypes": ["text", "text"],
        "fieldsValues": ["Community Name", "Community Description"],
        "createdAt": "2022-01-01T00:00:00.000+00:00",
        "lastModifiedDate": "2022-01-01T00:00:00.000+00:00"
      }
    ]
  });

  useEffect(() => {
    axios.get("/community/" + id).then((response) => {
      setCommunity(response.data);
      console.log(response.data);
    });
  }, [id]);

  const handleCommunity = () => {
    window.location.href = '/community/createpage';
  }

  const createPost = () => {
    window.location.href = '/community/' + id + '/createpost';
  }

  const CommunitySettings = () => {
    window.location.href = '/community/settings/kickuser';
  }

  const createTemplate = () => {
    window.location.href = '/community/' + id + '/template';
  }

  
  const leaveCommunity = () => {
    const userId = auth._id;
    const communityId = community._id;
  
    axios.get(`/community/${communityId}/leave`, { userId })
      .then((response) => {
        console.log(response.data);
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('There was an error leaving the community!', error);
        alert('Failed to leave the community.');
      });
  };
  

  

  return (
    <>
      <HeaderComponent />

      <div className="main-wrapper">
        <main>
          <div className="homefeed-container">
            <div className="row">
              <section className="left">
                <div className="community-info">
                  <h2>{community.name}</h2>
                </div>
                <div className="posts">
                  <ul>
                    {community.posts &&
                      community.posts.map((post) => (
                        <li key={post._id}>
                          <PostTableElement post={post} />
                        </li>
                      ))}
                  </ul>
                </div>
              </section>
              <section className="right">
                <div className="box first">
                  <h3>{community.name}</h3>
                  <span>Created On: {formatDate(community.createdAt)}</span>
                  <p>
                    {community.description}
                  </p>
                  <div className="stats">
                    <div>
                      <h4>{community.postCount}</h4>
                      <span>posts</span>
                    </div>
                    <div>
                      <h4>{community.memberCount}</h4>
                      <span>members</span>
                    </div>
                  </div>
                  <div className="buttons">
                    <a href="#" className="btn btn-red" onClick={CommunitySettings}>
                      <FontAwesomeIcon icon={faGear} /> Manage Community
                    </a>
                  </div>
                  <div className="buttons">
                    <a href="#" className="btn btn-red" onClick={createPost}>
                      <FontAwesomeIcon icon={faSquarePlus} /> Create Post
                    </a>
                  </div>
                  <div className="buttons">
                    <a href="#" className="btn btn-red" onClick={createTemplate}>
                      <FontAwesomeIcon icon={faSliders} /> Create Template
                    </a>
                  </div>
            
                </div>
                <div className="box recommended-communities">
                  <h3>Owner</h3>
                  <div className="inner-box">
                    <div className="img">
                      <img src={pp1} alt="" />
                    </div>
                    <div className="details">
                      <a href="#">{community.owner.username}</a>
                      <span>{community.owner.postCount} Posts</span>
                    </div>
                  </div>
                </div>
                <div className="box community-info">
                  <h3> Community Moderators</h3>
                  <a href="#">
                    View All <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                  {community.moderators.map((moderator) => (
                    <div className="inner-box" key={moderator._id}>
                      <div className="img">
                        <img src={pp1} alt="" />
                      </div>
                      <div className="details">
                        <a href="#">{moderator.username}</a>
                        <span>202 replies</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="box community-info">
                  <h3> Member List</h3>
                  <a href="#">
                    View All <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                  {community.members.map((member) => {
                    console.log("member", member);
                    return (
                      <div className="inner-box" key={member._id}>
                        <div className="img">
                          <img src={pp1} alt="" />
                        </div>
                        <div className="details">
                          <a href="#">{member.username}</a>
                          <span>{community.posts.filter(x => x.userId === member._id).length} Posts</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
      <FooterComponent />
      <script
        src="https://kit.fontawesome.com/9e5ba2e3f5.js"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}

export default CommunityComponent;

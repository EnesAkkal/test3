import { Component } from "react";
import "../styles/homepage.css";
import FooterComponent from "./FooterComponent.js";
import HeaderComponent from "./HeaderComponent.js";
import CommunityTableElement from "./Community/CommunityTableElement.js";
import axios from "../api/axios.js";

class HomePageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: { username: "", email: "", password: "" },
      signUpMode: true,
      error: null,
      communities: [],
    };
  }

    componentDidMount() {
    axios.get("/community").then((response) => {
      this.setState({ communities: response.data });
      console.log(response.data);
    });
    }

  render() {
    return (
      <div>
        <HeaderComponent />
        <div className="main-wrapper">
          <main>
            <div className="homefeed-container">
              <div className="row">
                <section className="left">
                  <h2>Recommended communities for you</h2>
                  <div className="posts_head">
                    <div className="posts_topic">Community Name </div>
                    <div className="posts_category">Tags</div>
                    <div className="posts_replies"> Posts</div>
                    <div className="posts_views"> Members</div>
                    <div className="posts_posts">Join</div>
                  </div>
                  <div className="inner-left">
                    {this.state.communities
                        .filter(x=> !x.private)
                        .map((community, index) => {
                      return <CommunityTableElement key={index} community={community} />
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
      </div>
    );
  }
}

export default HomePageComponent;

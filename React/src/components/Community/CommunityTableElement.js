import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "../../api/axios.js";
import useAuth from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

const CommunityTableElement = ({ community }) => {
    const { _id, name, tags, postCount, memberCount } = community;
    const { auth } = useAuth();
    const userId = auth._id;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Joining Community");
        joinCommunity(userId, _id);
    }

    const handleClick = (_id, e) => {
        console.log("Navigating to Community Page");
        console.log(_id);

        navigate(`/community/${_id}`);
    }

    const joinCommunity = async (userId, _id) => {
        try {
            const response = await axios.post(`/community/join/${_id}`,
                userId,

                {
                    Headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            alert("Join Success" + JSON.stringify(response?.data));
            navigate(`/community/${_id}`);
        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else if (err.response?.status === 400) {
                console.log('Missing Community Name');
            } else {
                console.log(err)
            }
        }
    }



    return (
        <div className="posts_head1">
            <div className="posts_topic" onClick={(e) => handleClick(_id, e)}>
                <h3>{name}</h3>
            </div>
            <div className="posts_category">
                <p>{tags[0]}</p>
            </div>
            <div className="posts_replies">{postCount}</div>
            <div className="posts_views">{memberCount}</div>
            <div className="posts_posts"><FontAwesomeIcon icon={faPlus} onClick={handleSubmit} />
            </div>
        </div>)
}

export default CommunityTableElement;
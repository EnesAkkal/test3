import useAuth from "../hooks/useAuth.js";
const ProfilePageComponent = () => {
    const {auth} = useAuth();

    if (!auth) {
        return (
            <div>
            <h1>Profile Page</h1>
            <p>Not logged in</p>
            </div>
        );
    }

    if (auth) {
        return (
            <div>
            <h1>Profile Page</h1>
            <p>Logged in as {auth.role}</p>
            </div>
        );
    }
}

export default ProfilePageComponent;
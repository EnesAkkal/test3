import { Navigate, Route, Routes } from 'react-router-dom';
import LoginFormPageComponent from 'components/LoginFormPageComponent.js';
import HomePageComponent from './components/HomePageComponent.js';
import UserProfile from 'components/UserProfile/UserProfile.js';
import Post from 'components/Post/Post.js';
import ProfilePageComponent from "./components/ProfilePageComponent.js";
import CreateCommunityComponent from "./components/Community/CreateCommunityComponent.js";
import CommunityComponent from 'components/Community/CommunityComponent.js';
import RequireAuth from 'components/ReqiureAuth.js';
import ManageCommunity from './components/Community/ManageCommunity.js';
import CustomTemplateComponent from 'components/Community/CustomTemplateComponent.js';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginFormPageComponent />} />
      <Route path="/" element={<Navigate to="/login" replace />} /> {/* Redirect base URL to login */}
      <Route element={<RequireAuth />} >
        <Route path="/home" element={<HomePageComponent />} />
        <Route path="/user/:activepage" element={<UserProfile />} />
        <Route path="/community/:id/createpost" element={<Post />} />
        <Route path="/community/createpage" element={<CreateCommunityComponent />} />
        <Route path="/profile" element={<ProfilePageComponent />} />     
          <Route path="/community/:id" element={<CommunityComponent />} />
        <Route path="/community/settings/:activepage" element={<ManageCommunity />} />
        <Route path='/community/:id/template' element={<CustomTemplateComponent/>} />

      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;

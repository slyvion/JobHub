
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import Features from './Components/HomePage/Features';
import Highlights from './Components/HomePage/Highlights';
import Hero from './Components/HomePage/Hero';
import Footer from './Components/HomePage/Footer';
import SignUp from './Components/Login/SignUp.jsx';
import SignIn from "./Components/Login/SignIn.jsx";
import CompaniesPage from "./Components/Company/CompaniesPage.jsx";
import JobPostPage from "./Components/JobPost/JobPostPage.jsx";
import CompanyProfile from "./Components/Company/CompanyProfile.jsx";
import UserProfile from "./Components/User/UserProfile.jsx";
import CreateReview from "./Components/Review/CreateReview.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";
import CreateJobPost from "./Components/JobPost/CreateJobPost.jsx";
import FullJobPost from "./Components/JobPost/FullJobPost.jsx";
import EditJobPost from "./Components/JobPost/EditJobPost.jsx";
import Apply from "./Components/JobPost/Apply/Apply.jsx";
import Dashboard from "./Components/Admin/Dashboard.jsx";
import Applicants from "./Components/JobPost/Apply/Applicants.jsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={
                        <>
                            <Hero />
                            <Features />
                            <Highlights />
                            <Footer />
                        </>
                    } />
                </Route>

                <Route path="/company/:id" element={<CompanyProfile />} />
                <Route path="/user/:id" element={<UserProfile />} />
                <Route path="/company/:id/add-review" element={<CreateReview />}/>

                <Route path="sign-in" element={<SignIn />} />
                <Route path="sign-up" element={<SignUp />} />

                <Route path="companies" element={<CompaniesPage />} />
                <Route path="/jobposts/:id" element={<FullJobPost />} />
                <Route path="/jobposts" element={<JobPostPage />} />
                <Route path="/jobposts/:id/edit" element={<EditJobPost />} />
                <Route path="createJobPost" element={<CreateJobPost />} />
                <Route path="jobposts/:id/apply" element={<Apply />} />
                <Route path="jobposts/:id/applications" element={<Applicants />} />
                <Route path="/admin" element={<Dashboard />} />

                <Route path="/*" element={<ErrorPage />} />

            </Routes>
        </Router>

    );

}

export default App;

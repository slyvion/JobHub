
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import Features from './Components/HomePage/Features';
import Highlights from './Components/HomePage/Highlights';
import Hero from './Components/HomePage/Hero';
import Footer from './Components/HomePage/Footer';
import SignUpUser from './Components/Login/SignUpUser.jsx';
import SignIn from "./Components/Login/SignIn.jsx";
import CompaniesPage from "./Components/Company/CompaniesPage.jsx";
import JobPostPage from "./Components/JobPost/JobPostPage.jsx";
import CompanyProfile from "./Components/Company/CompanyProfile.jsx";
import UserProfile from "./Components/User/UserProfile.jsx";
import CreateReview from "./Components/Review/CreateReview.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";
import CreateJobPost from "./Components/JobPost/CreateJobPost.jsx";

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
                <Route path="sign-up" element={<SignUpUser />} />

                <Route path="companies" element={<CompaniesPage />} />
                <Route path="jobposts" element={<JobPostPage />} />
                <Route path="createJobPost" element={<CreateJobPost />} />

                <Route path="/*" element={<ErrorPage />} />

            </Routes>
        </Router>

    ); //todo: error page

}

export default App;

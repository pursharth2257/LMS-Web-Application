import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { SignUpProvider } from './contexts/SignUpContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Courses from './components/Courses';
import AboutUs from './components/AboutUs';
import PopularCourses from './components/PopularCourses';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Instructors from './components/Instructors';
import TrendingCourses from './components/TrendingCourses';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import SignUpPopup from './components/SignUpPopup';
import NotFound from './pages/NotFound';
import ProfileDashboard from './pages/Profiledashboard/parentLayout';
import CoursePlayer from './pages/CoursePlayer';
import StudentAssessment from './pages/StudentAssessment'; // Import the assessment page
import AllReviews from './pages/courses/Allreviews';
import {
  ParticipantReviews,
  VideoReviews,
  CorporateTrainingReviews,
  CollegeTrainingReviews,
  JobSupportReviews,
  MouthShutReviews,
  JustDialReviews,
  ReviewsReporter,
  LinkedinReviews,
  YoutubeReviews,
  LearnerReviewsComplaints,
  MediumReviews,
} from './pages/reviews';
import {
  AboutBrainBridge,
  OurAffiliation,
  OurCustomers,
  PlacementPartners,
  ContactUs,
} from './pages/about';
import {
  CustomerSupport,
  Events,
  InternshipSupport,
  CareerSupport,
  Certification,
  SubmitFeedback,
} from './pages/students';
import AllCourses from './pages/courses/AllCourses';
import CorporateTraining from './pages/courses/CorporateTraining';
import ViewCourse from './pages/courses/ViewCourse';

// Home page component
const Home = () => {
  return (
    <>
      <div className="mx-4 sm:mx-6 lg:mx-8">
        <HeroSection />
        <TrendingCourses />
        <Courses />
        <AboutUs />
        <WhyChooseUs />
        <Testimonials />
        <Instructors />
        <Reviews />
      </div>
    </>
  );
};

// Layout component to handle conditional Header and Footer rendering
const AppLayout = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  // Scroll to top on route change, including back/forward navigation
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    console.log('Navigation type:', navigationType, 'Pathname:', location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, navigationType]);

  // Hide Header and Footer for specific routes
  const hideHeaderAndFooter =
    location.pathname === '/profile-dashboard' ||
    location.pathname.startsWith('/course-player') ||
    location.pathname.match(/^\/courses\/\w+\/assessments\/\w+$/) || // Hide for assessments
    (location.pathname.startsWith('/courses') && location.pathname.endsWith('/reviews'));

  return (
    <div className="min-h-screen overflow-x-hidden">
      {!hideHeaderAndFooter && <Header />}
      <SignUpPopup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile-dashboard" element={<ProfileDashboard />} />
        <Route path="/course-player/:courseId" element={<CoursePlayer />} />
        <Route path="/courses/:courseId/assessments/:assessmentId" element={<StudentAssessment />} />
        <Route path="/reviews/participant" element={<ParticipantReviews />} />
        <Route path="/reviews/video" element={<VideoReviews />} />
        <Route path="/reviews/corporate" element={<CorporateTrainingReviews />} />
        <Route path="/reviews/college" element={<CollegeTrainingReviews />} />
        <Route path="/reviews/job-support" element={<JobSupportReviews />} />
        <Route path="/reviews/mouthshut" element={<MouthShutReviews />} />
        <Route path="/reviews/justdial" element={<JustDialReviews />} />
        <Route path="/reviews/reporter" element={<ReviewsReporter />} />
        <Route path="/reviews/linkedin" element={<LinkedinReviews />} />
        <Route path="/reviews/youtube" element={<YoutubeReviews />} />
        <Route path="/reviews/complaints" element={<LearnerReviewsComplaints />} />
        <Route path="/reviews/medium" element={<MediumReviews />} />
        <Route path="/about/company" element={<AboutBrainBridge />} />
        <Route path="/about/team" element={<OurAffiliation />} />
        <Route path="/about/mission" element={<OurCustomers />} />
        <Route path="/about/testimonials" element={<PlacementPartners />} />
        <Route path="/about/contact" element={<ContactUs />} />
        <Route path="/students/student-support" element={<CustomerSupport />} />
        <Route path="/students/events" element={<Events />} />
        <Route path="/students/internship-support" element={<InternshipSupport />} />
        <Route path="/students/career-support" element={<CareerSupport />} />
        <Route path="/students/certification" element={<Certification />} />
        <Route path="/students/submit-feedback" element={<SubmitFeedback />} />
        <Route path="/courses/all" element={<AllCourses />} />
        <Route path="/courses/:id" element={<ViewCourse />} />
        <Route path="/courses/:id/reviews" element={<AllReviews />} />
        <Route path="/corporate-training" element={<CorporateTraining />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideHeaderAndFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <SignUpProvider>
      <ThemeProvider>
        <Router>
          <AppLayout />
        </Router>
      </ThemeProvider>
    </SignUpProvider>
  );
}

export default App;
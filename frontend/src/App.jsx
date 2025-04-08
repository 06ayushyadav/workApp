
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense, lazy, useState } from 'react'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'

import Navbar from './components/navbar/Navbar'
import JobProvider from "./context/JobProvider";
import InternProvider from './context/InternProvider'
import SkillsProvider from './context/skillProvider'
import CommentProvider from '../src/context/CommentProvider'
import SkillDetail from './components/skills/SkillDetail'
import InternshipDetail from './components/internship/InternshipDetail'
import Footer from './components/footer/Footer'

const Home = lazy(() => import('./components/Home'));
const Job = lazy(() => import('./components/job/Job'));
const JobDetail=lazy(()=>import('./components/job/JobDetail'));
const Internship = lazy(() => import('./components/internship/Internship'));
const Skills = lazy(() => import('./components/skills/Skills'));
const AdminSignup = lazy(() => import('./components/admin/AdminSignup'));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const About = lazy(() => import('./components/About'));


const Layout = ({ children }) => (
  <div>
    <Navbar />
    <Suspense fallback={<div className='flex justify-center items-center mt-40 '><h1 className='font-bold text-3xl'>Loading...</h1>  </div>}>
      {children}
    </Suspense>
    
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter([
    { path: "/", element: <Layout><Home /></Layout> },

    {
      path: "/job",
      element: <Layout><Job /></Layout>, 
    }, 
    { path: "/job/:id", element: <Layout><JobDetail /></Layout> },

    { path: "/internship", element: <Layout><Internship /></Layout> },
    {path:"/internship/:id", element: <Layout><InternshipDetail/></Layout>},

    { path: "/skills", element: <Layout><Skills /></Layout> },
    { path: "/skills/:id", element: <Layout><SkillDetail/></Layout> },

    { path: "/employersignup", element: <Layout><AdminSignup /></Layout> },
    { path: "/employerlogin", element: <Layout><AdminLogin setAuth={setIsAuthenticated} /></Layout> },

    {path:"/about", element: <Layout><About /></Layout>},

    { 
      path: "/employerdashboard", 
      element: <ProtectedRoute isAuthenticated={isAuthenticated}><Layout><AdminDashboard /></Layout></ProtectedRoute> 
    }
  ]);

  return (
    <JobProvider>
      <InternProvider>
        <SkillsProvider>
          <CommentProvider>
            <RouterProvider router={router} />
          </CommentProvider>
        </SkillsProvider>
      </InternProvider>
    </JobProvider>
  );
}

export default App;

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import UploadVideo from './components/dashboard/UploadVideo.jsx'
import MyVideos from './components/dashboard/MyVideos.jsx';
import Home from './components/dashboard/Home.jsx'
import History from './components/dashboard/History.jsx';


function App() {
  const myRoutes = createBrowserRouter([
    { path: '/', element: <Dashboard /> },
    { path: '/upload', element: <UploadVideo /> },
    {
      path: '/dashboard', element: <Dashboard />, children: [
        { path: 'home', element: <Home /> },
        { path: 'upload', element: <UploadVideo /> },
        { path: 'my-videos', element: <MyVideos /> },
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <Signup /> },
        { path: 'history', element: <History /> }
      ]
    },
  ]);

  return (
    <div>

      <RouterProvider router={myRoutes}></RouterProvider>
    </div>
  );
}

export default App;

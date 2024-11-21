import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/Login';
import Dashboard from './components/dashboard/Dashboard';
import UploadVideo from './components/dashboard/UploadVideo'
import MyVideos from './components/dashboard/MyVideos';
import Home from './components/dashboard/Home'
import History from './components/dashboard/History';


function App() {
  const myRoutes = createBrowserRouter([
    { path: '/', element: <Login /> },
    {path:'/upload', element:<UploadVideo/>},
    { path: '/dashboard', element: <Dashboard />,children:[
      {path:'home', element :<Home/> },
      {path:'upload',element:<UploadVideo/>},
      {path:'my-videos', element:<MyVideos/> },
      {path:'login', element: <Login/> },
      {path:'signup', element:<Signup/>},
      {path:'history' ,element: <History/> }
    ] },
  ]);

  return (
    <div>
  
      <RouterProvider router={myRoutes}></RouterProvider>
    </div>
  );
}

export default App;

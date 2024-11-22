import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Home from '../dashboard/Home'
import Login from '../Login'
import Signup from '../Signup'
import Upload from '../dashboard/UploadVideo'
import History from '../dashboard/History'
import MyVideos from '../dashboard/MyVideos'
import VideoPlayer from '../dashboard/VideoPlayer'

function Router() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path ='/signup' element={<Signup/>}/>
            <Route path='/upload' element={<Upload/>}/>
            <Route path = '/history' element={<History/>}/>
            <Route path='/my-videos' element={<MyVideos/>}/>
            <Route path='/video-play/:id' element={<VideoPlayer/>}/>
        </Routes>
    </div>
  )
}

export default Router
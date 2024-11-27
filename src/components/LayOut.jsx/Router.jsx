import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Home from '../dashboard/Home'
import Login from '../Login'
import Signup from '../Signup'
import Upload from '../dashboard/UploadVideo'
import History from '../dashboard/History'
import MyVideos from '../dashboard/MyVideos'
import VideoPlayer from '../dashboard/VideoPlayer'
import Subscription from '../dashboard/Subscription'
import Check from '../Check'
import MyPlayList from '../dashboard/MyPlayList'
import Search from '../dashboard/Search'


function Router() {
  
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path ='/signup' element={<Signup/>}/>
            <Route path='/upload' element={<Upload/>}/>
            <Route path ='/history' element={<History/>}/>
            <Route path='/my-videos' element={<MyVideos/>}/>
            <Route path='/video-play/:id' element={<VideoPlayer/>}/>
            <Route path='/subcription' element={<Subscription/>}/>
            <Route path='/abc' element={<Check/>}/>
            <Route path='/palylist' element={<MyPlayList/>}/>
            <Route path='/search' element={<Search/>}/>
        </Routes>
    </div>
  )
}

export default Router
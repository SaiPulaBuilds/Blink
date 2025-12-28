import { Routes, Route ,Router} from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import  Authentication  from './pages/Authentication.jsx'
import VideoMeetComponent from './pages/VideoMeet.jsx'
import  HomeComponent  from './pages/home.jsx'
import History from './pages/history.jsx'

const App = () => {
  return (
    
    <Routes>
      
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Authentication/>}/>
      <Route path="/home" element={<HomeComponent></HomeComponent>}/>
      <Route path="/history" element={<History></History>}/>
      <Route path='/:url' element={<VideoMeetComponent></VideoMeetComponent>}/>
     
    </Routes>
 
    
  )
}

export default App

import React, { useContext, useState } from 'react'
import withAuth from '../utilis/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css"
import { Button, IconButton, TextField } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import RestoreIcon from '@mui/icons-material/Restore';


const HomeComponent = () => {
  let navigate=useNavigate()
  const [meetingCode,setMeetingCode]=useState("");
  const {addToUserHistory}=useContext(AuthContext)

  let handleJoinVideoCall=async()=>{
    await addToUserHistory(meetingCode)
    navigate(`/${meetingCode}`)

  }
  return (
  <>
  <div className='navBar'>
    <div style={{display:"flex",alignItems:"center"}}>
      <h2>Blink Video Call</h2>

    </div>
    <div style={{display:"flex",alignItems:"center"}}>
      <IconButton onClick={()=>{
        navigate("/history")
      }}>
        <RestoreIcon/>
       
      </IconButton>
      <p>History</p>
      <Button onClick={()=>{
        localStorage.removeItem("token")
        navigate("/auth")
      }}>LOGOUT</Button>
    </div>
  </div>
  <div className="meetContainer">
    <div className="leftPanel">
      <div>
        <h2>Provides Quality Video Call</h2>
        <div style={{display:"flex",gap:"10px"}}>
        <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
        <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
        </div>
      </div>
    </div>
    <div className='rightPanel'>
    <img srcSet="/logo3.png" alt="" />
  </div>
  </div>
  
  
  </>
  )
}
export default withAuth(HomeComponent)

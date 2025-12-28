import React from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'


const Landing = () => {
    const routeTo=useNavigate();
  return (
    <div className='landingPageContainer'>
        <nav>
            <div className='navHeader'>
                <h2>Blink Video Call</h2>
            </div>
            <div className='navlist'>
                <p onClick={()=>{routeTo("/a8cdq1437")}}>Join as Guest</p>
                <p onClick={()=>{routeTo("/auth")}}>Register</p>
            <div role="button" onClick={()=>{routeTo("/auth")}}>
                <p>Login</p>
            </div>

            </div>
        </nav>
        <div className="landingMainContainer">
            <div>
                <h1><span style={{color:"orange"}}>Connect</span>  with your loved ones</h1>
                <p>Cover a distance by Blink video call</p>
                <div role="button">
                <Link to={"/auth"}>Get Started</Link>
            </div>
            </div>
            <div>
                <img src="/mobile.png" alt="" />
            </div>
            

        </div>
    </div>

  )
}
export default Landing;
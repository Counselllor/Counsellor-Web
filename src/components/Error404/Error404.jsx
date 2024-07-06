import React from 'react'
import './error.css'
import { useNavigate } from 'react-router-dom'
export default function Error404() {
    let navigate=useNavigate()
    function handelClick()
{
    navigate('/dashboard')
} 
 return (
   <>
     <div id="particles" class="particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>

    <main className='main'>
        <section>
            <h1>Page Not Found!</h1>
            <div>
                <span>4</span>
                <span class="circle">0</span>
                <span>4</span>
            </div>
            <p className='we'>We are unable to find the page<br></br>you're looking for.</p>
            <div>
                <button className='back' onClick={handelClick}>Back to Home Page</button>
            </div>
        </section>
    </main>
   </>
  )
}

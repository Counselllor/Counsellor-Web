import React from 'react'
import './error.css'
import { useNavigate } from 'react-router-dom'
import { auth } from "../../firebase/auth";

export default function Error404() {
    let navigate=useNavigate()
    function handelClick()
{
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            navigate('/dashboard')
           
          } else {
           navigate('/')
          }
        });
        return () => unsubscribe();
} 
 return (
   <>
     <div id="particles" class="particles1">
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

    <main className='main1'>
        <section>
            <h1>Page Not Found!</h1>
            <div>
                <span>4</span>
                <span class="circle">0</span>
                <span>4</span>
            </div>
            <p className='we'>We are unable to find the page<br></br>you're looking for.</p>
            <div>
                <button className='back' onClick={handelClick}>Go Back</button>
            </div>
        </section>
    </main>
   </>
  )
}

import { useEffect, useState } from "react";
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { authenticate } from "../../Context/atom";
import { useSetRecoilState } from "recoil";
import { Footer } from "../Footer/Footer";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

export default function Signup(){
    const [email,setEmail]= useState('');
    const [password,setPass]= useState('');
	const setAuthenticated=useSetRecoilState(authenticate)
	const navigate= useNavigate();
    return <div>
        <div>
        <Link to='/'><img src={assets.logo} alt=""  width={160} style={{ marginTop: '10px', marginLeft: '5%' }}   />
            </Link>
        </div>
       
		<div className="signup_container"> 
        
			<div className="sign-right">
                <h1 style={{color:'gray'}}>Please,Sign-up to continue</h1>
        <input type="text" placeholder="email" className="sign-right"
        style={{
            padding:10,
            margin:10
        }} onChange={function(event){
            const value=event.target.value;
            setEmail(event.target.value);

        }}/><br/>

        <input type="text" placeholder="password" className="sign-right"
         style={{
            padding:10,
            margin:10
        }} onChange={function(event){
            const value=event.target.value;
            setPass(event.target.value);

        }}/><br />
         
       <button className="btn" onClick={async ()=>{
            console.log("hello")
            await fetch("https://swiggato-backend-zziz.onrender.com/signup",     /*The fetch function takes an options object as its second parameter. Here, the options object specifies the method as "POST" and includes the request body.

            The request body is created using JSON.stringify() with an object containing title and description properties. These properties are taken from the component's state, title and desc.
            
            Additionally, the fetch options object specifies the headers property, where "contentType":"application/json " is set.*/
           { 
            
            method:"POST",
            body:JSON.stringify({
                email: email,
                password: password
        }),
    headers:{
        "Content-Type":"application/json"
    }}).then(async function(res){ 
		if(res.ok) {
			//taking data from the backend
            const json=await res.json();
			const token=json.token;
			localStorage.setItem('token', token);//saving token in local storage
			//If response is okay, continue with your logic.res.ok is a property of the Response object returned by a fetch request in JavaScript. It indicates whether the HTTP response status code is in the range of 200-299, which corresponds to a successful response.
			if (token) {
				// Token exists, do something
				console.log('Token exists:', token);
				setAuthenticated(true);
				navigate('/')
				//window: This refers to the global object in the browser environment, which represents the window containing the document.
				//location: This is a property of the window object that provides information about the current URL and allows you to manipulate it.
				//href: This is a property of the location object that represents the entire URL of the current page. It can be read to get the current URL or set to navigate to a different URL.
			  } else {
				// Token does not exist, do something else
				console.log('Token does not exist');
			  }
			
		} else{
			const errData=await res.json();
			alert(errData.msg)
		}
        })}}>SignUP</button>
		<br />
        <div className="redirect">Account already exists? <Link to="/signin">Sign in</Link></div>

    </div></div>
    <Footer />
    </div>
}
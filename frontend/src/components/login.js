import React from 'react'
import { GoogleLogin,GoogleOAuthProvider,useGoogleLogin} from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import {FcGoogle} from "react-icons/fc"
import shareVideo from "../assets/share.mp4"
import logo from "../assets/logowhite.png"
import {client} from "../client"



const Login = () => {
    const navigate=useNavigate()
    const login = useGoogleLogin({
        onSuccess: codeResponse => {
            
            console.log(codeResponse)
            fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`)
      .then( async (res) =>{
        const data=await res.json();
        console.log(data);
        const obj=JSON.stringify(data)
        localStorage.setItem('user',obj);
        const {name,picture,sub}=data;
        const doc={
            _id:sub,
            _type:'user',
            userName:name,
            image:picture
        };
client.createIfNotExists(doc).then(()=>{
    navigate('/',{replace:true});
})
      })
      
        },
        // flow: 'auth-code',
        // scope:
        // "email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
      });
    
  return (
    <div >
    <video 
    src={shareVideo}
    loop
    type="video/mp4"
    controls={false}
    muted
    autoPlay
   className='w-screen h-screen object-cover'
    
    />
    <div className='absolute top-0 left-0 right-0 bottom-0 bg-blackOverlay flex flex-col  items-center justify-center'>
<div>
    <img src={logo} alt="" />
</div>
<div className='mt-5'>
{/* <GoogleOAuthProvider clientId={"945479837815-l29nft89nbekptlhi9q1ick4q1bdbse2.apps.googleusercontent.com"}>

    
    </GoogleOAuthProvider>; */}
    {/* <GoogleLogin
clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
render={(renderprops)=>{
    <button className='mt-7'
    type="button"
    onClick={renderprops.onClick}
    disabled={renderprops.disabled}
  
    >

        <FcGoogle className='mr-4'/>Sign in with Google
    </button>
}}
onSuccess={responseGoogle}
onError={esponseGoogle}
cookiePolicy="single_host_origin"
scope="https://www.googleapis.com/auth/userinfo.profile"
/> */}


<button className='mt-7 bg-white flex justify-center items-center p-2 rounded-lg'
    type="button"
    onClick={()=>login()}
  
    >

        <FcGoogle className='mr-4'/>Sign in with Google
    </button>

</div>
    </div>
    </div>
  )
}

export default Login

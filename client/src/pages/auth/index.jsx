import React, { useState } from 'react'
import Victory from '@/assets/victory.svg';
import Icon from '@/assets/favicon.jpg';
import Background from '@/assets/login2.png';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { apiClient } from '@/lib/api-client';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';

const Auth = () => {
  const navigate = useNavigate();
  const {setUserInfo} = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateLogin = () => {
    
    if(!email.length){
      toast.error("Email is required");
      return false;
    }
    if(!password.length){
      toast.error("Password is required");
      return false;
    }
    return true;
  }

  const validateSignup = () => {
    
    if(!email.length){
      toast.error("Email is required");
      return false;
    }
    if(!password.length){
      toast.error("Password is required");
      return false;
    }
    if(password!== confirmPassword){
      toast.error("Confirm password not same as password");
      return false;
    }
    return true;
  }

  const handleLogin = async () => {
    try{
      if(validateLogin()){
        const res = await apiClient.post(LOGIN_ROUTE,{email,password},{withCredentials:true});
        if(res.data.user.id){
          setUserInfo(res.data.user);
          if(res.data.user.profileSetup){
            navigate("/chat");
          }
          else{
            navigate("/profile");
          }
        }
      }
    }catch(err){
      console.log(err);
    }
  }
  const handleSignup = async () => {
    try{
      if(validateSignup()){
        const res = await apiClient.post(SIGNUP_ROUTE,{email,password},{withCredentials:true});
        if(res.status === 201){
          setUserInfo(res.data.user);
          navigate("/profile");
        }
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
      <div className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w=[95vw] xl:w-[70vw] rounded-3xl grid lg:grid-cols-2'>
      <div className='flex flex-col gap-10 items-center justify-center'>
        <div className='flex items-center justify-center flex-col'>
          <div className='flex justify-center items-center'>
            <h1 className='text-5xl font-bold md:text-6xl'>Welcome to</h1>
            <img src={Icon} alt='Victory Emoji' className='h-[100px] p-4'/>
          </div>
          <p className='font-medium text-center'>
            Fill in your details to get started with the best chat app
          </p>
        </div>
        <div className='flex items-center justify-center w-full'>
            <Tabs className='w-3/4 ' defaultValue='login'>
              <TabsList className='bg-transperant rounded-none w-full flex'>
                <TabsTrigger value='login'
                className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 ' >
                  Login
                </TabsTrigger>
                <TabsTrigger value='signup'
                className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 ' >
                  SignUp
                </TabsTrigger>
              </TabsList>
              <TabsContent className='flex flex-col gap-5 mt-10' value='login'>
                  <Input placeholder="Email" type="email" className='rounded-full p-6' value={email} onChange={e=>setEmail(e.target.value)} />
                  <Input placeholder="Password" type="password" className='rounded-full p-6' value={password} onChange={e=>setPassword(e.target.value)} />
                  <Button className='rounded-full p-6' onClick={handleLogin}>Login</Button>

                </TabsContent>
                <TabsContent className='flex flex-col gap-5' value='signup'>
                <Input placeholder="Email" type="email" className='rounded-full p-6' value={email} onChange={e=>setEmail(e.target.value)} />
                  <Input placeholder="Password" type="password" className='rounded-full p-6' value={password} onChange={e=>setPassword(e.target.value)} />
                  <Input placeholder="Confirm Password" type="password" className='rounded-full p-6' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
                  <Button className='rounded-full p-6' onClick={handleSignup}>Sign Up</Button>

                </TabsContent>
            </Tabs>
        </div>
      </div>
      <div className='hidden lg:flex justify-center items-center'>
        <img src={Background} alt='background login' className='h-[600px]'/>

      </div>
        

      </div>
    </div>
  )
}

export default Auth
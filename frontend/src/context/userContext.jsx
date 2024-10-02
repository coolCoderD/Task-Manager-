import React, { createContext, useContext,useState,useEffect} from "react";
import { useNavigate } from "react-router";
import toast from 'react-hot-toast';
import axios from "axios";


// Create the UserContext
const UserContext = createContext();

axios.defaults.withCredentials = true;

// UserProvider component to wrap your application
export const UserProvider = ({ children }) => {
    const serverUrl = "http://localhost:8000";
    const navigate=useNavigate();

    const [user,setUser]=useState({});
    const [allUsers,setAllUsers]=useState([]);
    const [userState,setUserState]=useState({
        name:"",
        email:"",
        password:"",
    });
    const [loading,setLoading]=useState(false);

    const registerUser=async(e)=>{
        e.preventDefault();
        if(
            !userState.email.includes("@") ||
            !userState.password ||
            userState.password.length < 6
        ){
            toast.error("Please enter a valid email and password (min 6 characters)");
            return;
        }
        try{
            const res=await axios.post(`${serverUrl}/api/register`,userState);
            console.log("User registration successfully",res.data);
            toast.success("User registration successfully");

            setUserState({
                name:"",
                email:"",
                password:"",
            })

            navigate("/login");
        }catch(err){
            toast.error(err.response.data.message);
        }
    };

    const loginUser=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post(`${serverUrl}/api/login`,{
                email:userState.email,
                password:userState.password
            },{
                withCredentials:true
            });
            console.log("User login successfully",res.data);
            toast.success("User logged in successfully");
            setUserState({
                email:"",
                password:"",
            })
            await getUser();
            navigate("/home");
        }catch(err){
            console.log("Error loggin in user",err)
            toast.error(err.response?.data?.message || "Login failed");
        
    }
}

const userLoginStatus=async()=>{  
    let loggedIn=false;
    try{
        const res=await axios.get("${serverUrl}/api/login-status",{
            withCredentials:true
        });
        loggedIn=!!res.data;
        setLoading(false);
        if(!loggedIn){
            navigate("/login");
        }
}
catch(error){
    console.log("Error in getting login status",error);
}
return loggedIn;
}


const logoutUser=async()=>{
    try{
        const res=await axios.get("${serverUrl}/api/logout",{
            withCredentials:true
        });
        toast.success("User logged out successfully");
        navigate("/");
    }catch(err){
        console.log("Error in logging out user",err);
        toast.error(err.response.data.message);
    }
}

const getUser=async()=>{
    setLoading(true);
    try{
        const res=await axios.get("${serverUrl}/api/user",{
            withCredentials:true
        });
        setUser((prev)=>{
            return {...prev,...res.data}
        });
        setLoading(false);
    }catch(err){
        console.log("Error in getting user details",err);
        setLoading(false);
        toast.error(err.response.data.message);
    }
};


const updateUser=async()=>{
    e.preventDefault();
    setLoading(true);
    try{
        const res=await axios.patch("${serverUrl}/api/user",data,{
            withCredentials:true
        })

        setUser((prev)=>{
            return {...prev,...res.data}
        })
        toast.success("User updated successfully");
    }
    catch(err){
        console.log("Error in updating user details",err);
        setLoading(false);
        toast.error(err.response.data.message);
    }
}

//admin routes
const getAllUsers=async()=>{
    setLoading(true);
    try{
        const res=await axios.get("${serverUrl}/api/users",{},{
            withCredentials:true
        })
        setAllUsers(res.data);
        setLoading(false);
    }catch(err){
        console.log("Error in getting all users",err);
        setLoading(false);
        toast.error(err.response.data.message);
    }
}

const deleteUser=async(id)=>{
    setLoading(true);
    try{
        const res=await axios.delete(`${serverUrl}/api/admin/user/${id}`,{},{
            withCredentials:true
        })
        toast.success("User deleted successfully");
        setLoading(false);
        await getAllUsers();
    }
    catch(err){
        console.log("Error in deleting user",err);
        toast.error(err.response.data.message);
        setLoading(false);
    }
}

const handleUserInput=(name)=>(e)=>{
    const value=e.target.value;
    setUserState((prev)=>({
        ...prev,
        [name]:value
    }))
}

useEffect(()=>{
    const loginStatus=async()=>{
        const status=await userLoginStatus();
        if(status){
            await getUser();
        }
    } ;
    loginStatus();
},[])

useEffect(()=>{
    if(user.role==='admin') getAllUsers();
},[user.role])

console.log(user);

    return (
        <UserContext.Provider value={{ 
            user,
            setUser,
            allUsers,
            setAllUsers,
            userState,
            setUserState,
            loading,
            setLoading,
            registerUser,
            loginUser,
            logoutUser,
            getUser,
            updateUser,
            getAllUsers,
            deleteUser,
            handleUserInput,
            userLoginStatus,
         }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
    return useContext(UserContext);
};

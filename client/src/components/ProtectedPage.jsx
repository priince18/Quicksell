import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../Apicalls/users";
import { Avatar, Badge, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { FiUserCheck } from 'react-icons/fi';
import { TbLogout } from 'react-icons/tb';
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/LoadersSlice";
import { SetUser } from "../redux/usersSlice";
import {MdNotificationsActive} from 'react-icons/md'
import Notification from "./Notification";
import { getAllNotifications, readAllNotifications } from "../Apicalls/notification";




const ProtectedPage = ({ children }) => {
  const [notification, setnotification] = useState(null);
  const [showNotifications, setshowNotifications] =useState(false);
  const {user} = useSelector(state => state.users)
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  
  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      if (response.success) {
      dispatch(SetLoader(false));
        // setuser(response.data);
        dispatch(SetUser(response.data))
      } else {
        navigate("/login");
        // console.log(response.message);
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/login");
      // console.log(error.message);
      message.error(error.message);
    }
  };

  const getnotification =async()=>{
      try {
          const response = await getAllNotifications();
          if(response.success){
            setnotification(response.data);
          }else{
            throw new Error(response.message);
          }
      } catch (error) {
        message.error(error.message);
      }
  }
  
  const readNotification= async ()=>{
    try {
        const response = await readAllNotifications();
        if(response.success) {
          getnotification()
        }else{
          throw new Error(response.error)
        }
    } catch (error) {
      message.error(error.message);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
      getnotification();
    } else {
      navigate("/login");
    }
  }, []);

  // keep search input in sync with URL
  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    setSearchText(params.get('q') || "");
  }, [location.search]);

  // debounce updating URL when typing to avoid re-render flicker
  useEffect(()=>{
    const handle = setTimeout(()=>{
      const params = new URLSearchParams(location.search);
      if (searchText && searchText.trim() !== "") {
        params.set('q', searchText.trim());
      } else {
        params.delete('q');
      }
      // use replace to avoid history spam and reduce flicker
      navigate({ pathname: '/', search: params.toString() }, { replace: true });
    }, 400);
    return ()=> clearTimeout(handle);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);
 // console.log(user.role)
  return (
    user && (
      <div>
        <div className="flex justify-between items-center bg-primary p-5">
          <div className="flex items-center gap-3 cursor-pointer" onClick={()=> navigate('/') }>
            <img 
              src="/images/logo1.png" 
              alt="QuickSell Logo" 
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-2xl text-white font-bold">QuickSell</h1>
          </div>

          {/* Navbar Search */}
          <div className="flex-1 flex justify-center px-4">
            <input
              type="text"
              value={searchText}
              onChange={(e)=> setSearchText(e.target.value)}
              placeholder="Search products..."
              className="w-full max-w-xl h-10 px-4 rounded-full border border-gray-300 outline-none"
            />
          </div>

          <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
           <FiUserCheck size={22} className="mr-2"/>

           <span className="cursor-pointer uppercase" 
           onClick={()=> {
             if(user.role==='user'){
               navigate('/profile')
             }else{
               navigate('/admin')
             }
           }}
           >
             {user.name}
           </span>
           
           <Badge count={
             notification?.filter((notification)=>!notification.read).length
           }
           onClick={()=>{
             readNotification()
             setshowNotifications(true)
           }}
           className="items-center ml-2 cursor-pointer">
             <Avatar shape="circle" size="medium" icon={<MdNotificationsActive size={20} className="mt-1 text-black"/>}/>
           </Badge>

           <TbLogout size={22} className="ml-5 cursor-pointer" 
           onClick={()=>{
             localStorage.removeItem('token');
             navigate('/login')
           }}
           />
          </div>
        </div>
        <div className="p-5">{children}</div>
        {<Notification
           notification={notification}
           reloadNotifications={getnotification}
           showNotifications={showNotifications}
           setshowNotifications={setshowNotifications}
        />}
      </div>
    )
  );
};

export default ProtectedPage;

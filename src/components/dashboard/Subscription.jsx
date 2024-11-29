import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCommentAPI, getAllUsers } from '../../features/rajanTubeSlice';
import { getAdapter } from 'axios';


function Subscription() {
  const { allUsers } = useSelector((state) => state.rajanTube);
  const dispatch = useDispatch();
  const [totalsub,setTotalSubs] = useState(null)

  useEffect(() => {
   dispatch(getAllUsers())  
  }, [dispatch,allUsers]);

  useEffect(() => {
    const subscribedUsers = allUsers.filter((user) =>
      user.subcribedChannels.includes(localStorage.getItem('userId'))
    );  

    if (subscribedUsers.length > 0) {
      setTotalSubs(subscribedUsers.length)
    } else {
      
    }
  }, [allUsers]);

  return <>
    <>
      <p className=''>{totalsub}</p>
    </>

  </>;
}

export default Subscription;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../features/rajanTubeSlice';


function Check() {
  const { allUsers } = useSelector((state) => state.rajanTube);
  const dispatch = useDispatch();
  const [totalsub,setTotalSubs] = useState(null)

  useEffect(() => {
   dispatch(getAllUsers())
  }, [dispatch]);

  useEffect(() => {
    const subscribedUsers = allUsers.filter((user) =>
      user.subcribedChannels.includes(localStorage.getItem('userId'))
    );

    console.log("Subscribed Users:", subscribedUsers);
    console.log("Logged-in User ID:", localStorage.getItem('userId'));

    if (subscribedUsers.length > 0) {
      console.log("Number of subscribers:", subscribedUsers.length);
      setTotalSubs(subscribedUsers.length)
    } else {
      console.log("No subscribers found.");
    }
  }, [allUsers]);

  return <>
    <>
      <p className=''>{totalsub}</p>
    </>

  </>;
}

export default Check;

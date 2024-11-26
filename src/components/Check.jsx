import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../features/rajanTubeSlice';

function Check() {
  const { allUsers } = useSelector((state) => state.rajanTube);
  const [subsLogo, setSubsLogo] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const subscribedUsers = allUsers.filter((user) =>
      user.subcribedChannels.includes(localStorage.getItem('userId'))
    );

    console.log("Subscribed Users:", subscribedUsers);

    const logoUrls = subscribedUsers.map((user) => user.logoUrl);
    setSubsLogo(logoUrls);
    console.log("Logo URLs:", logoUrls);
  }, [allUsers]);

  return (
    <div>
      <h1>Subscribed Users Logos</h1>
      <ul>
        {subsLogo.map((logo, index) => (
          <li key={index}>
            <img src={logo} alt={`Logo ${index + 1}`} style={{ width: "100px", height: "100px" }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Check;

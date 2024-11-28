import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../features/rajanTubeSlice';

function SubscribedByMe() {
    const { allUsers } = useSelector((state) => state.rajanTube);
    const dispatch = useDispatch();
    const [subscribedChannels, setSubscribedChannels] = useState([]);

    useEffect(() => {
        // Fetch all users when the component loads
        dispatch(getAllUsers());
    }, [dispatch]);

    useEffect(() => {
        // Process data once allUsers is updated
        if (allUsers?.length) {
            loadData();
        }
    }, [allUsers]);

    const loadData = () => {
        const currentUserId = localStorage.getItem('userId');
        if (!currentUserId) {
            console.error('User not logged in.');
            return;
        }

        const subscribedUsers = allUsers.filter((user) =>
            user.subcribedChannels?.includes(currentUserId)
        );

        // console.log('Subscribed Users:', subscribedUsers);

        // Extract channel details for subscribed users
        const channels = subscribedUsers.map((user) => ({
            id: user._id,
            channelName: user.channelName,
            logoUrl: user.logoUrl,
            subscribers: user.subcribers,
        }));

        setSubscribedChannels(channels);
        // console.log('Subscribed Channels:', channels);
    };

    return (
      
    <div className='text-gray-400'>
      {subscribedChannels.length > 0 ? (
        <ul>
          {subscribedChannels.map((channel) => (
            <li key={channel.id}>
             
              <div>
                <p className='flex justify-start gap-2 items-center'>
                   <span> {channel.channelName}</span>
                   <img className='h-10 w-10 rounded-full' src={channel.logoUrl} alt="" />
                    </p>
                
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No subscribed channels found.</p>
      )}
    </div>
    );
}

export default SubscribedByMe;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../features/rajanTubeSlice';

function ToggleText() {
  const dispatch =useDispatch()
    const allUsers = useSelector((state) => state.rajanTube.allUsers); // Directly access the array to reduce re-referencing
    const [text, setText] = useState(''); // State for the toggle text

    useEffect(() => {
       dispatch(getAllUsers())
        if (allUsers?.length > 0) {
            toggleSubscriberText();
        }
    }, [allUsers]); 

    const toggleSubscriberText = () => {   
        const currentUserId = localStorage.getItem('userId') 
        const isSubscribed = allUsers.some((user) =>
            user.subcribedBy?.includes(currentUserId)
        );       
        setText((prevText) =>
            isSubscribed ? (prevText !== 'Unsubscribe' ? 'Unsubscribe' : prevText) : (prevText !== 'Subscribe' ? 'Subscribe' : prevText)
        );
    };

    return (
        <div className="text-black">
            {text || 'Loading...'} 
        </div>
    );
}

export default ToggleText;

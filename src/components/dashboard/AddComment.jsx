import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSend } from "react-icons/io";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { addCommentAPI, getAllCommentAPI } from '../../features/rajanTubeSlice'; // Import the action
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function AddComment() {
    const { allComment } = useSelector((state) => state.rajanTube);
    const [comment, setComment] = useState('');
    const [showComment, setShowComment] = useState(false);
    const dispatch = useDispatch(); // Initialize dispatch

    const handleSend = () => {
        if (!comment.trim()) {
            alert("Comment cannot be empty");
            return;
        }
        const videoId = localStorage.getItem('userId');

        // Add the new comment
        const newComment = { commentText: comment, userId: videoId, videoId }; // Create a new comment object
        dispatch(addCommentAPI({ id: videoId, commentText: comment }));

        // Add the new comment directly to the state without re-fetching
        dispatch({
            type: 'rajanTube/addComment',
            payload: newComment,
        });

        toast.success("Comment added");
        setComment('');
    };

    useEffect(() => {
        // Fetch all comments when the component mounts
        dispatch(getAllCommentAPI(localStorage.getItem('userId')));
        console.log(allComment.commentsList)
    }, [dispatch]);

    const handleShowAllComment = () => {
        setShowComment(!showComment);
    };
    const handleEditComment = (id) => {
        console.log("edit", id)
    }
    const handleDleteComment = (id) => {
        console.log("delete", id)
    }

    return (
        <>
            {/* Add Comment Section */}
            <div className="relative w-full">
                <input
                    className="border w-full bg-gray-900 rounded-2xl text-white px-3 py-1 pr-12 overflow-hidden resize-none"
                    placeholder="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className="absolute top-1 right-1 text-white px-3 py-1 rounded-sm hover:bg-blue-600"
                    onClick={handleSend}
                >
                    <IoIosSend className="text-gray-400" />
                </button>
            </div>

            {/* View Comments Section */}
            <div className="text-white mt-4">
                <p className="flex justify-start gap-2 items-center">
                    Comments
                    <button onClick={handleShowAllComment}>
                        {showComment ? <FaAngleDown /> : <FaAngleUp />}
                    </button>
                </p>

                {showComment && allComment.commentsList && allComment.commentsList.map((ele, index) => (
                    <div key={index} className="pb-2"> {/* Add padding-bottom for spacing */}
                        <div className='bg-gray-900 rounded-md px-2 border-b border-gray-600'> {/* Added bottom border */}
                            <div className='flex justify-between items-center'>
                                <p>{ele.commentText}</p>
                                <p className="text-gray-400">{ele.userId.channelName}</p>
                            </div>
                            <div className='flex gap-5 py-2'>
                                <FaEdit className=' cursor-pointer' onClick={() => handleEditComment(ele._id)} />
                                <MdDelete className=' cursor-pointer' onClick={() =>handleDleteComment(ele._id)} />
                            </div>
                        </div>
                    </div>
                ))}


            </div>
        </>
    );
}

export default AddComment;

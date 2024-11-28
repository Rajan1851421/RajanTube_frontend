import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSend } from "react-icons/io";
import { FaAngleDown, FaAngleUp, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { addCommentAPI, commentUpdateByCmtid, getAllCommentAPI } from '../../features/rajanTubeSlice';
import { toast } from 'react-toastify';


function AddComment() {
    const { allComment } = useSelector((state) => state.rajanTube);
    const [comment, setComment] = useState('');
    const [showComment, setShowComment] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState({ id: '', text: '' });

    const dispatch = useDispatch();

    const handleSend = () => {
        if (!comment.trim()) {
            alert("Comment cannot be empty");
            return;
        }
        const videoId = localStorage.getItem('userId');

        const newComment = { commentText: comment, userId: videoId, videoId };
        dispatch(addCommentAPI({ id: videoId, commentText: comment }))
        .then(() => {
            toast.success("Comment added successfully");
            dispatch(getAllCommentAPI(localStorage.getItem('userId')));
            setIsModalOpen(false); 
        })
        .catch((error) => {
            console.error("Error updating comment:", error);
            toast.error("Failed to update comment");
        });

        dispatch({
            type: 'rajanTube/addComment',
            payload: newComment,
        });

        toast.success("Comment added");
        setComment('');
    };

    useEffect(() => {
        dispatch(getAllCommentAPI(localStorage.getItem('userId')));
    }, [dispatch]);

    const handleShowAllComment = () => {
        setShowComment(!showComment);
    };

    const handleEditComment = (id, text) => {
        setSelectedComment({ id, text });
        setIsModalOpen(true);
    };

    const handleUpdateComment = () => {
        const { id, text } = selectedComment;
    
        if (!text.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }
    
        // Prepare FormData
        const updateComment = new FormData();
        updateComment.append('commentText', text);
    
        dispatch(commentUpdateByCmtid({ id, formData: updateComment }))
            .then(() => {
                toast.success("Comment updated successfully");
                dispatch(getAllCommentAPI(localStorage.getItem('userId')));
                setIsModalOpen(false); 
            })
            .catch((error) => {
                console.error("Error updating comment:", error);
                toast.error("Failed to update comment");
            });
    };
    

    const handleDeleteComment = (id) => {
        console.log("delete", id);
    };

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
                    <div key={index} className="pb-2">
                        <div className='bg-gray-900 rounded-md px-2 border-b border-gray-600'>
                            <div className='flex justify-between items-center'>
                                <p>{ele.commentText}</p>
                                <p className="text-gray-400">{ele.userId.channelName}</p>
                            </div>
                            <div className='flex gap-5 py-2'>
                                <FaEdit
                                    className='cursor-pointer'
                                    onClick={() => handleEditComment(ele._id, ele.commentText)}
                                />
                                <MdDelete
                                    className='cursor-pointer'
                                    onClick={() => handleDeleteComment(ele._id)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Comment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 rounded-lg p-5 w-96">
                        <h3 className="text-white text-lg mb-4">Edit Comment</h3>
                        <textarea
                            className="w-full h-20 border border-gray-600 rounded-md bg-gray-900 text-white p-2"
                            value={selectedComment.text}
                            onChange={(e) =>
                                setSelectedComment({ ...selectedComment, text: e.target.value })
                            }
                        ></textarea>
                        <div className="flex justify-end mt-4 gap-2">
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-md"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                onClick={handleUpdateComment}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddComment;

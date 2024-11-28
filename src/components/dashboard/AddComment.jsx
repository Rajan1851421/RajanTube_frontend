import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSend } from "react-icons/io";
import { FaAngleDown, FaAngleUp, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { addCommentAPI, commentUpdateByCmtid, deleteComment, getAllCommentAPI, publiccomments } from '../../features/rajanTubeSlice';
import { toast } from 'react-toastify';
import { FaEllipsisV } from 'react-icons/fa';

function AddComment() {
    const { allComment, loading } = useSelector((state) => state.rajanTube);
    const [comment, setComment] = useState('');
    const [showComment, setShowComment] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState({ id: '', text: '' });
    const [selectedCommentId, setSelectedCommentId] = useState(null); // For managing specific comment's dialog
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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

        
        setComment('');
    };

    const handleToggleDialog = (commentId) => {
        // If the same comment is clicked, toggle its state
        if (selectedCommentId === commentId) {
            setSelectedCommentId(null); // Close dialog if the same comment is clicked
        } else {
            setSelectedCommentId(commentId); // Open dialog for this comment
        }
    };

    const handleCloseDialog = () => {
        if(!loading){

            setSelectedCommentId(null);
        }
    };

    useEffect(() => {
        dispatch(getAllCommentAPI(localStorage.getItem('userId')));
        dispatch(publiccomments());
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
        dispatch(deleteComment(id))
            .then(response => {
                dispatch(getAllCommentAPI(localStorage.getItem('userId')))
            })
            .catch(error => {
                console.log(error)
            })
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
                                <div className="relative inline-block">
                                    {/* Three-dot Icon */}
                                    <button
                                        onClick={() => handleToggleDialog(ele._id)} // Pass the comment ID to toggle its dialog
                                        className="text-gray-600 hover:text-gray-800 p-2 rounded-full">
                                        <FaEllipsisV size={20} />
                                    </button>

                                    {/* Dialog */}
                                    {selectedCommentId === ele._id && (
                                        <div
                                            className="absolute right-0 mt-2 w-48 bg-gray-300 border rounded-lg shadow-lg z-50"
                                            onClick={handleCloseDialog}
                                        >
                                            <ul className="p-2 space-y-4 text-md flex flex-col justify-center items-center text-gray-700">
                                              <p onClick={() => handleEditComment(ele._id, ele.commentText)}
                                               className='flex cursor-pointer justify-start items-center gap-4'> Edit <FaEdit
                                                    className=' w-full hover:bg-gray-300 text-blue-800'
                                                    
                                                /></p>
                                               {loading ? "..." : <p onClick={() => handleDeleteComment(ele._id)} className='flex cursor-pointer justify-start items-center gap-4'>Delete                                                
                                                   <MdDelete
                                                        className='cursor-pointer w-full text-red-700'
                                                        
                                                    />
                                                </p>}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='flex gap-5 py-2'></div>
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

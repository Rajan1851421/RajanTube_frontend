import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCommentAPI, getAllUsers, publiccomments } from '../features/rajanTubeSlice';

function Check() {
  const dispatch = useDispatch();

  const { allComment, publicComments, allUsers } = useSelector((state) => state.rajanTube);
  
  useEffect(() => {
    dispatch(publiccomments());
    dispatch(getAllCommentAPI(localStorage.getItem('userId')));
    dispatch(getAllUsers());
  }, [dispatch]);
  
  // The video ID to match against userId
  const videosId = "673d9e62aadf31594426aa3a";
  // const videosId = "673d9e62aadf31594426aa3a";

  // Filter the publicComments where the userId matches the videosId
  const matchedComments = publicComments.message
    ? publicComments.message.filter((comment) => comment.userId === videosId)
    : [];

  console.log("Matched Comments:", matchedComments);

  return (
    <div>
      <h1>Check</h1>
      <div>
        {/* Render the matched comments */}
        {matchedComments.length > 0 ? (
          matchedComments.map((comment, index) => (
            <div key={index}>
              <p>{comment.commentText}</p>
              <p>User ID: {comment.userId}</p>
            </div>
          ))
        ) : (
          <p>No matching comments available</p>
        )}
      </div>
    </div>
  );
}

export default Check;

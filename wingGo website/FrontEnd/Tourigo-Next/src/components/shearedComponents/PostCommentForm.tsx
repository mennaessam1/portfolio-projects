import CommentForm from '@/forms/CommentForm';
import React from 'react';

const PostCommentForm = () => {
    return (
        <>
            <div className="post-comment-form">
                <div className="post-comments-title">
                    <h4 className="mb-15">Leave a Comment</h4>
                    <span className="d-block mb-25">Your email address will not be published. Required fields are
                        marked *</span>
                </div>
                  <CommentForm/>
            </div>
        </>
    );
};

export default PostCommentForm;
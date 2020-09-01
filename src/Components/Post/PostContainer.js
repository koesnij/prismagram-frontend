import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import PostPresenter from './PostPresenter';
import useInput from '../../Hooks/useInput';
import { TOGGLE_LIKE, ADD_COMMENT } from './PostQueries';

const PostContainer = ({
  id,
  user,
  caption,
  location,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
}) => {
  const [isLikedFromState, setIsLiked] = useState(isLiked);
  const [likeCountFromState, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [commentsFromState, setComment] = useState([...comments]);

  const comment = useInput('');

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value },
  });

  const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 2000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 2000);
    }
  };
  useEffect(() => {
    slide();
  }, [currentItem]);

  const toggleLike = () => {
    // await을 쓰면 실시간 상호작용을 보여줄 수 없음 (반응이 늦음)
    toggleLikeMutation();
    if (isLikedFromState === true) {
      likeCountFromState(false);
      setLikeCount(likeCountFromState - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountFromState + 1);
    }
  };

  const onKeyPress = async (e) => {
    const { which } = e;
    if (which === 13) {
      e.preventDefault();
      try {
        const {
          data: { addComment },
        } = await addCommentMutation();
        setComment([...commentsFromState, addComment]);
        comment.setValue('');
      } catch (error) {
        toast.error('Cannot send comment.');
      }
    }
  };

  return (
    <PostPresenter
      user={user}
      createdAt={createdAt}
      caption={caption}
      location={location}
      files={files}
      comments={commentsFromState}
      newComment={comment}
      isLiked={isLikedFromState}
      setIsLiked={setIsLiked}
      likeCount={likeCountFromState}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
export default PostContainer;

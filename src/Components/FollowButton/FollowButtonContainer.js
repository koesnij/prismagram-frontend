import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import { FOLLOW, UNFOLLOW } from './FollowButtonQueries';
import FollowButtonPresenter from './FollowButtonPresenter';

const FollowButtonContainer = ({ id, isFollowing }) => {
  const [isFollowingFromState, setIsFollowing] = useState(isFollowing);
  const [followMutation] = useMutation(FOLLOW, {
    variables: { id },
  });
  const [unfollowMutation] = useMutation(UNFOLLOW, {
    variables: { id },
  });

  const toggleFollow = () => {
    if (isFollowingFromState === true) {
      unfollowMutation();
      setIsFollowing(false);
    } else {
      followMutation();
      setIsFollowing(true);
    }
  };

  return (
    <FollowButtonPresenter
      isFollowing={isFollowingFromState}
      onClick={toggleFollow}
    />
  );
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default FollowButtonContainer;

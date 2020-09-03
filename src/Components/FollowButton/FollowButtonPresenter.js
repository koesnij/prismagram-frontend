import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

const FollowingButton = styled(Button)`
  ${(props) => props.theme.whiteBox};
  color: ${(props) => props.theme.blackColor};
`;

export default ({ isFollowing, onClick }) =>
  isFollowing ? (
    <FollowingButton text="Following" onClick={onClick} />
  ) : (
    <Button text="Follow" onClick={onClick} />
  );

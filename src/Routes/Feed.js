import React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/react-hooks';
import Loader from '../Components/Loader';

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      isLiked
      likeCount
      comments {
        id
        text
        user {
          id
          avatar
          username
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  return <Wrapper>{loading && <Loader />}</Wrapper>;
};

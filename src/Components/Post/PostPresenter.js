import React from 'react';
import styled from 'styled-components';

import FatText from '../FatText';
import Avatar from '../Avatar';
import { HeartFull, HeartEmpty, Comment } from '../Icons';

const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  background-color: white;
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: 'center';
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div``;

const File = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
  margin-bottom: 10px;
  border-bottom: ${(props) => props.theme.boxBorder};
`;
const Buttons = styled.div`
  margin-bottom: 10px;
`;

const Button = styled.span`
  cursor: pointer;
  margin-right: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  margin-top: 10px;
  font-size: 11px;
  color: ${(props) => props.theme.greyColor};
`;

export default ({
  user: { username, avatar },
  caption,
  location,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
}) => {
  return (
    <Post>
      <Header>
        <Avatar size="sm" url={avatar} />
        <UserColumn>
          <FatText text={username} />
          <Location>{location}</Location>
        </UserColumn>
      </Header>
      <Files>
        {files && files.map((file) => <File key={file.id} src={file.url} />)}
      </Files>
      <Meta>
        <Buttons>
          <Button>{isLiked ? <HeartFull /> : <HeartEmpty />}</Button>
          <Button>
            <Comment />
          </Button>
        </Buttons>
        <FatText text={likeCount === 1 ? '1 like' : `${likeCount} likes`} />
        <Timestamp>2 DAYS AGO</Timestamp>
      </Meta>
    </Post>
  );
};

import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import FollowButton from '../../Components/FollowButton';
import Loader from '../../Components/Loader';
import Avatar from '../../Components/Avatar';
import FatText from '../../Components/FatText';
import PostCard from '../../Components/PostCard';
import Button from '../../Components/Button';

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 80px;
`;

const HeaderColumn = styled.div``;
const UsernameRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Username = styled.span`
  font-size: 26px;
  display: block;
  margin-right: 20px;
`;
const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;
const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 25px;
  grid-template-columns: repeat(3, 250px);
  grid-template-rows: 250px;
  grid-auto-rows: 250px;
`;

const ProfilePresenter = ({ data, loading, logOut }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts,
      },
    } = data;
    console.log(data);
    return (
      <Wrapper>
        <Helmet>
          <title>{username} | Prismagram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>
              {isSelf ? (
                <Button onClick={logOut} text={'Log Out'} />
              ) : (
                <FollowButton id={id} isFollowing={isFollowing} />
              )}
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={postsCount} /> posts
              </Count>
              <Count>
                <FatText text={followersCount} /> followers
              </Count>
              <Count>
                <FatText text={followingCount} /> following
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map((post) => {
              console.log(post);
              return (
                <PostCard
                  key={post.id}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                  file={post.files[0].url}
                />
              );
            })}
        </Posts>
      </Wrapper>
    );
  }
};

export default ProfilePresenter;

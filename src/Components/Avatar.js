import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const getSize = (size) => {
  let num;
  if (size === 'sm') {
    num = 30;
  } else if (size === 'md') {
    num = 50;
  } else {
    num = 150;
  }
  return `
    width: ${num}px;
    height: ${num}px;
  `;
};

const Container = styled.div`
  ${(props) => getSize(props.size)}
  background-image: url(${(props) => props.url});
  background-size: cover;
  border-radius: 50%;
`;

const Avatar = ({ size = 'sm', url, className }) => {
  return <Container size={size} url={url} className={className} />;
};

Avatar.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  url: PropTypes.string.isRequired,
};

export default Avatar;

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Instagram } from './Icons';

const Animation = keyframes`
    0% {
        opacity:0
    }
    50% {
        opacity:0.3
    }
    100% {
        opacity:0
    }
`;
const Loader = styled.div`
  animation: ${Animation} 0.8s linear infinite;
  width: 100%;
  text-align: center;
`;

export default () => (
  <Loader>
    <Instagram size={36} />
  </Loader>
);

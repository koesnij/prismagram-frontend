import React from 'react';
import styled from 'styled-components';

import FatText from '../../Components/FatText';

const Wrapper = styled.div`
  height: 50vh;
`;

export default ({ searchTerm }) => (
  <Wrapper>
    {searchTerm === '' && <FatText text={'Search for something'} />}
  </Wrapper>
);

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import About from './About';
import Document from './Document';

const Wrapper = styled.div`
  width: 85%;
`;

const Frame = ({ tabVisible }) => {
  if (tabVisible === 'About')
    return (
      <Wrapper>
        <About />
      </Wrapper>
    );

  if (tabVisible === 'Document')
    return (
      <Wrapper>
        <Document />
      </Wrapper>
    );
  return (
    <Wrapper>
      <h1>T K ____ S T U D I O ____ A R T</h1>
    </Wrapper>
  );
};

export default connect(state => ({
  tabVisible: state.modal.tabVisible,
}))(Frame);

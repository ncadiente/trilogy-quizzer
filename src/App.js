import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import AppBar from './components/AppBar';
import StepContainer from './components/StepContainer';

const StyledApp = styled.div`
  &&{
    height: 100vh;
    // background: rgba(209, 211, 212, .3);
    background-image: url('/assets/qbkls.png')
  }
`;

class App extends Component {
  render() {
    return (
      <StyledApp>
        <AppBar/>
        <StepContainer/>
      </StyledApp>
    );
  }
}

export default App;

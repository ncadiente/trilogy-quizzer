import React from 'react';
import styled from 'styled-components';

const StyledLogo = styled.img`
  background-color: red;
  border: 0;
  color: black;
  padding: 0 30px;
  background: url('/assets/trilogy-logo.svg') no-repeat center;
`;

function StyledComponentsLogo() {
  return (
    <StyledLogo>
    </StyledLogo>
  )
}

export default StyledComponentsLogo;
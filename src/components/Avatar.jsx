import React from 'react';
import styled from 'styled-components';

const StyledAvatar = styled.div`
  &&{
    border: 0;
    color: white;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 228px;
    font-weight: 200;
  }
`;

function StyledComponentsAvatar(props) {
  return (
      <StyledAvatar>
        <img src={props.image} style={{maxHeight: '54px', borderRadius: '50%', border: '4px solid #43e2e8'}} alt='' />
        <div>
          {props.name}
        </div>
      </StyledAvatar>
  );
}

export default StyledComponentsAvatar;
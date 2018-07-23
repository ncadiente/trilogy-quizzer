import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Avatar from './Avatar.jsx';
import Logo from './Logo.jsx';
import LoadingBar from './LoadingBar'
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_USERS = gql`
  {
    users {
      id
      name
      avatar
    }
  }
`;

const StyledAppBar = styled(AppBar)`
  &&{
    background: linear-gradient(45deg, #234b8c 30%, #23888c 90%);
    color: white;
    height: 84px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(163, 222, 224, .3);
    display: flex;
    flex-flow: row nowrap;
    font-family: 'Work Sans', sans-serif;
    justify-content: space-between;
  }
`;

function StyledComponentsAppBar() {
  return (
    <Query query={GET_USERS}>
      {({ loading, error, data }) => {
        if (loading) return <LoadingBar/>;
        if (error) return `Error! ${error.message}`;

        return (
          <div>
            <StyledAppBar>
              <Logo/>
              <Avatar image={data.users[0].avatar} name={data.users[0].name} />
            </StyledAppBar>
          </div>
        );
      }}
    </Query>
  )
}

export default StyledComponentsAppBar;
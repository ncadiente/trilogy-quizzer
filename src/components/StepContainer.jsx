import React from 'react';
import styled from 'styled-components';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Stepper from "./Stepper";
import LoadingBar from "./LoadingBar";

const GET_QUESTIONS = gql`
  {
    questions {
      id
      text
      image
      type
      choices
      answer
    }
  }
`;

const StyledStepContainer = styled.div`
  &&{
    color: black;
    font-family: 'Work Sans', sans-serif;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    min-height: 720px;
  }
`;


function StepContainer(){
	return (
	  <Query query={GET_QUESTIONS}>
	    {({ loading, error, data }) => {
	      if (loading) return <LoadingBar/>;
	      if (error) return `Error! ${error.message}`;
	      return (
	        <StyledStepContainer>
	            <Stepper questions={data.questions}/>
	        </StyledStepContainer>
	      );
	    }}
	  </Query>
	)
}



export default StepContainer
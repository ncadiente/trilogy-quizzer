import React from 'react';
import styled from 'styled-components';
import gql from "graphql-tag";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import LoadingBar from './LoadingBar';
import { Query } from "react-apollo";

const GET_ANSWERS = gql`
  {
    answers {
      id
      answer
    }
  }
`;

const StyledScore = styled.div`
  &&{
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-around;
      align-items: center;
      background-color: #fff;
      overflow: hidden;
      padding:12px;
      
    }
`

const StyledIncorrect = styled.div`
  {
    color: #f50057;
    font-weight: 300;
    margin: 3px 50px 3px 50px;
  }
`

const StyledCorrect = styled.div`
  {
    color: green;
    font-weight: 300;
    margin: 3px 50px 3px 50px;
  }
`

const StyledCircularProgress = styled(CircularProgress)`
  &&{
    margin: 12px;
  }
`

const StyledTotal = styled.div`
  {
    font-weight: 400;
    font-size: 2em;
    margin 6px;
  }
`

const StyledButton = styled(Button)`
  &&{
    margin: 12px;
  }
`


function Score(props) {
  let correct = 0;
  return (
    <Query query={GET_ANSWERS}>
      {({ loading, error, data }) => {
        if (loading) return <LoadingBar/>;
        if (error) return `Error! ${error.message}`;
        return (
          <StyledScore>
            {
                props.questions.map((question, index, arr) => {
                  for(let i=0; i < data.answers[index].answer.length; i++){
                    if(data.answers[index].answer.indexOf(props.response[index][i]) === -1 || props.response[index].indexOf(data.answers[index].answer[i]) === -1){
                      return <StyledIncorrect key={question.id}>
                        Question #{index+1}: Incorrect
                      </StyledIncorrect>
                    }
                    if(i === data.answers[index].answer.length - 1){
                      correct++
                      return <StyledCorrect key={question.id}>
                        Question #{index+1}: Correct
                      </StyledCorrect>
                    }
                  }
                })
            }
            <StyledCircularProgress
              variant="determinate"
              value={parseInt(correct/props.questions.length*100, 10)}
              color={correct/props.questions.length < 0.7 ? 'secondary' : 'primary'}
              size={80}
              thickness={7}
            />
            <StyledTotal>{`${parseInt(correct/props.questions.length*100, 10)}%`}</StyledTotal>
            <StyledTotal>{`${correct} of ${props.questions.length}`}</StyledTotal>
            <StyledButton variant="outlined" onClick={() => window.location.reload(true)} ><ReplayIcon/> RETAKE</StyledButton>
          </StyledScore>
        );
      }}
    </Query>
  )
}

export default Score;
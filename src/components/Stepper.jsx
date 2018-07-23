import React from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import Score from './Score'
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import styled from 'styled-components';


const StyledStepperDiv = styled.div`
  &&{
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    overflow: hidden;
    padding:12px;
    box-shadow: 0 3px 5px 2px rgba(209, 211, 212, .3);
  }
`
const StyledHeader = styled.div`
  && {
    font-size: 1em;
    padding-bottom: 6px;
    font-weight: bold;
  }
`
const StyledImageContainer = styled.div`
  && {
    display:flex;
    justify-content:center;
    width: 100%;
    flex: 0 0 200px;
  }
`
const StyledImage = styled.img`
  &&{
      display: block;
      max-width: 100%;
      width: 100%;
      height: auto;
  }
`

const StyledMobileStepper = styled(MobileStepper)`
  &&{
    width:100%;
    background-color: #fff;
  }
`

class TextMobileStepper extends React.Component {
  state = {
    activeStep: 0,
    answers: [[], [], [null]],
    completed: false
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleCheck = (event, checked) => {
    let choiceNum = parseInt(event.target.value, 10);
    if(checked){
      if(this.state.answers[this.state.activeStep].indexOf(choiceNum) === -1){
        this.setState(prevState => {
          prevState.answers[this.state.activeStep].push(choiceNum);
          return(
            {
              answers: prevState.answers
            }
          )
        })
      }
    } else {
      if(this.state.answers[this.state.activeStep].indexOf(choiceNum) !== -1){
        this.setState(prevState => {
          prevState.answers[this.state.activeStep].splice(this.state.answers[this.state.activeStep].indexOf(choiceNum), 1);
          return(
            {
              answers: prevState.answers
            }
          )
        })
      }
    }
  }

  handleText = (e) => {
    let newAnswer = [parseInt(e.target.value, 10)];
    this.setState(prevState => {
      prevState.answers.splice(this.state.activeStep, 1, newAnswer);
      return ({
        answers: prevState.answers
      })
    })
  }

  handleSubmit = () => {
    this.setState({completed: true})
  }

  handleBool = (e) => {
    let newBool = [parseInt(e.target.value, 10)];
    this.setState(prevState => {
      prevState.answers[this.state.activeStep] = newBool;
      return {
        answers: prevState.answers
      }
    })
  }

  render() {
    const { activeStep } = this.state;
    const maxSteps = this.props.questions.length;
    let entry = '';
    let rightButton;
    if(this.state.answers[this.state.activeStep] === '' || this.state.answers[this.state.activeStep] === null || this.state.answers[this.state.activeStep].length < 1){
      rightButton = (<Button size="small" onClick={this.handleNext} disabled={true}>
        Next
        <KeyboardArrowRight />
      </Button>)
    } else {
      if(this.state.activeStep === this.props.questions.length - 1){
        rightButton = (<Button size="small" onClick={this.handleSubmit}>
          Submit
          <KeyboardArrowRight />
        </Button>)
      } else {
        rightButton = (<Button size="small" onClick={this.handleNext}>
          Next
          <KeyboardArrowRight />
        </Button>)
      }
    }

    switch(this.props.questions[activeStep].type){
      case 'multipleRadio':
        entry = <FormGroup>
          {this.props.questions[activeStep].choices.map((choice, index)=>{
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      this.state.answers[activeStep] && this.state.answers[activeStep].length > 0 ? this.state.answers[activeStep].indexOf(index) !== -1 ? true : false : false
                    }
                    onChange={this.handleCheck}
                    value={index.toString()}
                    color='primary'
                  />
                }
                label={choice}
                key={`choice${index}`}
              />
            )
          })}
        </FormGroup>
        break;
      case 'trueFalse':
        entry = <RadioGroup
            value={this.state.answers[this.state.activeStep][0] === null ? null : this.state.answers[this.state.activeStep][0] ? '1' : '0'}
            onChange={this.handleBool}
          >
            <FormControlLabel value='1' control={<Radio color='primary'/>} label="True" />
            <FormControlLabel value='0' control={<Radio />} label="False" />
          </RadioGroup>
        break;
      case 'text':
        entry = <Input placeholder="Enter value here" value={this.state.answers[this.state.activeStep] ? this.state.answers[this.state.activeStep] : ''} onChange={this.handleText} type='number'/>
        break;
      default:
        entry = '';
        break;
    }

    if(this.state.completed){
      return (
        <StyledStepperDiv>
          <StyledHeader>
            Quiz Complete
          </StyledHeader>
          <Score response={this.state.answers} questions={this.props.questions}> Hey </Score>
        </StyledStepperDiv>
      )
    } else {
      return (
        <StyledStepperDiv>
          <StyledHeader>
            {this.props.questions[activeStep].text}
          </StyledHeader>
          {this.props.questions[activeStep].image ?
            <StyledImageContainer>
              <StyledImage
                src={this.props.questions[activeStep].image}
                alt={this.props.questions[activeStep].text}
              />
            </StyledImageContainer>
            :
            ''
          }
          {
            entry
          }
          <StyledMobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={rightButton}
            backButton={
              <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </StyledStepperDiv>
      );
    }
  }
}


export default TextMobileStepper;
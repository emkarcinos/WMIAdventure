import styled from 'styled-components';
import Container from './Container';
import Input from './Input';
import Label from './Label';

const StyledWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  flex-direction: column;
`;

StyledWrapper.Container = Container;
StyledWrapper.Input = Input;
StyledWrapper.Label = Label;

export default StyledWrapper;
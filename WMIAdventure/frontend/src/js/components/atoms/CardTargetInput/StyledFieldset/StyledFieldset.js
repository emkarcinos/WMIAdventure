import styled from 'styled-components';
import Label from './Label';
import Container from './Container';

const StyledFieldset = styled.fieldset`
  padding: 8px;
  margin: 16px 0 0 0;
`;

StyledFieldset.Label = Label;
StyledFieldset.Container = Container;

export default StyledFieldset;
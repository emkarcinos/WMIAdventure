import styled from 'styled-components';
import Label from './Label';
import Legend from './Legend';
import Paragraph from './Paragraph';
import Textarea from './Textarea';

const StyledFieldset = styled.fieldset`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 16px;
  padding: 16px;
  font-size: 16px;
`;

StyledFieldset.Label = Label;
StyledFieldset.Legend = Legend;
StyledFieldset.Paragraph = Paragraph;
StyledFieldset.Textarea = Textarea;

export default StyledFieldset;
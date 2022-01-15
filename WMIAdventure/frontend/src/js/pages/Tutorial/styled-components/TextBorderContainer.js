import styled from 'styled-components';
import TextContainer from "./TextContainer";

const TextBorderContainer = styled(TextContainer)`
  border-radius: 10px;
  margin: ${({setMargin}) => setMargin ? setMargin : '0'};
  padding: ${({setPadding}) => setPadding ? setPadding : '26px 32px 16px'};
`;

export default TextBorderContainer;
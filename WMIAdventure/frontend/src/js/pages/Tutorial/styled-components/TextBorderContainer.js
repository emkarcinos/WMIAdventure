import styled from 'styled-components';
import TextContainer from "./TextContainer";

const TextBorderContainer = styled(TextContainer)`
  border-radius: 10px;
  margin: ${({setMargin}) => setMargin ? setMargin : '0'};
  padding: ${({setPadding}) => setPadding ? setPadding : '26px 32px 16px'};
  box-shadow: ${({shadow}) => shadow ? '0 4px 4px rgba(0, 0, 0, 0.15)' : 'none'};
`;

export default TextBorderContainer;
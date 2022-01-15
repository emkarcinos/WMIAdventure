import styled from 'styled-components';
import TextContainer from "./TextContainer";

const TextBorderContainer = styled(TextContainer)`
  padding: 26px 32px 16px;
  border-radius: 10px;
  margin: ${({setMargin}) => setMargin ? setMargin : '0'};
`;

export default TextBorderContainer;
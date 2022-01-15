import styled from 'styled-components';

const TextContainer = styled.div`
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default TextContainer;
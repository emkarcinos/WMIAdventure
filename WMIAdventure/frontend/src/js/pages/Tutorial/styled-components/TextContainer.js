import styled from 'styled-components';

const TextContainer = styled.div`
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 420px;
    border-radius: 10px;
    padding: 16px;
  }
`;

export default TextContainer;
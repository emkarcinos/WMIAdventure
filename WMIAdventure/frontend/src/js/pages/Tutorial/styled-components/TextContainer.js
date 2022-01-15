import styled from 'styled-components';

const TextContainer = styled.div`
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({setWidth}) => setWidth ? setWidth : '100%'};
  height: ${({setHeight}) => setHeight ? setHeight : 'auto'};

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: ${({setWidth}) => setWidth ? setWidth : '420px'};
    border-radius: 10px;
    padding: 16px;
  }
`;

export default TextContainer;
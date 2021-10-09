import styled from 'styled-components';

const Div = styled.div`
  @media(max-width: ${({theme}) => theme.overMobile}px) {
    display: ${({show}) => show ? 'flex' : 'none'};

  }
  @media(min-width: ${({theme}) => theme.overMobile}px) {
    display: ${({exist}) => exist ? 'flex' : 'none'};
    margin: 0 48px;
  }
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Div;
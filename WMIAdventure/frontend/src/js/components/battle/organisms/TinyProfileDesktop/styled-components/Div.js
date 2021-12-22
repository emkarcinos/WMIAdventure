import styled from 'styled-components';

const Div = styled.div`
  display: none;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 190px;
    background-color: ${({theme}) => theme.colors.whiteAlmost};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Div;
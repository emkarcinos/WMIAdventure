import styled from 'styled-components';

const Decorate = styled.img`
  display: none;
  
  @media(min-width: ${({theme}) => theme.overMobile}px) {
    display: block;

    position: absolute;
    top: 2px;
    right: 32px;
    width: 20px;
    height: 22px;
  }
`;

export default Decorate;
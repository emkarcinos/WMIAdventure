import styled from 'styled-components';

const ImageContainer = styled.div`
  order: -1;
  width: 48px;
  height: 48px;
  background-color: ${({theme}) => theme.colors.uiGreen};
  border-radius: 50%;
  margin-right: 10px;

  @media(min-width: ${({theme}) => theme.overMobile}px) {
    width: 106px;
    height: 106px;
    background-color: ${({theme}) => theme.colors.red};
    margin-right: 24px;
  }
`;

export default ImageContainer;
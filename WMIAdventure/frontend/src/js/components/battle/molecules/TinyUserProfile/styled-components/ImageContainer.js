import styled from 'styled-components';

const ImageContainer = styled.div`
  order: -1;
  width: 48px;
  height: 48px;
  background-color: ${({theme}) => theme.colors.uiGreen};
  border-radius: 50%;
  margin-right: 10px;

  @media(min-width: ${({theme}) => theme.overMobile}px) {
    width: 72px;
    height: 72px;
    background-color: ${({theme}) => theme.colors.red};
  }
  
  @media(min-width: 1172px) {
    width: ${({vertical}) => vertical ? '84px' : '106px'};
    height: ${({vertical}) => vertical ? '84px' : '106px'};
    background-color: ${({theme, vertical}) => vertical ? theme.colors.uiGreen : theme.colors.red};
    margin: ${({vertical}) => vertical ? '0 0 10px 0' : '0 24px 0 0'};
  }
`;

export default ImageContainer;
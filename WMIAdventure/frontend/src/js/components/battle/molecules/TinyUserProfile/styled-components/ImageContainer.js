import styled from 'styled-components';

const ImageContainer = styled.div`
  order: -1;
  width: 48px;
  height: 48px;
  background-color: ${({theme}) => theme.colors.greenyBluey};
  border-radius: 50%;
  margin-right: 10px;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: ${({vertical}) => vertical ? '84px' : '72px'};
    height: ${({vertical}) => vertical ? '84px' : '72px'};
    background-color: ${({theme, vertical}) => vertical ? theme.colors.greenyBluey : theme.colors.red};
    margin: ${({vertical}) => vertical ? '0 0 10px 0' : '0 10px 0 0'};
  }

  @media (min-width: 1172px) {
    width: ${({vertical}) => vertical ? '84px' : '106px'};
    height: ${({vertical}) => vertical ? '84px' : '106px'};
    background-color: ${({theme, vertical}) => vertical ? theme.colors.greenyBluey : theme.colors.red};
    margin: ${({vertical}) => vertical ? '0 0 10px 0' : '0 24px 0 0'};
  }
`;

export default ImageContainer;
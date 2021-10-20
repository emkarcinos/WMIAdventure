import styled from 'styled-components';

const ImageContainer = styled.div`
  order: -1;
  width: 48px;
  height: 48px;
  background-color: ${({theme}) => theme.colors.uiGreen};
  border-radius: 50%;
  margin-right: 10px;
`;

export default ImageContainer;
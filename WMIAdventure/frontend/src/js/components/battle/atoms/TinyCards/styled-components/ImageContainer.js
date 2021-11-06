import styled from 'styled-components';

const ImageContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  margin: 0;
`;

export default ImageContainer;
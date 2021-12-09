import styled from 'styled-components'

const ImageInputPrompt = styled.p`
  font-size: 20px;
  font-weight: ${({theme}) => theme.weight.semibold};
  color: ${({theme}) => theme.colors.dark};
`;

export default ImageInputPrompt;
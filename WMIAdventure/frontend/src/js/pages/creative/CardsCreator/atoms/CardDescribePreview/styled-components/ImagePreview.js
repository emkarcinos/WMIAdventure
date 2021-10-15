import styled from 'styled-components';

const ImagePreview = styled.img`
  width: 40px;
  height: 40px;
  
  @media (min-width: 400px) {
    width: 70px;
    height: 70px;
  }
  
  /* Styling */
  border-radius: 4px;
  
  object-fit: contain;
`;

export default ImagePreview;
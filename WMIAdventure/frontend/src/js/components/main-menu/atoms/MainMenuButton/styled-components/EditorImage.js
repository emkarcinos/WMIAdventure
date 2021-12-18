import styled from 'styled-components';

const EditorImage = styled.img`
  width: 200px;
  height: 220px;
  margin-left: 80px;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 320px;
    height: 410px;
    margin-left: 0;
  }
`;

export default EditorImage;
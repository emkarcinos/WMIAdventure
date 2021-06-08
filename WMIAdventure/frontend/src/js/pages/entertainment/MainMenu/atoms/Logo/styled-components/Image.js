import styled from 'styled-components';

const Image = styled.img`
  width: 48px;
  height: 24px;
  margin-left: 8px;
  
  @media (min-width: 768px) {
    width: 112px;
    height: 48px;
    margin-left: 16px;
  }
`;

export default Image;
import styled from 'styled-components';

const Img = styled.img`
  width: 100px;
  height: 40px;
  
  @media (min-width: 360px) {
    width: 120px;
    height: 50px;
  }

  @media (min-width: 400px) {
    width: 150px;
    height: 60px;
  }
`;

export default Img;
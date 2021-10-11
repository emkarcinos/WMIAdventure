import styled from 'styled-components';

function colorHandler(red, blue) {
    if(red) {
        return 'red';
    } else if(blue) {
        return 'blue';
    }
}

const P = styled.p`
  font-size: 18px;
  margin: 0 0 24px 0;
  color: ${({red, blue}) => colorHandler(red, blue)};
  text-align: center;
  padding: 0 16px;
  font-weight: 600;

  @media (min-width: 440px) {
    font-size: 24px;
  }

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 32px;
    margin: 0 0 36px 0;
  }
`;

export default P;
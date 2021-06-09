import styled from 'styled-components';

function colorHandler(red, green) {
    if(red) {
        return 'red';
    } else if(green) {
        return 'green';
    }
}

const P = styled.p`
  font-size: 18px;
  margin: 0 0 24px 0;
  color: ${({red, green}) => colorHandler(red, green)};
  text-align: center;
  padding: 0 16px;
  font-weight: 600;

  @media (min-width: 440px) {
    font-size: 24px;
  }

  @media (min-width: 768px) {
    font-size: 32px;
    margin: 0 0 36px 0;
  }
`;

export default P;
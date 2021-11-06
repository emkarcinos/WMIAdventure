import styled from 'styled-components';

const Title = styled.p`
  margin: 0;
  font-size: 80px;
  font-weight: ${({theme}) => theme.weight.bold};
  letter-spacing: 18px;
  color: ${({theme}) => theme.colors.whiteAlmost};
  text-transform: uppercase;
  order: 1;

  @media (max-height: 900px) {
    font-size: 60px;
  }
`;

export default Title;
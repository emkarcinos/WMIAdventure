import styled from 'styled-components';

const H4 = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  text-align: center;
  color: ${({theme}) => theme.colors.text01};

  @media (min-width: 440px) {
    font-size: 16px;
  }
`;

export default H4;
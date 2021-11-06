import styled from 'styled-components';

function handleFontSize(len) {
    if (len > 16) {
        return '20px';
    }
    return '28px';
}

const H1 = styled.h1`
  font-size: ${({len}) => handleFontSize(len)};
  font-weight: 600;
  margin: 0 0 16px 0;
  color: ${({theme}) => theme.colors.whiteAlmost};
  overflow-wrap: anywhere;
  max-width: 400px;
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 32px;
  }
`;

export default H1;
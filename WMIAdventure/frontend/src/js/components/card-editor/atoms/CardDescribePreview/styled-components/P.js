import styled from 'styled-components';

function handleFontSize(tooltip, len) {
    if (tooltip) {
        if (len > 40)
            return '12px';
        return '14px';
    } else {
        if (len > 30)
            return '16px';
        return '18px';
    }
}

const P = styled.p`
  color: ${({theme}) => theme.colors.whiteAlmost};
  margin: ${({tooltip}) => tooltip ? '0' : '0 0 16px 0'};
  font-size: ${({tooltip, len}) => handleFontSize(tooltip, len)};
  max-width: 290px;
  overflow-wrap: anywhere;
  text-align: center;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: ${({tooltip}) => tooltip ? '14px' : '18px'};
  }
`;

export default P;
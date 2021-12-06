import styled from 'styled-components';

const DesktopDeckContainer = styled.div`
  padding: 24px;
  border-radius: 20px;
  background-color: ${({theme}) => theme.colors.light2};

  @media (min-width: 1800px) {
    background-color: ${({theme}) => theme.colors.whiteAlmost};
  }
`;

export default DesktopDeckContainer;
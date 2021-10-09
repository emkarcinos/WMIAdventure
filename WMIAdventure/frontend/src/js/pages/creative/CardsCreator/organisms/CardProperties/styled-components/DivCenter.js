import styled from 'styled-components';

const DivCenter = styled.div`
    @media (min-width: ${({theme}) => theme.overMobile}px) {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
`;

export default DivCenter;
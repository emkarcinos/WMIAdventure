import styled from 'styled-components';

const Time = styled.p`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    
    position: absolute;
    bottom: 2px;
    width: 100%;
  }
`;

export default Time;
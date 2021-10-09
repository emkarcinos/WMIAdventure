import styled from 'styled-components';

const Div = styled.div`
  position: relative;
  height: 100%;
  padding: ${({active}) => active ? '4px 24px 4px 4px' : '0'};
  margin: ${({exist}) => exist ? '0 0 0 12px' : '0'};
  display: ${({exist}) => exist ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  @media (min-width: 768px) {
    height: auto;
    width: 100%;
    padding: 12px 0;
    margin: 0;
  }
`;

export default Div;
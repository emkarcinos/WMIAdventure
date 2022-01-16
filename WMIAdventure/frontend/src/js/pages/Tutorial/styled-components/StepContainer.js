import styled from 'styled-components';

const StepContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 56px);
  margin-top: 56px;
  display: flex;
  justify-content: center;
  align-items: ${({setAlignment}) => setAlignment ? setAlignment : 'center'};
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({setTranslateX}) => setTranslateX ? setTranslateX : '0'});

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    background-color: ${({theme}) => theme.colors.greenyBluey};
    padding: 16px 0;
  }
`;

export default StepContainer;
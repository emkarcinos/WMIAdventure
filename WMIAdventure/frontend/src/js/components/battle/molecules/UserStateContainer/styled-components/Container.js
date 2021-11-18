import styled from 'styled-components';

const Container = styled.div`
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  background-color: ${({theme}) => theme.colors.light2};
  width: 228px;
  height: 136px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  transition: transform 0.5s ease-in-out;
  transform: translateX(${({setTranslateX}) => setTranslateX ? setTranslateX : '0'});

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 334px;
    height: 200px;
  }
`;

export default Container;
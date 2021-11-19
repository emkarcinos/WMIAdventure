import styled from 'styled-components';

const Container = styled.div`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${({theme}) => theme.colors.light2};
  width: 228px;
  height: 136px;
  transition: transform 0.5s ease-in-out;
  transform: translate(${({setTranslateX}) => setTranslateX ? setTranslateX : '0'},
  ${({setTranslateY}) => setTranslateY ? setTranslateY : '0'});

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 334px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 0 0 16px 16px;
  }
`;

export default Container;
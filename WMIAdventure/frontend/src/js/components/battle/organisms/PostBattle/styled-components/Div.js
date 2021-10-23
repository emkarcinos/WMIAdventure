import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  margin-bottom: 10px;
  
  &:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 0;
    z-index: 2;
    display: block;
    width: 45px;
    height: 50px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: ${({theme, win}) => win ? theme.colors.common : theme.colors.red};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  }

  &:after {
    content: "";
    position: absolute;
    z-index: 2;
    top: 5px;
    right: 0;
    display: block;
    width: 45px;
    height: 50px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: ${({theme, win}) => win ? theme.colors.common : theme.colors.red};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  }
`;

export default Div;
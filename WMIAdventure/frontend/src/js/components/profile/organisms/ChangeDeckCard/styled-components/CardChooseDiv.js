import styled from "styled-components";

const CardChooseDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE 10+ */

  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
`;

export default CardChooseDiv;
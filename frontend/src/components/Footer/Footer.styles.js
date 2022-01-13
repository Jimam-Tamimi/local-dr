import styled from "styled-components";
import { Column } from "../../styles/Essentials.styles";

export const FooterWrap = styled.div`
  width: 100vw;
  background: #000024;
  color: white;
  padding: 25px 55px;
`;
export const FooterColumn = styled(Column)`
  & > * {
      transition: var(--main-transition);
    margin: 0px 10px;
    color: rgba(255, 255, 255, 0.6);
  }
  & > h3, p {
    color: white;
  }
  & > a > svg {
    margin: 0px 5px;
    font-size: 22px;
  }
  & > a:hover {
    color: white;
  }
`;

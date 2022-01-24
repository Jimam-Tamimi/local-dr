import styled from "styled-components";
import { Flex } from "../../styles/Essentials.styles";

export const NavWrap = styled.header`
  ${Flex}
  justify-content: space-between;
  max-height: 60px;
    height: 60px;
    padding: 0px 1.39rem;
    background-color: #fff;
    position: sticky;
    top: 0;
`;
export const FirstSection = styled.div`
  ${Flex}
  & > svg {
    font-size: 23px;
    margin-right: 20px;
    cursor: pointer;

  }
  & > a {
    font-size: 2rem;
    cursor: pointer;
    font-weight: 700;
    color: #112233;
  }
`;
export const SecondSection = styled.div`
  ${Flex}
  cursor: pointer;
  & > p {
      text-decoration: underline;
    font-size: 1.1rem;
    font-weight: 700;
  }
  & > * {
    margin-left: 30px;
  }
`;


export const NotificationWrap = styled.div`
    margin-left: 10px;
    ${Flex}
    & > div.notification-icon {
      background: #00000017;
    padding: 6px;
    border-radius: 100%;
    position: relative;
    transition: var(--main-transition);
    }

    & > div.notification-icon:hover {
      background: #00000026;
    }
    & > div.notification-icon::after {
      content: '${({showNum=''}) => showNum > 10 ? '10+' : showNum}';
    position: absolute;
    top: -5px;
    right: -5px;
    background: #537ef9;
    padding: 0px 5px; 
    color: white;
    border-radius: 100%;

    }



    & > div.notification-icon > svg {
      font-size: 20px;
    position: relative;
    top: 3px;
    }

`
export const NotificationsDiv = styled.div`
    padding: 5px;
    box-shadow: 0px 0px 5px #00000036;
    background: white;
    min-width: 250px;
    min-height: 150px;
    max-height: 85vh;
    overflow-y: scroll;

`
export const NotificationItem = styled.div`
    background: #f3f3f3;
    padding: 10px 15px;
    border-radius: 5px;
    margin: 8px 0px;
    transition: var(--main-transition);
    &:hover{
      background-color: #e5e5e5;
    }
    & > * {
      margin: 5px 0px;
    }

`
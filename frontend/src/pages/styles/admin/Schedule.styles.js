import styled from "styled-components";

export const TimeScheduleWrap = styled.div`
    width: 500px;

    min-height: 100px;
    background-color: #fff;
    overflow: scroll;
    display: flex;
    flex-direction: row;
    max-height: 90vh;
    padding: 10px;

`
export const TimeSchedule = styled.div`
margin: 0px 5px;
min-width: 100px;

`
export const Date = styled.div`
border: 1px solid #00000073;
    text-align: center;
    padding: 5px 0px;
    font-weight: 600;
`
export const Times = styled.div`
`
export const Time = styled.div`
border: 1px solid #00000024;
text-align: center;
padding: 2px 0px;
transition: var(--main-transition);
&.active {
    background-color: var(--primary-color);
    border-color: transparent;
}

`
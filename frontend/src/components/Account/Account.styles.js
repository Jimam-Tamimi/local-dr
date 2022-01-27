import styled from "styled-components";
import { Column } from "../../styles/Essentials.styles";

export const AccountWrap = styled.div`
  width: 460px;
  @media screen and (max-width: 500px) {
    width: 400px;
  }
  @media screen and (max-width: 420px) {
    width: 95%;
  }
  /* height: 500px; */
  background-color: white;
  padding: 48px;
`;

export const ColumnTab = styled(Column)`
  transition: var(--main-transition);
  &.active {
    background: var(--info-color);
    color: var(--info-text-color);
    border: 2px solid transparent;
  }
  cursor: pointer;
  border: 2px solid var(--info-color);
  font-size: 1rem;
  font-weight: 700;
  padding: 12px 0px;
`;

export const Form = styled.form`
  * {
    font-family: "Lato", Arial, sans-serif;
  }
  width: 100%;
  
  h2.form-heading{
    margin-bottom: 1.5rem!important;
    line-height: 1.5;
    font-weight: 400;
    font-family: "Lato",Arial,sans-serif;
    color: #000;    
  }

  div.form-group {
    margin-bottom: 1.67rem !important ;
    position: relative;
    width: 100%;
    &.m-0{
        margin: 0 !important;
    }
    
    
    label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #000;
      font-weight: 700;
      display: inline-block;
      margin-bottom: 0.5rem;
    }

    input {
      display: block;
      width: 100%;
      height: calc(1.5em + 0.75rem + 2px);
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
        -webkit-box-shadow 0.15s ease-in-out;
      height: 48px;
      background: #fff;
      color: #000;
      font-size: 16px;
      border-radius: 5px;
      -webkit-box-shadow: none;
      box-shadow: none;
      border: 1px solid rgba(0, 0, 0, 0.1);

      &:focus {
        outline: none !important;
        box-shadow: none;
        border: 1px solid var(--primary-text-color);
      }
    }

    button {
      background: var(--primary-text-color) !important;
      border: 1px solid var(--primary-text-color) !important;
      color: #fff !important;
      cursor: pointer;
      box-shadow: none!important;
    font-size: 15px;
    padding: 10px 20px;
    height: 48px;
    border-radius: 0.25rem!important;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;    line-height: 1.5;
    width: 100%;

    }
    p.center{
      text-align: center;
    }
    p{
      color: gray;
        cursor: pointer;
        p.link{
            color: var(--primary-text-color);
            display: inline;
        }
    }
  }
`;

import styled, { createGlobalStyle, css } from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const DARK_MODE_SECENDORY_COLOR = "white";
export const LIGHT_MODE_SECENDORY_COLOR = "BLACK";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* font-family:  sharp-sans, sans-serif; */
    /* font-family: 'Source Sans Pro', sans-serif; */
    font-family: 'Poppins', sans-serif;
            scroll-behavior: smooth;
  }
  
  :root {

    
    --for-active-click: scale(.92);
    --hover: scale(1.08);
    --main-transition: all .2s ease;
    /* --main-transition: all .3s cubic-bezier(0.25, 0.46, 0.45, 0.94); */
    --primary-color: #FFF04B;
    --primary-text-color: #00234B ;
    /* --primary-hover-color: #b52a37; */

    --secondary-color: #D6E5F3;
    
    --info-color: #e74e84;
    --info-text-color: white;
    --yellow-color: #FFF04B;

 
     
 
  }
  html {
    overflow-x: hidden;

    scroll-behavior: smooth;
    @media only screen and (min-width: 768px){
            font-size: 16px;
    }
    
    @media only screen and (min-width: 480px) and (max-width: 768px){
            font-size: 14px;
    }
    
    @media only screen and (max-width: 479px) {
            font-size: 12px;
      }
  }
  body{ 
    overflow-x: hidden;
  }

  
  a{
      text-decoration: none;
      color: black;
  }
  


    /* width */
  ::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  
`;

export const AdminGlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;            
    scroll-behavior: smooth;
  }
  
  :root {

    
    --for-active-click: scale(.92);
    --hover: scale(1.08);
    --main-transition: all .2s ease;
    /* --main-transition: all .3s cubic-bezier(0.25, 0.46, 0.45, 0.94); */
    --primary-color: #FFF04B;
    --primary-text-color: #00234B ;
    /* --primary-hover-color: #b52a37; */

    --secondary-color: #D6E5F3;
    
    --info-color: #e74e84;
    --info-text-color: white;
    --yellow-color: #FFF04B; 
 
     
 
  }
  html {
    scroll-behavior: smooth;
    @media only screen and (min-width: 768px){
            font-size: 13px;
    }
    
    @media only screen and (min-width: 480px) and (max-width: 768px){
            font-size: 12px;
    }
    
    @media only screen and (max-width: 479px) {
            font-size: 11px;
      }
  }
  body{ 
    overflow-x: hidden;
  }

  
  a{
      text-decoration: none;
      color: black;
  }
  


    /* width */
  ::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  
`;

export default GlobalStyle;

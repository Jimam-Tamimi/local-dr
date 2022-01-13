import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const Flex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Column = styled.div`
  display: flex;
  ${Flex}
  @media screen and (min-width: 1200px) {
    ${({ lg, md, sm, sx, selfSpacing = 0 }) =>
      `width:calc(${
        (100 / 12) * (lg || md || sm || sx)
      }% - ${selfSpacing}px) !important;`}
  }

  @media screen and (min-width: 992px) and (max-width: 1200px) {
    ${({ lg, md, sm, sx, selfSpacing = 0 }) =>
      `width:calc(${
        (100 / 12) * (md || lg || sm || sx)
      }% - ${selfSpacing}px) !important;`}
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    ${({ lg, md, sm, sx, selfSpacing = 0 }) =>
      `width:calc(${
        (100 / 12) * (sm || md || lg || sx)
      }% - ${selfSpacing}px) !important;`}
  }
  @media screen and (max-width: 768px) {
    ${({ lg, md, sm, sx, selfSpacing = 0 }) =>
      `width:calc(${
        (100 / 12) * (sx || sm || md || lg)
      }% - ${selfSpacing}px) !important;`}
  }
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  align-items: ${({ align }) => (align ? align : "center")};
  flex-wrap: ${({ wrap }) => (wrap ? wrap : "nowrap")};
  margin: ${({ selfSpacing }) => typeof selfSpacing === "string" ? selfSpacing : "0px " + (selfSpacing/2) + "px"};
  & > * {
    margin: ${({ spacing = 0 }) =>
      typeof spacing === "string" ? spacing : "0px " + spacing + "px"};
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1550px;
  margin: 0 auto;
  padding: 0 15px;
  @media only screen and (min-width: 768px) {
    padding: 0 30px;
  }
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  align-items: ${({ align }) => (align ? align : "center")};
  flex-wrap: ${({ wrap }) => (wrap ? wrap : "nowrap")};
`;

export const SmallContainer = styled(Container)`
 
  max-width: 1300px;
 
`;
export const Grid = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  align-items: ${({ align }) => (align ? align : "center")};
  flex-wrap: ${({ wrap }) => (wrap ? wrap : "wrap")};

  & > * {
    @media screen and (min-width: 1200px) {
      ${({ lg, md, sm, sx, spacing = 0 }) =>
        `width:calc(${(100 / 12) * (lg || md || sm || sx)}% - ${spacing}px);`}
    }
    @media screen and (min-width: 992px) and (max-width: 1200px) {
      ${({ lg, md, sm, sx, spacing = 0 }) =>
        `width:calc(${(100 / 12) * (md || lg || sm || sx)}% - ${spacing}px);`}
    }
    @media screen and (min-width: 768px) and (max-width: 992px) {
      ${({ lg, md, sm, sx, spacing = 0 }) =>
        `width:calc(${(100 / 12) * (sm || md || lg || sx)}% - ${spacing}px);`}
    }
    @media screen and (max-width: 768px) {
      ${({ lg, md, sm, sx, spacing = 0 }) =>
        `width:calc(${(100 / 12) * (sx || sm || md || lg)}% - ${spacing}px);`}
    }
  }
  width: 100%;
`;

export const Button = styled.button`
  background: var(--primary-color);
  color: var(--primary-text-color);
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 2px solid transparent;
  cursor: pointer;
  /* box-shadow: 3px 3px 13px #00000075; */
  transition: var(--main-transition);
  letter-spacing: 0.51px;
  font-weight: 700;
  &:hover {
  }
  &:active {
    transform: var(--for-active-click);
  }
  ${({block}) => block && `
    width: 100%;
    display: block;
    padding: 0.7rem 1rem;
  `}
  ${({sm}) => sm && `
    padding: 0.35rem 0.6rem;
    font-size: 1rem;
    font-weight: 600;
  `}
  ${({xsm}) => xsm && `
    padding: 0.25rem 0.5rem;
    font-size: .89rem;
    font-weight: 600;
  `}
  ${({shadow}) => shadow && `
  box-shadow: none;
    
  `}
`;

export const ButtonLink = styled(Link)`
  background: var(--primary-color);
  color: var(--primary-text-color);
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 2px solid transparent;
  cursor: pointer;
  /* box-shadow: 3px 3px 13px #00000075; */
  transition: var(--main-transition);
  letter-spacing: 0.51px;
  font-weight: 700;
  &:hover {
  }
  &:active {
    transform: var(--for-active-click);
  }
  ${({block}) => block && `
    width: 100%;
    display: block;
    padding: 0.7rem 1rem;
  `}
  ${({sm}) => sm && `
    padding: 0.35rem 0.6rem;
    font-size: 1rem;
    font-weight: 600;
  `}
`;



export const Badge = styled.span`
  background: var(--primary-color);
  padding: 0.3rem 1rem;
  font-size: .8rem;
  transition: var(--main-transition);
  letter-spacing: 0.51px;
  font-weight: 700;
  border-radius: 10px;
  
  padding: 0.21rem 0.61rem;
    border-radius: 3px;
    text-transform: uppercase;

 

`
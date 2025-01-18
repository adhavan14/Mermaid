import { Card, Typography } from "@mui/material";
import styled from "styled-components";

export const MermaidContainer = styled.div`
    width:100vw;
    height:100vh;
`;

export const DefaultCard = styled(Card)`
    border-radius:10px !important;  
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2) !important;
`;

export const MermaidWrapper = styled(DefaultCard)`
    width:100%;
    height:100%;
    
    display:flex;
    justify-content:space-around;
    background-color:#fdd7e8 !important;
`;

export const InputCardWrapper = styled(DefaultCard)`
    width:40%;
    height:50%;
    margin-top:50px;
    display:flex;
    flex-direction:column;
`;

export const OutputCardWrapper = styled(DefaultCard)`
    width:45%;
    height:80%;
    margin-top:50px;
    padding:10px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-around;
`;

export const DiagramWrapper = styled(DefaultCard)`
    width:90%;
    height:80%;
    padding:20px;
    display:flex;
    justify-content:center;
    align-items:center;
`;

export const CodeWrapper = styled(DiagramWrapper)`
    background-color:#323132 !important;
    color:white !important;
    max-height:80% !important;
    overflow-y:auto !important;
`;

export const TitleWrapper = styled(Typography)`
    font-size: 30px !important;
    padding:10px;
`;

export const SwitchWrapper = styled.div`
    display:flex;
    background-color:#fd91c7;
    padding:4px;
    border-radius:20px;
    width:100px;
    margin-left:auto;
    margin-right:10px;
`;

export const SwitchButtonWrapper = styled.button`
    font-size:14px;
    background-color: ${props => props.isCode ? 'white' : '#fd91c7'};
    border:none;
    border-radius:20px;
    cursor: pointer;
    font-weight: 500;
    padding:4px;
`;
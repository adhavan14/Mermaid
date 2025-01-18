import Diagram from "../component/Diagram";
import React, { useState } from 'react';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp';
import { InputCardWrapper, MermaidContainer, MermaidWrapper, OutputCardWrapper, TitleWrapper } from "./MermaidPage.style";
import { Button, Input } from "@mui/material";
import { getCodeFromPrompt } from "../service/GptService";
import SwitchWithLabel from "../component/SwitchWithlabel";

const MermaidPage = () => {

    const [prompt, setPrompt] = useState('')
    const [mermaidCode, setMermaidCode] = useState('')
    const [isCode, setIsCode] = useState(false)

    const handlePrompt = (event) => {
      setPrompt(event.target.value)
    }

    const handleGenerate = async () => {
      const response = await getCodeFromPrompt(prompt)
      console.log(response)
      setMermaidCode(response)
    }

      return (
        <MermaidContainer>
          <TitleWrapper>
            <InsightsOutlinedIcon sx={{fontSize:'30px', paddingX:'10px'}}></InsightsOutlinedIcon>
            Mermaid
          </TitleWrapper>
          <MermaidWrapper>
            <InputCardWrapper>
              <Input
                aria-label="Demo input"
                placeholder="Give your query…"
                multiline
                disableUnderline
                onChange={handlePrompt}
                rows={13}
                fullWidth
                sx={{
                    height:'85%',
                    padding: '20px', 
                    border: '1px solid #ccc', 
                    borderRadius: '8px', 
                    '&::placeholder': {
                        color: '#888',
                    },
                }}
              />
              <Button  
                sx={{width:'10px', paddingX:'30px', marginLeft:'auto', color:'#fb007d',minWidth:'40px', backgroundColor:'transparent',
                  '&:hover':{cursor:'pointer', color:'#fd91c7'}
                }}
                onClick={handleGenerate}
              >
                <ArrowCircleRightSharpIcon sx={{fontSize:'40px'}}></ArrowCircleRightSharpIcon>
              </Button>
            </InputCardWrapper>
            <OutputCardWrapper>
              <SwitchWithLabel isCode={isCode} setIsCode={setIsCode}></SwitchWithLabel>
              <Diagram chart={mermaidCode} isCode={isCode}/>
            </OutputCardWrapper>
          </MermaidWrapper>
        </MermaidContainer>
      );
}

export default MermaidPage
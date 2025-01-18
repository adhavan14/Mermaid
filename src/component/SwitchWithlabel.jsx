// File: SwitchWithLabel.jsx
import React, { useState } from 'react';
import { SwitchButtonWrapper, SwitchWrapper } from '../pages/MermaidPage.style';

const SwitchWithLabel = ({isCode, setIsCode}) => {

    
  return (
    <SwitchWrapper>
        <SwitchButtonWrapper isCode={isCode} onClick={() => setIsCode(true)}>Code</SwitchButtonWrapper>
        <SwitchButtonWrapper isCode={!isCode} onClick={() => setIsCode(false)}>Preview</SwitchButtonWrapper>
    </SwitchWrapper>
  )
}

export default SwitchWithLabel
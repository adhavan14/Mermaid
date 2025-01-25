import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { CodeWrapper, DiagramWrapper } from '../pages/MermaidPage.style';
import { CardContent, Typography } from '@mui/material';

const Diagram = ({ chart, isCode }) => {
  const [diagram, setDiagram] = useState('')

  const initializeMermaid = async () => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });
    try {
      const { svg } = await mermaid.render('mermaid-chart', chart);
      setDiagram(svg)
    } catch (error) {
      console.error('Error rendering Mermaid chart:', error);
    }
    
  };

  useEffect(() => {
    initializeMermaid();
  }, [chart]);
  
  return  <>
    {
      isCode ? <CodeWrapper>
        <CardContent>
          <Typography sx={{whiteSpace:'pre-wrap', overflowY: 'auto', height: "calc(100vh - 250px)"}}>{chart}</Typography>
        </CardContent>
        </CodeWrapper> : 
        <DiagramWrapper dangerouslySetInnerHTML={{ __html: diagram }} />
    }
  </>
    
};

export default Diagram;

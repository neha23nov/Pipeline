
import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const extractVariables = (text) => {
  const vars = [];
  const seen = new Set();
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      vars.push(match[1]);
    } 
  }
  return vars;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(
    () => extractVariables(data?.text || '{{input}}')
  );
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    setVariables(extractVariables(newText));
  };

  const getHandleTop = (index) => {
    const startPx = 60;
    const spacing = 28;
    return `${startPx + index * spacing}px`;
  };

  return (
    <div style={{ position: 'relative' }}>

      {variables.map((varName, i) => (
        <div
          key={varName}
          style={{ position: 'absolute', left: 0, top: getHandleTop(i) }}
        >
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${varName}`}
            style={{
              background: '#6366f1',
              border: '2px solid #fff',
              width: 10,
              height: 10,
            }}
          />
          <span style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '10px',
            color: '#6b7280',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}>
            {varName}
          </span>
        </div>
      ))}

      <BaseNode
        title="Text"
        color="#8b5cf6"
        icon="📝"
        fields={[]}
        outputHandles={[{ id: `${id}-output` }]}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '600',
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Text
          </span>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            placeholder="Type text... use {{variable}} to add inputs"
            rows={2}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '5px 8px',
              fontSize: '12px',
              width: '100%',
              boxSizing: 'border-box',
              background: '#f9fafb',
              resize: 'none',
              overflow: 'hidden',
              fontFamily: 'inherit',
              minHeight: '44px',
            }}
          />
          {variables.length > 0 && (
            <span style={{ fontSize: '10px', color: '#8b5cf6' }}>
              {variables.length} variable
              {variables.length > 1 ? 's' : ''} detected: {variables.join(', ')}
            </span>
          )}
        </div>
      </BaseNode>
    </div>
  );
};
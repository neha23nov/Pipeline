// llmNode.js
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      title="LLM"
      color="#6366f1"
      icon="🤖"
      fields={[
        {
          type: 'display',
          value: 'Connect a system prompt and user prompt to get a response.',
        },
      ]}
      inputHandles={[
        { id: `${id}-system`, style: { top: '33%' } },
        { id: `${id}-prompt`, style: { top: '66%' } },
      ]}
      outputHandles={[
        { id: `${id}-response` }
      ]}
    />
  );
};
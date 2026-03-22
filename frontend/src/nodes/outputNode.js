
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      title="Output"
      color="#f59e0b"
      icon="📤"
      fields={[
        {
          label: 'Name',
          type: 'text',
          value: currName,
          onChange: (e) => setCurrName(e.target.value),
        },
        {
          label: 'Type',
          type: 'select',
          value: outputType,
          onChange: (e) => setOutputType(e.target.value),
          options: ['Text', 'Image'],
        },
      ]}
      inputHandles={[
        { id: `${id}-value` }
      ]}
      outputHandles={[]}
    />
  );
};

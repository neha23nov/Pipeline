// toolbar.js
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{
            padding: '10px',
            background: '#f8f8fc',
            borderBottom: '1px solid #e5e7eb'
        }}>
            <span style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '8px',
                display: 'block',
            }}>
                Drag nodes onto the canvas
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput'  label='Input'    />
                <DraggableNode type='customOutput' label='Output'   />
                <DraggableNode type='llm'          label='LLM'      />
                <DraggableNode type='text'         label='Text'     />
                <DraggableNode type='filter'       label='Filter'   />
                <DraggableNode type='api'          label='API Call' />
                <DraggableNode type='database'     label='Database' />
                <DraggableNode type='timer'        label='Timer'    />
                <DraggableNode type='note'         label='Note'     />
            </div>
        </div>
    );
};
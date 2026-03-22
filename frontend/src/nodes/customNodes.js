
import { useState } from 'react';
import { BaseNode } from './BaseNode';

// ── Node 1: Filter ────────────────────────────────────────────────────────
export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');
 
  return (
    <BaseNode
      title="Filter"
      color="#ef4444"
      icon="🔍"
      fields={[
        {
          label: 'Condition',
          type: 'text',
          value: condition,
          onChange: (e) => setCondition(e.target.value),
          placeholder: 'e.g. value > 10',
        },
      ]}
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[
        { id: `${id}-pass`, style: { top: '33%' } },
        { id: `${id}-fail`, style: { top: '66%' } },
      ]}
    />
  );
};

// ── Node 2: API Call ──────────────────────────────────────────────────────
export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      title="API Call"
      color="#0ea5e9"
      icon="🌐"
      fields={[
        {
          label: 'URL',
          type: 'text',
          value: url,
          onChange: (e) => setUrl(e.target.value),
          placeholder: 'https://api.example.com',
        },
        {
          label: 'Method',
          type: 'select',
          value: method,
          onChange: (e) => setMethod(e.target.value),
          options: ['GET', 'POST', 'PUT', 'DELETE'],
        },
      ]}
      inputHandles={[{ id: `${id}-body` }]}
      outputHandles={[{ id: `${id}-response` }]}
    />
  );
};

// ── Node 3: Database ──────────────────────────────────────────────────────
export const DatabaseNode = ({ id, data }) => {
  const [query, setQuery] = useState(data?.query || '');
  const [db, setDb] = useState(data?.db || 'PostgreSQL');

  return (
    <BaseNode
      title="Database"
      color="#14b8a6"
      icon="🗄️"
      fields={[
        {
          label: 'Database',
          type: 'select',
          value: db,
          onChange: (e) => setDb(e.target.value),
          options: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'],
        },
        {
          label: 'Query',
          type: 'textarea',
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: 'SELECT * FROM users',
        },
      ]}
      inputHandles={[{ id: `${id}-params` }]}
      outputHandles={[{ id: `${id}-results` }]}
    />
  );
};

// ── Node 4: Timer ─────────────────────────────────────────────────────────
export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || '1000');
  const [unit, setUnit] = useState(data?.unit || 'ms');

  return (
    <BaseNode
      title="Timer"
      color="#f97316"
      icon="⏱️"
      fields={[
        {
          label: 'Delay',
          type: 'text',
          value: delay,
          onChange: (e) => setDelay(e.target.value),
          placeholder: '1000',
        },
        {
          label: 'Unit',
          type: 'select',
          value: unit,
          onChange: (e) => setUnit(e.target.value),
          options: ['ms', 'seconds', 'minutes'],
        },
      ]}
      inputHandles={[{ id: `${id}-trigger` }]}
      outputHandles={[{ id: `${id}-done` }]}
    />
  );
};

// ── Node 5: Note ──────────────────────────────────────────────────────────
export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');

  return (
    <BaseNode
      title="Note"
      color="#a3a3a3"
      icon="🗒️"
      fields={[
        {
          label: 'Note',
          type: 'textarea',
          value: note,
          onChange: (e) => setNote(e.target.value),
          placeholder: 'Add a comment...',
        },
      ]}
      inputHandles={[]}
      outputHandles={[]}
    />
  );
};
import { Handle, Position } from 'reactflow';

const styles = {
  node: {
    background: '#ffffff',
    border: '1.5px solid #d1d5db',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
    minWidth: '220px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    color: '#1f2937',
  },
  header: (color) => ({
    background: color || '#6366f1',
    borderRadius: '10px 10px 0 0',
    padding: '8px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
  }),
  body: {
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    border: '1px solid #e5e7eb',
    borderRadius: '6px', 
    padding: '5px 8px',
    fontSize: '12px',
    width: '100%',
    boxSizing: 'border-box',
    background: '#f9fafb',
  },
  select: {
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '5px 8px',
    fontSize: '12px',
    width: '100%',
    boxSizing: 'border-box',
    background: '#f9fafb',
  },
};

const Field = ({ field }) => {
  const { label, type, value, onChange, options, placeholder } = field;

  const renderInput = () => {
    if (type === 'select') {
      return (
        <select style={styles.select} value={value} onChange={onChange}>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }
    if (type === 'textarea') {
      return (
        <textarea
          style={{ ...styles.input, resize: 'none' }}
          value={value}
          onChange={onChange}
          placeholder={placeholder || ''}
          rows={3}
        />
      );
    }
    if (type === 'text') {
      return (
        <input
          style={styles.input}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder || ''}
        />
      );
    }
    if (type === 'display') {
      return (
        <span style={{ fontSize: '12px', color: '#6b7280' }}>
          {value}
        </span>
      );
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
      {label && <span style={styles.label}>{label}</span>}
      {renderInput()}
    </div>
  );
};

export const BaseNode = ({
  title,
  color,
  icon,
  fields = [],
  inputHandles = [],
  outputHandles = [],
  style = {},
  children,
}) => {
  return (
    <div style={{ ...styles.node, ...style }}>

      {inputHandles.map((h) => (
        <Handle
          key={h.id}
          type="target"
          position={Position.Left}
          id={h.id}
          style={{
            background: '#6366f1',
            border: '2px solid #fff',
            width: 10,
            height: 10,
            ...h.style,
          }}
        />
      ))}

      <div style={styles.header(color)}>
        {icon && <span>{icon}</span>}
        <span style={{ color: '#fff', fontWeight: '700', fontSize: '13px' }}>
          {title}
        </span>
      </div>

      <div style={styles.body}>
        {fields.map((field, i) => (
          <Field key={i} field={field} />
        ))}
        {children}
      </div>

      {outputHandles.map((h) => (
        <Handle
          key={h.id}
          type="source"
          position={Position.Right}
          id={h.id}
          style={{
            background: '#6366f1',
            border: '2px solid #fff',
            width: 10,
            height: 10,
            ...h.style,
          }}
        />
      ))}

    </div>
  );
};
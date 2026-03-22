
import { useStore } from './store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        toast.error('Server error. Make sure the backend is running.');
        return;
      }

      const result = await response.json();

      // Show one toast for the counts
      toast.success(
        `Nodes: ${result.num_nodes}   Edges: ${result.num_edges}`,
        {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
        }
      );

      // Show a second toast for DAG result
      if (result.is_dag) {
        toast.success('Is DAG: Yes — no cycles detected', {
          position: 'top-right',
          autoClose: 4000,
        });
      } else {
        toast.error('Is DAG: No — cycle detected!', {
          position: 'top-right',
          autoClose: 4000,
        });
      }

    } catch (err) {
      toast.error(
        'Could not connect to backend. Run: uvicorn main:app --reload',
        { autoClose: 6000 }
      );
    }
  };

  return (
    <>
      {/* ToastContainer is where toasts actually render on screen */}
      <ToastContainer />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        borderTop: '1px solid #e5e7eb',
        background: '#f8f8fc',
      }}>
        <button
          onClick={handleSubmit}
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 32px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            letterSpacing: '0.3px',
          }}
        >
          Submit Pipeline
        </button>
      </div>
    </>
  );
};
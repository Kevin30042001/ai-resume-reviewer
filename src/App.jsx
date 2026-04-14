import { useState } from 'react';
import FileUpload from './components/FileUpload';
import ResultsView from './components/ResultsView';
import { reviewResume } from './services/api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = async (file) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await reviewResume(file);
      setResults(data);
    } catch (err) {
      console.error('Error:', err);
      const message = err.response?.data?.error || 'Error al analizar el CV. Intenta de nuevo.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F3F4F6',
      padding: '40px 20px',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#111827',
            marginBottom: '8px',
          }}>
            AI Resume Reviewer
          </h1>
          <p style={{ color: '#6B7280', fontSize: '16px' }}>
            Sube tu CV en PDF y recibe feedback instantáneo con inteligencia artificial
          </p>
        </div>

        {/* Contenido principal */}
        {results ? (
          <ResultsView
            analysis={results.analysis}
            metadata={results.metadata}
            onReset={handleReset}
          />
        ) : (
          <>
            <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />

            {/* Estado de carga */}
            {isLoading && (
              <div style={{
                textAlign: 'center',
                marginTop: '32px',
                padding: '24px',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid #E5E7EB',
                  borderTopColor: '#4F46E5',
                  borderRadius: '50%',
                  margin: '0 auto 16px',
                  animation: 'spin 1s linear infinite',
                }}>
                </div>
                <p style={{ color: '#4B5563', fontWeight: '500' }}>
                  Analizando tu CV con IA...
                </p>
                <p style={{ color: '#9CA3AF', fontSize: '13px' }}>
                  Esto puede tardar unos segundos
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{
                marginTop: '24px',
                padding: '16px 20px',
                backgroundColor: '#FEF2F2',
                borderRadius: '12px',
                border: '1px solid #FECACA',
              }}>
                <p style={{ color: '#B91C1C', fontSize: '14px', margin: 0 }}>
                  {error}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* CSS para la animación del spinner */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;
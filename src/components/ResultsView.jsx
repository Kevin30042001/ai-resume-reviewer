import ScoreCircle from './ScoreCircle';
import SectionCard from './SectionCard';

/**
 * Componente que muestra todos los resultados del análisis
 * Recibe el objeto completo que devuelve el backend
 */
function ResultsView({ analysis, metadata, onReset }) {
  return (
    <div>
      {/* Botón para analizar otro CV */}
      <button
        onClick={onReset}
        style={{
          background: 'none',
          border: 'none',
          color: '#4F46E5',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          padding: '0',
          marginBottom: '24px',
        }}
      >
        ← Analizar otro CV
      </button>

      {/* Score general */}
      <div style={{
        textAlign: 'center',
        marginBottom: '32px',
        padding: '32px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
          Resultado del análisis
        </h2>
        <ScoreCircle score={analysis.score_general} label="Score General" />
        <p style={{
          marginTop: '16px',
          color: '#6B7280',
          fontSize: '13px',
        }}>
          Archivo: {metadata.filename} — {(metadata.size / 1024).toFixed(0)}KB
        </p>
      </div>

      {/* Resumen */}
      <div style={{
        padding: '20px',
        backgroundColor: '#EEF2FF',
        borderRadius: '12px',
        marginBottom: '24px',
      }}>
        <p style={{ fontSize: '14px', color: '#3730A3', lineHeight: '1.6', margin: 0 }}>
          {analysis.resumen}
        </p>
      </div>

      {/* Secciones */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}>
        {Object.entries(analysis.secciones).map(([name, data]) => (
          <SectionCard key={name} name={name} data={data} />
        ))}
      </div>

      {/* Fortalezas y áreas de mejora */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
      }}>
        {/* Fortalezas */}
        <div style={{
          padding: '24px',
          backgroundColor: '#ECFDF5',
          borderRadius: '12px',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#065F46', marginBottom: '12px' }}>
            Fortalezas
          </h3>
          {analysis.fortalezas.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '8px',
              fontSize: '14px',
              color: '#047857',
            }}>
              <span>✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Áreas de mejora */}
        <div style={{
          padding: '24px',
          backgroundColor: '#FEF2F2',
          borderRadius: '12px',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#991B1B', marginBottom: '12px' }}>
            Áreas de mejora
          </h3>
          {analysis.areas_de_mejora.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '8px',
              fontSize: '14px',
              color: '#B91C1C',
            }}>
              <span>!</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultsView;
/**
 * Tarjeta que muestra el feedback de una sección del CV
 * Cada sección tiene: nombre, score, feedback y sugerencias
 */
function SectionCard({ name, data }) {
  const getScoreColor = (score) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return '#ECFDF5';
    if (score >= 60) return '#FFFBEB';
    return '#FEF2F2';
  };

  // Formatear el nombre de la sección (primera letra mayúscula)
  const formatName = (name) => {
    const names = {
      experiencia: 'Experiencia',
      habilidades: 'Habilidades',
      educacion: 'Educación',
      redaccion: 'Redacción',
    };
    return names[name] || name;
  };

  return (
    <div style={{
      border: '1px solid #E5E7EB',
      borderRadius: '12px',
      padding: '24px',
      backgroundColor: '#FFFFFF',
    }}>
      {/* Header con nombre y score */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
          {formatName(name)}
        </h3>
        <span style={{
          backgroundColor: getScoreBg(data.score),
          color: getScoreColor(data.score),
          padding: '4px 12px',
          borderRadius: '20px',
          fontWeight: '700',
          fontSize: '14px',
        }}>
          {data.score}/100
        </span>
      </div>

      {/* Feedback */}
      <p style={{ color: '#4B5563', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
        {data.feedback}
      </p>

      {/* Sugerencias */}
      <div>
        <p style={{ fontSize: '13px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>
          Sugerencias:
        </p>
        {data.sugerencias.map((sugerencia, index) => (
          <div key={index} style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '6px',
            fontSize: '13px',
            color: '#4B5563',
            lineHeight: '1.5',
          }}>
            <span style={{ color: '#4F46E5', flexShrink: 0 }}>→</span>
            <span>{sugerencia}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionCard;
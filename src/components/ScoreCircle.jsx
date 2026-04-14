import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

/**
 * Muestra un score con un círculo de progreso animado
 * El color cambia según el score: rojo (bajo), amarillo (medio), verde (alto)
 */
function ScoreCircle({ score, label }) {
  // Determinar color según el score
  const getColor = (score) => {
    if (score >= 80) return '#10B981'; // verde
    if (score >= 60) return '#F59E0B'; // amarillo
    return '#EF4444'; // rojo
  };

  const color = getColor(score);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: '120px', height: '120px', margin: '0 auto' }}>
        <CircularProgressbar
          value={score}
          text={`${score}`}
          styles={buildStyles({
            textSize: '28px',
            textColor: color,
            pathColor: color,
            trailColor: '#E5E7EB',
            pathTransitionDuration: 1,
          })}
        />
      </div>
      {label && (
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>
          {label}
        </p>
      )}
    </div>
  );
}

export default ScoreCircle;
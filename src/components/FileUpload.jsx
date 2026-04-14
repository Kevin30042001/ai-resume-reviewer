import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

/**
 * Componente de drag & drop para subir PDFs
 * react-dropzone maneja todo: arrastrar, soltar, click para seleccionar
 * Es como un <input type="file"> pero con mejor UX
 */
function FileUpload({ onFileSelect, isLoading }) {
  // useCallback memoriza la función para no recrearla en cada render
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxSize: 2 * 1024 * 1024, // 2MB máximo
    multiple: false,
    disabled: isLoading,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: '2px dashed',
        borderColor: isDragActive ? '#4F46E5' : '#D1D5DB',
        borderRadius: '12px',
        padding: '48px 24px',
        textAlign: 'center',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        backgroundColor: isDragActive ? '#EEF2FF' : '#F9FAFB',
        transition: 'all 0.2s ease',
        opacity: isLoading ? 0.6 : 1,
      }}
    >
      <input {...getInputProps()} />
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
      {isDragActive ? (
        <p style={{ color: '#4F46E5', fontWeight: '600', fontSize: '16px' }}>
          Suelta el archivo aquí...
        </p>
      ) : (
        <>
          <p style={{ fontWeight: '600', fontSize: '16px', color: '#374151', marginBottom: '8px' }}>
            Arrastra tu CV aquí o haz clic para seleccionar
          </p>
          <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
            Solo archivos PDF — Máximo 2MB
          </p>
        </>
      )}
    </div>
  );
}

export default FileUpload;
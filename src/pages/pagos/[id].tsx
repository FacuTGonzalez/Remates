import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Pagos() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Esto evita que el formulario se recargue
    
    if (!file) {
      alert('⚠️ Por favor selecciona un archivo');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Simulación de tiempo de subida (1.5 segundos)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 2. Feedback visual
      alert('✅ Comprobante subido correctamente (simulado)');

      // 3. Redirección con manejo de errores
      setTimeout(() => {
        setIsLoading(false);
        router.push('/')
          .then(() => {
            // Redirección exitosa
          })
          .catch(() => {
            // Fallback si falla el router de Next.js
            window.location.href = '/';
          });
      }, 2000);

    } catch (error) {
      setIsLoading(false);
      alert('❌ Error al subir el comprobante');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validar tamaño (opcional)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('El archivo es demasiado grande (máx. 5MB)');
        return;
      }
      
      setFile(selectedFile);
      // Generar vista previa
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Subir comprobante de pago</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          required
        />
        
        {preview && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Vista previa:</h3>
            <img 
              src={preview} 
              alt="Comprobante" 
              className="border rounded-md max-w-full h-auto max-h-60 object-contain"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Simulando envío...' : 'Enviar comprobante'}
        </button>
      </form>
    </div>
  );
}

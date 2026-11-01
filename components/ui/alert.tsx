interface AlertProps {
  tipo: 'sucesso' | 'erro';
  mensagem: string;
}

export function Alert({ tipo, mensagem }: AlertProps) {
  if (!mensagem) return null;

  const estilos =
    tipo === 'erro'
      ? 'bg-red-100 text-red-700 border-red-300'
      : 'bg-green-100 text-green-700 border-green-300';

  return (
    <div className={`rounded-md border p-3 text-sm font-medium transition-all ${estilos}`}>
      {mensagem}
    </div>
  );
}
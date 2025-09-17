import { useState } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

type AlertProps = {
  type?: AlertType;
  message: string;
  instruction?: string;
};

function DmAlert({ type = 'info', message, instruction }: AlertProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const baseStyle =
    'flex items-start justify-between p-1 rounded-md mb-1 text-sm sm:w-[360px]';

  const typeStyles: Record<AlertType, string> = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className={`${baseStyle} ${typeStyles[type]}`}>
      <div className="flex-1 text-start">
        <p>{message}</p>
        {instruction && (
          <p className="text-xs text-gray-600 mt-1">{instruction}</p>
        )}
      </div>
      <button
        onClick={() => setVisible(false)}
        className="ms-1 me-2 text-md font-bold leading-none focus:outline-none"
        aria-label="Close alert"
      >
       Got it!
      </button>
    </div>
  );
}

export default DmAlert;

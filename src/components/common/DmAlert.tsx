import { useState, useEffect } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

type AlertProps = {
  type?: AlertType;
  message: string;
  instruction?: string;
};

function DmAlert({ type = 'info', message, instruction }: AlertProps) {
  const [visible, setVisible] = useState(true);

  // Auto-hide after 5 seconds (5000ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup if component unmounts
  }, []);

  if (!visible) return null;

  const baseStyle =
    'flex items-start justify-between p-1 rounded-md mb-1 text-sm sm:w-[360px] fixed z-20 bottom-2 left-2';

  const typeStyles: Record<AlertType, string> = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className={`${baseStyle} ${typeStyles[type]}`}>
      <div className="flex-1 text-start ">
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


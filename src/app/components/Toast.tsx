import { clsx } from 'clsx';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

export interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: (id: string) => void;
}

const toastIcons = {
  success: <CheckCircle size={18} />,
  error: <AlertCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  info: <Info size={18} />,
};

const toastColors = {
  success: 'bg-[#4caf50] text-white',
  error: 'bg-[#ff402d] text-white',
  warning: 'bg-[#ffcd05] text-[#161b21]',
  info: 'bg-[#2196f3] text-white',
};

export const Toast = ({ id, message, type = 'info', duration = 4000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(id), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div
      className={clsx(
        'flex items-center gap-3 px-5 py-3.5 rounded-[12px] shadow-lg min-w-[300px] max-w-md transition-all duration-300',
        toastColors[type],
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      )}
    >
      <span className="shrink-0">{toastIcons[type]}</span>
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(id), 300);
        }}
        className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const ToastContainer = ({ toasts, onClose }: { toasts: ToastItem[]; onClose: (id: string) => void }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={onClose} />
      ))}
    </div>
  );
};

let toastIdCounter = 0;
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastItem['type'] = 'info', duration = 4000) => {
    const id = `toast-${++toastIdCounter}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
};

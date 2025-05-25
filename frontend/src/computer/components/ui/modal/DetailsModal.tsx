type DetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function DetailsModal({isOpen, onClose, children}: DetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-700/50 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
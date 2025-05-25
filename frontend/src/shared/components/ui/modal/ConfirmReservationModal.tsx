type ConfirmReservationModalProps = {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmReservationModal = ({ show, onConfirm, onCancel }: ConfirmReservationModalProps) => {
  if (!show) return null;

  return (
    <div
      className="relative z-40"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black/50 transition-opacity" />

      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Estas a punto de reservar
            </h2>
            <p className="text-sm text-gray-600 mb-4">¿Estás seguro de que deseas realizar esta reserva?</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-theme-royal-blue text-white text-sm font-semibold hover:brightness-110 cursor-pointer"
              >
                Confirmar
              </button>
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-200 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer"
              >
                Seguir editando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmReservationModal;

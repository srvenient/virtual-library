import React from "react";

type BookingErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BookingErrorModal({isOpen, onClose, children}: BookingErrorModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="relative z-30"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-neutral-700/40 transition-opacity"/>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex flex-col items-center justify-center gap-3">
                <div
                  className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10"
                >
                  <svg
                    className="size-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div className="text-center sm:mt-0 sm:ml-4">
                  <h3 className="text-base text-balance font-semibold text-gray-900" id="modal-title">
                    Reserva no disponible
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {children}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-center sm:px-20">
              <button
                type="button"
                className="inline-flex w-full justify-center bg-theme-navy px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition-colors duration-300 sm:w-auto cursor-pointer"
                onClick={onClose}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
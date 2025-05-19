import {Room} from "../../models/room.model.ts";
import {useState} from "react";
import {Form, useForm} from "react-hook-form";

export default function RoomCard({room}: { room: Room }) {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm({
    defaultValues: {
      reservationDate: "",
      reservationTime: "",
      duration: 30,
    },
  });
  const {is_available} = room;

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);

  const onSubmit = handleSubmit((data) => {
    setFormData(data);
    setShowFinalConfirmation(true);
  });

  const confirmReservation = () => {
    console.log("Reserva confirmada con datos:", formData);
    setShowFinalConfirmation(false);
    closeModals();
  };


  const handleReservation = () => {
    if (is_available) {
      setShowConfirmation(true);
    } else {
      setShowError(true);
    }

  };
  const closeModals = () => {
    setShowConfirmation(false);
    setShowError(false);
    reset();
  };

  return (
    <>
      <div
        className="bg-[#f4f4f4] flex flex-col h-[400px] hover:shadow-md transition-transform duration-300 ease-in-out shadow-sm"
      >
        <img
          className="w-full h-62 object-cover"
          src={room.cover_url}
          alt={`Cover image for room ${room.room_number}`}
        />
        <div className="flex flex-col justify-between flex-1 px-4 py-3">
          <div>
            <h1 className="text-lg font-medium text-theme-gray-darkest line-clamp-1">
              Sala {room.room_number}
            </h1>
            <p className="text-sm text-theme-gray-medium">
              Sede: {room.campus}
            </p>
          </div>
          <button
            onClick={handleReservation}
            className="bg-theme-royal-blue w-fit p-2 pl-3 pr-3 mt-4 text-left hover:bg-theme-blue-light transition duration-200 hover:brightness-110 cursor-pointer"
          >
            <span className="text-[15px] text-white font-medium cursor-pointer">
              {is_available ? "Reserve" : "Unavailable"}
            </span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"/>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6 text-green-600"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-base font-semibold text-gray-900" id="modal-title">Proceso de reserva</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Esta sala está disponible para reservar. Rellena el formulario
                          para confirmar tu reserva.
                        </p>

                        <form
                          id="reservationForm"
                          onSubmit={onSubmit}
                          className="mt-4 space-y-4"
                        >
                          <div>
                            <label htmlFor="reservationDate" className="block text-sm font-medium text-gray-700">
                              Fecha de la reserva
                            </label>
                            <input
                              type="date"
                              id="reservationDate"
                              {...register("reservationDate", {required: "La fecha es obligatoria"})}
                              min={new Date().toISOString().split("T")[0]}
                              className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm py-1 px-2 outline-none"
                            />
                            {errors.reservationDate && (
                              <p className="text-red-500 text-sm mt-1">{errors.reservationDate.message}</p>
                            )}
                          </div>

                          {/* Hora */}
                          <div>
                            <label htmlFor="reservationTime" className="block text-sm font-medium text-gray-700">
                              Hora de inicio
                            </label>
                            <input
                              type="time"
                              id="reservationTime"
                              {...register("reservationTime", {required: "La hora es obligatoria"})}
                              className="mt-1 block w-full border-gray-300 shadow-sm sm:text-smpy-1 px-2 outline-none"
                            />
                            {errors.reservationTime && (
                              <p className="text-red-500 text-sm mt-1">{errors.reservationTime.message}</p>
                            )}
                          </div>

                          {/* Duración */}
                          <div>
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                              Duración (en minutos)
                            </label>
                            <input
                              type="number"
                              id="duration"
                              {...register("duration", {
                                required: "La duración es obligatoria",
                                valueAsNumber: true,
                                min: {
                                  value: 30,
                                  message: "La duración mínima es de 30 minutos",
                                },
                                max: {
                                  value: 360,
                                  message: "La duración máxima es de 6 horas",
                                },
                                validate: (value) =>
                                  value % 30 === 0 || "La duración debe ser múltiplo de 30",
                              })}
                              step="30"
                              min="30"
                              max="360"
                              className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm py-1 px-2 outline-none"
                            />
                            {errors.duration && (
                              <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">Mínimo 30 minutos. Múltiplos de 30.</p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-17 sm:gap-2">
                  <button
                    form="reservationForm"
                    type="submit"
                    className="inline-flex   w-full justify-center bg-theme-royal-blue px-3 py-2 text-sm font-semibold text-white shadow-xs hover:brightness-110 sm:ml-3 sm:w-auto cursor-pointer"
                  >
                    Reservar
                  </button>
                  <button
                    onClick={closeModals}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFinalConfirmation && (

        <div className="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/50 transition-opacity"/>
          <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md text-left">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">¿Confirmar reserva?</h2>
                <p className="text-sm text-gray-600 mb-4">¿Estás seguro de que deseas realizar esta reserva?</p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={confirmReservation}
                    className="px-4 py-2 bg-theme-royal-blue text-white text-sm font-semibold hover:brightness-110 cursor-pointer"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => setShowFinalConfirmation(false)}
                    className="px-4 py-2 bg-gray-200 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer"
                  >
                    Seguir editando
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {showError && (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"/>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10"
                    >
                      <svg
                        className="size-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-base font-semibold text-gray-900" id="modal-title">Reserva no disponile</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Esta sala no está disponible para reservar en este momento.
                          Por favor, elige otra sala o verifica más tarde.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-20">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center bg-theme-teal-deep px-3 py-2 text-sm font-semibold text-white shadow-xs hover:opacity-45 sm:w-auto transition-opacity duration-300 cursor-pointer"
                    onClick={closeModals}
                  >
                    Entendido
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

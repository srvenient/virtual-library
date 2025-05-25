type RoomReservationModalProps = {
  userId: number;
  recurseId?: number;
  show: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  register: any;
  errors: any;
}

const RoomReservationModal = ({userId, recurseId, show, onClose, onSubmit, register, errors}: RoomReservationModalProps) => {
  if (!show) return null;

  return (
    <div className="relative z-30" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-neutral-800/50 transition-opacity" aria-hidden="true"/>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center p-9">
          <div
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:max-w-md"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex flex-col items-center justify-center gap-3">
                <div
                  className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </div>
                <div className="text-center mt-0">
                  <h3 className="text-base font-semibold text-gray-900" id="modal-title">Proceso de reserva</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Rellena el formulario para confirmar tu reserva.
                  </p>
                  <form
                    id="reservationForm"
                    onSubmit={(e) => {
                      e.preventDefault();
                      onSubmit(e);
                    }}
                    className="mt-4 space-y-4"
                  >
                    <div className="text-left">
                      <label htmlFor="reservation_date" className="block text-sm font-medium text-gray-700">
                        Fecha de la reserva
                      </label>
                      <input
                        type="date"
                        id="reservation_date"
                        {...register("reservation_date", {required: "La fecha de reserva es obligatoria"})}
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm py-1 px-2 outline-none"
                      />
                      {errors.reservation_date && (
                        <p className="text-red-700 text-sm mt-1">{errors.reservation_date.message}</p>
                      )}
                    </div>

                    <div className="text-left">
                      <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
                        Hora de inicio
                      </label>
                      <input
                        type="time"
                        id="start_time"
                        {...register("start_time", {
                          required: "La hora de inicio es obligatoria",
                          validate: (value: string) => {
                            const [hour] = value.split(":").map(Number);
                            return hour >= 6 && hour <= 22 || "La hora debe estar entre las 6:00 AM y 10:00 PM";
                          }
                        })}
                        className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm py-1 px-2 outline-none"
                      />
                      {errors.start_time && (
                        <p className="text-red-700 text-sm mt-1">{errors.start_time.message}</p>
                      )}
                    </div>

                    <div className="text-left">
                      <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">
                        Fecha de entrega
                      </label>
                      <input
                        type="date"
                        id="due_date"
                        {...register("due_date", {
                          required: "La fecha de entrega es obligatoria",
                          validate: (value: string, formValues: any) => {
                            // Debe ser >= reservation_date, si quieres validar en frontend
                            const reservationDate = (formValues as any).reservation_date;
                            if (reservationDate && value < reservationDate) {
                              return "La fecha de entrega no puede ser anterior a la fecha de reserva";
                            }
                            return true;
                          }
                        })}
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm py-1 px-2 outline-none"
                      />
                      {errors.due_date && (
                        <p className="text-red-700 text-sm mt-1">{errors.due_date.message}</p>
                      )}
                    </div>

                    <div className="text-left">
                      <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">
                        Hora de entrega
                      </label>
                      <input
                        type="time"
                        id="end_time"
                        {...register("end_time", {
                          required: "La hora de entrega es obligatoria",
                          validate: (value: string) => {
                            const [hour] = value.split(":").map(Number);
                            return hour >= 6 && hour <= 22 || "La hora debe estar entre las 6:00 AM y 10:00 PM";
                          }
                        })}
                        className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm py-1 px-2 outline-none"
                      />
                      {errors.end_time && (
                        <p className="text-red-700 text-sm mt-1">{errors.end_time.message}</p>
                      )}
                    </div>

                    <input type="hidden" {...register("user_id")} value={userId}/>
                    <input type="hidden" {...register("resource_type")} value="room"/>
                    <input type="hidden" {...register("resource_id")} value={recurseId}/>
                  </form>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-17 sm:gap-2">
              <button
                form="reservationForm"
                type="submit"
                className="inline-flex w-1/2 justify-center bg-theme-royal-blue px-3 py-2 text-sm font-semibold text-white shadow-xs hover:brightness-110 cursor-pointer"
              >
                Reservar
              </button>
              <button
                onClick={onClose}
                type="button"
                className="inline-flex w-1/2 justify-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 hover:bg-gray-50 mt-0 cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomReservationModal;

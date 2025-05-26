type RoomReservationModalProps = {
  recurseId?: number;
  show: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  register: any;
  errors: any;
  formValues: {
    start_date: string;
    start_time: string;
    return_date: string;
    return_time: string;
  }
  isValid: boolean;
}

const RoomReservationModal = ({recurseId, show, onClose, onSubmit, register, errors, formValues, isValid}: RoomReservationModalProps) => {
  const today = new Date().toISOString().split("T")[0];

  const getDateTime = (date: string, time: string) => {
    if (!date || !time) return null;
    return new Date(`${date}T${time}`);
  };

  const now = new Date();

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
                    onSubmit={onSubmit}
                    className="mt-4 space-y-4"
                  >
                    <div className="text-left">
                      <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                        Fecha de la reserva
                      </label>
                      <input
                        type="date"
                        id="start_date"
                        {...register("start_date", {
                          required: "La fecha de reserva es obligatoria"
                        })}
                        min={today}
                        className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm py-1 px-2 outline-none"
                      />
                      {errors.start_date && (
                        <p className="text-red-700 text-sm mt-1">{errors.start_date.message}</p>
                      )}
                    </div>

                    <div className="text-left">
                      <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
                        Hora de inicio
                      </label>
                      <input
                        type="time"
                        id="start_time"
                        disabled={!formValues.start_date}
                        {...register("start_time", {
                          required: "La hora de inicio es obligatoria",
                          validate: (value: string) => {
                            console.log("Validating start_time:", value);
                            const [hour] = value.split(":").map(Number);
                            if (hour < 6 || hour > 22) {
                              return "La hora debe estar entre las 6:00 AM y 10:00 PM";
                            }

                            const startDateTime = getDateTime(formValues.start_date, value);
                            if (formValues.start_date === today && startDateTime && startDateTime < now) {
                              return "La hora de inicio no puede ser menor a la hora actual";
                            }

                            return true;
                          }
                        })}
                        className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm py-1 px-2 outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                      />
                      {errors.start_time && (
                        <p className="text-red-700 text-sm mt-1">{errors.start_time.message}</p>
                      )}
                    </div>

                    <div className="text-left">
                      <label htmlFor="return_date" className="block text-sm font-medium text-gray-700">
                        Fecha de entrega
                      </label>
                      <input
                        type="date"
                        id="return_date"
                        disabled={!formValues.start_date || !formValues.start_time}
                        {...register("return_date", {
                          required: "La fecha de entrega es obligatoria",
                          validate: (value: string) => {
                            const start = formValues.start_date;
                            if (start && value < start) {
                              return "La fecha de entrega no puede ser anterior a la fecha de reserva";
                            }
                            return true;
                          }
                        })}
                        min={today}
                        className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm py-1 px-2 outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                      />
                      {errors.return_date && (
                        <p className="text-red-700 text-sm mt-1">{errors.return_date.message}</p>
                      )}
                    </div>

                    <div className="text-left">
                      <label htmlFor="return_time" className="block text-sm font-medium text-gray-700">
                        Hora de entrega
                      </label>
                      <input
                        type="time"
                        id="return_time"
                        disabled={!formValues.start_date || !formValues.start_time || !formValues.return_date}
                        {...register("return_time", {
                          required: "La hora de entrega es obligatoria",
                          validate: (value: string) => {
                            const [hour] = value.split(":").map(Number);
                            if (hour < 6 || hour > 22) {
                              return "La hora debe estar entre las 6:00 AM y 10:00 PM";
                            }

                            const returnDateTime = getDateTime(formValues.return_date, value);
                            const startDateTime = getDateTime(formValues.start_date, formValues.start_time);

                            if (formValues.return_date === today && returnDateTime && returnDateTime < now) {
                              return "La hora de entrega no puede ser menor a la hora actual";
                            }

                            if (
                              formValues.return_date === formValues.start_date &&
                              returnDateTime &&
                              startDateTime &&
                              returnDateTime < startDateTime
                            ) {
                              return "La hora de entrega no puede ser menor a la hora de reserva";
                            }

                            return true;
                          }
                        })}
                        className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm py-1 px-2 outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                      />
                      {errors.return_time && (
                        <p className="text-red-700 text-sm mt-1">{errors.return_time.message}</p>
                      )}
                    </div>

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
                disabled={!isValid}
                className={`inline-flex w-1/2 justify-center bg-theme-royal-blue px-3 py-2 text-sm font-semibold text-white shadow-xs hover:brightness-110 ${isValid ? "cursor-pointer" : "cursor-not-allowed"}`}
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

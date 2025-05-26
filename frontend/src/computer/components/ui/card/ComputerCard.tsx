import {Computer} from "../../../models/computer.model.ts";
import BookingErrorModal from "../../../../shared/components/ui/modal/BookingErrorModal.tsx";
import {useState} from "react";
import {useForm} from "react-hook-form";
import ConfirmReservationModal from "../../../../shared/components/ui/modal/ConfirmReservationModal.tsx";
import ComputerReservationModal from "../modal/ComputerReservationModal.tsx";
import {useAppDispatch} from "../../../../redux/hooks/useReduxHooks.ts";
import {fetchComputers, reserveComputer} from "../../../../redux/states/computer.slice.ts";

type Input = {
  resource_id: number;
  start_date: string;
  start_time: string;
  return_date: string;
  return_time: string;
};

export default function ComputerCard({currentPage, computer}: { currentPage: number, computer: Computer }) {
  const DefaultValues: Input = {
    resource_id: -1, // Placeholder for resource_id
    start_date: "",
    start_time: "",
    return_date: "",
    return_time: "",
  };

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    reset,
    watch
  } = useForm({
    defaultValues: DefaultValues,
    mode: "onChange"
  });
  const {is_available} = computer;

  const [showError, setShowError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);
  const [formData, setFormData] = useState<Input>(DefaultValues);

  const onSubmit = handleSubmit((data: Input) => {
    const fullData = {
      ...data,
      resource_id: computer.id,
    }
    setFormData(fullData);
    setShowFinalConfirmation(true);
  });

  const handleReservationSubmit = async () => {
    try {
      setShowFinalConfirmation(false);
      await dispatch(reserveComputer(formData)).unwrap();
      await dispatch(fetchComputers({ page: currentPage, limit: 10 }));
      handleCloseModal();
    } catch (error) {
      console.error("Error reservando computador:", error);
    }
  };

  const handleReservation = () => {
    if (is_available) {
      setShowConfirmation(true);
    } else {
      setShowError(true);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmation(false);
    setShowError(false);
    reset();
  };

  return (
    <div className="relative">
      <div className="relative w-full max-w-64 h-96 bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="absolute top-2 right-1 px-1 pb-4 z-10">
          <span
            className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
              is_available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {is_available ? "Disponible" : "Reservado"}
          </span>
        </div>
        <img
          src={computer.cover_url}
          className="w-full h-48 object-cover z-0 rounded-t-xl"
          alt={"Computer cover image " + computer.serial_number}
        />
        <div className="w-full h-48 object-center z-10">
          <h3 className="text-lg font-semibold text-gray-800 px-4 pt-2">
            Código: {computer.serial_number}
          </h3>
          <div className="text-gray-600 px-4 pb-2">
            {computer.campus && computer.assigned_career && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  Marca: {computer.brand}<br/>
                </span>
                <span className="text-sm text-gray-500">
                  Sede: {computer.campus}<br/>
                </span>
                <span className="text-sm text-gray-500">
                  Carrera: {computer.assigned_career}
                </span>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 flex items-center justify-between w-full px-4 py-3 bg-white">
            <button
              onClick={handleReservation}
              className={`bg-theme-navy text-white text-sm px-4 py-2 hover:bg-blue-900 transition-colors duration-300 cursor-pointer ${!computer.is_available ? "w-auto" : "w-1/2"}`}
            >
              {computer.is_available ? "Reservar" : "No disponible"}
            </button>
          </div>
        </div>
      </div>

      <ComputerReservationModal
        recurseId={computer.id}
        show={showConfirmation}
        onClose={handleCloseModal}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        formValues={{
          start_date: watch("start_date"),
          start_time: watch("start_time"),
          return_date: watch("return_date"),
          return_time: watch("return_time")
        }}
        isValid={isValid}
      />
      <ConfirmReservationModal
        show={showFinalConfirmation}
        onConfirm={handleReservationSubmit}
        onCancel={() => setShowFinalConfirmation(false)}
      />
      <BookingErrorModal
        isOpen={showError}
        onClose={handleCloseModal}
      >
        Este computador no está disponible para la reserva en este momento.
        Por favor, intente con otro o verifica más tarde.
      </BookingErrorModal>
    </div>
  )
}
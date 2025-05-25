import {Room} from "../../../models/room.model.ts";
import {useState} from "react";
import RoomReservationModal from "../modal/RoomReservationModal.tsx";
import {useForm} from "react-hook-form";
import BookingErrorModal from "../../../../shared/components/ui/modal/BookingErrorModal.tsx";
import Input from "../../../../auth/components/inputs/Input.tsx";
import ConfirmReservationModal from "../../../../shared/components/ui/modal/ConfirmReservationModal.tsx";
import {useAppSelector} from "../../../../redux/hooks/useReduxHooks.ts";

type Input = {
  reservation_date: string;
  start_time: string;
  due_date: string;
  end_time: string;
  user_id?: number;
  resource_type?: string;
  resource_id?: number;
};

export default function RoomCard({room}: { room: Room }) {
  const DefaultValues: Input = {
    reservation_date: "",
    start_time: "",
    due_date: "",
    end_time: "",
    user_id: undefined,
    resource_type: undefined,
    resource_id: undefined,
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<Input>({
    defaultValues: DefaultValues,
  });
  const {is_available} = room;

  const user = useAppSelector((state) => state.auth.user);

  const [showError, setShowError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);
  const [formData, setFormData] = useState<Input>(DefaultValues);

  const onSubmit = handleSubmit((data: Input) => {
    const fullData = {
      ...data,
      user_id: user.id,
      resource_type: 'room',
      resource_id: room.room_number,
    }
    setFormData(fullData);
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
          src={room.cover_url}
          className="w-full h-48 object-center z-0 rounded-t-xl"
          alt={"Room cover image " + room.room_number}
        />
        <div className="w-full h-48 object-center z-10">
          <h3 className="text-lg font-semibold text-gray-800 px-4 pt-2">
            Código: {room.room_number}
          </h3>
          <p className="text-gray-600 px-4 pb-2">
            {room.campus && (
              <span className="text-sm text-gray-500">
              Sede: {room.campus}
            </span>
            )}
          </p>
          <div className="absolute bottom-0 flex items-center justify-between w-full px-4 py-3 bg-white">
            <button
              onClick={handleReservation}
              className="bg-theme-navy text-white text-sm w-1/2 px-4 py-2 hover:bg-blue-900 transition-colors duration-300 cursor-pointer"
            >
              Reservar
            </button>
          </div>
        </div>
      </div>

      <RoomReservationModal
        show={showConfirmation}
        onClose={closeModals}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
      />
      <ConfirmReservationModal
        show={showFinalConfirmation}
        onConfirm={confirmReservation}
        onCancel={() => setShowFinalConfirmation(false)}
      />
      <BookingErrorModal
        isOpen={showError}
        onClose={closeModals}
      >
        Esta sala no está disponible para reservar en este momento.
        Por favor, elige otra sala o verifica más tarde.
      </BookingErrorModal>
    </div>
  )
}
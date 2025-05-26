import {Room} from "../../../models/room.model.ts";
import {useState} from "react";
import RoomReservationModal from "../modal/RoomReservationModal.tsx";
import {useForm} from "react-hook-form";
import BookingErrorModal from "../../../../shared/components/ui/modal/BookingErrorModal.tsx";
import Input from "../../../../auth/components/inputs/Input.tsx";
import ConfirmReservationModal from "../../../../shared/components/ui/modal/ConfirmReservationModal.tsx";
import {useAppDispatch} from "../../../../redux/hooks/useReduxHooks.ts";
import {fetchRooms, reserveRoom} from "../../../../redux/states/room.slice.ts";
import DetailsModal from "../modal/DetailsModal.tsx";

type Input = {
  resource_id: number;
  start_date: string;
  start_time: string;
  return_date: string;
  return_time: string;
};

export default function RoomCard({currentPage, room}: { currentPage: number, room: Room }) {
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
    formState: {errors},
    reset
  } = useForm<Input>({
    defaultValues: DefaultValues,
  });
  const {is_available} = room;

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);
  const [formData, setFormData] = useState<Input>(DefaultValues);

  const onSubmit = handleSubmit((data: Input) => {
    const fullData = {
      ...data,
      resource_id: room.id,
    }
    console.log(fullData);
    setFormData(fullData);
    setShowFinalConfirmation(true);
  });

  const handleReservationSubmit = async () => {
    try {
      setShowFinalConfirmation(false);
      await dispatch(reserveRoom(formData)).unwrap();
      await dispatch(fetchRooms({ page: currentPage, limit: 10 }));
      handleCloseModal();
    } catch (error) {
      console.error("Error reservando sala:", error);
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
          src={room.cover_url}
          className="w-full h-48 object-center z-0 rounded-t-xl"
          alt={"Room cover image " + room.room_number}
        />
        <div className="w-full h-48 object-center z-10">
          <h3 className="text-lg font-semibold text-gray-800 px-4 pt-2">
            Código: {room.room_number}
          </h3>
          <p className="flex flex-col text-gray-600 px-4 pb-2">
            {room.campus && (
              <span className="text-sm text-gray-500">
                Sede: {room.campus}
              </span>
            )}
          </p>
          <button
            onClick={() => setDetailsVisible(true)}
            className={`text-blue-600 underline text-sm px-4 hover:text-blue-900 transition-colors duration-300 cursor-pointer`}
          >
            Ver detalles
          </button>
          <div className="absolute bottom-0 flex items-center justify-between w-full px-4 py-3 bg-white">
            <button
              onClick={handleReservation}
              className={`bg-theme-navy text-white text-sm px-4 py-2 hover:bg-blue-900 transition-colors duration-300 cursor-pointer ${!room.is_available ? "w-auto" : "w-1/2"}`}
            >
              {room.is_available ? "Reservar" : "No disponible"}
            </button>
          </div>
        </div>
      </div>

      <DetailsModal
        isOpen={detailsVisible}
        onClose={() => setDetailsVisible(false)}
      >
        {room.description ? (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Detalles de la Sala</h3>
            <p className="text-gray-600">{room.description}</p>
          </div>
        ) : (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Detalles de la Sala</h3>
            <p className="text-gray-600">No hay descripción disponible.</p>
          </div>
        )}
      </DetailsModal>
      <RoomReservationModal
        recurseId={room.id}
        show={showConfirmation}
        onClose={handleCloseModal}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
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
        Esta sala no está disponible para reservar en este momento.
        Por favor, elige otra sala o verifica más tarde.
      </BookingErrorModal>
    </div>
  )
}
import BookingErrorModal from "../../../../shared/components/ui/modal/BookingErrorModal.tsx";
import {useState} from "react";
import {useForm} from "react-hook-form";
import ConfirmReservationModal from "../../../../shared/components/ui/modal/ConfirmReservationModal.tsx";
import BookReservationModal from "../modal/BookReservationModal.tsx";
import {Book} from "../../../models/book.model.ts";
import {useAppDispatch} from "../../../../redux/hooks/useReduxHooks.ts";
import {fetchBooks, reserveBook} from "../../../../redux/states/book.slice.ts";

type Input = {
  resource_id: number;
  start_date: string;
  start_time: string;
  return_date: string;
  return_time: string;
};

export default function BookCard({currentPage, book}: { currentPage: number, book: Book }) {
  const DefaultValues: Input = {
    resource_id: -1,
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
  const {is_available} = book;

  const [showError, setShowError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);
  const [formData, setFormData] = useState<Input>(DefaultValues);

  const onSubmit = handleSubmit((data: Input) => {
    const fullData = {
      ...data,
      resource_id: book.id,
    }
    setFormData(fullData);
    setShowFinalConfirmation(true);
  });

  const handleReservationSubmit = async () => {
    try {
      setShowFinalConfirmation(false);
      await dispatch(reserveBook(formData)).unwrap();
      await dispatch(fetchBooks({page: currentPage, limit: 10}));
      handleCloseModal();
    } catch (error: any) {
      console.error("Error reservando libros:", error);
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
          src={book.cover_url}
          className="w-full h-48 object-cover z-0 rounded-t-xl"
          alt={"Computer cover image " + book.id}
        />
        <div className="w-full h-48 object-center z-10">
          <h3 className="text-lg font-semibold text-gray-800 px-4 pt-2">
            {book.title}
          </h3>
          <div className="text-gray-600 px-4 pb-2">
            {book.author && book.campus_name && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  Por {book.author}<br/>
                </span>
                <span className="text-sm text-gray-500">
                  Sede: {book.campus_name}<br/>
                </span>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 flex items-center justify-between w-full px-4 py-3 bg-white">
            <button
              onClick={handleReservation}
              className={`bg-theme-navy text-white text-sm px-4 py-2 hover:bg-blue-900 transition-colors duration-300 cursor-pointer ${!book.is_available ? "w-auto" : "w-1/2"}`}
            >
              {book.is_available ? "Reservar" : "No disponible"}
            </button>
          </div>
        </div>
      </div>

      <BookReservationModal
        recurseId={book.id}
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
        Este libro no está disponible para la reserva en este momento.
        Por favor, intente con otro o verifica más tarde.
      </BookingErrorModal>
    </div>
  )
}
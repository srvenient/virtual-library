import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks/useReduxHooks";
import Navbar from "../../home/components/navigation/Navbar";
import apiClient from "../../shared/services/apiClient"; // Usamos tu apiClient configurado
import { salas } from "../model/Room.model"; // Asegúrate que la ruta esté correcta

export default function RoomPage() {
  // Recupera los datos del usuario desde el estado global usando Redux
  const user = useAppSelector((state) => state.auth.user);

  // Estado para almacenar las salas obtenidas desde la API
  const [rooms, setRooms] = useState<salas[]>([]);

  // Estado para manejar si el modal está abierto (en este caso no se usa, puedes eliminarlo si no lo necesitas)
  const [isOpen, setIsOpen] = useState(false);

  // Estado para manejar la carga de datos y los posibles errores
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect se ejecuta una vez al montar el componente para hacer la solicitud a la API
  useEffect(() => {
    async function fetchRooms() {
      try {
        // Realizamos la solicitud GET a la API para obtener las salas
        const response = await apiClient.get("/rooms");

        // Si la respuesta es exitosa, almacenamos las salas en el estado
        setRooms(response.data);
      } catch (error) {
        // Si hay un error, lo almacenamos en el estado de error
        setError("Error al cargar las salas");
      } finally {
        // Finalmente, cambiamos el estado de carga a falso para indicar que hemos terminado
        setLoading(false);
      }
    }

    // Llamamos a la función para obtener las salas
    fetchRooms();
  }, []); // El arreglo vacío significa que esto solo se ejecutará una vez al montar el componente

  return (
    <>
      {/* Aquí se renderiza la barra de navegación */}
      <Navbar />

      <section className="p-8">
        <div className="flex flex-wrap gap-8 justify-center">
          {/* Condicional para manejar los diferentes estados de la carga */}
          {loading ? (
            // Muestra un mensaje mientras los datos se están cargando
            <p>Cargando salas...</p>
          ) : error ? (
            // Si ocurre un error, mostramos un mensaje de error
            <p>{error}</p>
          ) : (
            // Si los datos se han cargado correctamente, renderizamos las salas
            rooms.map((room) => (
              <div
                key={room.id}
                className="w-64 h-[350px] bg-white border-2 border-gray-200 rounded-2xl shadow-md p-4 flex flex-col items-center justify-start"
              >
                {/* Mostramos la imagen de la sala */}
                <img
                  src={room.foto} //  `room.foto` para acceder a la URL de la imagen
                  alt="Imagen de sala"
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                {/* Mostrar el nombre de la sede de la sala */}
                <h3 className="text-lg font-semibold text-gray-800">{room.sede}</h3>
                {/* Mostrar el número de la sala */}
                <p className="text-sm text-gray-500">{room.numero_sala}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}

// Definición del modelo de datos `salas` que corresponde a la estructura de las salas en la base de datos
export interface salas {
  id: number;
  numero_sala: string;  
  sede: string;
  foto: string;  // URL de la imagen de la sala
}

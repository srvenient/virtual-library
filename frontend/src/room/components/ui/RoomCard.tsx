import {Room} from "../../model/room.model.ts";

export default function RoomCard({room}: { room: Room }) {
    return (
        <div
            className="bg-[#f4f4f4] flex flex-col h-[400px] hover:shadow-md hover:scale-105 transition-transform duration-300 ease-in-out shadow-sm"
        >
            <img
                className="w-full h-62 object-cover"
                src={room.cover_url}
                alt={`Portada del libro ${room.room_number}`}
            />
            <div className="flex flex-col justify-between flex-1 px-4 py-3">
                <div>
                    <h1 className="text-lg font-medium text-theme-gray-darkest line-clamp-1">
                        {room.campus}
                    </h1>
                    {room.is_available ? (
                        <span className="text-sm text-green-400 font-medium">
                            Disponible
                        </span>
                    ) : (
                        <span className="text-sm text-red-600 font-medium">
                            No disponible
                        </span>
                    )}
                </div>
                <button className="bg-theme-royal-blue rounded-lg w-fit p-2 pl-3 pr-3 mt-4 text-left hover:bg-theme-blue-light transition duration-200 hover:brightness-110">
                    <span className="text-[15px] text-white font-medium cursor-pointer">Reservar</span>
                </button>
            </div>
        </div>
    )
}
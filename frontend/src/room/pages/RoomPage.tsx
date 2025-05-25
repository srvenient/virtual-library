import {RootState} from "../../redux/store.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/useReduxHooks.ts";
import {useEffect, useState} from "react";
import GeneralNavbar from "../../shared/components/navigation/GeneralNavbar.tsx";
import Pagination from "../../shared/components/ui/navigation/Pagination.tsx";
import {Room} from "../models/room.model.ts";
import {fetchRooms} from "../../redux/states/room.slice.ts";
import RoomCard from "../components/ui/card/RoomCard.tsx";

const ITEMS_PER_PAGE = 10;

export default function RoomPage() {
  const dispatch = useAppDispatch();
  const {rooms, error, count, loading} = useAppSelector((state: RootState) => state.rooms);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchRooms({page: currentPage, limit: ITEMS_PER_PAGE}));
  }, [dispatch, currentPage]);

  return (
    <div className="min-h-screen">
      <GeneralNavbar/>
      <div className="py-2 px-2 max-w-screen-xl mx-auto mt-7 rounded-4xl">
        <div
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 h-auto"
        >
          {loading ?
            [...Array(ITEMS_PER_PAGE)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white animate-pulse rounded-xl h-[350px] shadow-md"
                >
                  <div className="bg-gray-300 h-72 w-full"></div>
                  <div className="px-4 py-3 space-y-1">
                    <div className="bg-gray-300 h-5 w-3/4 rounded"></div>
                    <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                  </div>
                </div>
              )
            ) : error ? (
              <p>{error}</p>
            ) : rooms.map((room: Room) => (
              <RoomCard
                key={room.room_number}
                room={room}
              />
            ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
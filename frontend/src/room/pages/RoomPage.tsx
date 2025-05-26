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
              <div
                className="relative z-30"
              >
                <div className="fixed inset-0 bg-neutral-700/30 transition-opacity"/>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full justify-center text-center items-center p-0">
                    <div
                      className="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md"
                    >
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div
                            className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10"
                          >
                            <svg
                              className="size-6 text-red-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                              />
                            </svg>
                          </div>
                          <div className="text-center sm:mt-0">
                            <h3 className="text-base text-balance font-semibold text-gray-900" id="modal-title">
                              Error
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {error}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-center sm:px-20">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center bg-theme-navy px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition-colors duration-300 sm:w-auto cursor-pointer"
                          onClick={() => dispatch(fetchRooms({page: 1, limit: ITEMS_PER_PAGE}))}
                        >
                          Entendido
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : rooms.map((room: Room) => (
              <RoomCard
                key={room.room_number}
                currentPage={currentPage}
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
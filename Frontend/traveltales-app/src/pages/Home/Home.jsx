import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import axiosInstance from "../../utilis/axiosinstance";
import TravelStoryCard from "../../components/cards/TravelStoryCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEditTravelStory from "./AddEditTravelStory";
import ViewTravelStory from "./ViewTravelStory";
import EmptyCard from "../../components/cards/EmptyCard";
import EmptyImg from "../../assets/images/add-story.png";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import moment from "moment";
import FilterInfoTitle from "../../components/cards/FilterInfoTitle";
import { getEmptyCardMessage } from "../../utilis/helper";
import Footer from "../../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data?.user) setUserInfo(response.data.user);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/get-all-stories");
      if (response.data?.stories) setAllStories(response.data.stories);
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const updateIsFavourite = async (storyData) => {
    try {
      const response = await axiosInstance.put(
        `/update-is-favourite/${storyData._id}`,
        {
          isFavourite: !storyData.isFavourite,
        }
      );
      if (response.data?.story) {
        toast.success("Story Updated Successfully");

        if (filterType === "search" && searchQuery) {
          onSearchStory(searchQuery);
        } else if (filterType === "date") {
          filterStoriesByDate(dateRange);
        } else {
          getAllTravelStories();
        }
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const deleteTravelStory = async (data) => {
    try {
      const response = await axiosInstance.delete(`/delete-story/${data._id}`);
      if (response.data && !response.data.error) {
        toast.error("Story Deleted Successfully");
        setOpenViewModal((prev) => ({ ...prev, isShown: false }));
        getAllTravelStories();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const onSearchStory = async (query) => {
    try {
      const response = await axiosInstance.get("/search", {
        params: { query },
      });
      if (response.data?.stories) {
        setFilterType("search");
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilterType("");
  };

  const filterStoriesByDate = async (day) => {
    try {
      const startDate = day?.from ? moment(day.from).valueOf() : null;
      const endDate = day?.to ? moment(day.to).valueOf() : null;
      if (startDate && endDate) {
        const response = await axiosInstance.get("/travel-tales/filter", {
          params: { startDate, endDate },
        });
        if (response.data?.stories) {
          setFilterType("date");
          setAllStories(response.data.stories);
        }
      }
    } catch (error) {
      console.error("Error filtering stories by date:", error);
    }
  };

  const handleDayClick = (day) => {
    setDateRange(day);
    filterStoriesByDate(day);
  };

  const resetFilter = () => {
    setDateRange({ from: null, to: null });
    setFilterType("");
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (!filterType) getAllTravelStories();
  }, [filterType]);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchStory}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <FilterInfoTitle
          filterType={filterType}
          filterDates={dateRange}
          onClear={resetFilter}
        />

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Your Travel Tales
            </h2>

            {allStories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {allStories.map((item) => (
                  <TravelStoryCard
                    key={item._id}
                    imgUrl={item.imageUrl}
                    title={item.title}
                    story={item.story}
                    date={item.visitedDate}
                    visitedLocation={item.visitedLocation}
                    isFavourite={item.isFavourite}
                    onClick={() =>
                      setOpenViewModal({ isShown: true, data: item })
                    }
                    onFavouriteClick={() => updateIsFavourite(item)}
                  />
                ))}
              </div>
            ) : (
              <EmptyCard
                imgSrc={EmptyImg}
                message={getEmptyCardMessage(filterType)}
                className="max-w-md mx-auto mt-10"
              />
            )}
          </div>

          {/* Sidebar Date Filter */}
          <div className="w-full lg:w-[350px] xl:w-[400px] hidden lg:block">
            <div className="bg-white border border-slate-200 shadow-xl rounded-xl p-4">
              <h3 className="font-semibold text-slate-700 text-lg mb-3">
                Filter by Date
              </h3>
              <DayPicker
                captionLayout="dropdown-buttons"
                mode="range"
                selected={dateRange}
                onSelect={handleDayClick}
                pagedNavigation
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Story Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 } }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <AddEditTravelStory
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllTravelStories={getAllTravelStories}
        />
      </Modal>

      {/* View Story Modal */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() =>
          setOpenViewModal((prev) => ({ ...prev, isShown: false }))
        }
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 } }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <ViewTravelStory
          storyInfo={openViewModal.data}
          onClose={() =>
            setOpenViewModal((prev) => ({ ...prev, isShown: false }))
          }
          onEditClick={() => {
            setOpenViewModal((prev) => ({ ...prev, isShown: false }));
            setOpenAddEditModal({
              isShown: true,
              type: "edit",
              data: openViewModal.data,
            });
          }}
          onDeleteClick={() => deleteTravelStory(openViewModal.data)}
        />
      </Modal>

      {/* Add Floating Button */}
      <button
        className="w-16 h-16 flex items-center justify-center shadow-xl shadow-cyan-300/40 rounded-full bg-primary hover:bg-cyan-400 transition duration-300 fixed right-6 bottom-6 z-50"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-3xl text-white" />
      </button>

      <ToastContainer />
      <Footer />
    </>
  );
};

export default Home;

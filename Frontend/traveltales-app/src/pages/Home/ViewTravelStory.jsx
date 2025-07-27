import moment from "moment";
import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { MdAdd, MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";

const ViewTravelStory = ({
  storyInfo,
  onClose,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="relative p-5">
      {/* Header with action buttons */}
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-lg">
          <button className="btn-small" onClick={onEditClick}>
            <MdUpdate className="text-lg" /> UPDATE STORY
          </button>
          <button className="btn-small btn-delete" onClick={onDeleteClick}>
            <MdDeleteOutline className="text-lg" /> Delete
          </button>
          <button className="" onClick={onClose}>
            <MdClose className="text-xl text-slate-400" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-2 py-4">
        <h1 className="text-2xl font-semibold text-slate-950">
          {storyInfo?.title}
        </h1>

        {/* FIX: Swapped the order of Date and Location */}
        <div className="flex items-center justify-between gap-3 mt-2">
          {/* Visited Date (Now on the left) */}
          <span className="text-xs text-slate-500 shrink-0">
            {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
          </span>

          {/* Location Tags (Now on the right) */}
          <div className="flex items-center flex-wrap gap-2">
            <GrMapLocation className="text-slate-500" />
            {storyInfo?.visitedLocation?.map((item, index) => (
              <span
                key={index}
                className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <img
          src={storyInfo && storyInfo.imageUrl}
          alt={"Selected"}
          className="w-full h-[300px] object-cover rounded-lg"
        />

        <div className="mt-4">
          <p className="text-sm text-slate-950 leading-6 text-justify whitespace-pre-line">
            {storyInfo.story}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewTravelStory;

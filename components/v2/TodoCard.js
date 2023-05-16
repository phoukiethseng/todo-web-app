import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export function TodoCard({
  id,
  title,
  priority = 0,
  date,
  completed = false,
  onTitleChanged = (id, newTitle) => {},
  onPriorityChanged = (id) => {},
  onComplete = (id) => {},
  onDelete = (id) => {},
}) {
  const [mouseOver, setMouseOver] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const titleElemRef = useRef();
  useEffect(() => {
    // Manually focus title input element
    if (isEditing) {
      titleElemRef.current.focus();
    }
  }, [isEditing, titleElemRef]);
  return (
    <div
      className={`w-[300px] rounded-[8px] px-[15px] py-[18px] flex flex-col gap-[20px] items-start ${
        mouseOver ? "bg-primary" : "bg-gray"
      }`}
      onMouseEnter={(e) => {
        e.stopPropagation();
        setMouseOver(true);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setMouseOver(false);
        setDropDownOpen(false);
      }}
    >
      <div className="flex flex-col w-full justify-start items-start">
        {!isEditing && (
          <div
            onClick={() => {
              if (!completed) {
                setIsEditing(true);
              }
            }}
            className={`h-[20px] text-Roboto text-sm font-semibold whitespace-nowrap text-ellipsis overflow-hidden hover:bg-primary-800 ${
              mouseOver ? "text-white" : ""
            } ${completed ? "line-through" : ""}`}
          >
            {title}
          </div>
        )}
        {isEditing && (
          <input
            ref={titleElemRef}
            type="text"
            defaultValue={title}
            onKeyDown={(e) => {
              if (e.key === `Enter`) {
                setIsEditing(false);
              }
            }}
            onBlur={(e) => {
              const currentTitle = e.target.value.trim();
              if (currentTitle !== title) {
                onTitleChanged(id, currentTitle);
              }
              setIsEditing(false);
            }}
            className="h-[20px] w-full border-0 rounded-[5px] py-[1px] px-[4px] outline-0 bg-gray-darker text-Roboto text-sm font-medium text-black-800"
          />
        )}
        <p
          className={`text-Roboto text-xs text-gray-lighter ${
            mouseOver ? "text-white" : ""
          }`}
        >
          {completed && "Completed"}
          {!completed && (date ? remainingTime(date) : "No Deadline set")}
        </p>
      </div>
      <div className="flex flex-row p-[0px] w-full justify-between items-start">
        <span className="relative">
          <div
            onClick={() => {
              setDropDownOpen(true);
            }}
            className={`px-[10px] py-[5px] rounded-[8px] border text-[10px] font-medium cursor-pointer ${
              mouseOver
                ? "text-white border-white"
                : `${priorityList[priority].className.text} ${priorityList[priority].className.border}`
            }`}
          >
            {priorityList[priority].name}
          </div>
          {dropDownOpen && (
            <ul className="absolute w-[100px] top-[120%] flex flex-col gap-0 p-[5px] rounded-[8px] bg-base cursor-pointer">
              {priorityList.map((priority, priorityIndex) => (
                <div
                  onClick={() => {
                    setDropDownOpen(false);
                    setMouseOver(false);
                    setTimeout(onPriorityChanged, 0);
                  }}
                  key={priorityIndex}
                  className={`text-Roboto font-md text-[10px] px-[10px] py-[5px] rounded-[8px] ${priority.className.text} hover:text-white hover:${priority.className.bg}`}
                >
                  <li>{priority.name}</li>
                </div>
              ))}
            </ul>
          )}
        </span>

        <div className="flex felx-row gap-[4px]">
          <div
            onClick={() => {
              onComplete(id);
            }}
            className={`w-[25px] h-[25px] rounded-[8px] bg-gray-darker flex justify-center items-center active:bg-gray-darker ${
              completed ? "bg-green" : "hover:bg-green"
            }`}
          >
            <img
              src="/check.png"
              className="object-scale-down h-[13px] w-[13px]"
            />
          </div>
          <div
            onClick={() => {
              onDelete(id);
            }}
            className="w-[25px] h-[25px] rounded-[8px] bg-gray-darker flex justify-center items-center hover:bg-secondary active:bg-gray-darker"
          >
            <img
              src="/trashcan.png"
              className="object-scale-down h-[13px] w-[13px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const priorityList = [
  {
    className: {
      text: "text-green",
      border: "border-green",
      bg: "bg-green",
    },
    color: "green",
    name: "Not Important",
  },
  {
    className: {
      text: "text-orange",
      border: "border-orange",
      bg: "bg-orange",
      // hover:bg-orange
    },
    color: "orange",
    name: "Important",
  },
  {
    className: {
      text: "text-secondary",
      border: "border-secondary",
      bg: "bg-secondary",
    },
    color: "secondary",
    name: "Urgent",
  },
];

// remainingTime function calculates the remaining time until a deadline
// @param {Date} deadline - The deadline date
// @returns {string} - A string that represents the remaining time until the deadline
function remainingTime(deadline) {
  let remainingTimeInMilliSeconds = deadline.getTime() - Date.now();
  if (remainingTimeInMilliSeconds >= 0) {
    const remainingDays = Math.floor(
      remainingTimeInMilliSeconds / (1000 * 60 * 60 * 24)
    );
    remainingTimeInMilliSeconds -= Math.floor(
      remainingDays * 24 * 60 * 60 * 1000
    );

    const remainingHours = Math.floor(
      remainingTimeInMilliSeconds / (1000 * 60 * 60)
    );
    remainingTimeInMilliSeconds -= Math.floor(remainingHours * 60 * 60 * 1000);

    const remainingMinutes = Math.floor(
      remainingTimeInMilliSeconds / (1000 * 60)
    );

    return `${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes remaining`;
  } else return "Past Due";
}

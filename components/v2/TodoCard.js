import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export function TodoCard({
  id,
  title,
  priority = 0,
  deadline,
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
  }, [isEditing]);
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
            className={`h-[20px] px-[7px] relative left-[-7px] text-Roboto text-sm font-semibold whitespace-nowrap text-ellipsis overflow-hidden hover:rounded-[8px] hover:bg-primary-800 ${
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
                const newTitle = e.target.value.trim();
                if (newTitle !== title) {
                  onTitleChanged(id, newTitle);
                }
                setIsEditing(false);
              }
            }}
            onBlur={(e) => {
              const newTitle = e.target.value.trim();
              console.log("newTitle", newTitle);
              if (newTitle !== title) {
                onTitleChanged(id, newTitle);
              }
              setIsEditing(false);
            }}
            className="h-[20px] w-full border-0 rounded-[5px] py-[1px] px-[7px] relative left-[-7px] outline-0 bg-gray-lighter text-Roboto text-sm font-semibold text-black-800"
          />
        )}
        <p
          className={`text-Roboto text-xs ${
            mouseOver ? "text-white" : "text-gray-darker"
          }`}
        >
          {completed && "Completed"}
          {!completed &&
            !mouseOver &&
            (deadline ? remainingTime(deadline) : "No Deadline set")}
          {!completed &&
            mouseOver &&
            (deadline ? displayDate(deadline) : "No Deadline set")}
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
            <ul className="absolute w-[100px] top-[120%] flex flex-col gap-0 p-[5px] rounded-[8px] bg-base cursor-pointer z-50">
              {priorityList.map((priority, priorityIndex) => (
                <div
                  onClick={() => {
                    setDropDownOpen(false);
                    setMouseOver(false);
                    setTimeout(() => {
                      onPriorityChanged(id, priorityIndex);
                    }, 0);
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
              onComplete(id, !completed);
            }}
            className={`w-[25px] h-[25px] rounded-[8px]  flex justify-center items-center active:bg-gray-lighter ${
              completed ? "bg-green" : "bg-gray-lighter hover:bg-green"
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
            className="w-[25px] h-[25px] rounded-[8px] bg-gray-lighter flex justify-center items-center hover:bg-secondary active:bg-gray-lighter"
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
  if (deadline.getTime() === 0) {
    // epoch time mean deadline has not been set
    return "No Deadline set";
  }
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
function displayDate(deadline) {
  if (deadline.getTime() === 0) {
    // epoch time mean deadline has not been set
    return "No Deadline set";
  }
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${
    monthNames[deadline.getMonth()]
  } ${deadline.getDate()}, ${deadline.getFullYear()} ${
    deadline.getHours() % 12
  }:${deadline.getMinutes()} ${deadline.getHours() >= 12 ? "PM" : "AM"}`;
}

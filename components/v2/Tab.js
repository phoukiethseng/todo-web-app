export default function Tab({
  itemComponents,
  itemNames,
  currentSelection = 0,
  onSelectionChange = (newSelection) => {},
}) {
  return (
    <div className="flex flex-col justify-start items-center gap-[20px]">
      <nav>
        <ul className="flex flex-row gap-[10px] px-[7px] py-[5px] border border-gray-lighter rounded-[8px]">
          {itemNames.map((name, index) => (
            <li
              onClick={() => onSelectionChange(index)}
              className={`px-[10px] py-[7px] cursor-pointer rounded-[8px] font-Roboto font-medium text-black-800 hover:bg-gray-lightest ${
                index === currentSelection ? "text-secondary" : ""
              }`}
              key={index}
            >
              {name}
            </li>
          ))}
        </ul>
      </nav>
      <div>{itemComponents[currentSelection]}</div>
    </div>
  );
}

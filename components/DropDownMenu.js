export default function DropDownMenu({
  menuItems,
  iconUrls,
  onMenuItemSelected,
  enableIcon = false,
  className,
}) {
  return (
    <ul
      className={`flex flex-col justify-start gap-[3px] rounded-[8px] items-stretch py-[10px] px-[6px] bg-gray ${className}`}
    >
      {menuItems.map((menuItem, index) => (
        <li
          onClick={(e) => {
            e.stopPropagation();
            onMenuItemSelected(index);
          }}
          className="flex flex-row justify-start gap-[8px] items-center py-[5px] px-[10px] rounded-[8px] hover:text-white hover:bg-primary"
          key={index}
        >
          {enableIcon && (
            <img
              className="w-[18px] h-[18px]"
              src={iconUrls ? iconUrls[index] : "/close-icon.png"}
            />
          )}
          <p className="text-Roboto font-normal text-sm">{menuItem}</p>
        </li>
      ))}
    </ul>
  );
}

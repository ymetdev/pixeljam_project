const MenuButton = ({
  children,
  active,
  onClick,
  icon: Icon,
  isBottomNav = false,
}) => {
  if (isBottomNav) {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 transition-all ${
          active ? "text-[#ff7eb6] bg-[#f1f2f6]" : "text-gray-500"
        }`}
      >
        <Icon size={24} />
        <span className="font-thai text-[10px] font-medium uppercase truncate w-full text-center px-1">
          {children}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-4 p-4 border-[4px] transition-all
        ${
          active
            ? "bg-[#ff7eb6] border-[#2f3542] translate-x-2 text-white shadow-none"
            : "bg-white border-[#2f3542] shadow-[4px_4px_0px_#2f3542] hover:translate-x-1 hover:shadow-[2px_2px_0px_#2f3542]"
        }
      `}
    >
      {Icon && <Icon size={22} />}
      <span className="font-thai text-[16px] font-medium uppercase">
        {children}
      </span>
    </button>
  );
};

export default MenuButton;

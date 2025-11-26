import type { ReactElement } from "react";

interface CompProps {
  name: string;
  icon: ReactElement;
  onClick?: () => void
}

const SidebarComp = ({ name, icon, onClick }: CompProps) => {
  return (
    <button
      className="w-full px-16 py-1 flex items-center gap-1.5 cursor-pointer rounded-lg hover:bg-gray-100"
      onClick={onClick}
    >
      <p>{icon}</p>
      <p>{name}</p>
    </button>
  );
}

export default SidebarComp;
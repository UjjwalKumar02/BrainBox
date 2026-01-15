import { useNavigate } from "react-router-dom";
import Logo from "../../icons/Logo";
import LogoutIcon from "../../icons/LogoutIcon";
import NotesIcon from "../../icons/NotesIcon";
import TwitterIcon from "../../icons/TwitterIcon";
import YoutubeIcon from "../../icons/YoutubeIcon";
import SidebarComp from "./SidebarComp";

interface Props {
  setHomeType: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({ setHomeType }: Props) => {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="lg:flex hidden bg-white min-h-screen w-74 py-6 fixed inset-0 flex-col items-center border-r border-gray-300">
      <button
        onClick={() => setHomeType("")}
        className="flex items-center gap-1 cursor-pointer"
      >
        <Logo />
        <h1 className="font-medium text-2xl tracking-tighter">BrainBox</h1>
      </button>

      <div className="mt-14 flex flex-col items-center gap-5">
        <SidebarComp
          name={"Tweets"}
          icon={<TwitterIcon />}
          onClick={() => setHomeType("tweets")}
        />
        <SidebarComp
          name={"Videos"}
          icon={<YoutubeIcon />}
          onClick={() => setHomeType("videos")}
        />
        <SidebarComp
          name={"Notes"}
          icon={<NotesIcon />}
          onClick={() => setHomeType("notes")}
        />
        <SidebarComp name={"Logout"} icon={<LogoutIcon />} onClick={logout} />
      </div>
    </div>
  );
};

export default Sidebar;

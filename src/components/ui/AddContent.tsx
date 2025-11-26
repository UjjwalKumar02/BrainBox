import { useRef, useState } from "react";
import CloseIcon from "../../icons/CloseIcon";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";

interface AddContentProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
}

// responsive
// deploy
// share logic and sharable page
// delete content
// remove clg

const AddContent = ({ open, setOpen, refresh }: AddContentProps) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  async function onAdd() {
    if (
      titleRef.current?.value === "" ||
      linkRef.current?.value === "" ||
      type === ""
    ) {
      alert("All are fields are required!");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/user/content`,
        {
          title: titleRef.current?.value,
          link: linkRef.current?.value,
          type: type,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      refresh((s) => !s);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      setOpen(false);
      setType("");
    }
  }

  return (
    <>
      {open && (
        <div className="min-h-screen w-full fixed inset-0 bg-black/25 flex justify-center items-center">
          <div className="bg-white px-10 py-9 flex flex-col gap-7 rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-medium">New Box</h1>
              <button className="cursor-pointer" onClick={() => setOpen(false)}>
                <CloseIcon />
              </button>
            </div>

            <Input reference={titleRef} type={"text"} placeholder={"title"} />
            <Input reference={linkRef} type={"text"} placeholder={"link"} />
            <div className="flex items-center justify-center gap-2">
              <button
                className={`${
                  type === "video" ? "bg-red-400" : "bg-blue-400"
                } text-white px-5 py-1 text-xs font-medium rounded-lg cursor-pointer`}
                onClick={() => setType("video")}
              >
                Video
              </button>
              <button
                className={`${
                  type === "tweet" ? "bg-red-400" : "bg-blue-400"
                } text-white px-5 py-1 text-xs font-medium rounded-lg cursor-pointer`}
                onClick={() => setType("tweet")}
              >
                Tweet
              </button>
              <button
                className={`${
                  type === "note" ? "bg-red-400" : "bg-blue-400"
                } text-white px-5 py-1 text-xs font-medium rounded-lg cursor-pointer`}
                onClick={() => setType("note")}
              >
                Note
              </button>
            </div>
            <Button
              variant="primary"
              size="lg"
              text="Add"
              widthFull={true}
              onClick={onAdd}
              disabled={loading ? true : false}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddContent;

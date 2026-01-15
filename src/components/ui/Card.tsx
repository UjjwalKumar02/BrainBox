import { useEffect } from "react";
import Button from "./Button";
import axios from "axios";
import { DeleteIcon } from "../../icons/DeleteIcon";

interface CardProps {
  id: string;
  type: string;
  title: string;
  link: string;
  fetchContent: () => Promise<void>;
}

const Card = ({ id, type, title, link, fetchContent }: CardProps) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Re-run Twitter embed processor when tweet blockquote is added
    if (type === "tweet" && window?.twttr?.widgets) {
      window.twttr.widgets.load();
    }
    // console.log("reloading...");
  }, [type, link]);

  async function deleteContent({ contentId }: { contentId: string }) {
    try {
      const res = await axios.delete(
        `${BACKEND_URL}/api/v1/user/content/${contentId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (res.status !== 200) {
        alert("Delete request failed");
        return;
      }

      fetchContent();
    } catch (error) {
      console.log(error);
      throw new Error("Delete request failed!");
    }
  }

  return (
    <div className="max-w-80 bg-white border border-gray-300 rounded-xl py-6 px-8 space-y-4 h-fit">
      <div className="flex justify-between items-center">
        <Button variant="secondary" size="md" text={type} />
        {/* <Button variant="primary" size="md" text="Share" /> */}
        <button
          onClick={() => deleteContent({ contentId: id })}
          className="cursor-pointer"
        >
          <DeleteIcon />
        </button>
      </div>

      <h1>{title}</h1>
      <div className="w-full">
        {type === "video" && (
          <iframe
            className="w-full"
            src={link.replace("watch?v=", "embed/").split("&")[0]}
            title="NEW SEASON | RANK PUSH : BGMI"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "tweet" && (
          <blockquote className="twitter-tweet">
            <a className="" href={link.replace("x.com", "twitter.com")}>
              loading...
            </a>
          </blockquote>
        )}

        {type === "note" && <p className="w-full wrap-break-word">{link}</p>}
      </div>
    </div>
  );
};

export default Card;

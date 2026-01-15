import { useEffect, useState } from "react";
import AddContent from "../components/ui/AddContent";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Sidebar from "../components/ui/Sidebar";
import { MobileNav } from "../components/ui/MobileNav";
import axios from "axios";

interface ContentProps {
  _id: string;
  title: string;
  link: string;
  type: string;
}

const Dashboard = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [open, setOpen] = useState(false);
  const [contents, setContents] = useState<ContentProps[]>([]);
  const [homeType, setHomeType] = useState("");

  const fetchContent = async () => {
    try {
      console.log("fetching content...");
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.status !== 200) {
        alert("Request failed!");
        return;
      }

      setContents(response.data.contents);
    } catch (error) {
      console.log(error);
      throw new Error("Fetch content request failed!");
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <div className="flex lg:flex-row flex-col">
      <Sidebar setHomeType={setHomeType} />
      <MobileNav isLoggedIn={true} />

      <div className="min-h-screen w-full lg:px-10 px-4 py-6 lg:ml-74 bg-gray-100 lg:mt-0 mt-18">
        <AddContent open={open} setOpen={setOpen} fetchContent={fetchContent} />

        <div className="flex justify-end mb-6">
          <Button
            variant="primary"
            size="lg"
            text="Add content"
            onClick={() => setOpen(true)}
          />
        </div>

        {homeType === "" && (
          <div className="flex gap-5 flex-wrap">
            {contents.length !== 0 &&
              contents.map((c: ContentProps) => (
                <Card
                  key={c._id}
                  id={c._id}
                  type={c.type}
                  title={c.title}
                  link={c.link}
                  fetchContent={fetchContent}
                />
              ))}
          </div>
        )}

        {homeType === "videos" && (
          <div className="flex gap-5 flex-wrap">
            {contents.length !== 0 &&
              contents.map(
                (c: ContentProps) =>
                  c.type === "video" && (
                    <Card
                      key={c._id}
                      id={c._id}
                      type={c.type}
                      title={c.title}
                      link={c.link}
                      fetchContent={fetchContent}
                    />
                  )
              )}
          </div>
        )}

        {homeType === "tweets" && (
          <div className="flex gap-5 flex-wrap">
            {contents.length !== 0 &&
              contents.map(
                (c: ContentProps) =>
                  c.type === "tweet" && (
                    <Card
                      key={c._id}
                      id={c._id}
                      type={c.type}
                      title={c.title}
                      link={c.link}
                      fetchContent={fetchContent}
                    />
                  )
              )}
          </div>
        )}

        {homeType === "notes" && (
          <div className="flex gap-5 flex-wrap">
            {contents.length !== 0 &&
              contents.map(
                (c: ContentProps) =>
                  c.type === "note" && (
                    <Card
                      key={c._id}
                      id={c._id}
                      type={c.type}
                      title={c.title}
                      link={c.link}
                      fetchContent={fetchContent}
                    />
                  )
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

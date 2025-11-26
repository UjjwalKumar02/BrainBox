import { useState } from "react";
import AddContent from "../components/ui/AddContent";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Sidebar from "../components/ui/Sidebar";
import useContent from "../hooks/useContent";

interface ContentProps {
  _id: string;
  title: string;
  link: string;
  type: string;
}


const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { contents, setRefresh } = useContent();
  const [homeType, setHomeType] = useState("");

  return (
    <div className="flex">
      <Sidebar setHomeType={setHomeType} />

      <div className="min-h-screen w-full px-10 py-6 ml-74 bg-gray-100">
        <AddContent open={open} setOpen={setOpen} refresh={setRefresh} />

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
                <Card key={c._id} type={c.type} title={c.title} link={c.link} />
              ))}
          </div>
        )}

        {homeType === "videos" && (
          <div className="flex gap-5 flex-wrap">
            {contents.length !== 0 &&
              contents.map((c: ContentProps) => (
                (c.type === "video") && <Card key={c._id} type={c.type} title={c.title} link={c.link} />
              ))}
          </div>
        )}

        {homeType === "tweets" && (
          <div className="flex gap-5 flex-wrap">
            {contents.length !== 0 &&
              contents.map((c: ContentProps) => (
                (c.type === "tweet") && <Card key={c._id} type={c.type} title={c.title} link={c.link} />
              ))}
          </div>
        )}

        {homeType === "notes" && (
          <div className="flex gap-5 flex-wrap">
            {contents.length !== 0 &&
              contents.map((c: ContentProps) => (
                (c.type === "note") && <Card key={c._id} type={c.type} title={c.title} link={c.link} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

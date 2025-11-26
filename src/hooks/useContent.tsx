import axios from "axios";
import { useEffect, useState } from "react";

const useContent = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [contents, setContents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchContent = async () => {
    console.log("fetching contents...");
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setContents(response.data.contents);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const clock = setTimeout(() => fetchContent(), 1000);

    return () => clearTimeout(clock);
  }, [refresh]);

  return { contents, setRefresh };
};

export default useContent;

import axios from "axios";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Logo from "../icons/Logo";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileNav } from "../components/ui/MobileNav";

const Signin = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const onSignin = async () => {
    if (
      usernameRef.current?.value === "" ||
      passwordRef.current?.value === ""
    ) {
      alert("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signin`, {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className="lg:flex hidden bg-white min-h-screen min-w-[65%] border-r border-gray-300 flex-col gap-4 items-center justify-center">
        <div className="flex items-center gap-1">
          <Logo />
          <h1 className="text-3xl tracking-tighter font-medium">BrainBox</h1>
        </div>
        <p>One place to dump all your cool stuffs</p>
      </div>

      <div className="min-h-screen flex flex-col gap-2 items-center justify-center bg-gray-100 w-full">
        <MobileNav isLoggedIn={false} />
        <div className="bg-white flex flex-col gap-8 py-8 lg:px-10 px-7 rounded-lg border border-gray-300">
          <h1 className="text-2xl text-center font-medium">Login</h1>
          <Input reference={usernameRef} type="text" placeholder="username" />
          <Input
            reference={passwordRef}
            type="password"
            placeholder="password"
          />
          <Button
            variant="primary"
            size="lg"
            text="Login"
            widthFull={true}
            onClick={onSignin}
            disabled={loading ? true : false}
          />
        </div>

        <button
          onClick={() => navigate("/")}
          className="text-blue-600 cursor-pointer"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signin;

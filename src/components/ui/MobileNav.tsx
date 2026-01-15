import { useNavigate } from "react-router-dom";
import Button from "./Button";

export function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="lg:hidden flex fixed top-0 w-full bg-white px-5 py-6 items-center justify-between border-b border-gray-200">
      <h1 className="text-xl font-medium tracking-tighter">BrainBox</h1>
      {isLoggedIn ? (
        <Button variant="secondary" size="md" text="Logout" onClick={logout} />
      ) : (
        <>
          <a href="https://github.com/UjjwalKumar02/brainbox">
            <Button
              variant="primary"
              size="md"
              text="GitHub"
              onClick={() => console.log("")}
            />
          </a>
        </>
      )}
    </div>
  );
}

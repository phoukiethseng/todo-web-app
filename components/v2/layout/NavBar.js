import Link from "next/link";
import Button from "@/components/v2/Button";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import DropDownMenu from "@/components/DropDownMenu";
import { useState } from "react";

export default function NavBar({
  signedIn = false,
  userName,
  imgUrl,
  navMenuEnable = true,
}) {
  const router = useRouter();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  return (
    <nav className="flex flex-row justify-between items-center px-[30px] py-[15px]">
      <Link href="/v2/home">
        <div className="flex flex-row gap-x-[5px] items-center">
          <img src="/appIcon.png" className="w-[40px] h-[40px]" />
          <p className="font-SecularOne text-lg text-black">TODOs Web App</p>
        </div>
      </Link>
      {navMenuEnable && (
        <ul className="flex flex-row gap-x-9">
          <li>
            <Link href="/v2/about" className="font-medium hover:text-secondary">
              About
            </Link>
          </li>
          <li>
            <Link href="/v2/help" className="font-medium hover:text-secondary">
              Help
            </Link>
          </li>
        </ul>
      )}
      {signedIn && (
        <div
          id="account-container"
          onClick={() => {
            setIsDropDownOpen((current) => !current);
          }}
          className={`relative transition-all duration-100 flex flex-row py-[5px] px-[10px] rounded-[8px] hover:cursor-pointer justify-center items-center gap-[10px] font-Roboto font-bold ${
            isDropDownOpen ? "bg-gray" : ""
          }`}
        >
          <p>{userName}</p>
          <img
            src={imgUrl ?? "/defaultProfile.png"}
            className="w-[40px] h-[40px] border-2 border-primary rounded-full"
          />
          {isDropDownOpen && (
            <DropDownMenu
              enableIcon={true}
              iconUrls={["/profile-icon.png", "/close-icon.png"]}
              className="absolute top-[60px] w-[170px] z-50"
              menuItems={["Account Setting", "Sign Out"]}
              onMenuItemSelected={(choice) => {
                setIsDropDownOpen((current) => !current);
                setTimeout(() => {
                  switch (choice) {
                    case 1:
                      router.push("/api/auth/signout");
                      break;
                  }
                }, 0);
              }}
            />
          )}
        </div>
      )}
      {!signedIn && (
        <div>
          <Button style={2} onClick={() => signIn()}>
            Sign In
          </Button>
          <Button style={1} onClick={() => router.push("/auth/signUp")}>
            Sign Up
          </Button>
        </div>
      )}
    </nav>
  );
}

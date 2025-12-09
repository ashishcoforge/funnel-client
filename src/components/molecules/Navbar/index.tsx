"use client";
import { useEffect, useState } from "react";
import style from "./index.module.scss";
import { REDIRECT_PATH, SESSION_KEY } from "@/src/enums";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [user, setUser] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem(SESSION_KEY.USER);
    setUser(user);
  }, []);

  return (
    <div className={style.Navbar}>
      <a href={`${REDIRECT_PATH.HOME}`}>
        <img
          src="https://www.coforge.com/hubfs/website-assets/coforge-logo.svg"
          alt=""
        />
      </a>
      {user && (
        <p className={style.profile}>
          {user}
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt=""
          />
          <img
            className={style.logout}
            onClick={() => {
              sessionStorage.clear();
              router.push("/login");
            }}
            src="https://cdn-icons-png.flaticon.com/512/10609/10609328.png"
            alt=""
          />
        </p>
      )}
    </div>
  );
};

export default Navbar;

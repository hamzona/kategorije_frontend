import React, { useEffect, useState } from "react";

import { useRefreshMutation } from "../features/auth/authApiSlice";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
export default function PresistLogin() {
  const [refresh, { isError }] = useRefreshMutation();

  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();

  const [trueSuccess, setTrueSuccess] = useState(false);

  //const effectRan = useRef(false);

  useEffect(() => {
    //if (effectRan.current) {
    const verifyRefresh = async () => {
      try {
        await refresh();
        setTrueSuccess(true);
      } catch (e) {
        console.log(e);
      }
    };
    if (!token) verifyRefresh();

    // return () => (effectRan.current = true);
  }, []);
  let content;

  if (trueSuccess || token) {
    content = <Outlet />;
  } else if (isError) {
    content = (
      <div>
        please login again
        <Link to={"/"}>login</Link>
      </div>
    );
  }

  return content;
}

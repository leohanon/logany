import { init } from "commandbar";
import { useEffect } from "react";
import { GetUserID } from "./GetUserID";
import { useNavigate } from "react-router-dom";
init("7ebcfc43");

export const useCommandBar = () => {
  useEffect(() => {
    const loggedInUserId = GetUserID();
    window.CommandBar.boot(loggedInUserId).then(() => {
      // ...
    });
    return () => {
      window.CommandBar.shutdown();
    };
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    function router(url: string) {
      navigate(url);
    }
    window.CommandBar.addRouter(router);
  }, [navigate]);
};

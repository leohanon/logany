import { init } from "commandbar";
import { useEffect } from "react";
import { GetUserID } from "./GetUserID";
import { useNavigate } from "react-router-dom";
import { useLoggerListContext } from "./LoggerListContext";
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

  const [loggerList] = useLoggerListContext();

  useEffect(() => {
    window.CommandBar.addRecords("logs", loggerList, { labelKey: "name" });
  }, [loggerList]);

  window.CommandBar.addRecordAction("logs", {
    text: "View log",
    name: "view_log",
    template: {
      type: "link",
      value: "/logs/{{record.id}}",
      operation: "self",
    },
  });

  const navigate = useNavigate();
  useEffect(() => {
    function router(url: string) {
      navigate(url);
    }
    window.CommandBar.addRouter(router);
  }, [navigate]);
};

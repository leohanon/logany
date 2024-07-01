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

  const { loggerList, handleAddLogList, handleAddToLog } =
    useLoggerListContext();

  window.CommandBar.addCallback("addNewLog", (args: { name: string }) => {
    handleAddLogList(args.name);
  });

  window.CommandBar.addCallback(
    "quickLog",
    (args: { record: { id: string } }) => {
      handleAddToLog(args.record.id, "");
    },
  );

  useEffect(() => {
    window.CommandBar.addRecords("logs", loggerList, { labelKey: "name" });
  }, [loggerList]);

  window.CommandBar.addRecordAction(
    "logs",
    {
      text: "View log",
      name: "view_log",
      template: {
        type: "link",
        value: "/logs/{{record.id}}",
        operation: "self",
      },
    },
    false,
  );

  window.CommandBar.addRecordAction(
    "logs",
    {
      text: "Add to log",
      name: "add_to_log",
      template: {
        type: "callback",
        value: "quickLog",
      },
    },
    true,
  );

  const navigate = useNavigate();
  useEffect(() => {
    function router(url: string) {
      navigate(url);
    }
    window.CommandBar.addRouter(router);
  }, [navigate]);
};

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CreateLogger } from "../components/ui/CreateLogger";
import { IndividualLogItem } from "../components/IndividualLogItem";
import { IndividualLogNavBar } from "../components/IndividualLogNavBar";
import { LogItem } from "../utils/LogTypes";
import { Stack } from "@mui/material";
import { getLogItems } from "../services/dbManagement";
import { useLoggerListContext } from "../hooks/useLoggerListContext";

export function IndividualLog() {
  const { logId } = useParams<{ logId: string }>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [logItems, setLogItems] = useState<LogItem[]>([]);
  const { updateUid } = useLoggerListContext();

  useEffect(() => {
    const fetchLogItems = async () => {
      try {
        const promise = getLogItems(logId ? logId : "");
        const items = await promise;
        setLogItems(items);
      } catch (error) {
        console.error("Failed to fetch log items:", error);
      }
    };

    fetchLogItems();
  }, [logId, logItems, updateUid]);

  const handleToggle = () => {
    setIsEditMode((oldMode) => !oldMode);
  };
  const navigate = useNavigate();
  const handleGoHome = () => navigate("/", { replace: true });

  const { handleAddToLog, setActiveLogId } = useLoggerListContext();

  useEffect(() => {
    setActiveLogId(logId ? logId : "");
  }, [logId, setActiveLogId]);

  return (
    <>
      <IndividualLogNavBar
        logId={logId ? logId : ""}
        isEditMode={isEditMode}
        handleGoHome={handleGoHome}
        handleToggle={handleToggle}
      />
      <Stack
        direction={"column"}
        justifyContent={"flex-start"}
        alignItems={"stretch"}
        spacing={1}
      >
        {!isEditMode && (
          <CreateLogger
            onSubmit={(value: string) =>
              handleAddToLog(logId ? logId : "", value)
            }
          />
        )}
        {logItems.map((x) => {
          return (
            <IndividualLogItem key={x.id} logItem={x} isEditMode={isEditMode} />
          );
        })}
      </Stack>
    </>
  );
}

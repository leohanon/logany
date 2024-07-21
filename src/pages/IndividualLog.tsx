import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CreateLogger } from "../components/ui/CreateLogger";
import { IndividualLogItem } from "../components/IndividualLogItem";
import { IndividualLogNavBar } from "../components/IndividualLogNavBar";
import { LogItemRow } from "../../database.types";
import { Stack } from "@mui/material";
import { getLogItems } from "../services/dbManagement";
import { useLoggerListContext } from "../hooks/useLoggerListContext";

export function IndividualLog() {
  const { logId } = useParams<{ logId: string }>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [logItems, setLogItems] = useState<LogItemRow[] | null>([]);
  const { updateUid } = useLoggerListContext();

  const fetchLogItems = useCallback(async () => {
    if (!logId) {
      return;
    }
    try {
      const promise = getLogItems(logId);
      const items = await promise;
      setLogItems(items.data);
    } catch (error) {
      console.error("Failed to fetch log items:", error);
    }
  }, [logId]);

  useEffect(() => {
    fetchLogItems();
  }, [fetchLogItems, updateUid]);

  const handleToggle = () => {
    setIsEditMode((oldMode) => !oldMode);
  };
  const navigate = useNavigate();
  const handleGoHome = () => navigate("/", { replace: true });

  const { handleAddToLog } = useLoggerListContext();

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
        {logItems?.map((x) => {
          return (
            <IndividualLogItem
              key={x.uuid}
              logItem={x}
              isEditMode={isEditMode}
            />
          );
        })}
      </Stack>
    </>
  );
}

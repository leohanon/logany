import { useNavigate, useParams } from "react-router-dom";

import { CreateLogger } from "../components/ui/CreateLogger";
import { IndividualLogItem } from "../components/IndividualLogItem";
import { IndividualLogNavBar } from "../components/IndividualLogNavBar";
import { Stack } from "@mui/material";
import { useLogItems } from "../hooks/useLogItems";
import { useLoggerListContext } from "../hooks/useLoggerListContext";
import { useState } from "react";

export function IndividualLog() {
  const { logId } = useParams<{ logId: string }>();
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: logItemsData } = useLogItems(logId);

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
        {logItemsData?.map((x) => {
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

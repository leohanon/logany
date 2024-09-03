import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import { BarChart } from "@mui/x-charts";
import { CreateLogger } from "../components/ui/CreateLogger";
import { IndividualLogItem } from "../components/IndividualLogItem";
import { IndividualLogNavBar } from "../components/IndividualLogNavBar";
import { Stack } from "@mui/material";
import { get30DCounts } from "../utils/helper";
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

  const dataset = get30DCounts(logItemsData ?? []);

  return (
    <>
      <IndividualLogNavBar
        logId={logId ? logId : ""}
        isEditMode={isEditMode}
        handleGoHome={handleGoHome}
        handleToggle={handleToggle}
      />
      <div style={{ marginTop: -20, marginBottom: -30 }}>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "date" }]}
          series={[{ dataKey: "count" }]}
          height={250}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.2 }}
        key="individual"
      >
        <Stack
          direction={"column"}
          justifyContent={"flex-start"}
          alignItems={"stretch"}
          spacing={1}
          sx={{ padding: 1 }}
        >
          {!isEditMode && (
            <CreateLogger
              onSubmit={(value: string) =>
                handleAddToLog(logId ? logId : "", value)
              }
            />
          )}
          <AnimatePresence initial={false}>
            {logItemsData?.map((x) => {
              return (
                <IndividualLogItem
                  key={x.uuid}
                  logItem={x}
                  isEditMode={isEditMode}
                />
              );
            })}
          </AnimatePresence>
        </Stack>
      </motion.div>
    </>
  );
}

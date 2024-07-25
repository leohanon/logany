import { forwardRef, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import RequireAuth from "../components/RequireAuth";

const AnimatedOutlet = forwardRef<HTMLDivElement>((_props, ref) => {
  const o = useOutlet();
  const [outlet] = useState(o);

  return <div ref={ref}>{outlet}</div>; // Forward the ref to the div
});

export function MainMenu() {
  const location = useLocation();
  return (
    <RequireAuth>
      <AnimatePresence mode="popLayout" initial={false}>
        <AnimatedOutlet key={location.pathname} />
      </AnimatePresence>
    </RequireAuth>
  );
}

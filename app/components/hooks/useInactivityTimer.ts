import { useEffect } from "react";

export default function useInactivityTimer(
  inactivityTimeout: number,
  logoutCallback: () => void
) {
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(logoutCallback, inactivityTimeout);
    };

    resetInactivityTimer();

    const activityListeners = [
      "mousemove",
      "keypress",
      "click",
      "touchstart",
      "scroll",
    ];

    activityListeners.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    return () => {
      activityListeners.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [inactivityTimeout, logoutCallback]);
}

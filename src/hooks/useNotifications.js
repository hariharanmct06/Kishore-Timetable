// Browser Web Notifications API Hook

export function useNotifications() {
  const requestPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
      return false;
    }
    if (Notification.permission === "granted") {
      return true;
    }
    const permission = await Notification.requestPermission();
    return permission === "granted";
  };

  const sendNotification = (title, body, options = {}) => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
      try {
        new Notification(title, {
          body,
          icon: "/favicon.ico",
          tag: "kishore-jee-command-center",
          renotify: true,
          ...options
        });
      } catch (e) {
        console.warn("Notification send error:", e);
      }
    }
  };

  return { requestPermission, sendNotification };
}

import axios from "axios";

type KeepAliveOptions = {
  healthUrl: string;
  idleMinutes?: number;
  checkEveryMinutes?: number;
};

export function createKeepAlive({ 
  healthUrl, 
  idleMinutes = 12, 
  checkEveryMinutes = 1 
}: KeepAliveOptions) {
  let lastActivity = Date.now();

  // Call this on every real request
  function recordActivity() {
    lastActivity = Date.now();
  }

  // Periodically check for idle
  setInterval(async () => {
    const idleTime = Date.now() - lastActivity;

    if (idleTime > idleMinutes * 60 * 1000) {
      try {
        await axios.get(healthUrl);
        console.log("🔄 Pinged app after idle period.");
      } catch (err: any) {
        console.error("❌ Ping failed:", err.message);
      }
    }
  }, checkEveryMinutes * 60 * 1000);

  return { recordActivity };
}
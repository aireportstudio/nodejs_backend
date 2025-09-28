// keepAlive.ts
import axios from "axios";

type KeepAliveOptions = {
  healthUrl: string;
  pingIntervalMinutes?: number; // how often to ping self
};

export function createKeepAlive({
  healthUrl,
  pingIntervalMinutes = 5, // default every 5 minutes
}: KeepAliveOptions) {
  console.log(`🟢 KeepAlive initialized. Pinging ${healthUrl} every ${pingIntervalMinutes} min.`);

  // Ping self periodically
  setInterval(async () => {
    try {
      await axios.get(healthUrl);
      console.log("🔄 Pinged self to stay awake");
    } catch (err: any) {
      console.error("❌ Ping failed:", err.message);
    }
  }, pingIntervalMinutes * 60 * 1000); // convert minutes to ms
}

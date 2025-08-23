import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// ✅ Test connection immediately
(async () => {
    try {
        await redis.ping();
        console.log("✅ Redis Connected.");
    } catch (err: any) {
        console.error("❌ Redis Connection Failed:", err.message);
    }
})();

export default redis;
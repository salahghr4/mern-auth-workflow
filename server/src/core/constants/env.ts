import "dotenv/config";
import { get } from "env-var";

const env = {
  PORT: get("PORT").required().asPortNumber(),
  API_PREFIX: get("API_PREFIX").default("/api/v1").asString(),
  NODE_ENV: get("NODE_ENV").default("development").asString(),
  MONGO_URI: get("MONGO_URI").required().asUrlString(),
};

export default env;

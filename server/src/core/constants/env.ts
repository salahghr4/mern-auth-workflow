import "dotenv/config";
import { get } from "env-var";

const env = {
  PORT: get("PORT").required().default(3000).asPortNumber(),
  API_PREFIX: get("API_PREFIX").default("/api/v1").asString(),
  NODE_ENV: get("NODE_ENV").default("development").asString(),
  MONGO_URI: get("MONGO_URI").required().asUrlString(),
  APP_ORIGIN: get("APP_ORIGIN").required().asUrlString(),
  ACCESS_TOKEN: {
    secret: get("ACCESS_TOKEN_SECRET").required().asString(),
    expireIn: get("ACCESS_TOKEN_EXPIRY").required().asIntPositive(),
  },
  REFRESH_TOKEN: {
    secret: get("REFRESH_TOKEN_SECRET").required().asString(),
    expireIn: get("REFRESH_TOKEN_EXPIRY").required().asIntPositive(),
  },
  MAILER_USER: get("MAILER_USER").required().asEmailString(),
  MAILER_PASS: get("MAILER_PASS").required().asString(),
};

export default env;

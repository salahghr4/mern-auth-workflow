import app from "./app";
import connectToDb from "./core/config/db";
import env from "./core/constants/env";

const startServer = async () => {
  try {
    await connectToDb();
    app.listen(env.PORT, () => {
      console.log(`Server runnig on port http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();

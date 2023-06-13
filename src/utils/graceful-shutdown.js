import { disconnect } from "mongoose";

export const handleShutdownGracefully = (app) => {
  console.info("closing server gracefully...");
  app.close(async () => {
    console.info("server closed.");
    await disconnect()
      .catch((reason) => {
        console.error(reason);
      })
      .then(() => {
        console.info("database disconnected");
      });
  });
};

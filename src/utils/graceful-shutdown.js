import { disconnect } from "mongoose";
import { exit } from "node:process";

export const handleShutdownGracefully = async (app) => {
  console.info("closing server gracefully...");

  console.info("server closed.");
  await disconnect()
    .catch((reason) => {
      console.error(reason);
    })
    .then(() => {
      console.info("database disconnected");
    });

  exit(0);
};

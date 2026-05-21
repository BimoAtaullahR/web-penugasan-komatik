import { seedJerseys } from "../src/seed";

seedJerseys()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

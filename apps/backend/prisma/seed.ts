import { seedJerseys, seedAdmin } from "../src/seed";

async function main() {
  await seedJerseys();
  await seedAdmin();
  console.log("Seeded jerseys and admin user");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

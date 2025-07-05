import bcrypt from "bcrypt";

const plainPassword = "654321";
const hashFromDB =
  "$2b$10$1LmTsgOXmarswZNmyLFVTuwHjeX0aikZbpoS02/oAh4JwTM5MGmsy"; // Your hash here

bcrypt.compare(plainPassword, hashFromDB).then((match) => {
  console.log("Password match?", match);
});

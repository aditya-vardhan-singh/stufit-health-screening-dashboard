import bcrypt from "bcrypt";

const plainPassword = "654321";
const hashFromDB =
  "$2b$10$U4H.obErUnsvowivBlqvoed22Sp.vpR7r4rCgRZx17C6rqQLz6NS6"; // Your hash here

bcrypt.compare(plainPassword, hashFromDB).then((match) => {
  console.log("Password match?", match);
});

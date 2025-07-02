export const getlogin = (req, res) => {
  res.send("ye ho gya apnna login page ");
};

export const postlogin = (req, res) => {
  const { email, password } = req.body;
  // Dummy hai change karna...........
  if (email === "admin@stufit.com" && password === "123456") {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

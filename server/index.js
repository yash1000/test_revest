// index.js
const express = require("express");
const bodyParser = require("body-parser");
const { User } = require("./models"); // Import the User model
const bcrypt = require("bcrypt");
const cors = require("cors"); // Import the cors module
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const verifyJwt = promisify(jwt.verify);

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const authenticateJwt = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = await verifyJwt(token, 'test-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};

const initializeDemoUser = async () => {
  try {
    // Check if demo user already exists
    const existingUser = await User.findOne({ where: { username: "demoUser" } });
    if (!existingUser) {
      const demoUserPassword = "demoPassword";
      const hashedPassword = await bcrypt.hash(demoUserPassword, 10);

      // Create demo user with hashed password
      await User.create({
        username: "demoUser",
        email: "demo@example.com",
        password: hashedPassword,
        status: "true",
      });

      console.log("Demo user created successfully. Hashed Password:", hashedPassword);
    } else {
      console.log("Demo user already exists.");
    }
  } catch (error) {
    console.error("Error initializing demo user:", error);
  }
};


// Route to authenticate user
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user in the database
    const user = await User.findOne({ where: { username } });

    // Check if the user exists and the password is correct
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ username: user.username }, 'test-secret-key', { expiresIn: '1h' });

      res.json({ success: true, message: "Login successful", token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.get("/api/users",authenticateJwt,  async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.patch('/api/users/:id/status', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { status } = req.body;

  try {
    // Update user status in the database
    await User.update({ status }, { where: { id: userId } });

    res.json({ success: true, message: 'User status updated successfully' });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Initialize demo user on server start
initializeDemoUser();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

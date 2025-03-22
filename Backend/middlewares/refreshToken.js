const refreshToken = (req, res) => {
  const { refreshToken } = req.cookies || req.body; // Web (cookie) or Mobile (body)
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized: No Refresh Token" });
  }

  jwt.verify(refreshToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Refresh Token" });
    }

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.SECRET_KEY,
      {
        expiresIn: "1m",
      }
    );

    res.json({ accessToken: newAccessToken });
  });
};

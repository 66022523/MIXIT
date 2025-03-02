const config = {
  base_url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  metadata: {
    app: "MIXIT's",
    name: "MIXIT",
    short_description: "Popular Gaming Community",
    long_description: "A large gaming community from around the world.",
  },
  validation: {
    max_nickname: 20,
    max_signature: 256,
    min_password: 8,
    password_regex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).{8,}$/,
  },
};

export default config;

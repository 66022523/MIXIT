const config = {
  metadata: {
    app: "MIXIT's",
    name: "MIXIT",
    short_description: "Popular Gaming Community",
    long_description: "A large gaming community from around the world.",
  },
  validation: {
    nicknameMaxLength: 20,
    signatureMaxLength: 256,
    passwordMinLength: 8,
    passwordRegex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).{8,}$/,
  },
};

export default config;

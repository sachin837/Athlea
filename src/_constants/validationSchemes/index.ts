export const ValidationSchemes = {
  Login: require('./loginSchema.ts').LoginSchema,
  PersonalDetailSchema: require('./personalDetailsSchema.ts').PersonalDetailsSchema,
  ForgotPasswordSchema: require('./forgotPasswordSchema.ts').forgotPasswordSchema,
}

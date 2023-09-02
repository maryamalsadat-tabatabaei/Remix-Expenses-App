export const validator = withZod(
  z
    .object({
      name: z
        .string()
        .nonempty("Name is required")
        .min(3, "Name must be at least 3 characters long"),
      email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid emaill address"),
      password: z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long"),
      confirmPassword: z.string(),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"],
    })
);

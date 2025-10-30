// TODO: Install Zod for schema validation
// npm install zod

// Example validation schemas using Zod
/*
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["CLIENT", "FREELANCER"]),
});

export const projectSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  budget: z.number().positive("Budget must be a positive number"),
  deadline: z.date().optional(),
});

export const profileUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  bio: z.string().optional(),
  avatar: z.string().url().optional(),
  skills: z.array(z.string()).optional(),
  hourlyRate: z.number().positive().optional(),
});
*/

"use server";

import { auth } from "@/auth";

export async function getData() {
  const session = await auth();
  if (session && session.user) {
    return {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      publickey: session.user.publickey,
    };
  }
  return null;
}

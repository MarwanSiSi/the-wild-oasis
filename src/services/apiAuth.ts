import supabase, { supabaseUrl } from "./supabase";

interface SignupData {
  fullName: string;
  email: string;
  password: string;
}

export async function signup({ fullName, email, password }: SignupData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}) {
  let updateData;

  if (password) {
    updateData = { password };
  }
  if (fullName) {
    updateData = { data: { fullName } };
  }

  if (!updateData) {
    throw new Error("No data to update");
  }

  //1.update fullName or password
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) return data;

  //2.upload avatar

  const fileName = `avatar/${data.user.id}/${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  //3.update avatar in the cached user object
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}
  `,
      },
    });

  if (updateError) {
    throw new Error(updateError.message);
  }

  return updatedUser;
}

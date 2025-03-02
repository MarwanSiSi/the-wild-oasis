import { getUser } from "../services/apiAuth";

export default async function loader() {
  const user = await getUser();

  console.log(user);

  return user;
}

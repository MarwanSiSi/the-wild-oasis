import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "./hooks/useUser";
import { useUpdateUser } from "./hooks/useUpdateUser";

function UpdateUserDataForm() {
  const { user } = useUser();
  const { updateUser, isUpdatingUser } = useUpdateUser();

  const email = user?.email ?? "";
  const currentFullName = user?.user_metadata?.fullName ?? "";

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e.currentTarget.reset());

    if (fullName === currentFullName && !avatar) return;

    if (!fullName) return;

    if (fullName) {
      updateUser(
        { data: { fullName, avatar } },
        {
          onSuccess: (data) => {
            setFullName(data?.user.user_metadata.fullName ?? "");
            setAvatar(null);
          },
        }
      );
    }
  }

  function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    e.currentTarget.form?.reset(); // Reset form fields to their initial values

    setFullName(user?.user_metadata?.fullName ?? "");
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            setAvatar(file);
          }}
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow>
        <>
          <Button
            type="reset"
            variation="secondary"
            disabled={isUpdatingUser}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button disabled={isUpdatingUser}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;

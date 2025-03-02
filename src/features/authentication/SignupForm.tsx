import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./hooks/useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  const { signup, isSigningUp } = useSignup();

  function onSubmit(data: FieldValues) {
    console.log(data);

    signup(
      {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }

  function onError(errors: FieldErrors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full name" errorMsg={errors.fullName?.message as string}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "Full name is required",
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Email address" errorMsg={errors.email?.message as string}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        errorMsg={errors.password?.message as string}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        errorMsg={errors.passwordConfirm?.message as string}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow>
        <>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset" disabled={isSigningUp}>
            Cancel
          </Button>
          <Button disabled={isSigningUp}>Create new user</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

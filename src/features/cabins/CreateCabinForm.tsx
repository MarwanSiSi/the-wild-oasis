import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm, FieldErrors, FieldValues } from "react-hook-form";
import { addCabin } from "../../services/apiCabins";
import { useMutation } from "@tanstack/react-query";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../utils/helpers";
import { toast } from "sonner";
import { PostgrestError } from "@supabase/supabase-js";
import { useUseQueryClient } from "../../hooks/useUseQueryClient";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

type FormData = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
};

function CreateCabinForm() {
  const { invalidateQuery } = useUseQueryClient();

  const { register, handleSubmit, reset } = useForm<FormData>();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: addCabin,

    onMutate: () => {
      const loadingToastId = showLoadingToast("Adding cabin...");

      return { loadingToastId };
    },
    onError: (error: PostgrestError, _, context) => {
      toast.dismiss(context?.loadingToastId);

      showErrorToast(error.message);
    },
    onSuccess: (_, __, context) => {
      toast.dismiss(context?.loadingToastId);

      showSuccessToast("Cabin added successfully!");

      invalidateQuery(["cabins"]);

      reset(); // Reset the form
    },
  });

  function onSubmit(data: FieldValues) {
    mutate(data);
  }

  function onError(errors: FieldErrors<FormData>) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

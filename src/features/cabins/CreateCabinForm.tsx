import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm, FieldErrors, FieldValues } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import styled from "styled-components";
import { useCreateCabin } from "./hooks/useCreateCabin";
import { useUpdateCabin } from "./hooks/useUpdateCabin";
import { useUseQueryClient } from "../../hooks/useUseQueryClient";

type FormData = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
};

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 2.4rem;
  margin-bottom: 0.4rem;
`;

function CreateCabinForm({
  onCloseModal,
  cabinToEdit = {},
}: {
  onCloseModal?: () => void;
  cabinToEdit?: FieldValues;
}) {
  const { id: editId, ...editValues } = cabinToEdit ?? {};

  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: isEditSession
      ? {
          ...editValues,
          discount: editValues.discount ?? 0,
          description: editValues.description ?? "",
        }
      : {},
  });

  const { invalidateQuery } = useUseQueryClient();

  const { isCreating, addCabin } = useCreateCabin(
    reset,
    invalidateQuery,
    onCloseModal
  );

  const { isUpdating, updateCabin } = useUpdateCabin(
    invalidateQuery,
    onCloseModal
  );

  function onSubmit(data: FieldValues) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      console.log({ data: { ...data, image }, id: editId });

      updateCabin({ data: { ...data, image }, id: editId });
    } else addCabin({ data, image: image });
  }

  function onError(errors: FieldErrors<FormData>) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Name" errorMsg={errors?.name?.message as string}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow
        label="Maximum capacity"
        errorMsg={errors?.maxCapacity?.message as string}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Regular price"
        errorMsg={errors?.regularPrice?.message as string}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" errorMsg={errors?.discount?.message as string}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",

            validate: (value) =>
              Number(value) < Number(getValues().regularPrice) ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>
      <FormRow
        label="Description"
        errorMsg={errors?.description?.message as string}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description")}
        />
      </FormRow>
      <FormRow label="Cabin Photo" errorMsg={errors?.image?.message as string}>
        <FileInput
          id="image"
          disabled={isCreating}
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>
      <StyledFlexContainer>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating || isUpdating}>
          {isEditSession ? "Update Cabin" : "Create Cabin"}
        </Button>
      </StyledFlexContainer>
    </Form>
  );
}

export default CreateCabinForm;

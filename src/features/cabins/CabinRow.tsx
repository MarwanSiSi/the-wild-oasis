// import styled from "styled-components";

import styled from "styled-components";
import { Cabin as CabinType } from "../../types/cabin";
import {
  formatCurrency,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../utils/helpers";
import { deleteCabin } from "../../services/apiCabins";
import { useMutation } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useUseQueryClient } from "../../hooks/useUseQueryClient";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }: { cabin: CabinType }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const { invalidateQuery } = useUseQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: (cabinId: number) => deleteCabin(cabinId),

    onMutate: () => {
      const loadingToastId = showLoadingToast("Deleting cabin");

      return { loadingToastId };
    },

    onSuccess: (_, __, context) => {
      // Dismiss the loading toast
      toast.dismiss(context.loadingToastId);

      showSuccessToast("Cabin deleted successfully");

      // Invalidate the cabins query to refresh the data
      invalidateQuery(["cabins"]);
    },

    onError: (error: PostgrestError, _, context) => {
      console.log(context);
      toast.dismiss(context?.loadingToastId);

      showErrorToast("Error deleting cabin");

      console.error("Error deleting cabin", error);
    },
  });

  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} person(s)</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button disabled={isDeleting} onClick={() => mutate(cabinId)}>
        Delete
      </button>
    </TableRow>
  );
}

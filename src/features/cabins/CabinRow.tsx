// import styled from "styled-components";

import styled from "styled-components";
import { Cabin as CabinType } from "../../types/cabin";
import { formatCurrency } from "../../utils/helpers";

import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useCreateCabin } from "./hooks/useCreateCabin";

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
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  text-align: center;
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  text-align: center;
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const StyledSpan = styled.span`
  text-align: center;
`;

export default function CabinRow({ cabin }: { cabin: CabinType }) {
  const [showForm, setShowForm] = useState(false);

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const { isDeleting, removeCabin } = useDeleteCabin();

  const { isCreating, addCabin } = useCreateCabin();

  function handleDuplicate() {
    addCabin({
      data: {
        name: `Copy of ${name}`,
        maxCapacity,
        regularPrice,
        discount,
        description,
      },
      image: image,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <StyledSpan>Fits up to {maxCapacity} person(s)</StyledSpan>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <StyledSpan>&mdash;</StyledSpan>
        )}

        <div>
          <button disabled={isCreating} onClick={handleDuplicate}>
            <HiSquare2Stack />
          </button>
          <button
            onClick={() => {
              setShowForm((prev) => !prev);
            }}
          >
            <HiPencil />
          </button>
          <button disabled={isDeleting} onClick={() => removeCabin(cabinId)}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

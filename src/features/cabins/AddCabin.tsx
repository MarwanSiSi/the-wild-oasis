import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// export default function AddCabin() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setShowModal((prev) => !prev)}>
//         Add new Cabin
//       </Button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <CreateCabinForm onCloseModal={() => setShowModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

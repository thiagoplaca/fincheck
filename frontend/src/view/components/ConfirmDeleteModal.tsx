import { Button } from "./Button";
import { TrashIcon } from "./icons/TrashIcon";
import { Modal } from "./Modal";

interface ConfirmDeleteModalProps {
  onClose(): void;
  title: string;
  description?: string;
  onConfirm(): void;
  isPendingDelete: boolean;
}

export function ConfirmDeleteModal({
  onClose,
  onConfirm,
  title,
  description,
  isPendingDelete,
}: ConfirmDeleteModalProps) {
  return (
    <Modal open title="Excluir" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="flex justify-center items-center w-13 h-13 bg-red-100 rounded-full">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>
        <p className="w-45 text-gray-800 font-bold tracking-[-0.5px]">
          {title}
        </p>

        {description && (
          <p className="tracking-[-0.5px] text-gray-800">{description} </p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          className="w-full"
          variant="danger"
          onClick={onConfirm}
          isPending={isPendingDelete}
        >
          Sim, desejo excluir.
        </Button>

        <Button
          className="w-full"
          variant="ghost"
          onClick={onClose}
          disabled={isPendingDelete}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}

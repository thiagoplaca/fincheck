import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import type { Transaction } from "../../../../../app/Entities/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";

const schema = z.object({
  value: z.union([z.string().nonempty("Informe o valor."), z.number()]),
  name: z.string().nonempty("Informe o nome."),
  categoryId: z.string().nonempty("Informe a categoria."),
  bankAccountId: z.string().nonempty("Informe a categoria."),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction?.date) : new Date(),
    },
  });

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { isPending, mutateAsync: updateTransaction } = useMutation({
    mutationFn: transactionService.update,
  });
  const { isPending: isPendingDelete, mutateAsync: removeTransaction } =
    useMutation({
      mutationFn: transactionService.remove,
    });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type,
    );
  }, [categoriesList, transaction]);

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Transação foi deletada com sucesso!");
      onClose();
    } catch {
      toast.error("Erro ao deletar a transação! ");
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }
  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success(
        transaction!.type === "EXPENSE"
          ? "Despesa atualizada com sucesso!"
          : "Receita atualizada com sucesso!",
      );
      onClose();
    } catch {
      toast.error(
        transaction!.type === "EXPENSE"
          ? "Erro ao atualizar a despesa!"
          : "Erro ao atualizar a receita!",
      );
    }
  });

  return {
    register,
    control,
    errors,
    handleSubmit,
    accounts,
    categories,
    isPending,
    isPendingDelete,
    isDeleteModalOpen,
    handleDeleteTransaction,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
}

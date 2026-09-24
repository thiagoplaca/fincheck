import z from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";

const schema = z.object({
  value: z.string().nonempty("Informe o valor."),
  name: z.string().nonempty("Informe o nome."),
  categoryId: z.string().nonempty("Informe a categoria."),
  bankAccountId: z.string().nonempty("Informe a categoria."),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: transactionService.create,
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType,
    );
  }, [categoriesList, newTransactionType]);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success(
        newTransactionType === "EXPENSE"
          ? "Despesa cadastrada com sucesso!"
          : "Receita cadastrada com sucesso!",
      );
      closeNewTransactionModal();
      reset();
    } catch {
      toast.error(
        newTransactionType === "EXPENSE"
          ? "Erro ao cadastrar despesa!"
          : "Erro ao cadastrar receita!",
      );
    }
  });

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    control,
    errors,
    handleSubmit,
    accounts,
    categories,
    isPending,
  };
}

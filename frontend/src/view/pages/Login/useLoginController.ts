import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { SigninParams } from "../../../app/services/authService/signin";

const schema = z.object({
  email: z.email("Informe um e-mail válido.").nonempty("E-mail é obrigatório."),
  password: z
    .string()
    .nonempty("Senha é obrigatória.")
    .min(8, "Senha deve conter pelo menos 8 dígitos."),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });
  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync(data);
    } catch {
      toast.error("Occoreu um erro ao entrar na sua conta.");
    }
  });

  return { handleSubmit, register, errors, isPending };
}

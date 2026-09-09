import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { SignupParams } from "../../../app/services/authService/signup";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório."),
  email: z.email("Informe um e-mail válido.").nonempty("E-mail é obrigatório."),
  password: z
    .string()
    .nonempty("Senha é obrigatória.")
    .min(8, "Senha deve conter pelo menos 8 dígitos."),
});
type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);
    } catch {
      toast.error("Occoreu um erro ao criar sua conta.");
    }
  });

  return { register, errors, handleSubmit, isPending };
}

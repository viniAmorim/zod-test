import {
  VStack,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { z, ZodError } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegistered } from "react-icons/fa";

const schema = z
  .object({
    firstName: z.string().min(3, "Por favor, informe um nome válido."),
    lastName: z.string().min(3, "Por favor, informe um sobrenome válido."),
    email: z
      .string()
      .email("Por favor, informe um e-mail válido.")
      .min(1, "Por favor, informe um e-mail."),
    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
    url: z.string().url("Por favor, informe uma URL válida"),
    agree: z.boolean(),
    select: z.string(),
    role: z.enum(["admin", "user"], {
      errorMap: () => {
        return { message: `Informe 'admin ou 'user'` };
      },
    }),
  })
  .refine((fields) => fields.agree === true, {
    path: ["agree"],
    message: "Precisa aceitar os termos",
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ["confirmPassword"],
    message: "A senhas precisam ser iguais",
  })
  .refine((fields) => fields.select.length, {
    path: ["select"],
    message: "Por favor, seleciona uma opção",
  })
  .transform((fields) => ({
    firstName: fields.firstName,
    lastName: fields.lastName,
    email: fields.email,
    password: fields.password.toLocaleUpperCase(),
    confirmPassword: fields.confirmPassword.toLocaleUpperCase(),
    agree: fields.agree,
    select: fields.select,
    url: fields.url.toLocaleLowerCase(),
    role: fields.role,
  }));

type FormData = z.infer<typeof schema>;

export const ZodForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
      agree: false,
      select: "",
      url: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log({ data });

    try {
      const result = schema.parse(data);

      console.log({ result });
    } catch (err) {
      if (err instanceof ZodError) {
        console.error(err.flatten());
      }
    }
  };

  return (
    <Grid minH="100vh" p={3}>
      <VStack spacing={8}>
        <h2>ZOD Forms</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.firstName}>
            <FormLabel htmlFor="firstName">Primeiro Nome</FormLabel>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.lastName}>
            <FormLabel htmlFor="lastName">Último nome</FormLabel>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input type="password" {...field} />}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel htmlFor="confirmPassword">
              Confirmação de senha
            </FormLabel>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => <Input type="password" {...field} />}
            />
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.role}>
            <FormLabel htmlFor="role">Informe a permissão</FormLabel>
            <Controller
              name="role"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.url}>
            <FormLabel htmlFor="url">Informe a URL</FormLabel>
            <Controller
              name="url"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            <FormErrorMessage>{errors.url?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.select}>
            <FormLabel htmlFor="select">Selecione uma opção</FormLabel>
            <Controller
              name="select"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <option value="">Selecione...</option>{" "}
                  {/* Opção padrão vazia */}
                  {[
                    { value: "opcao1", label: "Opção 1" },
                    { value: "opcao2", label: "Opção 2" },
                    { value: "opcao3", label: "Opção 3" },
                  ].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              )}
            />
            <FormErrorMessage>{errors.select?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.agree}>
            <FormLabel htmlFor="agree">Aceitar os termos</FormLabel>
            <Controller
              name="agree"
              control={control}
              render={({ field }) => (
                <Checkbox isChecked={field.value} onChange={field.onChange} />
              )}
            />
            <FormErrorMessage>{errors.agree?.message}</FormErrorMessage>
          </FormControl>

          <Button mt={4} px={12} colorScheme="teal" type="submit">
            Submit
          </Button>
        </form>
      </VStack>
    </Grid>
  );
};

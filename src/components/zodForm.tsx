import {
  VStack,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react"
import { useForm, Controller } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  firstName: z.string().min(3, 'Por favor, informe um nome válido.'),
  lastName: z.string().min(3, 'Por favor, informe um sobrenome válido.'),
  email: z.string().email('Por favor, informe um e-mail válido.').min(1, 'Por favor, informe um e-mail.'),
})

type FormData = z.infer<typeof schema>

export const ZodForm = () => {
const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.firstName}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.lastName}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
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

            <Button mt={4} colorScheme="teal" type="submit">
                Submit
            </Button>
        </form>
        </VStack>
    </Grid>
    )
}
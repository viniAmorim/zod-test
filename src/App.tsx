import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./components/ColorModeSwitcher"
import { ZodForm } from "./components/zodForm"

export const App = () => {

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <ZodForm />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}

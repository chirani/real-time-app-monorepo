import Navigation from '@/components/Navigation'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <Navigation />
    </>
  )
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import LoadingIcon from "../UI/LoadingIcon"
import ContextLayout from "./ContextLayout"
import ErrorBoundary from "./ErrorBoundary"
import Footer from "./Footer/Footer"
import Header from "./Header/Header"
import Navbar from "./Navigation/Navbar"

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <ContextLayout>
        <div className='flex flex-col min-h-screen'>
          <div className='flex-1'>
            <Header />
            <Navbar />
            <div className='container my-8'>
              <Suspense fallback={<LoadingIcon />}>
                <QueryClientProvider client={queryClient}>
                  <Outlet />
                </QueryClientProvider>
              </Suspense>
            </div>
          </div>
          <Footer />
        </div>
      </ContextLayout>
    </ErrorBoundary>
  )
}

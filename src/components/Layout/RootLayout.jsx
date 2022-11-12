import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Navbar from "../Navbar/Navbar"
import LoadingIcon from "../UI/LoadingIcon/LoadingIcon"
import ContextLayout from "./ContextLayout"
import ErrorBoundary from "./ErrorBoundary"

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
                <QueryClientProvider QueryClientProvider client={queryClient}>
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

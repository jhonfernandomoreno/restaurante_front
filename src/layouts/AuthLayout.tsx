interface AuthLayoutProps {
  children?: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="container w-100">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

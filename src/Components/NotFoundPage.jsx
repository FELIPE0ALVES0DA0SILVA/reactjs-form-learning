import { Link } from "react-router-dom"
import HomePage from "./HomePage"

function NotFoundPage() {
  return (
    <>
      <h1>
        Error: 404 Page Not Found
      </h1>

      <Link to={'/'}>Home Page</Link>
    </>
  )
}

export default NotFoundPage
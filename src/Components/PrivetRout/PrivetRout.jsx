import { Navigate } from 'react-router-dom'

export default function PrivetRout({children}) {
  return (
    <>
    {localStorage.getItem('welcome') ? (children) : (
        <Navigate to={'/'} />
    )}
    </>
  )
}

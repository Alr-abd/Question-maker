import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useCustomDispatch = action => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(action)
    })
}

export default useCustomDispatch
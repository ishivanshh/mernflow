import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from "../contexts/CaptainContext.jsx";

const CaptainProtectWrapper = ({
    children
}) => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate("/captain-login")
            return
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.status === 200) {
                setCaptain(response.data.captain)
            }
        })
        .catch((err) => {
            console.error(err)
            localStorage.removeItem("token")
            navigate("/captain-login")
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [navigate, token, setCaptain])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
};

export default CaptainProtectWrapper

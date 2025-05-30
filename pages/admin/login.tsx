/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const router = useRouter()
  const [dataLogin, setdataLogin] = useState({
    username: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('admin-token')
    if (token) {
      router.push('/admin/dashboard')
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setdataLogin(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async () => {
    const { username, password } = dataLogin

    if (!username || !password) {
      toast.error('username/password is required!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      return
    }

    setIsLoading(true)

    try {
      // Simple admin check (in production, use proper authentication)
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('admin-token', 'admin-authenticated')
        localStorage.setItem('admin-user', username)
        toast.success('Login successful!')
        router.push('/admin/dashboard')
      } else {
        toast.error('Invalid credentials!')
      }
    } catch (error) {
      toast.error('Login failed!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-gray-100">
      <div className="w-[500px] p-8 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        
        <div className="flex flex-col py-2">
          <label className="uppercase text-sm py-2" htmlFor="username">
            Username <span className="text-red-600">*</span>
          </label>
          <input
            className="border-2 rounded-lg p-3 flex border-gray-300 focus:outline-0 focus:border-blue-500"
            type="text"
            id="username"
            name="username"
            value={dataLogin.username}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="flex flex-col py-2">
          <label className="uppercase text-sm py-2" htmlFor="password">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            className="border-2 rounded-lg p-3 flex border-gray-300 focus:outline-0 focus:border-blue-500"
            type="password"
            id="password"
            name="password"
            value={dataLogin.password}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <button 
          onClick={handleLogin} 
          disabled={isLoading}
          className="w-full p-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg mt-4 font-semibold"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>Demo credentials:</p>
          <p>Username: admin | Password: admin123</p>
        </div>
      </div>
    </div>
  )
}

export default Login

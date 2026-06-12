import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div class='bg-cover bg-bottom bg-[url(https://images.unsplash.com/photo-1569261655993-3ae347322edd?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]  h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
        <img class = "w-16 ml-8" src="https://cdn.mos.cms.futurecdn.net/v2/t:0,l:0,cw:1706,ch:960,q:80,w:1706/5ij5qdSHFzJ2piPRuoTL5F.jpg" alt="Logo" />
        <div class='bg-white pb-7 px-10 py-5'>
          <h2 class = "text-3xl font-bold">Get Started With Uber</h2>
          <Link to = "/login" class = "flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
"use client"

import React from 'react'
import loadingAnimation  from "../../public/progress.json"
import Lottie from 'lottie-react'

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
    <Lottie 
      loop
      animationData={loadingAnimation}
      style={{ width: 200, height: 200 }}
    />
  </div>
  )
}

export default loading
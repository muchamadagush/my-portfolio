/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'

const insight = () => {
  return (
    <div id="home" className="w-full h-screen text-center">
      <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
        <div className="flex flex-col max-w-[500px]">
        <img src="/assets/no-data.png" alt="no-data" />
        <div>Data Not Found</div>
        </div>
      </div>
    </div>
  )
}

export default insight

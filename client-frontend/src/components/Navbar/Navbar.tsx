"use client"

import React from "react"
import { ModeToggle } from "./ModeToggle"

const Navbar = () => {
  return (
    <div className="relative z-20">
      <button
        onClick={() => {
          console.log("clicked")
        }}
      >
        <span>Home</span>
      </button>
      <ModeToggle />
    </div>
  )
}

export default Navbar

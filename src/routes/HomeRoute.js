import React from 'react'
import Hero from "../components/Hero";
import HeadlineCards from "../components/HeadlineCards";
import Food from "../components/Food";
import Category from "../components/Category"

function HomeRoute({search}) {
  return (
    <div>
          <Hero/>
          <HeadlineCards/>
          <Food search = {search}/>
          <Category/>
    </div>
  )
}

export default HomeRoute
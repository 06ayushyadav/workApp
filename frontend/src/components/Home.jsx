import React from 'react'
import Landing from '../components/landingpage/Landing'
import Cards from '../components/afterlanding/Cards'
import Comments from './afterlanding/comments/Comments'
import Frequently from '../components/afterlanding/Frequently'
import Footer from '../components/footer/Footer'
import PopupMessage from './PopMessage'


function Home() {
  

  return (
    <div className='w-full bg-blue-50'>
      <PopupMessage />
      <Landing />
      <Cards />
      <Comments />
      <Frequently />
      <Footer />


    </div>
  )
}

export default Home

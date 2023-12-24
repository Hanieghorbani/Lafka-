import React from 'react'
import Header from '../../../components/Main/Header/Header'
import EndOfHeader from '../../../components/Main/EndOfHeader/EndOfHeader'
import Section1 from '../../../components/Main/Section1/Section1'
import Section2 from '../../../components/Main/Section2/Section2'
import BestSelling from '../../../components/Main/BestSelling/BestSelling'
import CustomeBurger from '../../../components/Main/CustomeBurger/CustomeBurger'
export default function Index() {
  return (
    <div className=' overflow-hidden'>
      <Header />
      <EndOfHeader />
      <Section1 />
      <Section2 />
      <BestSelling />
      <CustomeBurger />
    </div>
  )
}

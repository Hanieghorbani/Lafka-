import React from 'react'
import Header from '../../../components/Main/Header/Header'
import EndOfHeader from '../../../components/Main/EndOfHeader/EndOfHeader'
import Section1 from '../../../components/Main/Section1/Section1'
import Section2 from '../../../components/Main/Section2/Section2'
export default function Index() {
  return (
    <div className=' overflow-hidden'>
      <Header />
      <EndOfHeader />
      <Section1 />
      <Section2 />
    </div>
  )
}

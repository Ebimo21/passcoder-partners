import React from 'react'
import { Hero } from './Hero/Hero'
import Navbar from './Navbar/Navbar'
import { Sectiontwo } from './section-two/Section-two'
import { Sectionone } from './section-one/Section-One'
import { SectionThree } from './section-three/SectionThree'
import { SectionFour } from './Section four/SectionFour'
import { SectionFive } from './section-five/Sectionfive'
import { Footer } from './Footer/Footer'

export const Index = () => {
  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div>
            <Hero />
        </div>
        <div>
            <Sectionone />
        </div>
        <div>
            <Sectiontwo />
        </div>

        <div>
            <SectionFour />
        </div>
        <div>
           <SectionThree />
        </div>
        <div>
            <Footer />
        </div>
            
    </div>
  )
}

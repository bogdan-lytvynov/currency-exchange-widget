'use strict';
const React = require('react')
const {useState, useEffect} = React
const EmblaCarouselReact = require('embla-carousel-react').default
const range_ = require('lodash/range')
const classnames = require('classnames')
require('./slider.css')

const EmblaCarouselComponent = ({loop, dataHook, children}) => {
  const [embla, setEmbla] = useState(null)
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0)

  useEffect(() => {
    if (embla) {
      embla.on('select', () => setSelectedSlideIndex(embla.selectedScrollSnap()))
    }
  }, [embla])

  const scrollTo = index => embla.scrollTo(index)

  return (
    <div className='slider' data-hook={dataHook}>
      <EmblaCarouselReact
        emblaRef={setEmbla}
        options={{ loop }}
        className='slider__embla-wrapper'
      >
        <div className='slider__container'>
          {children}
        </div>
      </EmblaCarouselReact>

      <div className='slider__breadcrubs'>{
        range_(0, 3).map(index => (
          <div key={index} onClick={()=>scrollTo(index)} className={
            classnames({
              'slider__breadcrub': true,
              'slider__breadcrub--selected': selectedSlideIndex === index
            })}></div>
        )
        ) 
      }
      </div>
    </div>
  )
}

module.exports = EmblaCarouselComponent

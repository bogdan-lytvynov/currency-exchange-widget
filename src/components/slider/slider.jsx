'use strict';
const React = require('react')
const {useState, useEffect} = React
const EmblaCarouselReact = require('embla-carousel-react').default
const range_ = require('lodash/range')
const noop_ = require('lodash/noop')
const classnames = require('classnames')
require('./slider.css')

const EmblaCarouselComponent = ({
  loop,
  dataHook,
  children,
  onChangeSlide=noop_,
  startIndex=0
}) => {
  const [embla, setEmbla] = useState(null)
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(startIndex)

  useEffect(() => {
    if (embla) {
      embla.on('select', () => {
        const selectedSlideIndex = embla.selectedScrollSnap()
        setSelectedSlideIndex(selectedSlideIndex)
        onChangeSlide(selectedSlideIndex)
      })
    }
  }, [embla])

  const scrollTo = index => embla.scrollTo(index)

  return (
    <div className='slider' data-hook={dataHook}>{
      children.length > 0 ? (
      <>
        <EmblaCarouselReact
        emblaRef={setEmbla}
        options={{ loop, startIndex }}
        className='slider__embla-wrapper'
          >
          <div className='slider__container'>
          {children}
          </div>
          </EmblaCarouselReact>

          <div className='slider__breadcrubs'>{
            range_(0, children.length).map(index => (
              <div key={index} onClick={()=>scrollTo(index)} className={
                classnames({
                  'slider__breadcrub': true,
                  'slider__breadcrub--selected': selectedSlideIndex === index
                })}></div>
            )
            ) 
          }
          </div>
        </>
      ) : null
    }
    </div>
  )
}

module.exports = EmblaCarouselComponent

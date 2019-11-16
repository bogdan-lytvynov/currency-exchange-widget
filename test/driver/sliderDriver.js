//const last_ = require('lodash/last')
const first_ = require('lodash/first')
const simulateEvent = require('./simulateEvent')

module.exports = sliderElement => {
  const getBreadcrubs = () => sliderElement.querySelectorAll('.slider__breadcrub')
  //const getSelectedBreadcrumb = () => sliderElement.querySelectorAll('.slider__breadcrub--selected')
  
  return {
    getCurrentSlideElement: () => sliderElement.querySelector('.slider__slide.is-selected'),
    selectNextSlide: () => {
      const selectedBreadcrumbElement = sliderElement.querySelector('.slider__breadcrub--selected')
      const nextBreadcrumbElement = selectedBreadcrumbElement.nextSibling || first_(getBreadcrubs())
      simulateEvent(nextBreadcrumbElement, 'click')
    }

  }
}

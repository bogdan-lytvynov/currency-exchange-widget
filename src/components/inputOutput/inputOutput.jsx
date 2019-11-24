require('./inputOutput.css')
const React = require('react')
const {useState, useRef, useEffect} = React

const pattern = /^\d+(\.\d{0,2})?$/
const correctValue = (value) => {
  if (pattern.test(value)) {
    return value
  }

  const parsedValue = parseFloat(value) 
  if (pattern.test(String(parsedValue))) {
    return String(parsedValue)
  }

  return parsedValue.toFixed(2)
}

module.exports = ({value, dataHook, onType, pattern}) => {
  const [isInput, setIsInput] = useState(false)
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isInput && value) {
      inputRef.current.value = value
    }
  })

  const onInput = (event) => {
    const value = event.target.value
    const correctedValue = correctValue(value)


    //console.log(value, correctedValue)
    if (value !== correctedValue) {
      inputRef.current.value = correctedValue
    }

    onType(Number(inputRef.current.value))
  }

  return <input 
          data-hook={dataHook}
          type="number" 
          className="input-output"
          ref={inputRef}
          onInput={onInput}
          onFocus={() => setIsInput(true)}
          onBlur={() => setIsInput(false)}
          />
}

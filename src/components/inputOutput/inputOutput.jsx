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

module.exports = ({value, dataHook, onType, autofocus}) => {
  const [isInput, setIsInput] = useState(false)
  const inputRef = useRef(null);

  useEffect(() => {
    if (autofocus) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (!isInput && value) {
      inputRef.current.value = value.toFixed(2)
    }
  })

  const onInput = (event) => {
    const value = event.target.value
    const correctedValue = correctValue(value)

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

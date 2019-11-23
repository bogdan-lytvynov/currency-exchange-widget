require('./inputOutput.css')
const React = require('react')
const {useState, useRef, useEffect} = React
const classnames = require('classnames')

module.exports = ({value, dataHook, onType}) => {
  const [isInput, setIsInput] = useState(false)
  const inputRef = useRef(null);
  const onKeyUp = (event) => onType(Number(event.target.value))

  useEffect(() => {
    if (!isInput && value) {
      inputRef.current.value = value
    }
  })

  return <input 
          data-hook={dataHook}
          type="number" 
          className="input-output"
          ref={inputRef}
          onFocus={() => setIsInput(true)}
          onBlur={() => setIsInput(false)}
          onKeyUp={onKeyUp}/>
}

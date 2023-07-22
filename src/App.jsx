import { useEffect, useState } from 'react';
import './App.scss';
const drumPads = [
  {
    keyCode: 81,
    text: "Q",
    src: "RP4_KICK_1.mp3"
  },
  {
    keyCode: 87,
    text: "W",
    src: "Kick_n_Hat.mp3"
  },
  {
    keyCode: 69,
    text: "E",
    src: "Dsc_Oh.mp3"
  },
  {
    keyCode: 65,
    text: "A",
    src: "Cev_H2.mp3"
  },
  {
    keyCode: 83,
    text: "S",
    src: "Heater-6.mp3"
  },
  {
    keyCode: 68,
    text: "D",
    src: "Heater-4_1.mp3"
  },
  {
    keyCode: 90,
    text: "Z",
    src: "Heater-3.mp3"
  },
  {
    keyCode: 88,
    text: "X",
    src: "Heater-2.mp3"
  },
  {
    keyCode: 67,
    text: "C",
    src: "Heater-1.mp3"
  }
];

function App() {
  const [rangeVal, setRangeVal] = useState(1)
  const [text, setText] = useState('hi-hat')

  function onKeyDown(e) {
    playSound(e.key.toUpperCase())
  }

  useEffect(()=> {
    document.addEventListener('keydown',onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  },[])

  function playSound(id) {
    const audio = document.querySelector(`#${id}`)
    audio.play()
  }
	return (
		<div className='container' id='drum-machine' >
			<div className='pad-container'>

      {drumPads.map(drumPad=> {
        return (
          <div key={drumPad.keyCode} onClick={e=>{
            playSound(drumPad.text)
            setText(drumPad.src)
          }} className='drum-pad' id={drumPad.text.toLowerCase()}>{drumPad.text}<audio className='clip' volume={rangeVal} src={drumPad.src} id={drumPad.text} /></div>
        )
      })}

			</div>
      <div className="controls-container">
        <div className='display' id='display'><span>{text.replace('.mp3', '')}</span></div>
        <div className='input-volume slidecontainer'>
          <input type="range" className="slider" max={1} min={0} step={.01} value={rangeVal} onChange={e=> setRangeVal(e.target.value)} />
          <p>volume: {rangeVal}</p>
        </div>
      </div>
		</div>
	);
}

export default App;

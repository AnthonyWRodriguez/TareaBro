import back from './back.svg';
import ok from './ok.svg'
import settings from './settings.svg'
import gota from './gota.png'
import './App.css';
import { useState, useEffect, useRef } from 'react';
import { useTimer } from 'use-timer';
import Countdown from 'react-countdown';

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [textColor, setTextColor] = useState('white')
  const [changeTextColor, setChangeTextColor] = useState('white')
  const [changeColor, setChangeColor] = useState('blue')
  const [color, setColor] = useState('blue')
  const [timeZone, setTimeZone] = useState('America/Tegucigalpa')
  const [changeTimeZone, setChangeTimeZone] = useState('America/Tegucigalpa')
  const [value, setValue] = useState(new Date());
  const [minutes, setMinutes] = useState(3600)
  const [dateForCountdown, setDateForCountdown] = useState(Date.now() + (3600 * 1000))
  const [showMessage, setShowMessage ] = useState(false)

  const clockRef = useRef();
  const handleStart = () => clockRef.current.start();

  const colors = [
    'red',
    'blue',
    'green',
    'black',
    'white'
  ]

  const { start, reset } = useTimer({
    initialTime: 60,
    endTime: 0,
    timerType: 'DECREMENTAL',
    onTimeOver: ()=>{
      setShowMessage(false)
      reset()
    },
  });

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const clickBack = () => {
    setChangeTimeZone(timeZone)
    setChangeColor(color)
    setChangeTextColor(textColor)
    setShowSettings(false)
  }

  const clickOk = () => {
    setTimeZone(changeTimeZone)
    setColor(changeColor)
    setTextColor(changeTextColor)
    setShowSettings(false)
    if(document.getElementById('minutes').value){
      const minutes2 = Number(document.getElementById('minutes').value) * 60
      setMinutes(minutes2)
      setDateForCountdown(Date.now() + (minutes2 * 1000))  
    }
    
  }

  const onCompleteCountdown = () => {
    setDateForCountdown(Date.now() + (minutes * 1000))
    handleStart()
    setShowMessage(true)
    start()
  }

  const getFromattedTime = (secondsTime) => {
    var date = new Date(0);
    date.setSeconds(secondsTime); // specify value for SECONDS here
    return date.toISOString().substring(11, 19);
  }

  return (
    <div className="App" style={{}}>
      <div style={{
        'backgroundColor': `${color !== changeColor ? changeColor : color}`, 
        'color': `${textColor !== changeTextColor ? changeTextColor : textColor}`, 
        'width': '100vw', 
        'height': '100vh', 
        'display': 'flex', 
        'flexDirection': 'column', 
        'alignItems': 'center'
      }}>
        {
          showSettings &&
          <>
            <div style={{'width': '98vw', 'backgroundColor': `${changeColor}`, 'color': `${textColor}`}}>
              <div style={{'display': 'flex', 'justifyContent': 'space-between', }}>
                <div>
                  <img width='50' src={back} alt='back' onClick={clickBack} />
                </div>
                <div>
                  <img width='50' src={ok} alt='ok' onClick={clickOk}/>
                </div>
              </div>
            </div>
            
            <div style={{'marginTop': '2vh'}}>Recordar cada:</div>
            <div style={{'display': 'flex'}}>
              <input id='minutes' width='200'/>
              <div>mins</div>
            </div>
            
            <div style={{'marginTop': '2vh'}}>Color Fondo:</div>
            <div style={{'width': '70vw', 'display': 'flex', 'justifyContent': 'space-around'}}>
            {
              colors.map(color => {
                return <div onClick={()=>setChangeColor(color)} style={{'border': '2px solid white'}}>
                  <div style={{'border': '2px solid black'}}>
                    <div style={{'width': '36px', 'height': '36px', 'backgroundColor': `${color}`}}></div>
                  </div>
                </div>
              })
            }
            </div>

            <div style={{'marginTop': '2vh'}}>Color Texto:</div>
            <div style={{'width': '70vw', 'display': 'flex', 'justifyContent': 'space-around'}}>
            {
              colors.map(color => {
                return <div onClick={()=>setChangeTextColor(color)} style={{'border': '2px solid white'}}>
                  <div style={{'border': '2px solid black'}}>
                    <div style={{'width': '36px', 'height': '36px', 'backgroundColor': `${color}`}}></div>
                  </div>
                </div>
              })
            }
            </div>
          </>
        }
        {
          !showSettings && 
          <>
            <div style={{'width': '98vw', 'display': 'flex', 'justifyContent': 'space-between'}}>
              <div></div>
              <div>
                <img width='50' src={settings} alt='settings' onClick={()=>setShowSettings(true)} />
              </div>
            </div>

            <div style={{'marginTop': '2vh'}}>Hora actual:</div>
            <div>{value.toLocaleTimeString()}</div>

            <div style={{'marginTop': '2vh'}}>Siguiente recordatorio en:</div>
            <Countdown ref={clockRef} date={dateForCountdown} autoStart={true} onComplete={onCompleteCountdown}/>

            {
              showMessage && <div style={{'marginTop': '2vh'}}>BEBE AGUA!</div>
            }

            <div style={{'backgroundColor': `${color}`}}>

            </div>
            <img style={{'marginTop': '2vh', 'backgroundColor': `${color}`}} src={gota} alt="gota" width='200' />
          </>
        }
        

      </div>
    </div>
  );
}

export default App;

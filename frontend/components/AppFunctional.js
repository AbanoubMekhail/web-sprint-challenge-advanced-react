import React, { useState }  from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
// const initialInfo = ''

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);
  // const [info, setInfo] = useState(initialInfo);

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const x = (currentIndex % 3) + 1;
    const y = Math.floor(currentIndex / 3) + 1;
    return { x, y };
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setCurrentIndex(initialIndex);
    setSteps(initialSteps);
    setEmail(initialEmail);
    setMessage(initialMessage);
    // setInfo(initialInfo);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    let nextIndex = currentIndex;

    switch (direction) {
      case 'left':
        if (currentIndex % 3 !== 0) {
          nextIndex = currentIndex - 1;
          setSteps(steps + 1);
        } else {
          setMessage(`You can't go left`)
        }
        break;
      case 'up':
        if (currentIndex >= 3) {
          nextIndex = currentIndex - 3;
          setSteps(steps + 1);
        }else {
          setMessage(`You can't go up`)
        }
        break;
      case 'right':
        if ((currentIndex + 1) % 3 !== 0) {
          nextIndex = currentIndex + 1;
          setSteps(steps + 1);
        }else {
          setMessage(`You can't go right`)
        }
        break;
      case 'down':
        if (currentIndex <= 5) {
          nextIndex = currentIndex + 3;
          setSteps(steps + 1);
        }else {
          setMessage(`You can't go down`)
        }
        break;
      default:
        break;
    }

    return nextIndex;
  }

  function move(direction) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const newIndex = getNextIndex(direction);
    setCurrentIndex(newIndex);
    console.log(newIndex);
    // setMessage(getXYMessage());
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value);
    console.log(evt.target.value);
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const { x, y } = getXY();
    const payload = { x, y, steps, email };

    if (email === '') {
      setMessage('Ouch: email is required');
    } else {
      
      setMessage('');
    }

    fetch('http://localhost:9000/api/result', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(res => res.json())
    .then(data => {
      setMessage(data.message);
      setEmail('');
    })
    .catch(error => {
      console.error('Error:', error);
      setMessage('An error occurred.');
      setEmail('');
    });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === currentIndex ? ' active' : ''}`}>
              {idx === currentIndex ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left"  onClick={() => move('left')}>LEFT</button>
        <button id="up"    onClick={() => move('up')}>UP</button>
        <button id="right" onClick={() => move('right')}>RIGHT</button>
        <button id="down"  onClick={() => move('down')}>DOWN</button>
        <button id="reset" onClick={() => reset()}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input 
        id="email" 
        type="email" 
        placeholder="type email"
        value={email}
        onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}

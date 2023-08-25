import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
// const initialInfo = ''

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  // info: initialInfo
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  state = initialState;

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const { index } = this.state;
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const { x, y } = this.getXY(this.index);
    return `Coordinates (${x}, ${y})`;
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState);
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const { index, message } = this.state;
    let nextIndex = index;

    switch (direction) {
      case 'left':
        if (index % 3 !== 0) {
          nextIndex = index - 1;
          // this.setState(prevState => ({ steps: prevState.steps + 1 }));
        } else {
          this.setState({...this.state, message: `You can't go left`})
        }
        break;
      case 'up':
        if (index >= 3) {
          nextIndex = index - 3;
          // this.setState({...this.state, steps: steps + 1 });
        } else {
          this.setState({...this.state, message: "You can't go up" });
        }
        break;
      case 'right':
        if ((index + 1) % 3 !== 0) {
          nextIndex = index + 1;
          // this.setState({...this.state, steps: steps + 1 });
        } else {
          this.setState({...this.state, message: "You can't go right" });
        }
        break;
      case 'down':
        if (index <= 5) {
          nextIndex = index + 3;
          // this.setState({...this.state, steps: steps + 1 });
        } else {
          this.setState({...this.state, message: "You can't go down"});
        }
        break;
      default:
        break;
    }

    return nextIndex;
    
  }

  move = (direction) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const newIndex = this.getNextIndex(direction);

    if (newIndex !== this.state.index) {
      
      const newSteps = this.state.steps + 1;
      console.log(newSteps);
    
      this.setState({...this.state,
        index: newIndex,
        // message: this.getXYMessage(),
        steps: newSteps,
      });
      }
  }
  

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({...this.state, email: evt.target.value });
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const { x, y } = this.getXY();
    const { steps, email } = this.state;
    const payload = { x, y, steps, email };

    fetch('http://localhost:9000/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ 
          message: data.message,
          email: '',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ message: 'An error occurred.' });
      });
  }

  render() {
    const { className } = this.props
    const { index, steps, email, message } = this.state;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
                {idx === index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left"   onClick={() => this.move('left') }>LEFT</button>
          <button id="up"     onClick={() => this.move('up') } >UP</button>
          <button id="right"  onClick={() => this.move('right') } >RIGHT</button>
          <button id="down"   onClick={() => this.move('down') }>DOWN</button>
          <button id="reset"  onClick={() => this.reset()} >reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input 
          id="email" 
          type="email" 
          placeholder="type email"
          value={email}
          onChange={this.onChange}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

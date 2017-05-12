# react-timeframe
React-Timeframe is a React Component for use with both React &amp;&amp; React Native.

## Installing
```
yarn add react-timeframe
```
OR
```
npm install react-timeframe --save
```

## Basic Usage

```
import Timeframe from 'react-timeframe';
```

```
<Timeframe
  endTime={"2017-05-12T08:00:00Z"}
  onRender={function() {
    return `${this.state.time.hours}:${this.state.time.minutes}:${this.state.time.seconds};
  }}
  />
```
Note: Ensure a standard function is used for onRender. ES6 arrow functions will bind the 'this' context to whereever it is used. More below on arrow functions...

## Advanced Usage

### Different Render value for completed timeframes.

```
<Timeframe
  onRender={function() {
    let val;
    
    if (this.state.complete) {
      val = 'Completed';
    } else {
      val = `${this.state.time.hours}:${this.state.time.minutes}:${this.state.time.seconds};
    }
  
    return val;
  }}
  />
```


### onUpdate
The onUpdate prop can be used to override the default function for handling a time update.

default: https://github.com/wildpixeldesign/react-timeframe/blob/master/index.js#L13

custom: 
```
<Timeframe
  onUpdate={function(time) {
    time.foo = 'bar';
    this.setState({ time })
  }}
  />
```

### Parent context / ES6 arrow functions.
A standard function used in the onUpdate and onComplete props, will have the 'this' context set to the instance of react-timeframe.

However...

If you would like to access the parent Component's context, or if u just want to use an arrow function for consistency, then the react-timeframe instance can be access via the 'self' argument.

```
<Timeframe
  onUpdate={ (time, self) => {
    this.foo = 'bar'; // this is current instance of whereever this Component is called from.
    self.setState({ time }); // self is current instance of Timeframe
  }}
  onRender={ (self) => {
    return `${self.state.time.hours}:${self.state.time.minutes}:${self.state.time.seconds};
  }}
  />
```

## Dependencies
- React
- moment
- react-mixin
- react-timer-mixin

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

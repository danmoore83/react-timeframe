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
  endsAt={"2017-05-12T08:00:00Z"}
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
  onRender={ (state, self) => {
    return `${self.state.time.hours}:${self.state.time.minutes}:${self.state.time.seconds};
  }}
  />
```

### Urgency state property
A threshold prop (in milliseconds) can be used that when crossed will set a state of urgent: true
This can be used to add a different classname, or ReactNative styles, or whatever else you feel like.
Default: 60000

```
<Timeframe
    urgency={30000}

    onRender={function() {
        if (this.state.urgent) { console.log('urgent') }
    }}
 />

```


### Human readable countdown
Example implementation for a human-readable countdown. e.g. 2 days, 1 hour, 42 mins

```
onRender={function() {
    const
        state = (this.state || {}),
        time = state.time,
        values = [];

    if (state.complete) {
        values.push('Game started');
    } else if (time) {
        if (time.days) values.push(`${time.days} ${time.days === 1 ? 'day' : 'days'}`);
        if (time.hours) values.push(`${time.hours} ${time.hours === 1 ? 'hour' : 'hours'}`);

        values.push(`${time.minutes} ${time.minutes === 1 ? 'minute' : 'minutes'}`);
        values.push(`${time.seconds} ${time.seconds === 1 ? 'second' : 'seconds'}`);
    }

    return (
        <Text>
            {values.join(', ')}
        </Text>
    );
}}
```

## Dependencies
- React
- moment
- react-mixin
- react-timer-mixin

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

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
  targetDate={1540349389582}
  />
```

```
<Timeframe
  targetDate={"2017-05-12T08:00:00Z"}
  />
```

## Props

| Prop               | Type          | Default | Required | Description  |
| ------------------ | ------------- | ------- | -------- | ------------ |
| targetDate         | String/Number | n/a     | True     | A date string ("2017-05-12T08:00:00Z") or timestamp (1540349389582) |
| stopAfterCountdown | Boolean       | false   | False    | Whether the timer will stop once the target date is reached
| urgency            | Number        | 60000   | False    | Number of seconds before target reached that the state is set to urgent |
| dateFormat         | String        | 'MMMM Do YYYY' | False | What format to display date in. from date-fns/format [Link](https://date-fns.org/v1.29.0/docs/format)
| distanceOptions    | Object        | { includeSeconds: true, addSuffix: true } | False |  Display options for distanceInWordsToNow function from date-fns [Link](https://date-fns.org/v1.29.0/docs/distanceInWordsToNow)
| onRender           | Function      | [onRender](https://github.com/danmoore83/react-timeframe/blob/master/index.js#L69)      | False    | If < 2 days ago : Returns string with distance between the given date and now in words. If > 2 days ago returns string formatted to the dateFormat prop.
| onUpdate           | Function      | [onRender](https://github.com/danmoore83/react-timeframe/blob/master/index.js#L70)      | False    |

## Advanced Usage

### Different Render value for completed timeframes.

```
<Timeframe
  onRender={function(state, props, self) {
    let val;

    if (state.complete) {
      val = 'Completed';
    } else {
      val = yourOwnCustomFunctionToHandleDisplayOfRemainingTime(state.timeRemaining)
    }

    return val;
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



## Dependencies
- React
- prop-types
- date-fns
- react-mixin
- react-timer-mixin

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

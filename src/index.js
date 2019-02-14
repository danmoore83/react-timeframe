import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

import getMilliseconds from 'date-fns/get_milliseconds';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';

function readableDate(time, options = {}, dateFormat) {

  const
    date = new Date((time || '')),
    diff = (((new Date()).getTime() - date.getTime()) / 1000),
    day_diff = Math.floor(diff / 86400);

  return day_diff < 2 ? distanceInWordsToNow(time, options) : format(time, dateFormat);
}


class Timeframe extends Component {
  clear() {
    this.clearInterval(this.timer);
  }

  timeRemaining() {
    return getMilliseconds(this.props.targetDate) - Date.now();
  }

  tick() {
    const { 
      onUpdate,
      urgency, 
      stopAfterCountdown 
    } = this.props;

    const remaining = this.timeRemaining();
    
    onUpdate(remaining, this);

    if (remaining <= urgency) {
      this.setState({ urgent: true });
    }

    if (stopAfterCountdown && remaining <= 0) {
      this.setState({ complete: true });
      return this.clear();
    }
  }

  componentDidMount() {
    this.tick();
    this.timer = this.setInterval(this.tick, this.props.interval);
  }

  render() { return this.props.onRender(this.state, this.props, this); }
}

Timeframe.defaultProps = {
  interval: 1000,
  stopAfterCountdown: false,
  urgency: 60000,
  dateFormat: 'MMMM Do YYYY',
  distanceOptions: {
    includeSeconds: true,
    addSuffix: true
  },
  onRender: (state, props /*, self*/) => readableDate(props.targetDate, props.distanceOptions, props.dateFormat),
  onUpdate: (timeRemaining, self) => self.setState({ timeRemaining })
};

Timeframe.propTypes = {
  interval: PropTypes.number.isRequired,
  targetDate: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  stopAfterCountdown: PropTypes.bool,
  urgency: PropTypes.number,
  dateFormat: PropTypes.string.isRequired,
  distanceOptions: PropTypes.object,
  onRender: PropTypes.func,
  onUpdate: PropTypes.func
};

reactMixin(Timeframe.prototype, TimerMixin);

export default Timeframe;

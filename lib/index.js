"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMixin = _interopRequireDefault(require("react-mixin"));

var _reactTimerMixin = _interopRequireDefault(require("react-timer-mixin"));

var _get_milliseconds = _interopRequireDefault(require("date-fns/get_milliseconds"));

var _distance_in_words_to_now = _interopRequireDefault(require("date-fns/distance_in_words_to_now"));

var _format = _interopRequireDefault(require("date-fns/format"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function readableDate(time, options, dateFormat) {
  if (options === void 0) {
    options = {};
  }

  var date = new Date(time || ''),
      diff = (new Date().getTime() - date.getTime()) / 1000,
      day_diff = Math.floor(diff / 86400);
  return day_diff < 2 ? (0, _distance_in_words_to_now["default"])(time, options) : (0, _format["default"])(time, dateFormat);
}

var Timeframe = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Timeframe, _Component);

  function Timeframe() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Timeframe.prototype;

  _proto.clear = function clear() {
    this.clearInterval(this.timer);
  };

  _proto.timeRemaining = function timeRemaining() {
    return (0, _get_milliseconds["default"])(this.props.targetDate) - Date.now();
  };

  _proto.tick = function tick() {
    var _this$props = this.props,
        onUpdate = _this$props.onUpdate,
        urgency = _this$props.urgency,
        stopAfterCountdown = _this$props.stopAfterCountdown;
    var remaining = this.timeRemaining();
    onUpdate(remaining, this);

    if (remaining <= urgency) {
      this.setState({
        urgent: true
      });
    }

    if (stopAfterCountdown && remaining <= 0) {
      this.setState({
        complete: true
      });
      return this.clear();
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    this.tick();
    this.timer = this.setInterval(this.tick, this.props.interval);
  };

  _proto.render = function render() {
    return this.props.onRender(this.state, this.props, this);
  };

  return Timeframe;
}(_react.Component);

Timeframe.defaultProps = {
  interval: 1000,
  stopAfterCountdown: false,
  urgency: 60000,
  dateFormat: 'MMMM Do YYYY',
  distanceOptions: {
    includeSeconds: true,
    addSuffix: true
  },
  onRender: function onRender(state, props
  /*, self*/
  ) {
    return readableDate(props.targetDate, props.distanceOptions, props.dateFormat);
  },
  onUpdate: function onUpdate(timeRemaining, self) {
    return self.setState({
      timeRemaining: timeRemaining
    });
  }
};
Timeframe.propTypes = {
  interval: _propTypes["default"].number.isRequired,
  targetDate: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].number.isRequired]),
  stopAfterCountdown: _propTypes["default"].bool,
  urgency: _propTypes["default"].number,
  dateFormat: _propTypes["default"].string.isRequired,
  distanceOptions: _propTypes["default"].object,
  onRender: _propTypes["default"].func,
  onUpdate: _propTypes["default"].func
};
(0, _reactMixin["default"])(Timeframe.prototype, _reactTimerMixin["default"]);
var _default = Timeframe;
exports["default"] = _default;
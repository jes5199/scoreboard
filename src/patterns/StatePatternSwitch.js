class StatePatternSwitch {
  constructor(scoreboard, patterns) {
    this.scoreboard = scoreboard;
    this.patterns = patterns;
  }

  render(time) {
    return this.patterns[this.scoreboard.state].render(time);
  }
}

export default StatePatternSwitch;

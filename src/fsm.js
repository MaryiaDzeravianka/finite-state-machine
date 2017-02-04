class FSM {
  /**
   * Creates new FSM instance.
   * @param config
   */
  constructor(config) {

    if (config == null) {
      throw new Error("Config is empty");
    }
    this.config = config;
    this.activeState = config.initial;
    this.statuses = ["normal", "busy", "hungry", "sleeping"];
    this.events = ["study", "get_tired", "get_hungry", "eat", "get_up"];
    this.history1 = [];
    this.history2 = [];

  }

  /**
   * Returns active state.
   * @returns {String}
   */
  getState() {
    return this.activeState;
  }

  /**
   * Goes to specified state.
   * @param state
   */
  changeState(state) {


    if (!this.statuses.includes(state)) {
      throw new Error("yryjinug")
    }
    this.history1.push(this.activeState);
    this.activeState = state;
    this.history2 = [];


  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {
    var tr = this.config.states[this.activeState].transitions;
    if (tr[event] == undefined) {
      throw new Error("yryjinug")
    }
    this.history1.push(this.activeState);
    this.activeState = this.config.states[this.activeState].transitions[event];
    this.history2 = [];


  }

  /**
   * Resets FSM state to initial.
   */
  reset() {
    this.activeState = this.config.initial;
  }

  /**
   * Returns an array of states for which there are specified event transition rules.
   * Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {
    if (event == undefined) {
      return this.statuses;
    } else {
      if (!this.events.includes(event)) {
        return [];
      }
      var result = [];
      for (var i = 0; i < this.statuses.length; i++) {
        var item = this.statuses[i];
        if (this.config.states[item].transitions[event] != undefined) {
          result.push(item);
        }

      }
      return result;

    }

  }

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {
    if (this.history1.length != 0) {
      this.history2.push(this.activeState);
      this.activeState = this.history1.pop();

      return true;
    }
    return false;


  }

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {
    if (this.history2.length != 0) {

      this.activeState = this.history2.pop();
      return true;
    }
    return false;

  }

  /**
   * Clears transition history
   */
  clearHistory() {
    this.history1 = [];
    this.history2 = [];

  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
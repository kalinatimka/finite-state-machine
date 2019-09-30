class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new UserException("Input config!");
        }
        this.config = config;
        this.state = this.config.initial; 
        this.history = [];
        this.redoHistory = [];
    }
  
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }
  
    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states.hasOwnProperty(state)) {
            this.redoHistory = [];
            this.history.push(this.state);
            this.state = state;
        }
        else {
            throw new UserException("Incorrect state!");
        }
    }
  
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config.states[this.state].transitions.hasOwnProperty(event)) {
            this.redoHistory = [];
            this.history.push(this.state);
            this.state = this.config.states[this.state].transitions[event];
        }
        else {
            throw new UserException("Incorrect event!");
        }
    }
  
    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial; 
    }
  
    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var propArray = [];
        if (event == null) {
            for (var prop in this.config.states) {
                propArray.push(prop);
            }
            return propArray;
        }
        else {
            for (var prop in this.config.states) {
                if (this.config.states[prop].transitions.hasOwnProperty(event)) {
                    propArray.push(prop);
                }
            }
            if (!propArray.length) {
                return [];
            }
            return propArray;
        }
    }
  
    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (!this.history.length) {
            return false;
        }
        else {
            this.redoHistory.push(this.state);
            this.state = this.history.pop();
            return true;
        }
    }
  
    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (!this.redoHistory.length) {
            return false;
        }
        else {
            this.history.push(this.state);
            this.state = this.redoHistory.pop();
            return true;
        }
    }
  
    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
    }
  }

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

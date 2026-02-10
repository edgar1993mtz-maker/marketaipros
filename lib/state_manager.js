/**
 * State Manager
 * Manages application state
 */

class StateManager {
  constructor() {
    this.state = {};
    this.listeners = [];
  }

  /**
   * Set state value
   */
  setState(key, value) {
    this.state[key] = value;
    this.notifyListeners();
  }

  /**
   * Get state value
   */
  getState(key) {
    return this.state[key];
  }

  /**
   * Update nested state
   */
  updateNestedState(path, value) {
    // TODO: Set value at path (e.g., 'user.profile.name')
    const keys = path.split('.');
    let current = this.state;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    this.notifyListeners();
  }

  /**
   * Subscribe to state changes
   */
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  /**
   * Notify listeners of changes
   */
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  /**
   * Reset state
   */
  reset() {
    this.state = {};
    this.notifyListeners();
  }
}

module.exports = StateManager;

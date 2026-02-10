/**
 * Event Bus
 * Centralized event management
 */

class EventBus {
  constructor() {
    this.events = new Map();
  }

  /**
   * Subscribe to event
   */
  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.events.get(eventName);
      callbacks.splice(callbacks.indexOf(callback), 1);
    };
  }

  /**
   * Subscribe once
   */
  once(eventName, callback) {
    const unsubscribe = this.on(eventName, (...args) => {
      callback(...args);
      unsubscribe();
    });
  }

  /**
   * Emit event
   */
  emit(eventName, data) {
    if (!this.events.has(eventName)) return;
    this.events.get(eventName).forEach(callback => callback(data));
  }

  /**
   * Remove event listener
   */
  off(eventName, callback) {
    if (!this.events.has(eventName)) return;
    const callbacks = this.events.get(eventName);
    callbacks.splice(callbacks.indexOf(callback), 1);
  }

  /**
   * Clear all events
   */
  clear() {
    this.events.clear();
  }
}

module.exports = EventBus;

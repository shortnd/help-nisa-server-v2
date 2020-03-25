export const autoCatch = (handlers) => {
  if (typeof handlers === 'function') return auto(handlers)

  return Object.keys(handlers).reduce((autoHandlers, key) => {
    autoHandlers[key] = auto(handlers[key])
    return autoHandlers
  }, {})
}

const auto = (handlers) => (req, res, next) => Promise.resolve(handlers(req, res, next)).catch(next);

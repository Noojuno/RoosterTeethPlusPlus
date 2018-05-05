const findReactComponent = el => {
  for (const key in el) {
    if (key.startsWith("__reactInternalInstance$")) {
      const fiberNode = el[key];

      return fiberNode && fiberNode.return && fiberNode.return.stateNode;
    }
  }
  return null;
};

export default findReactComponent;

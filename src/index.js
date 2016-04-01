import {EOL} from 'os'

const triageProperties = (constr) => {
  const props = Object.getOwnPropertyNames(constr.prototype)
    .filter((name) => (name !== 'constructor'))
  const getters = []
  const getterSetters = []
  const functions = []
  for (const prop of props) {
    const descr = Object.getOwnPropertyDescriptor(constr.prototype, prop)
    const collection = (typeof descr.value === 'function') ? functions
      : (typeof descr.set === 'function') ? getterSetters
      : (typeof descr.get === 'function') ? getters
      : null
    if (collection == null) {
      throw new Error(`Invalid property: ${constr.name}#${prop}`)
    }
    collection.push(prop)
  }
  return {getters, getterSetters, functions}
}

const createGetterSetterTests = (getterSetters) => {
  return getterSetters.map((prop) =>
`  describe('#${prop}', () => {
    it('sets ${prop}', () => {
      // TODO Autogenerated test stub
      const inst = createInstance()
      const value = 'dummy'
      inst.${prop} = value
      expect(inst.${prop}).to.equal(value)
    })
  })`).join(EOL + EOL)
}

const createGetterTests = (getters) => {
  return getters.map((prop) =>
`  describe('#${prop}', () => {
    it('gets ${prop}', () => {
      // TODO Autogenerated test stub
    })
  })`).join(EOL + EOL)
}

const createFunctionTests = (functions) => {
  return functions.map((func) =>
`  describe('#${func}', () => {
    it('works', () => {
      // TODO Autogenerated test stub
    })
  })`).join(EOL + EOL)
}

const createImport = (className, path, type) => {
  const importExpr = (type === 'named') ? `{${className}}` : className
  return `import ${importExpr} from '${path}'`
}

const assembleTests = ({className, importPath, importType}, ...bodies) => {
  bodies = bodies.filter((b) => !!b)
  if (bodies.length === 0) {
    bodies.unshift(`  // TODO Implement ${className} tests`)
  }
  bodies.unshift(`  const createInstance = () => {
    const inst = new ${className}()
    // TODO Initialize instance
    return inst
  }`)
  const imports = (importPath != null)
    ? createImport(className, importPath, importType)
    : '// TODO Import ${className}'
  const body = bodies.join(EOL + EOL)
  return `${imports}

describe('${className}', () => {
${body}
})${EOL}`
}

export default (constructor, options = null) => {
  options = Object.assign({
    className: constructor.name,
    importPath: null,
    importType: 'default'
  }, options)
  const {getters, getterSetters, functions} = triageProperties(constructor)
  const getterTests = createGetterTests(getters)
  const getterSetterTests = createGetterSetterTests(getterSetters)
  const functionTests = createFunctionTests(functions)
  return assembleTests(options, getterTests, getterSetterTests, functionTests)
}
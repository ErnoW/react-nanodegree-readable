declare module 'redux-thunk' {
  declare module.exports: any
}

declare module 'history/createBrowserHistory' {
  declare module.exports: any
}

declare module 'react-router-redux' {
  declare module.exports: any
}

declare module 'formik' {
  declare module.exports: any
}

declare module 'yup' {
  declare module.exports: any
}

declare module 'normalizr' {
  declare module.exports: any
}

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void,
  },
}

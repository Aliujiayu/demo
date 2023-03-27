import { Component, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import configStore from './store'
const store = configStore();

import "./app.scss"

class App extends Component<PropsWithChildren> {
  render() {
    // this.props.children 是将要会渲染的页面
    return (
      <Provider store={store} >
        {this.props.children}
      </Provider>
    )
  }
}

export default App

// import { Component, PropsWithChildren } from 'react'
// import './app.scss'

// class App extends Component<PropsWithChildren> {
//   render () {
//     // this.props.children 是将要会渲染的页面
//     return this.props.children
//   }
// }

// export default App

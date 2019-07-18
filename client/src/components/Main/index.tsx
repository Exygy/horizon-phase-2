import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

type Props = {
    stepId: string
}

class Main extends React.Component<Props, {}> {
  render() {
    const { stepId, children } = this.props
    let backgroundClass = ''

    if (parseInt(stepId) === 100) {
        backgroundClass = 'housing-special-bg'
    }

    else if (parseInt(stepId) === 102) {
        backgroundClass = 'housing-choose-strategy-bg'
    }

    else {
        backgroundClass = 'default-bg'
    }

    return (
        <div className={"main " + backgroundClass}>
            {children}
        </div>
    )
  }
}

export default Main

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

    if ([100, 101, 106, 400, 401, 402, 10003, 10004, 10005].includes(parseInt(stepId))) {
      backgroundClass = 'housing-special-bg'
    } else if ([200, 201, 202, 207, 800, 801, 802, 803, 804, 10002].includes(parseInt(stepId))) {
      backgroundClass = 'beachside-bg'
    } else if ([300, 301, 302].includes(parseInt(stepId))) {
      backgroundClass = 'sm-bg'
    } else if ([102, 103, 104, 105, 203, 204, 205, 307, 308, 309, 310].includes(parseInt(stepId))) {
      backgroundClass = 'yellow-bg'
    } else if ([403, 404, 405, 507, 508, 509, 510, 511].includes(parseInt(stepId))) {
      backgroundClass = 'blue-bg'
    } else if ([500, 501, 502, 900, 901, 904].includes(parseInt(stepId))) {
      backgroundClass = 'train-bg'
    } else if (
      [905, 906, 907, 908, 1005, 1006, 1007, 1008, 1105, 1106, 1107, 1108, 1109].includes(
        parseInt(stepId)
      )
    ) {
      backgroundClass = 'red-bg'
    } else if ([1100, 1101, 1104, 10001].includes(parseInt(stepId))) {
      backgroundClass = 'sidewalk-bg'
    } else if ([607, 608, 609, 703, 704, 705, 805, 806, 807, 808, 809].includes(parseInt(stepId))) {
      backgroundClass = 'green-bg'
    } else if ([1000, 1001, 1002, 1003, 1004].includes(parseInt(stepId))) {
      backgroundClass = 'college-bg'
    } else if ([700, 701, 702, 10000, 20000].includes(parseInt(stepId))) {
      backgroundClass = 'park-bg'
    } else if ([600, 601, 602].includes(parseInt(stepId))) {
      backgroundClass = 'sm-2-bg'
    } else if ([10006].includes(parseInt(stepId))) {
      backgroundClass = 'white-bg'
    } else {
      backgroundClass = 'default-bg'
    }

    return <div className={'main ' + backgroundClass}>{children}</div>
  }
}

export default Main

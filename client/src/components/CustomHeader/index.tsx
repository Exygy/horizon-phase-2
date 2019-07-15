import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { MOB, translate, HOUSING_C1OF3, HOUSING } from 'src/Translate'
import {
  Icon
} from 'semantic-ui-react'
import { RouteComponentProps, withRouter } from "react-router";


type Props = {
    stepId: string
    lang: string
}

class CustomHeader extends React.Component<Props & RouteComponentProps<{}>, {}> {
    goBack = () => {
        this.props.history.goBack();

    }

  render() {
    const { stepId, lang }  = this.props
    let title = null
    let desc = null
    let customStyleClass = ''
    let backBtn = true

    if (parseInt(stepId) >= 10000 && parseInt(stepId) < 20000) {
        title = translate(lang, MOB)
        backBtn = false
    }

    if (parseInt(stepId) >= 100 && parseInt(stepId) < 200) {
        title = translate(lang, HOUSING)
        customStyleClass = 'extended'
        desc = translate(lang, HOUSING_C1OF3)
    }

    return (
        <div className={customStyleClass} id="custom-header">
            {backBtn && 
                <a className="back-btn" href="#" onClick={this.goBack}>
                <Icon name='arrow left'/>Back</a>
            }
            <p>
            <h3>{title}</h3>
            {desc}
            </p>
        </div>
    )
  }
}

export default withRouter(CustomHeader)

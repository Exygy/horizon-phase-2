import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import {
  MOB,
  translate,
  HOUSING_C1OF3,
  HOUSING_C2OF3,
  HOUSING_C3OF3,
  HOUSING,
  ECONOMY_C1OF2,
  ECONOMY_C2OF2,
  ECONOMY,
  ENVIRONMENT_C1OF3,
  ENVIRONMENT_C2OF3,
  ENVIRONMENT_C3OF3,
  ENVIRONMENT,
  TRANSPORATION_C1OF3,
  TRANSPORATION_C2OF3,
  TRANSPORATION_C3OF3,
  TRANSPORATION,
} from 'src/Translate'
import { Icon } from 'semantic-ui-react'
import { RouteComponentProps, withRouter } from 'react-router'

type Props = {
  stepId: string
  lang: string
  desc?: string
}

class CustomHeader extends React.Component<Props & RouteComponentProps<{}>, {}> {
  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { stepId, lang } = this.props
    let title = null
    let desc = null
    let customStyleClass = ''
    let backBtn = true

    if (parseInt(stepId) >= 10000 && parseInt(stepId) < 30000) {
      title = translate(lang, MOB)
      backBtn = false
    }

    if (parseInt(stepId) >= 100 && parseInt(stepId) < 200) {
      title = translate(lang, HOUSING)
      customStyleClass = 'extended'
      desc = translate(lang, HOUSING_C1OF3)
    } else if (parseInt(stepId) >= 200 && parseInt(stepId) < 300) {
      title = translate(lang, HOUSING)
      customStyleClass = 'extended'
      desc = translate(lang, HOUSING_C3OF3)
    } else if (parseInt(stepId) >= 300 && parseInt(stepId) < 400) {
      title = translate(lang, HOUSING)
      customStyleClass = 'extended'
      desc = translate(lang, HOUSING_C2OF3)

      if (parseInt(stepId) === 310) {
        desc = this.props.desc
      }
    } else if (parseInt(stepId) >= 400 && parseInt(stepId) < 500) {
      title = translate(lang, ECONOMY)
      customStyleClass = 'extended'
      desc = translate(lang, ECONOMY_C2OF2)
    } else if (parseInt(stepId) >= 500 && parseInt(stepId) < 600) {
      title = translate(lang, ECONOMY)
      customStyleClass = 'extended'
      desc = translate(lang, ECONOMY_C1OF2)
    } else if (parseInt(stepId) >= 600 && parseInt(stepId) < 700) {
      title = translate(lang, ENVIRONMENT)
      customStyleClass = 'extended'
      desc = translate(lang, ENVIRONMENT_C3OF3)
    } else if (parseInt(stepId) >= 700 && parseInt(stepId) < 800) {
      title = translate(lang, ENVIRONMENT)
      customStyleClass = 'extended'
      desc = translate(lang, ENVIRONMENT_C1OF3)
    } else if (parseInt(stepId) >= 800 && parseInt(stepId) < 900) {
      title = translate(lang, ENVIRONMENT)
      customStyleClass = 'extended'
      desc = translate(lang, ENVIRONMENT_C2OF3)
    } else if (parseInt(stepId) >= 900 && parseInt(stepId) < 1000) {
      title = translate(lang, TRANSPORATION)
      customStyleClass = 'extended'
      desc = translate(lang, TRANSPORATION_C3OF3)
    } else if (parseInt(stepId) >= 1000 && parseInt(stepId) < 1100) {
      title = translate(lang, TRANSPORATION)
      customStyleClass = 'extended'
      desc = translate(lang, TRANSPORATION_C1OF3)
    } else if (parseInt(stepId) >= 1100 && parseInt(stepId) < 1200) {
      title = translate(lang, TRANSPORATION)
      customStyleClass = 'extended'
      desc = translate(lang, TRANSPORATION_C2OF3)
    }

    return (
      <div className={customStyleClass} id="custom-header">
        {backBtn && (
          <a className="back-btn" href="#" onClick={this.goBack}>
            <Icon name="arrow left" />
            Back
          </a>
        )}
        <p>
          <h3 className="title-h3">{title}</h3>
          {desc}
        </p>
      </div>
    )
  }
}

export default withRouter(CustomHeader)

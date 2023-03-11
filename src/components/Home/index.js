import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Card from '../Cart'

import './index.css'

const displayStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: props.categoriesList[0].id,
      categoryList: props.categoriesList,
      projectList: [],
      status: displayStatus.loading,
    }
  }

  componentDidMount() {
    this.getHomePageData()
  }

  retry = () => {
    this.getHomePageData()
  }

  responseFailure = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="heading-failure">Oops! Something Went Wrong</h1>
      <p className="discription">
        We cannot seem to find the page you are looking for
      </p>
      <button className="btn" type="button" onClick={this.retry}>
        Retry
      </button>
    </>
  )

  responseSuccess = () => {
    const {projectList} = this.state
    return (
      <ul className="un-order-list">
        {projectList.map(echValue => (
          <Card cardList={echValue} key={echValue.id} />
        ))}
      </ul>
    )
  }

  getHomePageData = async () => {
    const {category} = this.state
    console.log(category)
    this.setState({status: displayStatus.loading})
    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${category}`,
    )

    if (response.ok === true) {
      const data = await response.json()
      const upadateData = data.projects.map(echValue => ({
        id: echValue.id,
        name: echValue.name,
        imageUrl: echValue.image_url,
      }))

      this.setState({projectList: upadateData, status: displayStatus.success})
    } else {
      this.setState({status: displayStatus.failure})
    }
  }

  changeSelectValue = event => {
    this.setState({category: event.target.value}, this.getHomePageData)
  }

  loader = () => (
    <div className="loader-container loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#328af2" height="50" width="50" />
    </div>
  )

  displayCurrentStage = () => {
    const {status} = this.state
    switch (status) {
      case displayStatus.success:
        return this.responseSuccess()
      case displayStatus.failure:
        return this.responseFailure()
      case displayStatus.loading:
        return this.loader()
      default:
        return null
    }
  }

  render() {
    const {categoryList, category} = this.state

    return (
      <div className="bg-color">
        <div className="nav-bar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            className="logo"
            alt="website logo"
          />
        </div>
        <select
          className="select"
          onChange={this.changeSelectValue}
          value={category}
        >
          {categoryList.map(echValue => (
            <option key={echValue.id} value={echValue.id}>
              {echValue.displayText}
            </option>
          ))}
        </select>
        {this.displayCurrentStage()}
      </div>
    )
  }
}

export default Home

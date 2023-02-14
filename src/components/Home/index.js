import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProjectItem from '../ProjectItem'
import SelectOptionItem from '../SelectOptionItem'
import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class Home extends Component {
  state = {
    activeId: categoriesList[0].id,
    apiStatus: apiStatusConstraints.initial,
    projectsList: [],
  }

  componentDidMount() {
    this.getProjectsList()
  }

  getProjectsList = async () => {
    this.setState({apiStatus: apiStatusConstraints.inProgress})
    const {activeId} = this.state
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${activeId}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.projects.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))
      this.setState({
        projectsList: updatedData,
        apiStatus: apiStatusConstraints.success,
      })
    }
    if (response.ok !== true) {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  renderSuccessView = () => {
    const {projectsList} = this.state
    return (
      <>
        <ul className="projects-list">
          {projectsList.map(eachItem => (
            <ProjectItem key={eachItem.id} projectDetails={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  onRetry = () => {
    this.getProjectsList()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="failure">
        We cannot seem to find the page you are looking for
      </p>
      <button className="button" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00bfff" height={50} width={50} />
    </div>
  )

  renderCheckConditions = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstraints.success:
        return this.renderSuccessView()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      case apiStatusConstraints.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  updateActiveId = activeId => {
    this.setState({activeId}, this.getProjectsList)
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="responsive-container">
        <SelectOptionItem
          activeId={activeId}
          categoriesList={categoriesList}
          updateActiveId={this.updateActiveId}
        />
        {this.renderCheckConditions()}
      </div>
    )
  }
}

export default Home

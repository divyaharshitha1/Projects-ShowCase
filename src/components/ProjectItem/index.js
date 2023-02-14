import './index.css'

const ProjectItem = props => {
  const {projectDetails} = props
  const {name, imageUrl} = projectDetails
  return (
    <li className="list-item">
      <img src={imageUrl} className="image" alt={name} />
      <p className="project-name">{name}</p>
    </li>
  )
}

export default ProjectItem

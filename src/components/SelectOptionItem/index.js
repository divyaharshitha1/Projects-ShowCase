import './index.css'

const SelectOptionItem = props => {
  const {categoriesList, activeId, updateActiveId} = props
  const onChangeSortBy = event => {
    updateActiveId(event.target.value)
  }
  return (
    <>
      <select
        className="select-container"
        value={activeId}
        onChange={onChangeSortBy}
      >
        {categoriesList.map(eachItem => (
          <option className="option-item" value={eachItem.id} key={eachItem.id}>
            {eachItem.displayText}
          </option>
        ))}
      </select>
    </>
  )
}

export default SelectOptionItem

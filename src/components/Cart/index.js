import './index.css'

const Card = props => {
  const {cardList} = props
  const {name, imageUrl} = cardList
  return (
    <li className="list">
      <img src={imageUrl} className="image" alt={name} />
      <p className="name">{name}</p>
    </li>
  )
}

export default Card

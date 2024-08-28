import './styles.css'

interface ComponentProps {
  name: string
  description: string
  lastModified: string
  urlImage: string
}
export default ({ description, lastModified, name, urlImage }: ComponentProps) => {
  return <div className="card-detail">
    <div className="card-detail-text">
      <div className="portada" style={{ 'backgroundImage': `url(${urlImage})` }}>

      </div>
      <div className="title-total">
        <div className="title">Last modified: {lastModified}</div>
        <h2>{name}</h2>

        <div className="desc">{description}</div>
        <div className="actions-detail">
          <button><i className="bi bi-heart"></i></button>
        </div>
      </div>

    </div>



  </div>
}
import { Link } from "react-router-dom";

const Card = ({
  card: { _id, bizImage, bizName, bizAddress, bizPhone, bizDescription },
  onDelete,
}) => {
  return (
    <div className="col-md-6 col-lg-4 mt-3">
      <div className="card">
        <img src={bizImage} alt={bizName} className="p-2" width="100%" />
        <div className="card-body">
          <h5 className="card-title">{bizName}</h5>
          <div className="card-text">{bizDescription}</div>
          <div className="card-text border-top pt-3 mt-4">
            <a target="_blank" href={"tel:" + bizPhone} rel="noreferrer">
              <i className="bi bi-telephone-fill me-2"></i>
              {bizPhone}
            </a>
          </div>
          <div className="card-text border-top pt-3">
            <a
              target="_blank"
              rel="noreferrer"
              href={
                "https://www.google.com/maps/search/?api=1&query=" + bizAddress
              }
            >
              <i className="bi bi-geo-alt-fill me-2"></i>
              {bizAddress}
            </a>
          </div>
          <Link to={`/my-cards/edit/${_id}`}>
            <i className="bi bi-pencil-fill me-2"></i>Edit
          </Link>
          <button
            className="btn btn-danger gap-4 d-md-flex justify-content-md-end"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

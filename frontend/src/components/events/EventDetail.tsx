import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  return (
    <article className={event.image ? "detay-karti" : "detay-karti afissiz"}>
      {event.image && (
        <figure>
          <img src={event.image} alt={`${event.title} etkinlik afişi`} />
          <figcaption>Şekil: {event.title} afişi</figcaption>
        </figure>
      )}
      <div className="kunye">
        <h2>Etkinlik Künyesi</h2>
        <dl>
          <dt>Tarih</dt>
          <dd>
            <time dateTime={`${event.date}T${event.time}`}>
              {formatDate(event.date)}, {event.time}
            </time>
          </dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </div>
      <div className="aciklama">
        <h2>Açıklama</h2>
        <p>{event.description}</p>
      </div>
      <div className="eylemler">
        <Link to="/events">← Listeye dön</Link>
        <Link to={`/admin/${event.id}/edit`}>Bu etkinliği güncelle</Link>
      </div>
    </article>
  );
}

export default EventDetail;

import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <h2 className="bolum-baslik">Sayfa bulunamadı</h2>
      <p>Aradığınız sayfa ya da etkinlik yok.</p>
      <div className="eylemler">
        <Link to="/">Ana sayfaya dön</Link>
      </div>
    </>
  );
}

export default NotFoundPage;

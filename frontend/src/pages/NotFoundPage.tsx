import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <p>Aradığınız sayfa ya da etkinlik yok.</p>
      <div className="eylemler">
        <Link to="/">Ana sayfaya dön</Link>
      </div>
    </>
  );
}

export default NotFoundPage;

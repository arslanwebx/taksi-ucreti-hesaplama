import Link from 'next/link';
export default function NotFound(){return <div className="container content-shell"><article className="article-content"><header className="page-header"><h1>Sayfa bulunamadı</h1><p className="lead">Aradığınız adres taşınmış veya henüz yayımlanmamış olabilir.</p></header><p><Link className="button" href="/">Ana sayfaya dön</Link></p></article></div>}

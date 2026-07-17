'use client';

export function LoadCalculatorDistanceButton({ distanceKm }: { distanceKm: number }) {
  return (
    <button
      className="table-load-button"
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent('taxi-distance-load', { detail: { distanceKm } }));
        document.getElementById('hesaplama')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      Hesaba yükle
    </button>
  );
}

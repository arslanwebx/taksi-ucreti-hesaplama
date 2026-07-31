import type { ReactNode } from 'react';
import { CalculatorBannerAd } from './CalculatorBannerAd';

export function CalculatorWithAds({ children }: { children: ReactNode }) {
  return <div className="calculator-ad-group"><CalculatorBannerAd/>{children}<CalculatorBannerAd lazy/></div>;
}

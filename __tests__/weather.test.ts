import {
  celsiusToFahrenheit,
  formatTemperature,
  getWmoWeatherInfo,
  DEFAULT_CITIES,
} from '../src/services/weather';

describe('Weather Service & Utilities', () => {
  describe('celsiusToFahrenheit', () => {
    it('correctly converts 0°C to 32°F', () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
    });

    it('correctly converts 25°C to 77°F', () => {
      expect(celsiusToFahrenheit(25)).toBe(77);
    });

    it('correctly converts 100°C to 212°F', () => {
      expect(celsiusToFahrenheit(100)).toBe(212);
    });

    it('correctly converts negative temperature -10°C to 14°F', () => {
      expect(celsiusToFahrenheit(-10)).toBe(14);
    });
  });

  describe('formatTemperature', () => {
    it('formats Celsius correctly with degree symbol', () => {
      expect(formatTemperature(28.4, 'celsius')).toBe('28°');
      expect(formatTemperature(28.6, 'celsius')).toBe('29°');
    });

    it('formats Fahrenheit correctly with degree symbol', () => {
      expect(formatTemperature(25, 'fahrenheit')).toBe('77°');
      expect(formatTemperature(0, 'fahrenheit')).toBe('32°');
    });

    it('defaults to Celsius if unit not provided', () => {
      expect(formatTemperature(30)).toBe('30°');
    });
  });

  describe('getWmoWeatherInfo', () => {
    it('identifies code 0 as clear day', () => {
      const info = getWmoWeatherInfo(0, true);
      expect(info.category).toBe('clear');
      expect(info.labelVi).toBe('Trời quang đãng');
      expect(info.labelEn).toBe('Clear Sky');
    });

    it('identifies code 0 as clear night when isDay is false', () => {
      const info = getWmoWeatherInfo(0, false);
      expect(info.category).toBe('clear');
      expect(info.labelVi).toBe('Trời quang về đêm');
      expect(info.labelEn).toBe('Clear Night');
    });

    it('identifies code 3 as overcast', () => {
      const info = getWmoWeatherInfo(3);
      expect(info.category).toBe('cloudy');
      expect(info.labelVi).toBe('Nhiều mây u ám');
    });

    it('identifies code 45 as fog', () => {
      const info = getWmoWeatherInfo(45);
      expect(info.category).toBe('fog');
    });

    it('identifies code 63 as moderate rain', () => {
      const info = getWmoWeatherInfo(63);
      expect(info.category).toBe('rain');
      expect(info.labelVi).toBe('Mưa rào vừa');
    });

    it('identifies code 95 as thunderstorm', () => {
      const info = getWmoWeatherInfo(95);
      expect(info.category).toBe('thunderstorm');
      expect(info.labelVi).toBe('Dông bão có sấm sét');
    });
  });

  describe('DEFAULT_CITIES', () => {
    it('contains major Vietnamese cities with valid coordinates', () => {
      const hanoi = DEFAULT_CITIES.find((c) => c.name === 'Hà Nội');
      expect(hanoi).toBeDefined();
      expect(hanoi?.latitude).toBeCloseTo(21.0285, 2);
      expect(hanoi?.longitude).toBeCloseTo(105.8542, 2);

      const hcm = DEFAULT_CITIES.find((c) => c.name === 'TP. Hồ Chí Minh');
      expect(hcm).toBeDefined();
      expect(hcm?.latitude).toBeCloseTo(10.8231, 2);

      const danang = DEFAULT_CITIES.find((c) => c.name === 'Đà Nẵng');
      expect(danang).toBeDefined();
      expect(danang?.latitude).toBeCloseTo(16.0544, 2);
    });

    it('contains international cities', () => {
      const tokyo = DEFAULT_CITIES.find((c) => c.name === 'Tokyo');
      expect(tokyo).toBeDefined();
      const london = DEFAULT_CITIES.find((c) => c.name === 'London');
      expect(london).toBeDefined();
    });
  });
});

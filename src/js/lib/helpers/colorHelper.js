
export const GetRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const a = 1;
  return `rgba(${r},${g}, ${b}, ${a})`;  
}

export const GetRandomHSLColor = () => {
  const hueMinMax = [15, 75];
  const saturationMinMax = [34, 55];
  const lightnessMinMax = [44, 85];
  const alphaMinMax = [1, 1];

  const h = Math.floor(Math.random() * (hueMinMax[1] - hueMinMax[0] + 1) + hueMinMax[0]);
  const s = Math.floor(Math.random() * (saturationMinMax[1] - saturationMinMax[0] + 1) + saturationMinMax[0]);
  const l = Math.floor(Math.random() * (lightnessMinMax[1] - lightnessMinMax[0] + 1) + lightnessMinMax[0]);
  const a = Math.floor(Math.random() * (alphaMinMax[1] - alphaMinMax[0] + 1) + alphaMinMax[0]);

  const value = `hsl(${h}deg ${s}% ${l}% / ${a})`;

  console.log(value);
  return value;  
}
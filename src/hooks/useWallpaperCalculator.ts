import { useState } from 'react';

interface RoomDimensions {
  length: string;
  width: string;
  height: string;
}

interface Opening {
  width: string;
  height: string;
}

interface RollParameters {
  width: number;
  length: number;
}

interface CalculationResult {
  rolls: number;
  wallpaperArea: number;
  wallArea: number;
}

const ROLL_PARAMETERS = {
  '1.06 x 10м': { width: 1.06, length: 10 },
  '1.06 x 25м': { width: 1.06, length: 25 }
} as const;

export const calculateWallArea = (
  length: number,
  width: number,
  height: number,
  windows: Opening[],
  doors: Opening[]
): number => {

  const perimeter = 2 * (length + width);
  const totalWallArea = perimeter * height;

  const windowsArea = windows.reduce((sum, window) => {
    const w = parseFloat(window.width) || 0;
    const h = parseFloat(window.height) || 0;
    return sum + w * h;
  }, 0);

  const doorsArea = doors.reduce((sum, door) => {
    const w = parseFloat(door.width) || 0;
    const h = parseFloat(door.height) || 0;
    return sum + w * h;
  }, 0);

  return Math.max(0, totalWallArea - windowsArea - doorsArea);
};

export const calculateRollsNeeded = (
  wallArea: number,
  rollParams: RollParameters,
  height: number,
  rapport: number
): CalculationResult => {
  const { width: rollWidth, length: rollLength } = rollParams;

  const stripHeight = height + (rapport > 0 ? Math.ceil(height / rapport) * rapport - height : 0);

  const totalStripsNeeded = Math.ceil(wallArea / (rollWidth * height));

  const stripsPerRoll = Math.floor(rollLength / stripHeight);

  const rolls = Math.ceil(totalStripsNeeded / stripsPerRoll);

  const wallpaperArea = totalStripsNeeded * stripHeight * rollWidth;

  return {
    rolls,
    wallpaperArea: Math.round(wallpaperArea * 100) / 100,
    wallArea: Math.round(wallArea * 100) / 100
  };
};

export const useWallpaperCalculator = () => {
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);

  const calculate = (
    roomDimensions: RoomDimensions,
    rollType: string,
    rapport: string,
    windows: Opening[],
    doors: Opening[]
  ): CalculationResult => {

    const length = parseFloat(roomDimensions.length) || 0;
    const width = parseFloat(roomDimensions.width) || 0;
    const height = parseFloat(roomDimensions.height) || 0;

    const rollParams = ROLL_PARAMETERS[rollType as keyof typeof ROLL_PARAMETERS] || ROLL_PARAMETERS['1.06 x 10м'];
    const rapportValue = parseFloat(rapport) || 0;

    const wallArea = calculateWallArea(length, width, height, windows, doors);

    const result = calculateRollsNeeded(wallArea, rollParams, height, rapportValue);

    setCalculation(result);
    return result;
  };

  return { calculation, calculate };
};

export const formatCalculationResult = (result: CalculationResult): string => {
  return `Рулоны: ${result.rolls} шт.\nПлощадь обоев: ${result.wallpaperArea} м²\nПлощадь оклейки: ${result.wallArea} м²`;
};

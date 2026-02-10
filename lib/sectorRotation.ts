// Sector Rotation Analysis

interface SectorData {
  name: string;
  score: number;
  momentum: number;
  trend: 'up' | 'down' | 'neutral';
}

export function analyzeSectorRotation(sectors: SectorData[]): SectorData[] {
  return sectors.sort((a, b) => b.score - a.score);
}

export function getTopSector(sectors: SectorData[]): SectorData | null {
  const sorted = analyzeSectorRotation(sectors);
  return sorted[0] || null;
}

export function getSectorAllocation(sectors: SectorData[]): Record<string, number> {
  const allocations: Record<string, number> = {};
  const totalScore = sectors.reduce((sum, s) => sum + s.score, 0);

  sectors.forEach((sector) => {
    allocations[sector.name] = (sector.score / totalScore) * 100;
  });

  return allocations;
}

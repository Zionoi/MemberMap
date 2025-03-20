export const normalizeRegionName = (fullName) => {
    const trimmed = fullName.trim();
    const match = trimmed.match(/([가-힣]+[구군시])$/);
    return match ? match[1] : trimmed;
  };
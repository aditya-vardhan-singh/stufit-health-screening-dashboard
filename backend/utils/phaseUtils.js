// 🗓️ Return Phase 1 for Jan-Jun, Phase 2 for Jul-Dec
export const getPhase = (date) => {
  const month = new Date(date).getMonth() + 1; // 0-indexed
  return month >= 1 && month <= 6 ? 'Phase 1' : 'Phase 2';
};

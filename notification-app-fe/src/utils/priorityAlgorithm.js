const PRIORITY_WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function getTopNotifications(notifications) {
  if (!notifications || notifications.length === 0) {
    return [];
  }

  return [...notifications]
    .sort((a, b) => {
      // Compare priority first
      const priorityA = PRIORITY_WEIGHTS[a.Type] || 0;
      const priorityB = PRIORITY_WEIGHTS[b.Type] || 0;

      if (priorityA !== priorityB) {
        return priorityB - priorityA;
      }

      // If priorities are the same, compare timestamps (newest first)
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, 10);
}
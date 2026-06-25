# Notification System Design
# Stage 1: Priority-Based Notification Ranking

## Overview

In Stage 1, the application fetches notifications from the Notification Service API and displays the **Top 10 notifications** based on their priority. Each notification is ranked using its type and timestamp.

---

## Priority Calculation

Each notification is assigned a priority weight based on its type:

| Notification Type | Priority Weight |
|-------------------|-----------------|
| Placement         | 3               |
| Result            | 2               |
| Event             | 1               |

### Ranking Logic

1. Notifications are first sorted by **priority weight** in descending order.
2. If two notifications have the same priority, the **most recent notification** (based on the timestamp) is ranked higher.
3. The first 10 notifications after sorting are displayed to the user.

Example order:

1. Placement (Newest)
2. Placement (Older)
3. Result (Newest)
4. Result (Older)
5. Event (Newest)

---

## Data Structure Used

The current implementation uses **Array Sorting**.

### Algorithm

1. Fetch all notifications from the API.
2. Assign a priority weight to each notification.
3. Sort notifications using:
   - Higher priority weight first.
   - Newer timestamp first when priorities are equal.
4. Return the first 10 notifications.

This approach is simple, easy to understand, and suitable for the current dataset size.

---

## Time Complexity

Let **n** be the total number of notifications.

| Operation | Complexity |
|----------|------------|
| Assign priority weights | O(n) |
| Sort notifications | O(n log n) |
| Select Top 10 | O(1) |

**Overall Time Complexity:** **O(n log n)**

**Space Complexity:** **O(n)**

---

## Efficient Maintenance of Top N Notifications

The current implementation recalculates the Top 10 whenever notifications are fetched.

For a large-scale production system where notifications continuously arrive, a **Min Heap** (Priority Queue) of size **10** would be a more efficient solution.

### Min Heap Approach

1. Maintain a Min Heap containing only the Top 10 notifications.
2. When a new notification arrives:
   - Calculate its priority.
   - If the heap contains fewer than 10 notifications, insert it.
   - Otherwise, compare the new notification with the minimum element in the heap.
   - Replace the minimum element only if the new notification has a higher priority.
3. The heap always stores the Top 10 highest-priority notifications.

### Complexity of Min Heap Approach

| Operation | Complexity |
|----------|------------|
| Insert | O(log N) |
| Remove Minimum | O(log N) |
| Peek Minimum | O(1) |
| Space | O(N) |

Since **N = 10**, the heap operations are extremely efficient, making this approach ideal for real-time notification systems with a large number of incoming notifications.

---

## Summary

- **Priority Order:** Placement > Result > Event
- **Tie Breaker:** Most recent notification first
- **Current Implementation:** Array Sorting
- **Current Complexity:** O(n log n)
- **Recommended Production Approach:** Min Heap (Priority Queue) to efficiently maintain the Top 10 notifications as new notifications arrive.
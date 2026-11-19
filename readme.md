# 🚨 RescueX – Intelligent Disaster Management System

## 📌 Project Overview

RescueX is an Intelligent Disaster Management System designed to support emergency rescue operations and resource distribution during natural disasters.

The project demonstrates five important algorithmic techniques to solve real-world disaster management problems.

It helps demonstrate how algorithms can improve rescue team allocation, disaster zone identification, relief distribution, and safe route planning.

---

## 🎯 Problem Statement

During natural disasters such as floods, earthquakes, cyclones, and landslides, emergency teams face several challenges:

- Assigning rescue teams to affected areas.
- Identifying disaster zones quickly.
- Distributing relief materials efficiently.
- Selecting the best combination of resources.
- Finding safe routes for rescue operations.

RescueX demonstrates algorithm-based solutions to these challenges.

---

## 🧠 Algorithms Implemented

### 1. Brute Force – Rescue Team Assignment

- Checks all possible assignments of rescue teams to disaster zones.
- Calculates the suitability score for each assignment.
- Selects the assignment with the highest score.

**Time Complexity:** O(n!)

**Space Complexity:** O(n)

### 2. Divide and Conquer – Disaster Zone Search

- Uses Binary Search to locate a disaster zone ID.
- Divides the sorted list into smaller sections.
- Searches efficiently for the required zone.

**Time Complexity:** O(log n)

**Space Complexity:** O(log n)

### 3. Greedy – Relief Package Selection

- Selects relief packages based on their value-to-weight ratio.
- Considers the available carrying capacity.
- Chooses packages with higher ratios first.

**Time Complexity:** O(n²)

**Space Complexity:** O(n)

### 4. Dynamic Programming – Optimal Relief Distribution

- Uses the 0/1 Knapsack algorithm.
- Calculates the maximum possible relief value.
- Selects the best combination of packages within the available capacity.

**Time Complexity:** O(n × W)

**Space Complexity:** O(n × W)

### 5. Backtracking – Safe Rescue Path Finding

- Finds a possible safe path through a disaster-affected area.
- Avoids blocked roads.
- Uses recursive backtracking to explore possible routes.

**Time Complexity:** O(4^(n²)) – Loose upper bound.

**Space Complexity:** O(n²)

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Website styling |
| JavaScript | Algorithm implementation and interaction |
| C Programming | Separate algorithm implementations |
| Git | Version control |
| GitHub | Source code hosting |

---

## 📂 Project Structure

```text
Intelligent_Disaster/
│
├── backend
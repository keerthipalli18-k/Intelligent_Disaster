console.log("RescueX JavaScript loaded!");

function runBruteForce() {
    const teamsInput = document.getElementById("bfTeams");
    const matrixInput = document.getElementById("bfMatrix");
    const output = document.getElementById("bfOutput");

    if (!teamsInput || !matrixInput || !output) {
        alert("HTML element IDs are incorrect. Check bfTeams, bfMatrix and bfOutput.");
        return;
    }

    const n = Number(teamsInput.value);
    const numbers = matrixInput.value.trim().split(/[\s,]+/).map(Number);

    if (!Number.isInteger(n) || n < 1 || n > 8) {
        output.textContent = "Enter a valid number of teams (1 to 8).";
        return;
    }

    if (numbers.length !== n * n || numbers.some(x => !Number.isFinite(x))) {
        output.textContent = "Enter exactly " + n + " rows and " + n + " scores per row.";
        return;
    }

    const matrix = [];

    for (let i = 0; i < n; i++) {
        matrix.push(numbers.slice(i * n, (i + 1) * n));
    }

    let bestScore = -Infinity;
    let bestAssignment = [];
    let assignment = [];
    let used = Array(n).fill(false);

    function solve(team, score) {
        if (team === n) {
            if (score > bestScore) {
                bestScore = score;
                bestAssignment = [...assignment];
            }
            return;
        }

        for (let zone = 0; zone < n; zone++) {
            if (!used[zone]) {
                used[zone] = true;
                assignment.push(zone);

                solve(team + 1, score + matrix[team][zone]);

                assignment.pop();
                used[zone] = false;
            }
        }
    }

    solve(0, 0);

    let result = "BEST RESCUE TEAM ASSIGNMENT\n\n";

    for (let i = 0; i < n; i++) {
        result += "Team " + (i + 1) +
            " -> Zone " + (bestAssignment[i] + 1) + "\n";
    }

    result += "\nMaximum Suitability Score: " + bestScore;
    result += "\nTime Complexity: O(n!)";
    result += "\nSpace Complexity: O(n)";

    output.textContent = result;
}
function runDivideConquer() {
    const size = Number(document.getElementById("dcSize").value);
    const arrayText = document.getElementById("dcArray").value;
    const target = Number(document.getElementById("dcTarget").value);
    const output = document.getElementById("dcOutput");

    if (!Number.isInteger(size) || size < 1 || size > 100) {
        output.textContent = "Enter a valid number of elements (1 to 100).";
        return;
    }

    if (arrayText.trim() === "" || !Number.isFinite(target)) {
        output.textContent = "Please enter the array and target ID.";
        return;
    }

    const arr = arrayText.trim().split(/[\s,]+/).map(Number);

    if (arr.length !== size || arr.some(x => !Number.isInteger(x))) {
        output.textContent = "Enter exactly " + size + " valid integer values.";
        return;
    }

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            output.textContent = "Array must be sorted in ascending order.";
            return;
        }
    }

    let steps = [];

    function binarySearch(arr, left, right, target) {
        if (left > right) {
            steps.push("Search range is empty. Target not found.");
            return -1;
        }

        let mid = Math.floor((left + right) / 2);

        steps.push(
            "Checking middle element: " + arr[mid] +
            " at position " + (mid + 1)
        );

        if (arr[mid] === target) {
            steps.push("Target found!");
            return mid;
        }

        if (target < arr[mid]) {
            steps.push("Target is smaller. Search left half.");
            return binarySearch(arr, left, mid - 1, target);
        }

        steps.push("Target is larger. Search right half.");
        return binarySearch(arr, mid + 1, right, target);
    }

    const result = binarySearch(arr, 0, arr.length - 1, target);

    let message = "DIVIDE AND CONQUER RESULT\n\n";
    message += "Disaster Zone IDs: " + arr.join(", ") + "\n";
    message += "Target Zone ID: " + target + "\n\n";

    if (result !== -1) {
        message += "Result: Zone found!\n";
        message += "Position: " + (result + 1) + "\n";
    } else {
        message += "Result: Zone not found.\n";
    }

    message += "\nSTEP-BY-STEP EXPLANATION\n";

    steps.forEach((step, index) => {
        message += (index + 1) + ". " + step + "\n";
    });

    message += "\nTime Complexity: O(log n)";
    message += "\nSpace Complexity: O(log n)";

    output.textContent = message;
}
function runGreedy() {
    const size = Number(document.getElementById("grSize").value);
    const capacity = Number(document.getElementById("grCapacity").value);
    const weightsText = document.getElementById("grWeights").value;
    const valuesText = document.getElementById("grValues").value;
    const output = document.getElementById("grOutput");

    if (!Number.isInteger(size) || size < 1 || size > 50) {
        output.textContent = "Enter the number of packages between 1 and 50.";
        return;
    }

    if (!Number.isFinite(capacity) || capacity < 0) {
        output.textContent = "Enter a valid carrying capacity.";
        return;
    }

    const weights = weightsText.trim().split(/[\s,]+/).map(Number);
    const values = valuesText.trim().split(/[\s,]+/).map(Number);

    if (weights.length !== size || values.length !== size) {
        output.textContent = "Enter exactly " + size + " weights and " + size + " values.";
        return;
    }

    if (weights.some(w => !Number.isFinite(w) || w <= 0) ||
        values.some(v => !Number.isFinite(v) || v < 0)) {
        output.textContent = "Weights must be positive and values cannot be negative.";
        return;
    }

    let packages = [];

    for (let i = 0; i < size; i++) {
        packages.push({
            id: i + 1,
            weight: weights[i],
            value: values[i],
            ratio: values[i] / weights[i]
        });
    }

    let selected = [];
    let totalWeight = 0;
    let totalValue = 0;
    let steps = [];

    let remaining = [...packages];

    steps.push("Calculate the value-to-weight ratio of every package.");

    while (remaining.length > 0) {
        remaining.sort((a, b) => b.ratio - a.ratio);

        let best = remaining.shift();

        if (totalWeight + best.weight <= capacity) {
            selected.push(best);
            totalWeight += best.weight;
            totalValue += best.value;

            steps.push(
                "Selected Package " + best.id +
                " (Ratio: " + best.ratio.toFixed(2) + ")."
            );
        } else {
            steps.push(
                "Skipped Package " + best.id +
                " because it exceeds the remaining capacity."
            );
        }
    }

    let message = "GREEDY ALGORITHM RESULT\n\n";

    message += "Selected Relief Packages:\n";

    if (selected.length === 0) {
        message += "No packages selected.\n";
    }

    selected.forEach(p => {
        message += "Package " + p.id +
            " | Weight: " + p.weight +
            " | Value: " + p.value +
            " | Ratio: " + p.ratio.toFixed(2) + "\n";
    });

    message += "\nTotal Weight: " + totalWeight;
    message += "\nTotal Relief Value: " + totalValue;
    message += "\nRemaining Capacity: " + (capacity - totalWeight);

    message += "\n\nSTEP-BY-STEP EXPLANATION\n";

    steps.forEach((step, index) => {
        message += (index + 1) + ". " + step + "\n";
    });

    message += "\nTime Complexity: O(n²)";
    message += "\nSpace Complexity: O(n)";

    message += "\n\nNote: Greedy selection is a heuristic and does not always give the optimal 0/1 package combination.";

    output.textContent = message;
}
function runDynamicProgramming() {
    const size = Number(document.getElementById("dpSize").value);
    const capacity = Number(document.getElementById("dpCapacity").value);
    const weightsText = document.getElementById("dpWeights").value;
    const valuesText = document.getElementById("dpValues").value;
    const output = document.getElementById("dpOutput");

    if (!Number.isInteger(size) || size < 1 || size > 50) {
        output.textContent = "Enter the number of packages between 1 and 50.";
        return;
    }

    if (!Number.isInteger(capacity) || capacity < 0 || capacity > 500) {
        output.textContent = "Enter a whole-number capacity between 0 and 500.";
        return;
    }

    const weights = weightsText.trim().split(/[\s,]+/).map(Number);
    const values = valuesText.trim().split(/[\s,]+/).map(Number);

    if (weights.length !== size || values.length !== size) {
        output.textContent =
            "Enter exactly " + size + " weights and " + size + " values.";
        return;
    }

    if (
        weights.some(w => !Number.isInteger(w) || w <= 0) ||
        values.some(v => !Number.isInteger(v) || v < 0)
    ) {
        output.textContent =
            "Weights must be positive integers and values must be non-negative integers.";
        return;
    }

    // Create DP table
    const dp = Array.from(
        { length: size + 1 },
        () => Array(capacity + 1).fill(0)
    );

    // Fill the DP table
    for (let i = 1; i <= size; i++) {
        for (let w = 0; w <= capacity; w++) {

            if (weights[i - 1] <= w) {
                const include =
                    values[i - 1] + dp[i - 1][w - weights[i - 1]];

                const exclude = dp[i - 1][w];

                dp[i][w] = Math.max(include, exclude);

            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    // Find selected packages
    let selected = [];
    let remainingCapacity = capacity;

    for (let i = size; i > 0; i--) {
        if (dp[i][remainingCapacity] !== dp[i - 1][remainingCapacity]) {
            selected.push(i);

            remainingCapacity -= weights[i - 1];
        }
    }

    selected.reverse();

    let totalWeight = 0;

    selected.forEach(id => {
        totalWeight += weights[id - 1];
    });

    let result = "DYNAMIC PROGRAMMING RESULT\n\n";

    result += "Selected Relief Packages:\n";

    if (selected.length === 0) {
        result += "No packages selected.\n";
    }

    selected.forEach(id => {
        result +=
            "Package " + id +
            " | Weight: " + weights[id - 1] +
            " | Value: " + values[id - 1] + "\n";
    });

    result += "\nMaximum Relief Value: " + dp[size][capacity];
    result += "\nTotal Weight: " + totalWeight;
    result += "\nRemaining Capacity: " + (capacity - totalWeight);

    result += "\n\nSTEP-BY-STEP EXPLANATION\n";

    result += "1. Create a DP table for packages and capacities.\n";
    result += "2. Check whether each package can fit.\n";
    result += "3. Calculate the value of including the package.\n";
    result += "4. Calculate the value of excluding the package.\n";
    result += "5. Store the maximum of both choices.\n";
    result += "6. Trace back through the table to find selected packages.\n";

    result += "\nTime Complexity: O(n × W)";
    result += "\nSpace Complexity: O(n × W)";

    output.textContent = result;
}
function runBacktracking() {
    const size = Number(document.getElementById("btSize").value);
    const gridText = document.getElementById("btGrid").value;
    const output = document.getElementById("btOutput");

    if (!Number.isInteger(size) || size < 2 || size > 8) {
        output.textContent = "Enter a grid size between 2 and 8.";
        return;
    }

    const numbers = gridText.trim().split(/[\s,]+/).map(Number);

    if (numbers.length !== size * size) {
        output.textContent = "Enter exactly " + size + " rows and " + size + " columns.";
        return;
    }

    if (numbers.some(value => value !== 0 && value !== 1)) {
        output.textContent = "Grid values must be only 0 or 1.";
        return;
    }

    const grid = [];

    for (let i = 0; i < size; i++) {
        grid.push(numbers.slice(i * size, (i + 1) * size));
    }

    if (grid[0][0] === 1 || grid[size - 1][size - 1] === 1) {
        output.textContent = "No safe path! Start or destination is blocked.";
        return;
    }

    const path = [];
    const directions = [
        [0, 1, "Right"],
        [1, 0, "Down"],
        [0, -1, "Left"],
        [-1, 0, "Up"]
    ];

    let steps = [];

    function findPath(row, col, onPath) {

        if (
            row < 0 || col < 0 ||
            row >= size || col >= size ||
            grid[row][col] === 1 ||
            onPath[row][col]
        ) {
            return false;
        }

        onPath[row][col] = true;
        path.push([row, col]);

        steps.push("Checking cell (" + row + ", " + col + ")");

        if (row === size - 1 && col === size - 1) {
            steps.push("Destination reached!");
            return true;
        }

        for (const [dr, dc, direction] of directions) {

            steps.push("Trying direction: " + direction);

            if (findPath(row + dr, col + dc, onPath)) {
                return true;
            }
        }

        steps.push("Dead end at (" + row + ", " + col + "). Backtracking.");

        path.pop();
        onPath[row][col] = false;

        return false;
    }

    const onPath = Array.from(
        { length: size },
        () => Array(size).fill(false)
    );

    const found = findPath(0, 0, onPath);

    let result = "BACKTRACKING RESULT\n\n";

    if (found) {
        result += "Safe Rescue Path Found!\n\n";

        result += "Path Coordinates:\n";

        path.forEach((cell, index) => {
            result +=
                (index + 1) + ". (" +
                cell[0] + ", " + cell[1] + ")\n";
        });

        result += "\nRescue Route:\n";

        const pathSet = new Set(
            path.map(cell => cell[0] + "," + cell[1])
        );

        for (let i = 0; i < size; i++) {
            let row = "";

            for (let j = 0; j < size; j++) {
                if (i === 0 && j === 0) {
                    row += "S ";
                } else if (i === size - 1 && j === size - 1) {
                    row += "D ";
                } else if (pathSet.has(i + "," + j)) {
                    row += "* ";
                } else if (grid[i][j] === 1) {
                    row += "# ";
                } else {
                    row += ". ";
                }
            }

            result += row + "\n";
        }

    } else {
        result += "No safe rescue path exists.\n";
    }

    result += "\nSTEP-BY-STEP EXPLANATION\n";

    steps.forEach((step, index) => {
        result += (index + 1) + ". " + step + "\n";
    });

    result += "\nS = Start";
    result += "\nD = Destination";
    result += "\n* = Safe Path";
    result += "\n# = Blocked Road";
    result += "\n. = Open Road";

    result += "\n\nTime Complexity: O(4^(n²)) (loose upper bound)";
    result += "\nSpace Complexity: O(n²)";

    output.textContent = result;
}
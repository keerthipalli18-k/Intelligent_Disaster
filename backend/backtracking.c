#include <stdio.h>

#define MAX 10

int grid[MAX][MAX];
int visited[MAX][MAX];

int n;

int findRoute(int row, int col)
{
    if (row < 0 || col < 0 ||
        row >= n || col >= n)
        return 0;

    if (grid[row][col] == 1 ||
        visited[row][col] == 1)
        return 0;

    visited[row][col] = 1;

    if (row == n - 1 && col == n - 1)
        return 1;

    // Move right
    if (findRoute(row, col + 1))
        return 1;

    // Move down
    if (findRoute(row + 1, col))
        return 1;

    // Move left
    if (findRoute(row, col - 1))
        return 1;

    // Move up
    if (findRoute(row - 1, col))
        return 1;

    // Backtrack
    visited[row][col] = 0;

    return 0;
}

int main()
{
    printf("Enter grid size: ");
    scanf("%d", &n);

    if (n < 2 || n > MAX)
    {
        printf("Invalid grid size");
        return 0;
    }

    printf("Enter grid (0 = Open, 1 = Blocked):\n");

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            scanf("%d", &grid[i][j]);

            if (grid[i][j] != 0 && grid[i][j] != 1)
            {
                printf("Invalid grid value");
                return 0;
            }
        }
    }

    if (findRoute(0, 0))
    {
        printf("\nRescue Route Found!\n");

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                printf("%d ", visited[i][j]);
            }

            printf("\n");
        }
    }
    else
    {
        printf("No valid rescue route found.");
    }

    return 0;
}
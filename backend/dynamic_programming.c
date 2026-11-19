#include <stdio.h>

#define MAX 50
#define CAP 500

int main()
{
    int n, capacity;
    int weight[MAX], value[MAX];
    int dp[MAX + 1][CAP + 1];

    printf("Enter number of relief packages: ");
    scanf("%d", &n);

    if (n < 1 || n > MAX)
    {
        printf("Invalid number");
        return 0;
    }

    printf("Enter carrying capacity: ");
    scanf("%d", &capacity);

    if (capacity < 1 || capacity > CAP)
    {
        printf("Invalid capacity");
        return 0;
    }

    for (int i = 0; i < n; i++)
    {
        printf("Enter weight and benefit of package %d: ", i + 1);
        scanf("%d %d", &weight[i], &value[i]);

        if (weight[i] <= 0 || value[i] < 0)
        {
            printf("Invalid package details");
            return 0;
        }
    }

    for (int i = 0; i <= n; i++)
    {
        for (int w = 0; w <= capacity; w++)
        {
            if (i == 0 || w == 0)
            {
                dp[i][w] = 0;
            }
            else if (weight[i - 1] <= w)
            {
                int include = value[i - 1] +
                    dp[i - 1][w - weight[i - 1]];

                int exclude = dp[i - 1][w];

                dp[i][w] = include > exclude ?
                           include : exclude;
            }
            else
            {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    printf("\nMaximum Resource Benefit: %d\n",
           dp[n][capacity]);

    printf("Selected Packages:\n");

    int w = capacity;

    for (int i = n; i > 0; i--)
    {
        if (dp[i][w] != dp[i - 1][w])
        {
            printf("Package %d\n", i);

            w = w - weight[i - 1];
        }
    }

    return 0;
}
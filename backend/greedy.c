#include <stdio.h>

#define MAX 50

int main()
{
    int n, capacity;
    int weight[MAX], value[MAX];
    int selected[MAX] = {0};

    int totalWeight = 0;
    int totalValue = 0;

    printf("Enter number of relief packages: ");
    scanf("%d", &n);

    if (n < 1 || n > MAX)
    {
        printf("Invalid number");
        return 0;
    }

    printf("Enter carrying capacity: ");
    scanf("%d", &capacity);

    if (capacity <= 0)
    {
        printf("Invalid capacity");
        return 0;
    }

    for (int i = 0; i < n; i++)
    {
        printf("Enter weight and value of package %d: ", i + 1);
        scanf("%d %d", &weight[i], &value[i]);

        if (weight[i] <= 0 || value[i] < 0)
        {
            printf("Invalid package details");
            return 0;
        }
    }

    while (1)
    {
        int best = -1;

        for (int i = 0; i < n; i++)
        {
            if (!selected[i] &&
                weight[i] <= capacity - totalWeight)
            {
                if (best == -1 ||
                    (double)value[i] / weight[i] >
                    (double)value[best] / weight[best])
                {
                    best = i;
                }
            }
        }

        if (best == -1)
            break;

        selected[best] = 1;

        totalWeight += weight[best];
        totalValue += value[best];
    }

    printf("\nSelected Relief Packages:\n");

    for (int i = 0; i < n; i++)
    {
        if (selected[i])
            printf("Package %d\n", i + 1);
    }

    printf("Total Weight: %d\n", totalWeight);
    printf("Total Value: %d\n", totalValue);

    return 0;
}
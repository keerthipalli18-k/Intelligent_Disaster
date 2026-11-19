#include <stdio.h>

int binarySearch(int arr[], int left,
                 int right, int target)
{
    if (left <= right)
    {
        int mid = left + (right - left) / 2;

        if (arr[mid] == target)
            return mid;

        if (arr[mid] < target)
            return binarySearch(arr, mid + 1,
                                right, target);

        return binarySearch(arr, left,
                            mid - 1, target);
    }

    return -1;
}

int main()
{
    int n, arr[100], target;

    printf("Enter number of disaster zones: ");
    scanf("%d", &n);

    if (n < 1 || n > 100)
    {
        printf("Invalid number");
        return 0;
    }

    printf("Enter sorted disaster zone IDs:\n");

    for (int i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);

        if (i > 0 && arr[i] < arr[i - 1])
        {
            printf("Enter IDs in ascending order");
            return 0;
        }
    }

    printf("Enter zone ID to search: ");
    scanf("%d", &target);

    int result = binarySearch(arr, 0, n - 1, target);

    if (result == -1)
        printf("Disaster zone not found");
    else
        printf("Disaster zone found at position %d",
               result + 1);

    return 0;
}
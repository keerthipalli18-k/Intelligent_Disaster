#include <stdio.h>

#define MAX 10

int n, score[MAX][MAX];
int used[MAX], current[MAX], best[MAX];
int maxScore = -1;

void assignTeams(int team, int total)
{
    if (team == n)
    {
        if (total > maxScore)
        {
            maxScore = total;

            for (int i = 0; i < n; i++)
                best[i] = current[i];
        }
        return;
    }

    for (int zone = 0; zone < n; zone++)
    {
        if (!used[zone])
        {
            used[zone] = 1;
            current[team] = zone;

            assignTeams(team + 1,
                        total + score[team][zone]);

            used[zone] = 0;
        }
    }
}

int main()
{
    printf("Enter number of rescue teams: ");
    scanf("%d", &n);

    if (n < 1 || n > MAX)
    {
        printf("Invalid number of teams");
        return 0;
    }

    printf("Enter suitability score matrix:\n");

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            scanf("%d", &score[i][j]);

            if (score[i][j] < 0)
            {
                printf("Invalid score");
                return 0;
            }
        }
    }

    assignTeams(0, 0);

    printf("\nBest Assignment:\n");

    for (int i = 0; i < n; i++)
    {
        printf("Team %d -> Disaster Zone %d\n",
               i + 1, best[i] + 1);
    }

    printf("Maximum Suitability Score: %d\n", maxScore);

    return 0;
}
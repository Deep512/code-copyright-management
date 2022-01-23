#include <bits/stdc++.h>
using namespace std;
int main()
{
    int len;
    cin >> len;
    vector<int> arr(len);
    for (int itr = 0; itr < len; itr++)
    {
        cin >> arr[itr];
    }
    cout << accumulate(arr.begin(), arr.end(), 0);
    return 0;
}
## CCD Managment SDK

Cloud Content Delivery is a managed cloud service that hosts and delivers content to end users worldwide. The CCD Management SDK provides methods to manage a project's remote content.

## Using the CCD Management SDK

### Import package

```csharp
using Unity.Services.Ccd.Management;
```

### Usage
Utilizing this SDK in the Editor will look like something below.

Sample Usage:
```csharp
async void MakeAPICall()
{
    await CcdManagementService.SetConfigurationAuthHeader(CloudProjectSettings.accessToken);
    FakeApiGetRequest r = new FakeApiGetRequest("fakeParameter");
    var client = new FakeClient(new HttpClient());
    var response = await client.FakeApiGetAsync(r);
}
```

### Example
Sample of usage can be found in [Ccd Sample Window Example](./Samples~/CcdSampleWindow/CcdSampleWindow.cs)




using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.Data.Sqlite;

namespace backend.api.Controllers;

[ApiController]
[Route("[controller]")]
public class FuelStationController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<FuelStationController> _logger;
    private readonly SqliteConnection _connection;

    public FuelStationController(HttpClient httpClient, ILogger<FuelStationController> logger, SqliteConnection connection)
    {
        _httpClient = httpClient;
        _logger = logger;
        _connection = connection;
    }

    [HttpGet(Name = "GetFuelStations")]
    public async Task<IEnumerable<FuelStation>> Get()
    {
        var fuelStations = new List<FuelStation>();

        var selectCmd = _connection.CreateCommand();
        selectCmd.CommandText = "SELECT * FROM fuelstation";
        using var reader = selectCmd.ExecuteReader();
        while (reader.Read())
        {
            fuelStations.Add(new FuelStation
            {
                Id = reader.GetString(0),
                Name = reader.GetString(1),
                Price = reader.GetDecimal(2),
                Time = reader.GetString(3)
            });
        }
        
        return fuelStations;
    }
}

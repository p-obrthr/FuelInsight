using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Data.Sqlite;

public class TankerKoenigApiFetchService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<TankerKoenigApiFetchService> _logger;
    private readonly string _apiKey;
    private readonly string _lat;
    private readonly string _lng;
    private readonly SqliteConnection _connection;

    public TankerKoenigApiFetchService(IHttpClientFactory httpClientFactory, ILogger<TankerKoenigApiFetchService> logger, IConfiguration configuration, SqliteConnection connection)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
        _connection = connection;

        // Key für den Zugriff auf die freie Tankerkönig-Spritpreis-API
        // Für eigenen Key bitte hier https://creativecommons.tankerkoenig.de
        // registrieren.
        _apiKey = configuration["apiKey"];
        _lat = configuration["lat"];
        _lng = configuration["lng"];
    }

    public async Task FetchDataAndSaveToDatabase()
    {
        var client = _httpClientFactory.CreateClient();
        var apiUrl = $"https://creativecommons.tankerkoenig.de/json/list.php?lat={_lat}&lng={_lng}&rad=6&sort=price&type=e5&apikey={_apiKey}";
        var response = await client.GetAsync(apiUrl);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("Failed fetch status code: {StatusCode}", response.StatusCode);
            return;
        }

        var jsonResponse = await response.Content.ReadAsStringAsync();
        _logger.LogInformation("API Response: {jsonResponse}", jsonResponse);

        var fuelData = JsonSerializer.Deserialize<FuelData>(jsonResponse);
        if (fuelData == null || fuelData.Stations == null)
        {
            _logger.LogError("null error");
            return;
        }

        using var transaction = _connection.BeginTransaction();
        try
        {
            DateTime currentTime = DateTime.UtcNow;
            string formattedTime = currentTime.ToString("yyyy-MM-ddTHH:mm:ssZ");

            foreach (var station in fuelData.Stations)
            {
                var insertCmd = _connection.CreateCommand();
                insertCmd.CommandText = $"INSERT INTO fuelstation (id, name, price, time) VALUES (@id, @name, @price, @time)";
                insertCmd.Parameters.AddWithValue("@id", station.Id);
                insertCmd.Parameters.AddWithValue("@name", station.Name);
                insertCmd.Parameters.AddWithValue("@price", station.Price);
                insertCmd.Parameters.AddWithValue("@time", formattedTime);
                insertCmd.ExecuteNonQuery();
            }

            transaction.Commit();
        }
        catch (Exception ex)
        {
            transaction.Rollback();
             _logger.LogError(ex, "error while saving data");
        }
    }
}

using Microsoft.AspNetCore.Builder;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;


internal class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // SQLite database
        var connectionStringBuilder = new SqliteConnectionStringBuilder();
        connectionStringBuilder.DataSource = "./fuelinsight.db";
        using var connection = new SqliteConnection(connectionStringBuilder.ConnectionString);
        connection.Open();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = "CREATE TABLE IF NOT EXISTS fuelstation(id TEXT, name VARCHAR(128), price DECIMAL, time TEXT);";
        tableCmd.ExecuteNonQuery();


        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin",
                builder => builder
                    .WithOrigins("http://127.0.0.1:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod());
        });

        // Add services to the container
        builder.Services.AddControllers();
        builder.Services.AddHttpClient();
        builder.Services.AddSingleton(connection); 
        builder.Services.AddSingleton<TankerKoenigApiFetchService>(); 
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // keys and secrets
        builder.Configuration.AddJsonFile("appsettings.secrets.json", optional: true, reloadOnChange: true);

        var app = builder.Build();

        // fetch data from tankerkoenig api
        // using var scope = app.Services.CreateScope();
        // var TankerKoenigApiFetchService = scope.ServiceProvider.GetRequiredService<TankerKoenigApiFetchService>();
        // await TankerKoenigApiFetchService.FetchDataAndSaveToDatabase();
        

        // Configure the HTTP request pipeline
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("AllowSpecificOrigin");


        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}

FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app
EXPOSE 59609
EXPOSE 44336

FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /src
COPY TMA.Api/TMA.Api.csproj TMA.Api/
RUN dotnet restore TMA.Api/TMA.Api.csproj
COPY . .
WORKDIR /src/TMA.Api
RUN dotnet build TMA.Api.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish TMA.Api.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "TMA.Api.dll"]

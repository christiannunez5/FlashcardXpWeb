import * as signalR from "@microsoft/signalr";

export const socket = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:8080/hub/events")
    .build();

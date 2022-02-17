import asyncio
import json
import secrets

import websockets

WATCH = {}
JOIN = {}


async def echo(websocket):
    async for message in websocket:
        print('HEREEEEEEEEE', message)
        await websocket.send(message)


async def error(websocket, message):
    """
    Send an error message.

    """
    event = {
        "type": "error",
        "message": message,
    }
    await websocket.send(json.dumps(event))


async def watch(websocket, watch_key):
    """
    Handle a connection from a spectator: watch an existing game.

    """
    # Find the Connect Four game.
    try:
        connected = WATCH[watch_key]
    except KeyError:

        await error(websocket, "Game not found.")
        return

    # Register to receive moves from this game.
    connected.add(websocket)
    try:
        # Keep the connection open, but don't receive any messages.
        await websocket.wait_closed()
    finally:
        connected.remove(websocket)


async def start(websocket):
    """
    Handle a connection from the first player: start a new game.

    """
    # Initialize a Connect Four game, the set of WebSocket connections
    # receiving moves from this game, and secret access tokens.
    connected = {websocket}

    join_key = secrets.token_urlsafe(12)
    JOIN[join_key] = connected

    watch_key = secrets.token_urlsafe(12)
    WATCH[watch_key] = connected

    try:
       # Send the secret access tokens to the browser of the first player,
       # where they'll be used for building "join" and "watch" links.
       event = {
           "type": "init",
           "join": join_key
       }
       await websocket.send(json.dumps(event))
       # Receive and process moves from the first player.
       await play(websocket, connected)
    finally:
        del JOIN[join_key]


async def play(websocket, connected):
     """
     Receive and process moves from a player.
     """
     async for message in websocket:
         # Parse a "play" event from the UI.
         # event = json.loads(message)
         # assert event["type"] == "play"
         # column = event["column"]

         try:
             # Play the move.
             websockets.broadcast(connected, json.dumps(message))
         except RuntimeError as exc:
             # Send an "error" event if the move was illegal.
             await error(websocket, str(exc))
             continue


async def join(websocket, join_key):
    """
    Handle a connection from the second player: join an existing game.
    """
    # Find the Connect Four game.
    try:
        connected = JOIN[join_key]
    except KeyError:
        await error(websocket, "Game not found.")
        return

    # Register to receive moves from this game.
    connected.add(websocket)
    try:
        # Receive and process moves from the second player.
        await play(websocket, connected)
    finally:
        connected.remove(websocket)


async def handler(websocket):
    """
    Handle a connection and dispatch it according to who is connecting.

    """
    # # Receive and parse the "init" event from the UI.
    # message = await websocket.recv()
    # event =
    # join_key = event['gameId']
    # See the first message
    if len(JOIN) == 0:
        print('HEREEEEE')
        await start(websocket)
    else:
        join_key = list(JOIN.keys())[0]
        print('JOIN KEY', join_key)
        await join(websocket, join_key)


async def main():
    async with websockets.serve(handler, "localhost", 8765, origins=['*', None]) as socket:
        print('HANDLER')
        await asyncio.Future()  # run forever

asyncio.run(main())

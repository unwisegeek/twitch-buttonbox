from flask import Flask, redirect, request
import simpleobsws
import asyncio

app = Flask(__name__)

loop = asyncio.get_event_loop()
obs = simpleobsws.obsws(host='localhost', port=4444, password=None, loop=loop)

async def make_request(call, data=None):
    await obs.connect()
    result = await obs.call(call, data=data)
    await obs.disconnect()
    return result


@app.route("/")
def index():
    return redirect("/api/getversion")


@app.route("/api/helloworld")
def hello_world():
    return "Hello, World!"


@app.route("/api/", methods=['GET'])
def api_call():
    data={}
    for key, value in request.values.items():
        if key != "call":
            data[key] = value
    if len(data.values()) == 0:
        return loop.run_until_complete(make_request(request.values["call"]))
    else:
        return loop.run_until_complete(make_request(request.values["call"], data=data))
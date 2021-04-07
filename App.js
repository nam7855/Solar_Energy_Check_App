import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import firstpage from './First';
import temppage from './Temp';
import humipage from './Humi';
import solarpage from './Solar';
import gradipage from './Gradi';
import encoding from 'text-encoding';
import ReactFileReader from 'react-file-reader';

const decoder = new encoding.TextDecoder();


const {InfluxDB} = require('@influxdata/influxdb-client')
const {Point} = require('@influxdata/influxdb-client')

const token = 'FI2E-pDSXhWXmntaiZepjyY4z0RlkYUkEGAaeG0N0mDR9EIbedYtJOPeStNs8r-GW3WDCTOA0VnymVXZRg57Eg=='
const org = 'hyun97727855@gmail.com'
const bucket = 'ParticleData'

const client = new InfluxDB({url: 'https://us-central1-1.gcp.cloud2.influxdata.com', token: token})

const writeApi = client.getWriteApi(org, bucket)
writeApi.useDefaultTags({host: 'host1'})

const point = new Point('mem')
  .tag('example', 'index.html')
  .floatField('used_percent', 45)

writeApi.writePoint(point)
console.log(` ${point}`)

writeApi
    .close()
    .then(() => {
        console.log('Write FINISHED')
    })
    .catch(e => {
        console.error(e)
        console.log('\nWrite Finished ERROR')
    })

    const queryApi = client.getQueryApi(org)

    const query = `from(bucket: "${bucket}") |> range(start: -1h)  |> filter(fn: (r) => r._measurement == "mem")`
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row)
            console.log(`${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
        )
      },
      error(error) {
        console.error(error)
        console.log('\nQuery Finished ERROR')
      },
      complete() {
        console.log('\nQuery Finished SUCCESS')
      },
    })

const App = createStackNavigator(
    {
        Home: {screen:firstpage},
        Temp: {screen:temppage},
        Humi: {screen:humipage},
        Solar: {screen:solarpage},
        Gradi: {screen:gradipage}
    },
    {initialRouteName: 'Home', headerMode: 'none'}
);

export default createAppContainer(App);



FileReader.prototype.readAsArrayBuffer = function (blob) {
	if (this.readyState === this.LOADING) throw new Error("InvalidStateError");
	this._setReadyState(this.LOADING);
	this._result = null;
	this._error = null;
	const fr = new FileReader();
	fr.onloadend = () => {
		const content = atob(fr.result.substr("data:application/octet-stream;base64,".length));
		const buffer = new ArrayBuffer(content.length);
		const view = new Uint8Array(buffer);
		view.set(Array.from(content).map(c => c.charCodeAt(0)));
		this._result = buffer;
		this._setReadyState(this.DONE);
	};
	fr.readAsDataURL(blob);
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const atob = (input = '') => {
	let str = input.replace(/=+$/, '');
	let output = '';

	if (str.length % 4 == 1) {
		throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
	}
	for (let bc = 0, bs = 0, buffer, i = 0;
		buffer = str.charAt(i++);

		~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
			bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
	) {
		buffer = chars.indexOf(buffer);
	}

	return output;
}
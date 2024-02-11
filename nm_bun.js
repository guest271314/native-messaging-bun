#!/usr/bin/env -S ./bun run --no-install --smol
// Bun Native Messaging host
// guest271314, 10-9-2022

const encoder = new TextEncoder();

function encodeMessage(message) {
  return encoder.encode(JSON.stringify(message));
}

async function* getMessage() {
  const buffer = new ArrayBuffer(0, { maxByteLength: 1048576 });
  const view = new DataView(buffer);
  let messageLength = 0;
  let readOffset = 0;
  for await (let message of Bun.stdin.stream()) {
    if (buffer.byteLength === 0) {
      buffer.resize(4);
      for (let i = 0; i < 4; i++) {
        view.setUint8(i, message[i]);
      }
      messageLength = view.getUint32(0, true);
      message = message.subarray(4);
      buffer.resize(0);
    }
    buffer.resize(buffer.byteLength + message.length);
    for (let i = 0; i < message.length; i++, readOffset++) {
      view.setUint8(readOffset, message[i]);
    }
    if (buffer.byteLength === messageLength) {
      yield new Uint8Array(buffer);
      messageLength = 0;
      readOffset = 0;
      buffer.resize(0);
    }
  }
}

async function sendMessage(message) {
  const header = Uint32Array.from({
    length: 4,
  }, (_, index) => (message.length >> (index * 8)) & 0xff);
  const output = new Uint8Array(header.length + message.length);
  output.set(header, 0);
  output.set(message, 4);
  await Bun.write(Bun.stdout, output);
}

try {
  for await (const message of getMessage()) {
    await sendMessage(message);
  }
} catch (e) {
  process.exit();
}

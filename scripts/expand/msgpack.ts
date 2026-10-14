/**
 * A minimal MessagePack decoder: nil, booleans, integers, floats, strings, arrays and maps, which is all wordfreq's
 * data files use. Written here so the pipeline needs no extra dependency. Pure.
 */
export function decodeMsgpack(bytes: Uint8Array): unknown {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const text = new TextDecoder();
  let at = 0;
  const str = (n: number) => {
    const s = text.decode(bytes.subarray(at, at + n));
    at += n;
    return s;
  };
  const arr = (n: number): unknown[] => Array.from({ length: n }, () => next());
  const map = (n: number) => {
    const out: Record<string, unknown> = {};
    for (let i = 0; i < n; i++) {
      const key = String(next());
      Object.defineProperty(out, key, { value: next(), enumerable: true, writable: true, configurable: true });
    }
    return out;
  };
  function next(): unknown {
    const b = bytes[at++];
    if (b === undefined) throw new Error("msgpack: unexpected end");
    if (b <= 0x7f) return b;
    if (b >= 0xe0) return b - 0x100;
    if ((b & 0xf0) === 0x80) return map(b & 0x0f);
    if ((b & 0xf0) === 0x90) return arr(b & 0x0f);
    if ((b & 0xe0) === 0xa0) return str(b & 0x1f);
    const u = (n: 1 | 2 | 4) => {
      const v = n === 1 ? view.getUint8(at) : n === 2 ? view.getUint16(at) : view.getUint32(at);
      at += n;
      return v;
    };
    switch (b) {
      case 0xc0: return null;
      case 0xc2: return false;
      case 0xc3: return true;
      case 0xca: { const v = view.getFloat32(at); at += 4; return v; }
      case 0xcb: { const v = view.getFloat64(at); at += 8; return v; }
      case 0xcc: return u(1);
      case 0xcd: return u(2);
      case 0xce: return u(4);
      case 0xcf: { const v = Number(view.getBigUint64(at)); at += 8; return v; }
      case 0xd0: { const v = view.getInt8(at); at += 1; return v; }
      case 0xd1: { const v = view.getInt16(at); at += 2; return v; }
      case 0xd2: { const v = view.getInt32(at); at += 4; return v; }
      case 0xd3: { const v = Number(view.getBigInt64(at)); at += 8; return v; }
      case 0xd9: return str(u(1));
      case 0xda: return str(u(2));
      case 0xdb: return str(u(4));
      case 0xdc: return arr(u(2));
      case 0xdd: return arr(u(4));
      case 0xde: return map(u(2));
      case 0xdf: return map(u(4));
      default: throw new Error(`msgpack: unsupported type 0x${b.toString(16)}`);
    }
  }
  return next();
}

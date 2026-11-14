import qrcode from './vendor/qrcode.mjs';
import { studentJoinURL } from './core.mjs';
export function createJoinQR(code) {
  const url = studentJoinURL(code);
  const qr = qrcode(0, 'M');
  qr.addData(url, 'Byte');
  qr.make();
  return { url, svg: qr.createSvgTag({cellSize:6, margin:24, scalable:true}) };
}

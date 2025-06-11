import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    http_req_failed: ['rate>0.2'],
  },
};

const files = 
  { data: open('./file_1kb.txt', 'b'), name: 'file_1kb.txt' }
  // { data: open('./file_100kb.txt', 'b'), name: 'file_100kb.txt' }
  // { data: open('./file_1mb.txt', 'b'), name: 'file_1mb.txt' }
;

export default function () {
  const file = files;

  const payload = {
    file: http.file(file.data, file.name),
  };

  const res = http.post('https://bc13-114-10-44-152.ngrok-free.app/upload', payload);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}

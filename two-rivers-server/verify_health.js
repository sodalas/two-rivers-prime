
const resp = await fetch('http://localhost:3000/health');
const data = await resp.json();
console.log(JSON.stringify(data, null, 2));

if (data.status === 'ok' && data.redis === 'connected' && data.neo4j === 'connected') {
  console.log('VERIFICATION SUCCESS');
  process.exit(0);
} else {
  console.error('VERIFICATION FAILED');
  process.exit(1);
}
